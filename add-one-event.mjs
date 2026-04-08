import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/data/events.ts'
const content = readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

const newEvent = `  { id: 'q186', year: -3000, title: 'パピルスの使用開始', description: '古代エジプトでナイル川沿いに自生するパピルス草の茎を薄く切って貼り合わせた紙状の書写材料が使われ始めた。粘土板より軽く持ち運べるため、行政・宗教・文学の記録媒体として地中海世界全域に普及。現存最古のパピルス文書はファラオ・クフの時代（紀元前2560年頃）のものとされる。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['パピルス', 'エジプト', '書写材料', '紙の前身', 'ナイル川'], era: '古代文明' },`

const isEventLine = l => l.trimStart().startsWith('{ id:')
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]

const existingEvents = lines.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播')
const allEvents = [...existingEvents, newEvent]
const sorted = allEvents.sort((a, b) => getYear(a) - getYear(b))

const sectionIdx = lines.findIndex(l => l.includes('// ── 発明・伝播'))
const sectionEnd = lines.findIndex((l, i) => i > sectionIdx && l.match(/^\s*\/\/ ── /))

const output = [
  ...lines.slice(0, sectionIdx),
  `  // ── 発明・伝播 (${sorted.length}件・年代順) ─────────────────────────`,
  ...sorted,
  ...lines.slice(sectionEnd)
]

writeFileSync(filePath, output.join('\n'), 'utf-8')
console.log(`Done. 発明・伝播: ${sorted.length}件`)
