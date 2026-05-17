/**
 * Wikidata 歴史イベント収集スクリプト v2
 *
 * 変更点:
 *   - 全期間を一括クエリ（チャンク不要・シンプル）
 *   - P585 + P580 UNION 対応
 *   - SERVICE wikibase:label で ja,en フォールバック
 *   - 14カテゴリ（地域 + グローバル）
 *   - グローバルカテゴリは年代別分割（5000件超え対策）
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { WIKIDATA_ENDPOINT, makeQueries, buildQuery } from './collect-events/queries.js'
import { toMasterEvent, type WikidataRow, type MasterEvent } from './collect-events/classify.js'

// ── .env.local 自動ロード ────────────────────────────────────────────
const envPath = resolve(process.cwd(), '.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) {
      const key = m[1].trim()
      const val = m[2].trim().replace(/^"(.*)"$/, '$1')
      if (!process.env[key]) process.env[key] = val
    }
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定です')
  process.exit(1)
}

const UPSERT_BATCH = 500
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── 既存データをDBから取得 ───────────────────────────────────────────
async function loadExistingIds(): Promise<Set<string>> {
  console.log('既存データを取得中...')
  const ids = new Set<string>()
  let page = 0
  const PAGE = 1000
  while (true) {
    const { data, error } = await (supabase as any)
      .from('master_events')
      .select('wikidata_id')
      .range(page * PAGE, (page + 1) * PAGE - 1)
    if (error || !data || data.length === 0) break
    for (const row of data) if (row.wikidata_id) ids.add(row.wikidata_id)
    if (data.length < PAGE) break
    page++
  }
  console.log(`  既存 ${ids.size} 件`)
  return ids
}

// ── Wikidata SPARQL 取得（リトライ付き） ──────────────────────────────
async function fetchEvents(
  sparql: string,
  categoryName: string,
  existingIds: Set<string>
): Promise<MasterEvent[]> {
  const url = `${WIKIDATA_ENDPOINT}?query=${encodeURIComponent(sparql)}&format=json`
  const MAX_RETRY = 3

  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 90_000)
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/sparql-results+json',
          'User-Agent': 'chronos-timeline-collector/2.0 (https://github.com/waganahakiyo-arch/chronos-timeline)',
        },
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        if (attempt < MAX_RETRY) {
          console.warn(`    ⚠ ${res.status} → ${20 * attempt}秒後リトライ`)
          await new Promise(r => setTimeout(r, 20_000 * attempt))
          continue
        }
        console.warn(`    ✗ ${res.status} スキップ`)
        return []
      }

      const json = await res.json() as { results: { bindings: WikidataRow[] } }
      const rows = json.results.bindings
      if (rows.length === 0) return []

      const seen = new Set<string>()
      const events: MasterEvent[] = []
      for (const row of rows) {
        const ev = toMasterEvent(row, categoryName)
        if (!ev) continue
        if (existingIds.has(ev.wikidata_id) || seen.has(ev.wikidata_id)) continue
        seen.add(ev.wikidata_id)
        events.push(ev)
      }
      return events

    } catch (err: any) {
      clearTimeout(timeoutId)
      if (attempt < MAX_RETRY) {
        console.warn(`    ⚠ ${err.name === 'AbortError' ? 'タイムアウト' : err.message} → ${20 * attempt}秒後リトライ`)
        await new Promise(r => setTimeout(r, 20_000 * attempt))
        continue
      }
      console.warn(`    ✗ エラー スキップ:`, err.message)
      return []
    }
  }
  return []
}

// ── upsert ───────────────────────────────────────────────────────────
async function upsert(events: MasterEvent[], existingIds: Set<string>) {
  for (let i = 0; i < events.length; i += UPSERT_BATCH) {
    const batch = events.slice(i, i + UPSERT_BATCH)
    const { error } = await (supabase as any)
      .from('master_events')
      .upsert(batch, { onConflict: 'wikidata_id' })
    if (error) {
      console.error('    upsert エラー:', error.message)
    } else {
      for (const ev of batch) existingIds.add(ev.wikidata_id)
    }
  }
}

// ── メイン ───────────────────────────────────────────────────────────
async function main() {
  console.log('=== Wikidata 歴史イベント収集スクリプト v2 ===')

  const existingIds = await loadExistingIds()
  let grandTotal = 0

  // 通常の地域カテゴリは全期間一括
  const regionalQueries = makeQueries(-3000, 2030)

  // グローバルカテゴリは時代別に分割（5000件超え対策）
  // makeQueriesの結果からグローバルカテゴリを除いて別処理
  const GLOBAL_PERIODS = [
    [-3000, -1],
    [0, 999],
    [1000, 1599],
    [1600, 1799],
    [1800, 1899],
    [1900, 1949],
    [1950, 1979],
    [1980, 2030],
  ]

  // 地域カテゴリ（全期間）
  console.log('\n── 地域カテゴリ（全期間）──')
  for (const { name, query } of regionalQueries) {
    // グローバルカテゴリは後で処理
    if (name.startsWith('世界の') || name === 'アフリカの歴史') {
      continue
    }
    process.stdout.write(`  [${name}] `)
    const events = await fetchEvents(query, name, existingIds)
    if (events.length > 0) {
      await upsert(events, existingIds)
      grandTotal += events.length
      console.log(`+${events.length}件 (累計 ${grandTotal}件)`)
    } else {
      console.log('0件（新規なし）')
    }
    await new Promise(r => setTimeout(r, 2000))
  }

  // アフリカの歴史（全期間）
  console.log('\n── アフリカの歴史 ──')
  const africaQuery = makeQueries(-3000, 2030).find(q => q.name === 'アフリカの歴史')!
  process.stdout.write(`  [アフリカの歴史] `)
  const africaEvs = await fetchEvents(africaQuery.query, 'アフリカの歴史', existingIds)
  if (africaEvs.length > 0) {
    await upsert(africaEvs, existingIds)
    grandTotal += africaEvs.length
    console.log(`+${africaEvs.length}件 (累計 ${grandTotal}件)`)
  } else {
    console.log('0件')
  }
  await new Promise(r => setTimeout(r, 2000))

  // グローバルカテゴリ（時代別分割）
  const globalCategories = ['世界の戦争・紛争', '世界の政治', '世界の天災', '世界の社会運動']

  for (const catName of globalCategories) {
    console.log(`\n── ${catName}（時代別）──`)
    for (const [from, to] of GLOBAL_PERIODS) {
      const periodQueries = makeQueries(from, to)
      const q = periodQueries.find(p => p.name === catName)
      if (!q) continue
      process.stdout.write(`  [${from}〜${to}] `)
      const events = await fetchEvents(q.query, catName, existingIds)
      if (events.length > 0) {
        await upsert(events, existingIds)
        grandTotal += events.length
        console.log(`+${events.length}件 (累計 ${grandTotal}件)`)
      } else {
        console.log('0件')
      }
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  console.log(`\n=== 完了: 新規 ${grandTotal} 件追加 / DB合計 ${existingIds.size} 件 ===`)
}

main().catch(err => { console.error(err); process.exit(1) })
