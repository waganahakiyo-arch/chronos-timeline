/**
 * Wikidata 歴史イベント収集スクリプト
 *
 * 使い方:
 *   npx tsx scripts/collect-events/index.ts
 *
 * 環境変数:
 *   SUPABASE_URL              Supabase プロジェクト URL
 *   SUPABASE_SERVICE_ROLE_KEY Supabase サービスロールキー
 *   CATEGORY                  (任意) 特定カテゴリのみ実行例: "日本の歴史"
 */

import { createClient } from '@supabase/supabase-js'
import {
  WIKIDATA_ENDPOINT,
  JAPAN_QUERY,
  EUROPE_QUERY,
  MIDDLE_EAST_QUERY,
  CHINA_QUERY,
} from './queries.js'
import { toMasterEvent, type WikidataRow, type MasterEvent } from './classify.js'

// ── 設定 ────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL ?? ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const TARGET_CATEGORY = process.env.CATEGORY ?? null  // null = 全カテゴリ

const UPSERT_BATCH = 500   // 一度に upsert する件数
const FETCH_DELAY_MS = 2000 // Wikidata レート制限対策（クエリ間の待機）

// ── カテゴリ定義 ─────────────────────────────────────────────────────
const CATEGORIES: { name: string; query: string }[] = [
  { name: '日本の歴史',       query: JAPAN_QUERY },
  { name: 'ヨーロッパの歴史', query: EUROPE_QUERY },
  { name: '中東の歴史',       query: MIDDLE_EAST_QUERY },
  { name: '中国の歴史',       query: CHINA_QUERY },
]

// ── Supabase クライアント ────────────────────────────────────────────
function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定です')
  }
  return createClient(SUPABASE_URL, SUPABASE_KEY)
}

// ── Wikidata SPARQL 取得（リトライ付き）────────────────────────────
async function fetchWikidata(sparql: string, category: string): Promise<MasterEvent[]> {
  const url = `${WIKIDATA_ENDPOINT}?query=${encodeURIComponent(sparql)}&format=json`
  const MAX_RETRY = 3

  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    console.log(`  → Wikidata へクエリ送信 [${category}]${attempt > 1 ? ` (試行 ${attempt}/${MAX_RETRY})` : ''}`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120_000) // 120秒タイムアウト

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/sparql-results+json',
          'User-Agent': 'chronos-timeline-collector/1.0 (https://github.com/waganahakiyo-arch/chronos-timeline)',
        },
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        const msg = `Wikidata クエリ失敗: ${res.status} ${res.statusText}`
        if (attempt < MAX_RETRY && (res.status === 502 || res.status === 503 || res.status === 504)) {
          console.warn(`  ⚠ ${msg} → ${30 * attempt}秒後にリトライ`)
          await new Promise(r => setTimeout(r, 30_000 * attempt))
          continue
        }
        throw new Error(msg)
      }

      const json = await res.json() as { results: { bindings: WikidataRow[] } }
      const rows = json.results.bindings
      console.log(`  → ${rows.length} 件取得`)

      const events: MasterEvent[] = []
      for (const row of rows) {
        const ev = toMasterEvent(row, category)
        if (ev) events.push(ev)
      }
      console.log(`  → ${events.length} 件変換成功（日本語ラベルあり）`)
      return events

    } catch (err: any) {
      clearTimeout(timeoutId)
      if (attempt < MAX_RETRY && (err.name === 'AbortError' || err.message?.includes('abort'))) {
        console.warn(`  ⚠ タイムアウト → ${30 * attempt}秒後にリトライ`)
        await new Promise(r => setTimeout(r, 30_000 * attempt))
        continue
      }
      throw err
    }
  }
  throw new Error(`${MAX_RETRY}回リトライしましたが失敗しました`)
}

// ── Supabase upsert ──────────────────────────────────────────────────
async function upsertEvents(supabase: ReturnType<typeof createClient>, events: MasterEvent[]) {
  let total = 0
  for (let i = 0; i < events.length; i += UPSERT_BATCH) {
    const batch = events.slice(i, i + UPSERT_BATCH)
    const { error } = await supabase
      .from('master_events')
      .upsert(batch as any[], { onConflict: 'wikidata_id' })

    if (error) {
      console.error(`  ✗ upsert エラー (batch ${i}–${i + batch.length}):`, error.message)
    } else {
      total += batch.length
      process.stdout.write(`\r  → ${total}/${events.length} 件 upsert 完了`)
    }
  }
  console.log()
}

// ── メイン ───────────────────────────────────────────────────────────
async function main() {
  console.log('=== Wikidata 歴史イベント収集スクリプト ===')

  const supabase = getSupabase()

  const targets = TARGET_CATEGORY
    ? CATEGORIES.filter(c => c.name === TARGET_CATEGORY)
    : CATEGORIES

  if (targets.length === 0) {
    console.error(`カテゴリ "${TARGET_CATEGORY}" が見つかりません`)
    process.exit(1)
  }

  let grandTotal = 0

  for (const { name, query } of targets) {
    console.log(`\n[${name}] 開始`)
    try {
      const events = await fetchWikidata(query, name)
      if (events.length > 0) {
        await upsertEvents(supabase, events)
        grandTotal += events.length
        console.log(`  ✓ [${name}] 完了: ${events.length} 件`)
      } else {
        console.log(`  ⚠ [${name}] 取得件数 0 件`)
      }
    } catch (err) {
      console.error(`  ✗ [${name}] エラー:`, err)
    }

    // 次のカテゴリまで待機（Wikidata レート制限対策）
    if (targets.indexOf({ name, query }) < targets.length - 1) {
      await new Promise(r => setTimeout(r, FETCH_DELAY_MS))
    }
  }

  console.log(`\n=== 完了: 合計 ${grandTotal} 件 upsert ===`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
