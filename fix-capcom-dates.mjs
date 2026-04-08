import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

const fixes = [
  // バイオニックコマンドー FC: 7月8日 → 7月20日 1988
  {
    id: 'cap024',
    oldYear: 1988,
    newYear: 1988,
    oldTitle: '7月8日　バイオニックコマンドー　発売　FC',
    newTitle: '7月20日　バイオニックコマンドー　発売　FC',
  },
  // ロックマンX4 PS: 11月21日 1997 → 8月1日 1997
  {
    id: 'cap046',
    oldYear: 1997,
    newYear: 1997,
    oldTitle: '11月21日　ロックマンX4　発売　PS',
    newTitle: '8月1日　ロックマンX4　発売　PS',
  },
  // ロックマンX5 PS: 1月27日 2000 → 11月30日 2000
  {
    id: 'cap052',
    oldYear: 2000,
    newYear: 2000,
    oldTitle: '1月27日　ロックマンX5　発売　PS',
    newTitle: '11月30日　ロックマンX5　発売　PS',
  },
  // カプコンvs.SNK2 EO PS2: 11月1日 2001 → 9月13日 2001
  {
    id: 'cap075',
    oldYear: 2001,
    newYear: 2001,
    oldTitle: '11月1日　カプコンvs.SNK2 EO　発売　PS2',
    newTitle: '9月13日　カプコンvs.SNK2 EO　発売　PS2',
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
    console.log(`✓ ${fix.id} "${fix.oldTitle}" → "${fix.newTitle}"`)
  } else {
    console.log(`✗ ${fix.id} 修正対象が見つからない`)
  }
}

writeFileSync(eventsPath, content, 'utf-8')
console.log(`\n合計 ${fixCount} 件修正しました`)
