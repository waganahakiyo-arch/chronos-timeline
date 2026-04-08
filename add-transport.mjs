import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/data/events.ts'
const content = readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

const newEvents = `  { id: 'q187', year: -8000, title: '丸木舟の使用', description: '木をくり抜いた丸木舟（ログボート）が世界各地で使われ始めた。現存最古の丸木舟はオランダのペッセカヌー（紀元前8000年頃）。内水面・沿岸漁労・交易の基本手段となった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['丸木舟', 'カヌー', '先史', '舟'], era: '先史' },
  { id: 'q188', year: -3500, title: '帆の発明', description: 'メソポタミア・エジプトで風力を推進力として使う帆が発明された。人力だけに頼らない初の動力航行で、交易・軍事の距離と規模を飛躍的に拡大した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['帆', 'メソポタミア', 'エジプト', '風力航行'], era: '古代文明' },
  { id: 'q189', year: -2500, title: 'エジプトの外洋交易船', description: '古代エジプトがパピルス製・木製の外洋船でプント（東アフリカ）まで航海し、乳香・黄金・象牙を輸入。帆と艪を組み合わせた大型船の最初期の記録。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['エジプト', '外洋船', 'プント', '交易航海'], era: '古代文明' },
  { id: 'q190', year: -1000, title: 'フェニキア人の地中海交易網', description: 'フェニキア人が地中海全域に交易植民地を設立し、ガラス・紫染料・金属を輸送。カルタゴなど多くの都市を建設し、古代最大の海上交易ネットワークを形成した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['フェニキア', '地中海', '交易船', 'カルタゴ'], era: '古代文明' },
  { id: 'q191', year: -600, title: 'ギリシャの三段櫂船（トリレーメ）', description: '三列に並んだ漕ぎ手170人が駆動する高速軍船トリレーメが発達。サラミスの海戦（前480年）でペルシャ艦隊を撃破し、ギリシャ文明存続に貢献した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['三段櫂船', 'トリレーメ', 'ギリシャ', 'サラミス'], era: '古代文明' },
  { id: 'q192', year: -600, title: 'バビロニアの世界地図', description: '現存最古の世界地図（バビロニア地図）が粘土板に刻まれた。バビロンを中心に円形の陸地と周囲の海を描き、世界を概念的に把握しようとした最初の試み。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['世界地図', 'バビロニア', '粘土板', '地図の起源'], era: '古代文明' },
  { id: 'q193', year: -150, title: 'アストロラーベの発明', description: 'ヒッパルコスらがアストロラーベ（星座盤）を発明。太陽・星の高度から緯度・時刻を測定でき、天文学と航海術の必須道具として中世まで活躍した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['アストロラーベ', 'ヒッパルコス', '航海術', '緯度測定'], era: '古代文明' },
  { id: 'q194', year: 150, title: 'プトレマイオスの地理学', description: 'プトレマイオスが『地理学』を著し、緯度・経度による地図投影法を体系化。約8000地点の座標を記録し、近代地図学の理論的基礎を築いた。1400年後のルネサンス期に再発見されヨーロッパ大航海時代を触発した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['プトレマイオス', '地理学', '緯度経度', '地図投影法'], era: '古代文明' },
  { id: 'q195', year: 300, title: 'ポリネシア人の太平洋大航海', description: 'ポリネシア人が星・波のうねり・鳥・風を読む伝統的航法で太平洋の広大な海域に定住を拡大。ハワイ（400年頃）・イースター島（700年頃）・ニュージーランド（1300年頃）に到達した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ポリネシア', '太平洋航海', '星座航法', '民族移動'], era: '古代文明' },
  { id: 'q196', year: 800, title: 'イスラーム航海術の発達', description: 'アラブ・イスラーム航海者がモンスーンの季節風を利用してインド洋交易網を構築。カーリミー商人はアフリカ・インド・東南アジアを結ぶ広域ネットワークを形成し、アラビアン・ナイトに描かれた航海文化を生んだ。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['アラブ航海', 'インド洋', 'モンスーン', 'ダウ船'], era: '中世' },
  { id: 'q197', year: 1000, title: 'ヴァイキングの大西洋横断', description: 'レイフ・エリクソンら北欧ヴァイキングがロングシップでグリーンランドを越え北米（ヴィンランド）に到達。コロンブスより500年早い西洋人の新大陸到達。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ヴァイキング', 'ロングシップ', 'ヴィンランド', '北米到達'], era: '中世' },
  { id: 'q198', year: 1100, title: '磁気羅針盤の航海への応用', description: '中国で発明された磁針がイスラーム商人を経てヨーロッパに伝わり、海上航法に応用された。陸地が見えない外洋でも方位を維持できるようになり、遠洋航海の安全性が劇的に向上した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['羅針盤', '磁気コンパス', '航海', '中国発明'], era: '中世' },
  { id: 'q199', year: 1300, title: 'ポルトラン海図の発達', description: '地中海・黒海の海岸線・港・風を詳細に記したポルトラン海図がイタリアで発達。羅針盤と組み合わせて実用的な航海が可能になり、大航海時代の地図学の基盤となった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ポルトラン海図', 'イタリア', '地中海', '実用地図'], era: '中世' },
  { id: 'q200', year: 1405, title: '鄭和の大遠征', description: '明朝の宦官提督・鄭和が62隻・2万8000人の艦隊を率いて東南アジア・インド・アラビア・東アフリカまで7度の大航海を実施（1405–1433）。コロンブスの艦隊をはるかに超える規模の海洋活動。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['鄭和', '明朝', '大航海', '中国艦隊'], era: '中世' },
  { id: 'q201', year: 1430, title: 'キャラベル船の開発', description: 'ポルトガルが三角帆（ラテン帆）と方形帆を組み合わせたキャラベル船を開発。逆風でも帆走でき、長期外洋航海が可能になった。バルトロメウ・ディアスやコロンブスもこの船型を使用した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['キャラベル船', 'ポルトガル', '三角帆', '大航海時代'], era: '近世' },
  { id: 'q202', year: 1488, title: 'バルトロメウ・ディアスの喜望峰到達', description: 'ポルトガルのバルトロメウ・ディアスがアフリカ最南端の喜望峰を回り込み、インド洋への海路を発見。ヨーロッパからアジアへの直接海路の開拓が現実となった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ディアス', '喜望峰', 'ポルトガル', 'アフリカ周回'], era: '近世' },
  { id: 'q203', year: 1569, title: 'メルカトル図法の発明', description: 'ヘラルドゥス・メルカトルが等角航路を直線で表せる円筒図法（メルカトル図法）を考案。船の羅針盤航法との組み合わせで実用的な航海地図が可能になり、現在もデジタル地図の標準として使われる。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['メルカトル図法', '地図投影', '航海地図', '等角航路'], era: '近世' },
  { id: 'q204', year: 1731, title: '六分儀の発明', description: 'ジョン・ハドリーらが六分儀（セクスタント）を発明。太陽・星の高度を精密に測定して緯度を決定できるようになり、天文航法が大幅に精度向上した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['六分儀', 'セクスタント', '緯度測定', '天文航法'], era: '近世' },
  { id: 'q205', year: 1761, title: 'クロノメーターによる経度問題の解決', description: 'ジョン・ハリソンが精密海上時計H4を完成させ、経度の正確な測定を初めて実現。何世紀もの難題「経度問題」が解決され、海難事故が激減・遠洋航海の安全性が革命的に向上した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['クロノメーター', 'ハリソン', '経度問題', '精密時計'], era: '近世' },
  { id: 'q206', year: 1783, title: 'モンゴルフィエ兄弟の熱気球', description: 'フランスのモンゴルフィエ兄弟が熱気球による有人飛行を実現。人類が初めて地面から離れて空中に浮かんだ歴史的瞬間で、航空時代の夜明けとなった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['熱気球', 'モンゴルフィエ', '有人飛行', '航空史'], era: '近代' },
  { id: 'q207', year: 1807, title: '蒸気船の実用化', description: 'ロバート・フルトンの蒸気船クラーモント号がハドソン川で定期運航を開始。風と流れに左右されない安定した内水面航行が実現し、内陸輸送が革命的に変わった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['蒸気船', 'フルトン', 'クラーモント', '内水面交通'], era: '近代' },
  { id: 'q208', year: 1869, title: 'スエズ運河の開通', description: 'スエズ運河が開通し、地中海と紅海が直結。ヨーロッパ－アジア間の航路がアフリカ周回から大幅に短縮され、世界貿易のルートを根本から変えた。現在も世界貿易量の約12%が通過する。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['スエズ運河', '地中海', '紅海', '貿易航路'], era: '近代' },
  { id: 'q209', year: 1903, title: 'ライト兄弟の動力飛行', description: 'オービル・ライトとウィルバー・ライトがノースカロライナ州キティホークで世界初の動力飛行機「フライヤー号」を飛行させた。最初の飛行は12秒・36メートルだったが、航空時代の幕開けとなった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ライト兄弟', '動力飛行', '飛行機', 'キティホーク'], era: '近代' },
  { id: 'q210', year: 1914, title: 'パナマ運河の開通', description: 'パナマ運河が開通し、太平洋と大西洋が直結。南米南端マゼラン海峡を迂回する必要がなくなり、北米東西岸間・大西洋太平洋間の航路を大幅に短縮した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['パナマ運河', '太平洋', '大西洋', '航路短縮'], era: '近代' },
  { id: 'q211', year: 1927, title: 'リンドバーグの大西洋無着陸単独横断飛行', description: 'チャールズ・リンドバーグが「スピリット・オブ・セントルイス号」でニューヨーク－パリ間5,810kmを33.5時間で単独無着陸飛行。大西洋横断航空の時代が来ることを世界に示した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['リンドバーグ', '大西洋横断', '単独飛行', '航空史'], era: '近代' },
  { id: 'q212', year: 1944, title: 'ジェットエンジンの実用化', description: '第二次世界大戦中にドイツMe262・イギリスグロスターミーティアなど最初のジェット戦闘機が実戦投入。ジェット推進の実用化により、後の民間航空革命の技術基盤が形成された。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ジェットエンジン', 'Me262', '航空史', '第二次世界大戦'], era: '現代' },
  { id: 'q213', year: 1956, title: 'コンテナ輸送の革命', description: 'マルコム・マクリーンが規格統一されたコンテナによる海上輸送システムを開始。荷役時間・コストが劇的に削減され、グローバルサプライチェーンが実現。「コンテナ一つが世界を変えた」と言われる貿易革命。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['コンテナ輸送', 'マクリーン', 'グローバル貿易', '海上輸送'], era: '現代' },
  { id: 'q214', year: 1958, title: 'ジェット旅客機時代の開幕', description: 'ボーイング707・ダグラスDC-8などジェット旅客機が大西洋路線に就航。レシプロ機の倍以上の速度で飛行時間が半減し、空の旅が一般大衆に手の届くものになり始めた。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ボーイング707', 'ジェット旅客機', '民間航空', '大西洋路線'], era: '現代' },
  { id: 'q215', year: 1964, title: '新幹線の開業', description: '東京オリンピック直前に東海道新幹線が開業。時速210kmで東京－大阪間を4時間で結び、高速鉄道の概念を世界に示した。現在の新幹線は最高320km/hで、航空機に匹敵する都市間移動手段となっている。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['新幹線', '東海道新幹線', '高速鉄道', '東京オリンピック'], era: '現代' },
  { id: 'q216', year: 1970, title: 'ボーイング747の就航（空の大衆化）', description: '「ジャンボジェット」ボーイング747が就航。400人以上を搭載できる大型機により航空運賃が大幅に下落し、空の旅が富裕層の特権から一般市民の移動手段へと変わった。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['ボーイング747', 'ジャンボジェット', '航空大衆化', '大型旅客機'], era: '現代' },
  { id: 'q217', year: 1976, title: 'コンコルドの定期就航', description: '英仏共同開発の超音速旅客機コンコルドがロンドン－ニューヨーク路線に定期就航。マッハ2で大西洋を3.5時間で横断したが、高コスト・騒音問題で2003年に引退。超音速旅客の限界を示した。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['コンコルド', '超音速旅客機', 'マッハ2', '英仏共同開発'], era: '現代' },
  { id: 'q218', year: 1995, title: 'GPSの民間開放と航法革命', description: '米国がGPS（全地球測位システム）を民間に完全開放。数メートル単位の精度で現在地を把握できるようになり、航空・海運・自動車ナビゲーションを革命的に変えた。現在は自律走行・ドローン配送の基盤技術。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['GPS', '全地球測位', '航法', '民間開放'], era: '現代' },
  { id: 'q219', year: 2005, title: 'Google マップの公開', description: 'Googleがウェブ地図サービス「Google マップ」を公開。衛星画像・ストリートビュー・リアルタイム渋滞情報が無料で利用可能となり、地図の民主化が実現。スマートフォンと組み合わさり現代人の移動行動を根本から変えた。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['Googleマップ', 'デジタル地図', '衛星画像', '経路案内'], era: '現代' },
  { id: 'q220', year: 2015, title: 'SpaceXのロケット垂直着陸・再使用化', description: 'SpaceXがFalcon 9ロケットの垂直着陸・再使用に成功。使い捨てだったロケットが再使用可能になり、打ち上げコストが桁違いに低下。宇宙輸送の経済性を根本から変え、商業宇宙時代を開いた。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['SpaceX', 'Falcon9', '再使用ロケット', '垂直着陸'], era: '現代' },
  { id: 'q221', year: 2024, title: 'eVTOL（電動垂直離着陸機）の実用化へ', description: 'Joby Aviation・Lilium・wisk等が電動垂直離着陸機（eVTOL）の型式証明取得に向けて進展。都市内の「空のタクシー」として滑走路不要の移動手段が現実になりつつあり、都市交通の次の革命として注目されている。', category: '発明・伝播', subcategory: '移動・航海', keywords: ['eVTOL', '電動航空機', '空飛ぶタクシー', '都市交通'], era: '現代' },`

const newLines = newEvents.split('\n').filter(l => l.trimStart().startsWith('{ id:'))

const isEventLine = l => l.trimStart().startsWith('{ id:')
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]

const existingEvents = lines.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播')
console.log('Existing 発明・伝播 events:', existingEvents.length)
console.log('New events:', newLines.length)

const allEvents = [...existingEvents, ...newLines]
const sorted = allEvents.sort((a, b) => getYear(a) - getYear(b))
console.log('Total after merge:', sorted.length)

const sectionIdx = lines.findIndex(l => l.includes('// ── 発明・伝播'))
const sectionEnd = lines.findIndex((l, i) => i > sectionIdx && l.match(/^\s*\/\/ ── /))

const output = [
  ...lines.slice(0, sectionIdx),
  `  // ── 発明・伝播 (${sorted.length}件・年代順) ─────────────────────────`,
  ...sorted,
  ...lines.slice(sectionEnd)
]

writeFileSync(filePath, output.join('\n'), 'utf-8')
const finalCount = output.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播').length
console.log('発明・伝播 events in output:', finalCount)
console.log('Done.')
