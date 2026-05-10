/**
 * events.ts の静的イベントデータを Supabase master_events テーブルにインポート
 *
 * 使い方:
 *   npx tsx scripts/import-static-events.ts
 *
 * 環境変数 (.env.local から自動読み込み):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  ← Supabase ダッシュボードの Settings > API から取得
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// .env.local を手動でロード
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const m = line.match(/^([^#=]+)=(.*)$/)
  if (m) {
    const key = m[1].trim()
    const val = m[2].trim().replace(/^"(.*)"$/, '$1')
    process.env[key] = val
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('NEXT_PUBLIC_SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です')
  console.error('SUPABASE_SERVICE_ROLE_KEY は .env.local に追加してください（Supabase > Settings > API > service_role）')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function main() {
  // events.ts を動的インポート（tsxで実行時に解決される）
  const { historicalEvents: EVENTS } = await import('../src/data/events.js')

  console.log(`=== 静的イベントインポート ===`)
  console.log(`対象: ${EVENTS.length} 件`)

  const records = EVENTS.map((ev: any) => ({
    id: ev.id,
    year: ev.year,
    title: ev.title,
    description: ev.description ?? null,
    category: ev.category,
    era: ev.era ?? null,
    keywords: ev.keywords ?? [],
    wiki_url: ev.wikiUrl ?? null,
    wikidata_id: ev.id,   // static data は id を wikidata_id として使用
    source: 'static',
  }))

  const BATCH = 200
  let total = 0

  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH)
    const { error } = await supabase
      .from('master_events')
      .upsert(batch, { onConflict: 'wikidata_id' })

    if (error) {
      console.error(`✗ upsert エラー (batch ${i}):`, error.message)
    } else {
      total += batch.length
      console.log(`  ${total}/${records.length} 件完了`)
    }
  }

  console.log(`\n=== 完了: ${total} 件インポート ===`)
}

main().catch(err => { console.error(err); process.exit(1) })
