'use client'

import { useState } from 'react'

type SampleEvent = {
  year: number
  title: string
  note?: string
  color?: string
}

type SampleTimeline = {
  id: string
  title: string
  subtitle: string
  events: SampleEvent[]
  accent: string
}

const SAMPLES: SampleTimeline[] = [
  {
    id: 'edo',
    title: '江戸城無血開城までの流れ',
    subtitle: '黒船来航から明治維新へ 1853–1868',
    accent: 'text-vermilion',
    events: [
      { year: 1853, title: 'ペリー来航（黒船来航）', note: '浦賀に米艦隊が現れ、日本に開国を要求' },
      { year: 1854, title: '日米和親条約締結', note: '下田・函館を開港し、鎖国が終わる' },
      { year: 1858, title: '日米修好通商条約', note: '不平等条約。攘夷運動が激化のきっかけに' },
      { year: 1858, title: '安政の大獄', note: '井伊直弼が反幕府勢力を大弾圧' },
      { year: 1860, title: '桜田門外の変', note: '井伊直弼が水戸浪士に暗殺される' },
      { year: 1862, title: '生麦事件', note: 'イギリス人が薩摩藩士に殺傷される' },
      { year: 1863, title: '薩英戦争', note: '薩摩藩とイギリスが衝突、薩摩が開国へ転換' },
      { year: 1864, title: '禁門の変（蛤御門の変）', note: '長州藩が京都御所に迫るも敗退' },
      { year: 1866, title: '薩長同盟成立', note: '坂本龍馬の仲介で薩摩・長州が連携' },
      { year: 1867, title: '大政奉還', note: '徳川慶喜が政権を朝廷に返上' },
      { year: 1867, title: '王政復古の大号令', note: '天皇中心の新政府樹立を宣言' },
      { year: 1868, title: '鳥羽・伏見の戦い', note: '戊辰戦争が始まる。旧幕府軍が敗退' },
      { year: 1868, title: '江戸城無血開城', note: '勝海舟と西郷隆盛の会談で流血を回避。江戸が東京に' },
    ],
  },
  {
    id: 'art',
    title: '世界の美術史',
    subtitle: '洞窟壁画から現代アートまで',
    accent: 'text-sky-400',
    events: [
      { year: -17000, title: 'ラスコー洞窟壁画', note: 'フランス。動物を描いた旧石器時代の傑作' },
      { year: -2500, title: '古代エジプト美術', note: 'ギザのピラミッド・スフィンクス建造' },
      { year: -430, title: 'ギリシャ彫刻の全盛期', note: 'フィディアスがパルテノン神殿の装飾を制作' },
      { year: 1420, title: 'ルネサンス', note: 'フィレンツェでブルネレスキ・マサッチオが活躍' },
      { year: 1503, title: 'モナ・リザ制作開始', note: 'レオナルド・ダ・ヴィンチが描く。史上最有名の絵' },
      { year: 1508, title: 'システィナ礼拝堂天井画', note: 'ミケランジェロが4年かけて完成させた大作' },
      { year: 1642, title: '夜警', note: 'レンブラントの集団肖像画。光と影の革命' },
      { year: 1665, title: '真珠の耳飾りの少女', note: 'フェルメール。オランダ黄金時代の代表作' },
      { year: 1814, title: 'ゴヤ「1808年5月3日」', note: '戦争の残酷さを描いた近代絵画の先駆け' },
      { year: 1863, title: 'マネ「草上の昼食」', note: '伝統に反発し印象派の先駆けとなった問題作' },
      { year: 1874, title: '第1回印象派展覧会', note: 'モネ・ルノワールらが出品。批評家に嘲笑される' },
      { year: 1888, title: 'ゴッホ「ひまわり」', note: 'ゴッホがアルルで制作。鮮烈な黄の連作' },
      { year: 1907, title: 'ピカソ「アヴィニョンの娘たち」', note: 'キュビスムの誕生。美術史の転換点' },
      { year: 1913, title: '黒の正方形', note: 'マレーヴィチ。抽象芸術の極限を示す' },
      { year: 1931, title: 'ダリ「記憶の固執」', note: 'シュルレアリスムの代表作。柔らかい時計' },
      { year: 1962, title: 'ウォーホル「キャンベルのスープ缶」', note: 'ポップアートの象徴。消費文化を芸術に' },
    ],
  },
  {
    id: 'science',
    title: '科学技術の革命',
    subtitle: '人類の知を変えた発明と発見',
    accent: 'text-green-400',
    events: [
      { year: -250, title: 'アルキメデスの原理発見', note: '浮力の法則。「エウレカ！」の逸話' },
      { year: 1543, title: 'コペルニクス「天球の回転について」', note: '地動説を提唱。宇宙観を覆す' },
      { year: 1687, title: 'ニュートン「プリンキピア」', note: '万有引力・運動の法則。近代科学の礎' },
      { year: 1796, title: 'ジェンナーが天然痘ワクチン開発', note: '世界初のワクチン。感染症対策の始まり' },
      { year: 1859, title: 'ダーウィン「種の起源」', note: '進化論を発表。生命観・人間観を変える' },
      { year: 1879, title: 'エジソンが電球を実用化', note: '長寿命の炭素フィラメント電球を発明' },
      { year: 1895, title: 'レントゲンがX線を発見', note: '人体の内部が透けて見える革命的発見' },
      { year: 1903, title: 'ライト兄弟が初飛行', note: '動力飛行機が12秒間飛行。航空時代の幕開け' },
      { year: 1905, title: 'アインシュタイン特殊相対性理論', note: 'E=mc²。時間・空間の概念を根底から覆す' },
      { year: 1928, title: 'フレミングがペニシリンを発見', note: '最初の抗生物質。細菌感染症の治療が変わる' },
      { year: 1953, title: 'DNAの二重らせん構造を解明', note: 'ワトソン・クリック。生命の設計図の解読' },
      { year: 1969, title: 'アポロ11号が月面着陸', note: 'ニール・アームストロングが月面に立つ' },
      { year: 1989, title: 'WWW（ワールドワイドウェブ）発明', note: 'バーナーズ＝リーが考案。インターネット時代へ' },
      { year: 2003, title: 'ヒトゲノム計画完了', note: '人間の全遺伝子配列が解読される' },
      { year: 2012, title: 'ヒッグス粒子の発見', note: 'LHCが確認。「神の粒子」の存在が証明' },
      { year: 2022, title: 'ChatGPT公開', note: '生成AIが一般に普及し始め、社会を変え始める' },
    ],
  },
]

function TimelineItem({ event, accent, isLast }: { event: SampleEvent; accent: string; isLast: boolean }) {
  return (
    <div className="flex gap-3 group">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
          accent === 'text-vermilion' ? 'bg-vermilion'
          : accent === 'text-sky-400' ? 'bg-sky-400'
          : 'bg-green-400'
        }`} />
        {!isLast && <div className="w-px flex-1 bg-sepia-700/30 mt-1" />}
      </div>
      <div className="pb-3 min-w-0">
        <span className="text-green-400 text-[10px] tabular-nums font-bold tracking-wider">
          {event.year < 0 ? `紀元前${Math.abs(event.year)}年` : `${event.year}年`}
        </span>
        <p className="text-paper-200 text-xs font-medium leading-snug mt-0.5">{event.title}</p>
        {event.note && (
          <p className="text-sepia-500 text-[10px] mt-0.5 leading-relaxed">{event.note}</p>
        )}
      </div>
    </div>
  )
}

export default function SampleTimelines() {
  const [activeId, setActiveId] = useState<string>(SAMPLES[0].id)
  const active = SAMPLES.find(s => s.id === activeId) ?? SAMPLES[0]

  return (
    <div className="w-full">
      <p className="text-sepia-500 text-xs tracking-wider text-center mb-4">― サンプル年表 ―</p>

      {/* タブ */}
      <div className="flex gap-1 mb-4 flex-wrap justify-center">
        {SAMPLES.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`px-3 py-1 text-[10px] tracking-wider border rounded-sm transition-colors ${
              activeId === s.id
                ? 'border-sepia-600/60 text-paper-200 bg-ink-800/60'
                : 'border-sepia-700/30 text-sepia-500 hover:border-sepia-600/40 hover:text-sepia-300'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* 年表本体 */}
      <div className="bg-ink-800/40 border border-sepia-700/30 rounded-sm p-4">
        <div className="mb-3">
          <p className={`text-xs font-bold tracking-wider ${active.accent}`}>{active.title}</p>
          <p className="text-sepia-500 text-[10px] mt-0.5">{active.subtitle}</p>
        </div>
        <div className="max-h-80 overflow-y-auto pr-1 space-y-0 scrollbar-thin scrollbar-thumb-sepia-700/40 scrollbar-track-transparent">
          {active.events.map((ev, i) => (
            <TimelineItem
              key={`${ev.year}-${ev.title}`}
              event={ev}
              accent={active.accent}
              isLast={i === active.events.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
