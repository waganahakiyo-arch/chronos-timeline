import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

const fixes = [
  // エキサイトバイク: 3月25日 1985 → 11月30日 1984
  {
    id: 'n013',
    oldYear: 1985,
    newYear: 1984,
    oldTitle: '3月25日　エキサイトバイク発売',
    newTitle: '11月30日　エキサイトバイク発売',
  },
  // アイスクライマー: 2月21日 1985 → 1月30日 1985
  {
    id: 'n012',
    oldYear: 1985,
    newYear: 1985,
    oldTitle: '2月21日　アイスクライマー発売',
    newTitle: '1月30日　アイスクライマー発売',
  },
  // マッハライダー: 10月18日 1985 → 11月21日 1985
  {
    id: 'n015',
    oldYear: 1985,
    newYear: 1985,
    oldTitle: '10月18日　マッハライダー発売',
    newTitle: '11月21日　マッハライダー発売',
  },
  // ファミコンウォーズ: 7月10日 1987 → 8月12日 1988
  {
    id: 'n022',
    oldYear: 1987,
    newYear: 1988,
    oldTitle: '7月10日　ファミコンウォーズ発売',
    newTitle: '8月12日　ファミコンウォーズ発売',
  },
  // ファイアーエムブレム外伝: 3月14日 1991 → 3月14日 1992
  {
    id: 'n031',
    oldYear: 1991,
    newYear: 1992,
    oldTitle: '3月14日　ファイアーエムブレム外伝発売',
    newTitle: '3月14日　ファイアーエムブレム外伝発売',
  },
  // ドクターマリオ: 2月9日 1990 → 7月27日 1990
  {
    id: 'n028',
    oldYear: 1990,
    newYear: 1990,
    oldTitle: '2月9日　ドクターマリオ発売',
    newTitle: '7月27日　ドクターマリオ発売',
  },
]

let fixCount = 0
for (const fix of fixes) {
  const before = content

  if (fix.oldTitle !== fix.newTitle) {
    content = content.replace(
      `title: '${fix.oldTitle}'`,
      `title: '${fix.newTitle}'`
    )
  }

  if (fix.oldYear !== fix.newYear) {
    content = content.replace(
      `id: '${fix.id}', year: ${fix.oldYear},`,
      `id: '${fix.id}', year: ${fix.newYear},`
    )
  }

  if (content !== before) {
    fixCount++
    console.log(`✓ ${fix.id} (${fix.oldYear}→${fix.newYear}) "${fix.oldTitle}" → "${fix.newTitle}"`)
  } else {
    console.log(`✗ ${fix.id} 修正対象が見つからない`)
  }
}

writeFileSync(eventsPath, content, 'utf-8')
console.log(`\n合計 ${fixCount} 件修正しました`)
