import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/data/events.ts'
const content = readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

const isEventLine = l => l.trimStart().startsWith('{ id:')
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]

// Find 人物 section boundaries
// 人物 section starts at p01 events, ends before 発明・伝播
const hatsumeiStart = lines.findIndex(l => l.includes('// ── 発明・伝播 (100件)'))
// Find the h-series section (business events for people)
const hSeriesStart = lines.findIndex(l => l.includes('// ── 人物の業績イベント（h系列、p01–p25）'))
const closingBracket = lines.findLastIndex(l => l.trim() === ']')

console.log('発明・伝播 starts at line:', hatsumeiStart + 1)
console.log('h系列 starts at line:', hSeriesStart + 1)
console.log('Closing bracket at line:', closingBracket + 1)

// Collect all 人物 event lines (p-series AND h-series)
// p-series: between 人物 section and 政治追加
const jinbutsuSectionStart = lines.findIndex(l => l.includes('// ── 人物 (100件)'))
const jinbutsuSectionEnd = lines.findIndex(l => l.includes('// ── 政治 追加 (30件)'))

console.log('人物 section:', jinbutsuSectionStart + 1, '-', jinbutsuSectionEnd + 1)

// Extract all 人物 events from the entire file
const allJinbutsuEvents = lines.filter(l => isEventLine(l) && getCategory(l) === '人物')
console.log('Total 人物 events:', allJinbutsuEvents.length)

// Sort by year
const sorted = [...allJinbutsuEvents].sort((a, b) => getYear(a) - getYear(b))

// Verify sorted
let ok = true
for (let i = 1; i < sorted.length; i++) {
  if (getYear(sorted[i]) < getYear(sorted[i-1])) { ok = false; break }
}
console.log('Sorted:', ok)

// Now rebuild the file:
// 1. Keep everything before 人物 section
// 2. Put sorted 人物 events in one block (p-series position)
// 3. Remove the original p-series and h-series events
// 4. Keep all non-人物 events in their original positions

// Strategy: replace all 人物 event lines with a placeholder list,
// then put sorted events at the 人物 section position.

// Build output: go through all lines, skip 人物 event lines and h-series comment lines,
// insert sorted events at the 人物 section header
let output = []
let insertedJinbutsu = false

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  // Skip h-series section comment lines
  if (line.includes('// ── 人物の業績イベント（h系列')) continue
  if (line.includes('// p') && i > hatsumeiStart) {
    // These are person-specific comments in h-series section - skip
    // But only after 発明・伝播 section (where h-series lives)
    continue
  }

  // Skip all 人物 event lines (we'll insert them in sorted order)
  if (isEventLine(line) && getCategory(line) === '人物') continue

  // At the 人物 section header, insert sorted events
  if (line.includes('// ── 人物 (100件)') && !insertedJinbutsu) {
    output.push(`  // ── 人物 (${sorted.length}件・年代順) ─────────────────────────`)
    for (const ev of sorted) {
      output.push(ev)
    }
    insertedJinbutsu = true
    continue
  }

  output.push(line)
}

console.log('Output lines:', output.length)
writeFileSync(filePath, output.join('\n'), 'utf-8')

// Verify no duplicates
const finalLines = output.filter(l => isEventLine(l) && getCategory(l) === '人物')
console.log('人物 events in output:', finalLines.length)
