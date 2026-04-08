import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

const lines = content.split('\n')
let count = 0

const result = lines.map(line => {
  if (line.trimStart().startsWith('{ id:') && line.includes("任天堂の歴史")) {
    const before = line
    line = line.replace(/　?（販売本数\d+万本）/g, '')
    line = line.replace(/　?（販売本数\d+万個）/g, '')
    line = line.replace(/　?（販売本数\d+万人）/g, '')
    line = line.replace(/　?\(\d+万本\)/g, '')
    if (line !== before) count++
  }
  return line
})

writeFileSync(eventsPath, result.join('\n'), 'utf-8')
console.log(`任天堂イベントから販売本数を削除した件数: ${count}件`)
