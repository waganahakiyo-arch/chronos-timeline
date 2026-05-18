'use client'

import { useState } from 'react'

type SampleEvent = {
  year: number
  title: string
  note?: string
}

const JAPAN_ART: SampleEvent[] = [
  { year: 710,  title: '天平文化の仏像彫刻', note: '東大寺・興福寺の仏像。大陸の影響を受けた豊かな表現' },
  { year: 894,  title: '遣唐使廃止と国風文化', note: '大陸模倣から離れ、日本独自の美意識が芽生える' },
  { year: 1000, title: '源氏物語絵巻', note: '平安時代。やまと絵の代表作。のちの日本絵画の原点' },
  { year: 1185, title: '武士文化の台頭と仏画', note: '鎌倉時代。力強くリアルな表現が生まれる' },
  { year: 1339, title: '夢窓疎石が庭園を作庭', note: '禅の影響を受けた枯山水庭園の誕生' },
  { year: 1397, title: '金閣寺建立', note: '足利義満。金箔に覆われた北山文化の象徴' },
  { year: 1482, title: '銀閣寺・東山文化', note: '侘び・寂びの美意識。書院造と枯山水が完成' },
  { year: 1543, title: '南蛮文化の流入', note: 'キリシタン絵画・銅版画など西洋技法が伝来' },
  { year: 1601, title: '俵屋宗達が活躍', note: '装飾的・大胆な構図。琳派の源流' },
  { year: 1615, title: '狩野派が幕府の御用絵師に', note: '金碧障壁画が権力の象徴として普及' },
  { year: 1716, title: '尾形光琳「紅白梅図屏風」', note: '琳派の傑作。大胆な構図と装飾性' },
  { year: 1760, title: '鈴木春信が多色刷り錦絵を完成', note: '浮世絵の黄金時代の始まり' },
  { year: 1793, title: '喜多川歌麿「婦女人相十品」', note: '美人画の最高峰。女性の内面も描く' },
  { year: 1831, title: '葛飾北斎「富嶽三十六景」', note: '富士山を36の視点で。ドビュッシーにも影響' },
  { year: 1833, title: '歌川広重「東海道五十三次」', note: '旅と風景の叙情。ゴッホが模写した名作' },
  { year: 1868, title: '明治維新と洋画の導入', note: '工部美術学校設立。西洋絵画が公式に学ばれる' },
  { year: 1889, title: '黒田清輝が印象派を持ち帰る', note: '外光派の技法で日本洋画が変わる' },
  { year: 1907, title: '文部省美術展覧会（文展）開設', note: '官展制度の確立。日本画・洋画・彫刻の三部門' },
  { year: 1955, title: '岡本太郎「太陽の塔」着想', note: '前衛と縄文の融合。既存の美の枠を壊す' },
  { year: 2000, title: '村上隆「スーパーフラット」', note: '日本のポップカルチャーを現代美術に昇華' },
]

const WORLD_ART: SampleEvent[] = [
  { year: -17000, title: 'ラスコー洞窟壁画', note: 'フランス。動物を描いた旧石器時代の傑作' },
  { year: -2500,  title: '古代エジプト美術', note: 'ギザのピラミッド・スフィンクス。正面性の法則' },
  { year: -430,   title: 'ギリシャ彫刻の全盛期', note: 'フィディアス。パルテノン神殿の装飾。理想美の追求' },
  { year: -50,    title: 'ローマ美術', note: 'コロッセオ・フォロ・ロマーノ。ギリシャを継承し実用化' },
  { year: 532,    title: 'ハギア・ソフィア大聖堂', note: 'ビザンティン美術の頂点。黄金モザイクが輝く' },
  { year: 1163,   title: 'ノートルダム大聖堂着工', note: 'ゴシック建築。ステンドグラスが光を演出' },
  { year: 1420,   title: 'ルネサンス（フィレンツェ）', note: 'ブルネレスキ・マサッチオが遠近法を確立' },
  { year: 1503,   title: 'モナ・リザ制作開始', note: 'ダ・ヴィンチ。スフマート技法。史上最有名の絵画' },
  { year: 1508,   title: 'システィナ礼拝堂天井画', note: 'ミケランジェロが4年かけて完成。神と人の対話' },
  { year: 1600,   title: 'バロック美術の誕生', note: 'カラヴァッジオの劇的な光と影。激情の表現' },
  { year: 1642,   title: 'レンブラント「夜警」', note: 'オランダ黄金時代。光と影の革命的な集団肖像画' },
  { year: 1665,   title: 'フェルメール「真珠の耳飾りの少女」', note: '静謐な光の中の少女。オランダ黄金時代の象徴' },
  { year: 1814,   title: 'ゴヤ「1808年5月3日」', note: '戦争の残酷さを描く。近代絵画の先駆け' },
  { year: 1863,   title: 'マネ「草上の昼食」', note: '伝統への反発。印象派誕生の導火線' },
  { year: 1874,   title: '第1回印象派展覧会', note: 'モネ・ルノワールら。批評家に嘲笑されながら歴史を変える' },
  { year: 1888,   title: 'ゴッホ「ひまわり」', note: 'アルルで制作。鮮烈な黄の連作。死後に伝説となる' },
  { year: 1907,   title: 'ピカソ「アヴィニョンの娘たち」', note: 'キュビスムの誕生。美術史の最大の転換点のひとつ' },
  { year: 1913,   title: 'マレーヴィチ「黒の正方形」', note: '抽象芸術の極限。何も描かないことの意味' },
  { year: 1931,   title: 'ダリ「記憶の固執」', note: 'シュルレアリスムの代表作。溶ける時計の衝撃' },
  { year: 1962,   title: 'ウォーホル「キャンベルのスープ缶」', note: 'ポップアートの象徴。商品が芸術になった瞬間' },
]

function formatYear(year: number) {
  return year < 0 ? `紀元前${Math.abs(year)}年` : `${year}年`
}

// 比較用：年代ごとに両タイムラインを同期表示
function buildCompareRows() {
  // 年でソートし、両方をマージ
  type Row = { year: number; japan?: SampleEvent; world?: SampleEvent }
  const map = new Map<number, Row>()
  for (const ev of JAPAN_ART) {
    map.set(ev.year, { year: ev.year, japan: ev })
  }
  for (const ev of WORLD_ART) {
    const existing = map.get(ev.year)
    if (existing) existing.world = ev
    else map.set(ev.year, { year: ev.year, world: ev })
  }
  return Array.from(map.values()).sort((a, b) => a.year - b.year)
}

const COMPARE_ROWS = buildCompareRows()

type Tab = 'japan' | 'world' | 'compare'

function SingleTimeline({ events, accent }: { events: SampleEvent[]; accent: string }) {
  return (
    <div className="space-y-0 max-h-80 overflow-y-auto pr-1">
      {events.map((ev, i) => (
        <div key={`${ev.year}-${i}`} className="flex gap-3">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${accent}`} />
            {i < events.length - 1 && <div className="w-px flex-1 bg-sepia-700/30 mt-1" />}
          </div>
          <div className="pb-3 min-w-0">
            <span className="text-green-400 text-[10px] tabular-nums font-bold tracking-wider">{formatYear(ev.year)}</span>
            <p className="text-paper-200 text-xs font-medium leading-snug mt-0.5">{ev.title}</p>
            {ev.note && <p className="text-sepia-500 text-[10px] mt-0.5 leading-relaxed">{ev.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function CompareTimeline() {
  return (
    <div className="max-h-80 overflow-y-auto">
      {/* ヘッダー */}
      <div className="flex border-b border-sepia-700/30 pb-1 mb-2 sticky top-0 bg-ink-800/90 backdrop-blur-sm">
        <div className="flex-1 text-[10px] text-vermilion font-bold tracking-wider px-1">🇯🇵 日本の美術</div>
        <div className="w-px bg-sepia-700/30 flex-shrink-0" />
        <div className="flex-1 text-[10px] text-sky-400 font-bold tracking-wider px-2">🌍 世界の美術</div>
      </div>
      {COMPARE_ROWS.map((row, i) => (
        <div key={row.year} className={`flex border-b border-sepia-700/10 items-stretch min-h-[2rem] ${i % 2 === 0 ? '' : 'bg-ink-900/20'}`}>
          {/* 日本側 */}
          <div className="flex-1 min-w-0 px-1 py-1.5">
            {row.japan ? (
              <>
                <span className="text-green-400 text-[9px] tabular-nums font-bold">{formatYear(row.year)}</span>
                <p className="text-paper-200 text-[10px] font-medium leading-snug">{row.japan.title}</p>
              </>
            ) : (
              <span className="text-sepia-700 text-[9px]">{formatYear(row.year)}</span>
            )}
          </div>
          <div className="w-px bg-sepia-700/20 flex-shrink-0" />
          {/* 世界側 */}
          <div className="flex-1 min-w-0 px-2 py-1.5">
            {row.world ? (
              <>
                {!row.japan && <span className="text-green-400 text-[9px] tabular-nums font-bold">{formatYear(row.year)}</span>}
                <p className="text-sepia-300 text-[10px] leading-snug">{row.world.title}</p>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SampleTimelines() {
  const [tab, setTab] = useState<Tab>('compare')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'japan', label: '日本の美術史' },
    { id: 'world', label: '世界の美術史' },
    { id: 'compare', label: '比較表示' },
  ]

  return (
    <div className="w-full">
      <p className="text-sepia-500 text-xs tracking-wider text-center mb-4">― サンプル年表 ―</p>

      {/* タブ */}
      <div className="flex gap-1 mb-4 justify-center">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1 text-[10px] tracking-wider border rounded-sm transition-colors ${
              tab === t.id
                ? 'border-sepia-600/60 text-paper-200 bg-ink-800/60'
                : 'border-sepia-700/30 text-sepia-500 hover:border-sepia-600/40 hover:text-sepia-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 年表本体 */}
      <div className="bg-ink-800/40 border border-sepia-700/30 rounded-sm p-4">
        {tab === 'japan' && (
          <>
            <p className="text-xs font-bold tracking-wider text-vermilion mb-0.5">日本の美術史</p>
            <p className="text-sepia-500 text-[10px] mb-3">飛鳥時代から現代まで</p>
            <SingleTimeline events={JAPAN_ART} accent="bg-vermilion" />
          </>
        )}
        {tab === 'world' && (
          <>
            <p className="text-xs font-bold tracking-wider text-sky-400 mb-0.5">世界の美術史</p>
            <p className="text-sepia-500 text-[10px] mb-3">洞窟壁画からポップアートまで</p>
            <SingleTimeline events={WORLD_ART} accent="bg-sky-400" />
          </>
        )}
        {tab === 'compare' && (
          <>
            <p className="text-xs font-bold tracking-wider text-paper-200 mb-0.5">日本 × 世界 美術史 比較</p>
            <p className="text-sepia-500 text-[10px] mb-3">同じ時代に何が起きていたか</p>
            <CompareTimeline />
          </>
        )}
      </div>
    </div>
  )
}
