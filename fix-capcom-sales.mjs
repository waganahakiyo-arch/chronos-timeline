import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

// カプコンの歴史 セクションの行だけ対象に販売本数を削除
const lines = content.split('\n')
let inCapcomSection = false
let count = 0

const result = lines.map(line => {
  if (line.includes("// ── カプコンの歴史")) inCapcomSection = true
  if (inCapcomSection && line.trimStart().startsWith('{ id:') && line.includes("カプコンの歴史")) {
    const before = line
    // タイトル内の「（販売本数XXX万本）」「（XXX万本）」「（XXX万人）」などを削除
    line = line.replace(/　?（販売本数\d+万本）/g, '')
    line = line.replace(/　?（販売本数\d+万個）/g, '')
    line = line.replace(/　?（販売本数\d+万人）/g, '')
    line = line.replace(/　?\(\d+万本\)/g, '')
    if (line !== before) count++
  }
  return line
})

writeFileSync(eventsPath, result.join('\n'), 'utf-8')
console.log(`販売本数を削除した件数: ${count}件`)
