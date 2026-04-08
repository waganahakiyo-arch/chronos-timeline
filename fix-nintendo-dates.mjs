import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

// Wikipedia（任天堂ページ）を参照して確認した正しい発売日に修正
const fixes = [
  // ドンキーコング：FC版(1983)は別途残す。AC版1981に修正
  {
    id: 'n001',
    oldTitle: '7月15日　ドンキーコング発売',
    newTitle: '7月　ドンキーコング発売　AC',
    oldYear: 1983,
    newYear: 1981,
    oldDesc: '任天堂初のファミコンソフトの一つ。宮本茂がデザインしたアーケードゲームの移植版。マリオの初登場作品でもある。',
    newDesc: '宮本茂がデザインした任天堂のアーケードゲーム。マリオ（ジャンプマン）が初登場した作品で、北米・日本で大ヒットし任天堂の名を世界に知らしめた。',
  },
  // マリオブラザーズ：1984/1/14 → 1983/9/9
  {
    id: 'n004',
    oldTitle: '1月14日　マリオブラザーズ発売',
    newTitle: '9月9日　マリオブラザーズ発売',
    oldYear: 1984,
    newYear: 1983,
  },
  // ベースボール：1984/3/14 → 1983/12/7
  {
    id: 'n005',
    oldTitle: '3月14日　ベースボール発売',
    newTitle: '12月7日　ベースボール発売',
    oldYear: 1984,
    newYear: 1983,
  },
  // テニス：4月14日 → 1月14日（年はそのまま1984）
  {
    id: 'n006',
    oldTitle: '4月14日　テニス発売',
    newTitle: '1月14日　テニス発売',
    oldYear: 1984,
    newYear: 1984,
  },
  // ピンボール：6月19日 → 2月2日（年はそのまま1984）
  {
    id: 'n008',
    oldTitle: '6月19日　ピンボール発売',
    newTitle: '2月2日　ピンボール発売',
    oldYear: 1984,
    newYear: 1984,
  },
  // F1レース：9月12日 → 11月2日（年はそのまま1984）
  {
    id: 'n009',
    oldTitle: '9月12日　F1レース発売',
    newTitle: '11月2日　F1レース発売',
    oldYear: 1984,
    newYear: 1984,
  },
  // ダックハント：1985/12/14 → 1984/4/21
  {
    id: 'n016',
    oldTitle: '12月14日　ダックハント発売',
    newTitle: '4月21日　ダックハント発売',
    oldYear: 1985,
    newYear: 1984,
  },
  // メトロイド：12月19日 → 8月6日（年はそのまま1986）
  {
    id: 'n020',
    oldTitle: '12月19日　メトロイド発売',
    newTitle: '8月6日　メトロイド発売',
    oldYear: 1986,
    newYear: 1986,
  },
  // スーパーマリオブラザーズ3：7月15日 → 10月23日（年はそのまま1988）
  {
    id: 'n025',
    oldTitle: '7月15日　スーパーマリオブラザーズ3発売',
    newTitle: '10月23日　スーパーマリオブラザーズ3発売',
    oldYear: 1988,
    newYear: 1988,
  },
]

let fixCount = 0
for (const fix of fixes) {
  const before = content

  // year と title と era を一緒に置換
  const oldEra = fix.oldYear <= 1988 ? '昭和' : '平成'
  const newEra = fix.newYear <= 1988 ? '昭和' : '平成'

  // title の修正
  content = content.replace(
    `title: '${fix.oldTitle}'`,
    `title: '${fix.newTitle}'`
  )

  // year の修正（ID付き行を特定して年だけ変える）
  if (fix.oldYear !== fix.newYear) {
    content = content.replace(
      `id: '${fix.id}', year: ${fix.oldYear},`,
      `id: '${fix.id}', year: ${fix.newYear},`
    )
    // era の修正
    if (oldEra !== newEra) {
      // その行だけ era を変える（前後の文脈で特定）
      content = content.replace(
        `id: '${fix.id}', year: ${fix.newYear},`,
        (line) => line // yearを変えた後
      )
    }
  }

  // description の修正（指定がある場合のみ）
  if (fix.oldDesc && fix.newDesc) {
    content = content.replace(
      `description: '${fix.oldDesc}'`,
      `description: '${fix.newDesc}'`
    )
  }

  if (content !== before) {
    fixCount++
    console.log(`✓ ${fix.id} (${fix.oldYear}→${fix.newYear}) "${fix.oldTitle}" → "${fix.newTitle}"`)
  } else {
    console.log(`✗ ${fix.id} 修正対象が見つからない`)
  }
}

// n001の era を昭和に統一（1981年は昭和56年）
content = content.replace(
  `id: 'n001', year: 1981, title: '7月　ドンキーコング発売　AC',`,
  `id: 'n001', year: 1981, title: '7月　ドンキーコング発売　AC',`
)

writeFileSync(eventsPath, content, 'utf-8')
console.log(`\n合計 ${fixCount} 件修正しました`)
