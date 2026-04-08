import { readFileSync, writeFileSync } from 'fs'

const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

// Wikipedia等で確認した正しい日本発売日に修正（日本版の発売日を使用）
const fixes = [
  // F-ZERO: SFCローンチタイトル 1990/11/21 → year 1991→1990
  {
    id: 'n033',
    oldYear: 1991,
    newYear: 1990,
    oldTitle: '11月21日　F-ZERO発売',
    newTitle: '11月21日　F-ZERO発売',
  },
  // ゼルダの伝説 神々のトライフォース: 7月26日 1991 → 11月21日 1991
  {
    id: 'n032',
    oldYear: 1991,
    newYear: 1991,
    oldTitle: '7月26日　ゼルダの伝説 神々のトライフォース発売',
    newTitle: '11月21日　ゼルダの伝説 神々のトライフォース発売',
  },
  // スーパーマリオカート: 8月23日 → 8月27日 1992
  {
    id: 'n035',
    oldYear: 1992,
    newYear: 1992,
    oldTitle: '8月23日　スーパーマリオカート発売',
    newTitle: '8月27日　スーパーマリオカート発売',
  },
  // スーパードンキーコング: 3月11日 1994 → 11月26日 1994
  {
    id: 'n042',
    oldYear: 1994,
    newYear: 1994,
    oldTitle: '3月11日　スーパードンキーコング発売',
    newTitle: '11月26日　スーパードンキーコング発売',
  },
  // ヨッシーアイランド: 1月21日 1995 → 8月5日 1995
  {
    id: 'n044',
    oldYear: 1995,
    newYear: 1995,
    oldTitle: '1月21日　スーパーマリオワールド2 ヨッシーアイランド発売',
    newTitle: '8月5日　スーパーマリオワールド2 ヨッシーアイランド発売',
  },
  // 星のカービィ スーパーデラックス: 3月24日 1995 → 3月21日 1996
  {
    id: 'n045',
    oldYear: 1995,
    newYear: 1996,
    oldTitle: '3月24日　星のカービィ スーパーデラックス発売',
    newTitle: '3月21日　星のカービィ スーパーデラックス発売',
  },
  // スーパードンキーコング3 謎のクレミス島: 1月21日 1996 → 11月23日 1996
  {
    id: 'n046',
    oldYear: 1996,
    newYear: 1996,
    oldTitle: '1月21日　スーパードンキーコング3 謎のクレミス島発売',
    newTitle: '11月23日　スーパードンキーコング3 謎のクレミス島発売',
  },
  // ゴールデンアイ007: 12月14日 1997 → 8月23日 1997
  {
    id: 'n053',
    oldYear: 1997,
    newYear: 1997,
    oldTitle: '12月14日　ゴールデンアイ007発売',
    newTitle: '8月23日　ゴールデンアイ007発売',
  },
  // ポケモンスタジアム: 3月27日 1998 → 8月1日 1998
  {
    id: 'n054',
    oldYear: 1998,
    newYear: 1998,
    oldTitle: '3月27日　ポケモンスタジアム発売',
    newTitle: '8月1日　ポケモンスタジアム発売',
  },
  // ドンキーコング64: 1月21日 1999 → 12月10日 1999
  {
    id: 'n057',
    oldYear: 1999,
    newYear: 1999,
    oldTitle: '1月21日　ドンキーコング64発売',
    newTitle: '12月10日　ドンキーコング64発売',
  },
  // ゼルダの伝説 ムジュラの仮面: 7月21日 2000 → 4月27日 2000
  {
    id: 'n062',
    oldYear: 2000,
    newYear: 2000,
    oldTitle: '7月21日　ゼルダの伝説 ムジュラの仮面発売',
    newTitle: '4月27日　ゼルダの伝説 ムジュラの仮面発売',
  },
  // 大乱闘スマッシュブラザーズDX: 12月1日 2001 → 11月21日 2001
  {
    id: 'n067',
    oldYear: 2001,
    newYear: 2001,
    oldTitle: '12月1日　大乱闘スマッシュブラザーズDX発売',
    newTitle: '11月21日　大乱闘スマッシュブラザーズDX発売',
  },
  // メトロイドフュージョン: 12月13日 2002 → 2月14日 2003 (日本発売は2003年)
  {
    id: 'n072',
    oldYear: 2002,
    newYear: 2003,
    oldTitle: '12月13日　メトロイドフュージョン発売',
    newTitle: '2月14日　メトロイドフュージョン発売',
  },
  // ゼルダの伝説 風のタクト: 2月27日 2003 → 12月13日 2002 (日本発売は2002年)
  {
    id: 'n073',
    oldYear: 2003,
    newYear: 2002,
    oldTitle: '2月27日　ゼルダの伝説 風のタクト発売',
    newTitle: '12月13日　ゼルダの伝説 風のタクト発売',
  },
  // スーパードンキーコング2: 8月13日 1995 → 11月21日 1995
  {
    id: 'n157',
    oldYear: 1995,
    newYear: 1995,
    oldTitle: '8月13日　スーパードンキーコング2 ディクシー&ディディーのコングクエスト発売',
    newTitle: '11月21日　スーパードンキーコング2 ディクシー&ディディーのコングクエスト発売',
  },
]

let fixCount = 0
for (const fix of fixes) {
  const before = content

  // title の修正
  if (fix.oldTitle !== fix.newTitle) {
    const newContent = content.replace(
      `title: '${fix.oldTitle}'`,
      `title: '${fix.newTitle}'`
    )
    if (newContent !== content) {
      content = newContent
    } else {
      console.log(`✗ ${fix.id} title「${fix.oldTitle}」が見つからない`)
    }
  }

  // year の修正（ID付き行を特定して年だけ変える）
  if (fix.oldYear !== fix.newYear) {
    const newContent = content.replace(
      `id: '${fix.id}', year: ${fix.oldYear},`,
      `id: '${fix.id}', year: ${fix.newYear},`
    )
    if (newContent !== content) {
      content = newContent
    } else {
      console.log(`✗ ${fix.id} year ${fix.oldYear}→${fix.newYear} 置換失敗`)
    }
  }

  if (content !== before) {
    fixCount++
    console.log(`✓ ${fix.id} (${fix.oldYear}→${fix.newYear}) "${fix.oldTitle}" → "${fix.newTitle}"`)
  }
}

writeFileSync(eventsPath, content, 'utf-8')
console.log(`\n合計 ${fixCount} 件修正しました`)
