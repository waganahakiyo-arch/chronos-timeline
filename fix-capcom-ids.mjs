import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

// カプコンの歴史セクション内の c001〜c150 を cap001〜cap150 に変更
// ※ カプコンセクション外の既存 c*** IDは絶対に変更しない
const lines = content.split('\n')
let inCapcomSection = false
let count = 0

const result = lines.map(line => {
  if (line.includes("// ── カプコンの歴史")) {
    inCapcomSection = true
  }
  if (inCapcomSection && line.trimStart().startsWith('{ id:') && line.includes("カプコンの歴史")) {
    const before = line
    // id: 'c001' → id: 'cap001' のように変換（3桁ゼロ埋め or 数字のまま）
    line = line.replace(/id: 'c(\d+)'/, (_, num) => `id: 'cap${num.padStart(3, '0')}'`)
    if (line !== before) count++
  }
  return line
})

writeFileSync(eventsPath, result.join('\n'), 'utf-8')
console.log(`カプコンイベントのID変更件数: ${count}件`)
console.log('c001〜c150 → cap001〜cap150 に変更完了')
