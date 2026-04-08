import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/data/events.ts'
const content = readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

const isEventLine = l => l.trimStart().startsWith('{ id:')
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }

const newEvents = [
  // ── 農業・牧畜・食料生産 ──
  `  { id: 'q101', year: -9000, title: 'ヤギ・羊が中東で家畜化される（新石器時代）',        description: '現在のトルコ・イラン・イラク周辺でヤギと羊が家畜化された。乳・肉・毛皮・羊毛の安定供給が可能になり定住農業社会の基盤を形成した。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '牧畜'], era: '縄文弥生' },`,
  `  { id: 'q102', year: -8000, title: '牛が中東・南アジアで家畜化される',                 description: 'アナトリア（現トルコ）とインダス流域で野生のオーロックスから牛が家畜化された。農耕用の役畜・乳・肉の供給源として農業生産力を飛躍させた。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '牧畜'], era: '縄文弥生' },`,
  `  { id: 'q103', year: -7500, title: '豚が中東・中国で独立に家畜化される',               description: '中東（アナトリア）と中国で野生のイノシシが独立に家畜化された。残飯処理と肉の供給を兼ねた豚は農耕集落と相性が良く世界中に広まった。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '牧畜'], era: '縄文弥生' },`,
  `  { id: 'q104', year: -7000, title: '稲作が中国・長江流域で始まる',                     description: '現在の中国・浙江省周辺で野生イネの栽培化が始まった。稲作は東アジア・東南アジアへ伝播し数十億人の主食となる農業革命の起点となった。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '稲作', '米'], era: '縄文弥生' },`,
  `  { id: 'q105', year: -6500, title: 'トウモロコシの原種テオシントがメキシコで栽培化される', description: 'メキシコ南部でテオシントが改良されトウモロコシ（マイズ）が誕生した。後にアメリカ大陸全土に広まり現在は世界最大の穀物生産量を誇る作物となった。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', 'トウモロコシ'], era: '縄文弥生' },`,
  `  { id: 'q106', year: -5000, title: 'メソポタミアで灌漑農業が本格化し文明を支える',       description: 'チグリス・ユーフラテス川の水を水路で引く灌漑システムが発達。乾燥地帯での大規模農業を可能にし余剰食料が都市・国家・職業分化を生んだ。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '灌漑'], era: '縄文弥生' },`,
  `  { id: 'q107', year: -4500, title: '犂（すき）と牛耕が普及し農業生産が飛躍する',         description: '木製・のちに青銅製の犂を牛に引かせて土地を深く耕す牛耕農業が中東・中国で普及。手作業の数倍の面積を耕せるようになり余剰食料と人口が増大した。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業'], era: '縄文弥生' },`,
  `  { id: 'q108', year: -3500, title: '大豆の栽培が中国北部で始まる',                     description: '中国北部（黄河流域）で大豆が栽培化された。高タンパクな大豆は東アジアの食文化・農業の基盤となり豆腐・醤油・味噌など発酵食品文化を生んだ。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '大豆'], era: '縄文弥生' },`,
  `  { id: 'q109', year: -3000, title: '石炭が中国で燃料として使用され始める',               description: '中国の記録に石炭の採掘・利用が記されており世界最古の石炭利用とされる。製塩・製鉄・暖房に石炭エネルギーが活用された。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石炭', 'エネルギー'], era: '縄文弥生' },`,
  `  { id: 'q110', year: -500,  title: 'イランで天然ガス（地下火炎）が宗教的・実用的に活用される', description: 'アケメネス朝ペルシア時代にイランで地面から自然に噴出する天然ガスが「永遠の炎」として崇拝され調理・照明・暖房に活用された。エネルギー資源利用の記録。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['エネルギー', '天然ガス'], era: '縄文弥生' },`,
  `  { id: 'q111', year: 700,   title: '三圃制農業が中世ヨーロッパで普及し食料増産を実現',   description: '土地を春耕地・秋耕地・休耕地の3つに分けて輪作する三圃制農業がヨーロッパ全土に広まった。土地の疲弊を防ぎ中世ヨーロッパの人口増加と都市発展を支えた。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業'], era: '平安' },`,
  `  { id: 'q112', year: 1701,  title: 'ジェスロ・タルが条播機を発明し農業を機械化する（英）', description: 'イギリスのジェスロ・タルが種子を均等に列状に播く条播機を発明。種の節約と収量増加を実現し農業機械化の先駆けとなった農業革命の象徴的発明。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業'], era: '江戸' },`,
  `  { id: 'q113', year: 1813,  title: '石炭ガス灯が商業化されロンドンの街を照らす（英）',   description: 'ウィリアム・マードックが発明した石炭ガスを使った街灯がロンドンで商業化。ガス会社が設立され都市の夜間照明・暖房に石炭ガスが普及した。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石炭', 'エネルギー'], era: '江戸' },`,
  `  { id: 'q114', year: 1815,  title: 'デービーが炭鉱用安全灯を発明し石炭採掘を安全化（英）', description: 'ハンフリー・デービーが炭鉱のガス爆発を防ぐ安全灯（デービーランプ）を発明。死傷者が多かった石炭採掘が安全になり産業革命を支えた石炭生産が拡大した。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石炭', 'エネルギー'], era: '江戸' },`,
  `  { id: 'q115', year: 1834,  title: 'マコーミックが機械式収穫機を発明し農業革命が加速（米）', description: 'サイラス・マコーミックが馬が引く機械式収穫機（リーパー）を発明。人力の数十倍の速度で穀物を刈り取れるようになり北米の大規模農業と食料輸出が可能になった。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業'], era: '江戸' },`,
  `  { id: 'q116', year: 1840,  title: 'リービッヒが植物栄養鉱物説を確立し近代農学が始まる（独）', description: 'ユストゥス・フォン・リービッヒが植物は窒素・リン・カリウムなどの無機鉱物を栄養源とすると論じた。化学肥料農業の理論的基盤となり近代農学の始まりとなった。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '肥料'], era: '幕末' },`,
  `  { id: 'q117', year: 1859,  title: 'ドレイクが世界初の商業油田を掘削（米・ペンシルバニア）', description: 'エドウィン・ドレイクがペンシルバニア州でエンジンを用いた掘削に成功し商業的な石油採掘が始まった。石油産業の誕生と石炭から石油へのエネルギー転換の起点。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '幕末' },`,
  `  { id: 'q118', year: 1870,  title: 'ロックフェラーがスタンダード・オイルを設立（米）',   description: 'ジョン・D・ロックフェラーがスタンダード・オイルを設立しアメリカの石油精製・輸送・販売を独占。石油産業の垂直統合モデルと反トラスト法論争の発端。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '明治' },`,
  `  { id: 'q119', year: 1908,  title: 'イランで中東初の商業油田が発見される（英国資本）',   description: 'ウィリアム・ダーシーの探鉱チームがイラン（当時ペルシア）のマスジェデ・ソレイマンで中東初の大規模油田を発見。英国・イラン石油会社（後のBP）が設立された。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '明治' },`,
  `  { id: 'q120', year: 1909,  title: 'ハーバー・ボッシュ法が開発され空気から肥料を合成（独）', description: 'フリッツ・ハーバーとカール・ボッシュが空気中の窒素からアンモニアを合成する工業的手法を開発。化学肥料の大量生産を可能にし20世紀の人口爆発を支えた。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '肥料'], era: '明治' },`,
  `  { id: 'q121', year: 1938,  title: 'サウジアラビアで世界最大規模の油田が発見される',     description: '米国のスタンダード・オイル・オブ・カリフォルニア（後のシェブロン）がサウジアラビアのダンマム油田を発見。中東が世界の石油供給の中心となる転換点。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '昭和' },`,
  `  { id: 'q122', year: 1944,  title: 'ボーラーグが高収量小麦を開発し緑の革命が始まる（米）', description: 'ノーマン・ボーラーグが病気に強く収量の多い小麦の改良品種を開発。メキシコ・インド・パキスタンへ普及し数億人を飢餓から救ったとされる（1970年ノーベル平和賞）。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '緑の革命'], era: '昭和' },`,
  `  { id: 'q123', year: 1954,  title: '世界初の実用的太陽電池がベル研究所で開発される（米）', description: 'ベル研究所のチャピン・フラー・ピアソンが6%の変換効率を持つシリコン太陽電池を開発。再生可能エネルギー革命の種が蒔かれた歴史的発明。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['再生エネルギー', '太陽光'], era: '昭和' },`,
  `  { id: 'q124', year: 1956,  title: 'ハバートがピークオイル理論を発表（米）',             description: '米国の地質学者マリオン・キング・ハバートが石油生産量が山型曲線を描きやがて減少するというピークオイル理論を発表。エネルギー政策と環境議論に大きな影響を与えた。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '昭和' },`,
  `  { id: 'q125', year: 1960,  title: 'OPEC（石油輸出国機構）が設立される',               description: 'イラク・イラン・クウェート・サウジアラビア・ベネズエラの5カ国がバグダッドでOPECを設立。産油国が価格交渉力を持ち石油をエネルギー外交の武器として使うようになった。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '昭和' },`,
  `  { id: 'q126', year: 1962,  title: 'カーソンが「沈黙の春」で農薬公害を告発（米）',       description: 'レイチェル・カーソンが著書「沈黙の春」でDDTなどの農薬が生態系を破壊していると告発。環境保護運動の出発点となり農業と環境の関係への意識を変えた。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '環境'], era: '昭和' },`,
  `  { id: 'q127', year: 1965,  title: '緑の革命がアジアに波及しインド・パキスタンで食料増産', description: 'ボーラーグの高収量品種と化学肥料・農薬の組み合わせがインド・パキスタンに導入。1965〜70年代に両国の小麦生産が2〜3倍に増え飢餓の危機を脱した。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', '緑の革命'], era: '昭和' },`,
  `  { id: 'q128', year: 1973,  title: '第一次石油危機が起きアラブ産油国が禁輸を実施',       description: 'OAPEC（アラブ石油輸出国機構）がイスラエル支持国への石油禁輸を実施し原油価格が4倍に急騰。省エネ意識の高まりと代替エネルギー研究を世界に促した。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', 'エネルギー'], era: '昭和' },`,
  `  { id: 'q129', year: 1979,  title: 'スリーマイル島原発事故が起きる（米）',               description: 'ペンシルバニア州のスリーマイル島原子力発電所でメルトダウン事故が発生。死者は出なかったが原子力発電への不信感が広がり米国での原発新設が止まった。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['原子力', 'エネルギー'], era: '昭和' },`,
  `  { id: 'q130', year: 1986,  title: 'チェルノブイリ原発事故が起きる（ソ連・現ウクライナ）', description: 'ソ連のチェルノブイリ原子力発電所4号炉が爆発し大量の放射性物質が放出された。数十万人が避難しヨーロッパ全土が汚染。原子力政策の見直しを世界に迫った。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['原子力', 'エネルギー'], era: '昭和' },`,
  `  { id: 'q131', year: 1994,  title: '世界初の遺伝子組み換え農産物が商業販売される（米）',  description: 'カルジーン社のフレーバーセーバートマト（Flavr Savr）が世界初の商業用GM農産物としてFDAの承認を受けて発売。GMO農業の時代が始まり食料生産・倫理論争の新章が開かれた。', category: '発明・伝播', subcategory: '農業・食料', keywords: ['農業', 'GMO'], era: '平成' },`,
  `  { id: 'q132', year: 2005,  title: 'シェール革命が始まり米国が世界最大の産油国に返り咲く', description: '水圧破砕（フラッキング）と水平掘削技術の組み合わせによりシェール層の石油・ガス採掘が経済的に可能になった。米国の石油生産量が急増し世界エネルギー地政学を一変させた。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['石油', '天然ガス', 'エネルギー'], era: '平成' },`,
  `  { id: 'q133', year: 2011,  title: '東日本大震災で福島第一原発事故が発生し世界の原子力政策が転換', description: '東京電力福島第一原子力発電所で3基がメルトダウン。ドイツが脱原発を決定するなど多くの国が原子力政策を見直し再生可能エネルギーへの転換を加速させた。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['原子力', 'エネルギー'], era: '平成' },`,
  `  { id: 'q134', year: 2015,  title: '再生可能エネルギーのコストが火力発電と同等以下になる',  description: '太陽光・風力発電のコストが急速に低下し多くの地域で石炭・ガス火力発電と同等以下のコストを実現。エネルギー転換が経済合理性を持つようになった歴史的転換点。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['再生エネルギー', '太陽光', '風力'], era: '平成' },`,
  `  { id: 'q135', year: 2023,  title: '世界の太陽光発電容量が1テラワットを突破する',         description: '世界全体の太陽光発電設備容量が累計1テラワット（1兆ワット）を突破。2010年代から急速にコスト低下した太陽光が石炭・ガスを置き換え始めたエネルギー転換の象徴。', category: '発明・伝播', subcategory: 'エネルギー', keywords: ['再生エネルギー', '太陽光'], era: '令和' },`,
]

// Find the 創作物 section start
const sosakubutsStart = lines.findIndex(l => l.includes('// ── 創作物'))
console.log('創作物 starts at line:', sosakubutsStart + 1)

// Insert all new events before 創作物 section, sorted by year
newEvents.sort((a, b) => {
  const ya = parseInt(a.match(/year:\s*(-?\d+)/)?.[1] ?? '0')
  const yb = parseInt(b.match(/year:\s*(-?\d+)/)?.[1] ?? '0')
  return ya - yb
})

// Now we also need to sort existing 発明・伝播 events with new ones
// Find start of 発明・伝播 section
const hatsumeiStart = lines.findIndex(l => l.includes('// ── 発明・伝播'))
console.log('発明・伝播 starts at line:', hatsumeiStart + 1)

// Extract all 発明・伝播 event lines
const existing = lines.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播')
console.log('Existing 発明・伝播 events:', existing.length)

// Combine and sort
const all = [...existing, ...newEvents]
all.sort((a, b) => {
  const ya = parseInt(a.match(/year:\s*(-?\d+)/)?.[1] ?? '0')
  const yb = parseInt(b.match(/year:\s*(-?\d+)/)?.[1] ?? '0')
  return ya - yb
})
console.log('Total 発明・伝播 events after merge:', all.length)

// Rebuild: remove existing 発明・伝播 events from lines, insert sorted block
const cleaned = lines.filter(l => !(isEventLine(l) && getCategory(l) === '発明・伝播'))

// Find insertion point (after 発明・伝播 header)
const insertPos = cleaned.findIndex(l => l.includes('// ── 発明・伝播')) + 1
console.log('Inserting at line:', insertPos + 1)

const header = `  // ── 発明・伝播 (${all.length}件) ────────────────────────────────`
// Replace the old header
const oldHeaderIdx = cleaned.findIndex(l => l.includes('// ── 発明・伝播'))
cleaned[oldHeaderIdx] = header

cleaned.splice(insertPos, 0, ...all)

writeFileSync(filePath, cleaned.join('\n'), 'utf-8')
console.log('Done. Output lines:', cleaned.length)

// Verify
const final = readFileSync(filePath, 'utf-8').split('\n')
const hCount = final.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播').length
console.log('発明・伝播 events in output:', hCount)
