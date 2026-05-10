/**
 * Wikidata 歴史イベント全期間収集スクリプト
 *
 * 使い方:
 *   npx tsx scripts/collect-all.ts
 *
 * 仕様:
 *   - -3000〜2030年を CHUNK_SIZE 年ずつのチャンクに分割
 *   - 各チャンクで全カテゴリをクエリ
 *   - wikidata_id の重複はDB側の upsert で自動スキップ
 *   - クエリ前にDBの既存 wikidata_id を取得してスキップ判定
 *   - 実行途中で止めても再実行すれば続きから再取得できる
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { WIKIDATA_ENDPOINT, makeQueries } from './collect-events/queries.js'
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

// ── 設定 ────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定です')
  process.exit(1)
}

const CHUNK_SIZE   = 200   // 年ごとのチャンク幅
const YEAR_START   = -3000
const YEAR_END     = 2030
const FETCH_DELAY  = 3000  // クエリ間待機 (ms)
const UPSERT_BATCH = 500

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── 既存データをDBから取得 ───────────────────────────────────────────
interface ExistingData {
  ids: Set<string>       // wikidata_id の集合
  yearTitles: Set<string> // "year:title" の集合
}

async function loadExistingData(): Promise<ExistingData> {
  console.log('既存データを取得中...')
  const ids = new Set<string>()
  const yearTitles = new Set<string>()
  let page = 0
  const PAGE = 1000
  while (true) {
    const { data, error } = await (supabase as any)
      .from('master_events')
      .select('wikidata_id, year, title')
      .range(page * PAGE, (page + 1) * PAGE - 1)
    if (error) { console.error('既存データ取得エラー:', error.message); break }
    if (!data || data.length === 0) break
    for (const row of data) {
      ids.add(row.wikidata_id)
      yearTitles.add(`${row.year}:${row.title}`)
    }
    if (data.length < PAGE) break
    page++
  }
  console.log(`  既存 ${ids.size} 件`)
  return { ids, yearTitles }
}

// ── Wikidata SPARQL 取得（リトライ付き） ──────────────────────────────
async function fetchChunk(
  sparql: string,
  categoryName: string,
  yearFrom: number,
  yearTo: number,
  existing: ExistingData
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
          'User-Agent': 'chronos-timeline-collector/1.0',
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
        const yearTitle = `${ev.year}:${ev.title}`
        // wikidata_id 重複 / 年+タイトル重複 / バッチ内重複 をスキップ
        if (
          existing.ids.has(ev.wikidata_id) ||
          existing.yearTitles.has(yearTitle) ||
          seen.has(ev.wikidata_id)
        ) continue
        seen.add(ev.wikidata_id)
        events.push(ev)
      }
      return events

    } catch (err: any) {
      clearTimeout(timeoutId)
      if (attempt < MAX_RETRY) {
        console.warn(`    ⚠ エラー → ${20 * attempt}秒後リトライ`)
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
async function upsert(events: MasterEvent[], existing: ExistingData) {
  for (let i = 0; i < events.length; i += UPSERT_BATCH) {
    const batch = events.slice(i, i + UPSERT_BATCH)
    const { error } = await (supabase as any)
      .from('master_events')
      .upsert(batch, { onConflict: 'wikidata_id' })
    if (error) {
      console.error('    upsert エラー:', error.message)
    } else {
      for (const ev of batch) {
        existing.ids.add(ev.wikidata_id)
        existing.yearTitles.add(`${ev.year}:${ev.title}`)
      }
    }
  }
}

// ── メイン ───────────────────────────────────────────────────────────
async function main() {
  console.log('=== Wikidata 全期間収集スクリプト ===')
  console.log(`年範囲: ${YEAR_START}〜${YEAR_END}年 / チャンク幅: ${CHUNK_SIZE}年`)

  const existing = await loadExistingData()
  let grandTotal = 0

  for (let year = YEAR_START; year < YEAR_END; year += CHUNK_SIZE) {
    const from = year
    const to = Math.min(year + CHUNK_SIZE - 1, YEAR_END)
    console.log(`\n━━ ${from}〜${to}年 ━━`)

    const queries = makeQueries(from, to)
    for (const { name, query } of queries) {
      process.stdout.write(`  [${name}] `)
      const events = await fetchChunk(query, name, from, to, existing)
      if (events.length > 0) {
        await upsert(events, existing)
        grandTotal += events.length
        console.log(`+${events.length}件 (累計 ${grandTotal}件)`)
      } else {
        console.log('0件')
      }
      await new Promise(r => setTimeout(r, FETCH_DELAY))
    }
  }

  console.log(`\n=== 完了: 新規 ${grandTotal} 件追加 / DB合計 ${existing.ids.size} 件 ===`)
}

main().catch(err => { console.error(err); process.exit(1) })
