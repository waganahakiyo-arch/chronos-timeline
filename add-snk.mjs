import { readFileSync, writeFileSync } from 'fs'

// 1. Update types/index.ts
const typesPath = 'src/types/index.ts'
let typesContent = readFileSync(typesPath, 'utf-8')
typesContent = typesContent.replace(
  "| 'カプコンの歴史'",
  "| 'カプコンの歴史'\n  | 'SNKの歴史'"
)
writeFileSync(typesPath, typesContent, 'utf-8')
console.log('✓ types/index.ts updated')

// 2. Update events.ts
const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

// Add to CATEGORIES
content = content.replace(
  "'カプコンの歴史']",
  "'カプコンの歴史', 'SNKの歴史']"
)

// Add CATEGORY_COLORS entry
content = content.replace(
  "  'カプコンの歴史': 'bg-cyan-900/30 text-cyan-300 border-cyan-700/40',\n}",
  "  'カプコンの歴史': 'bg-cyan-900/30 text-cyan-300 border-cyan-700/40',\n  'SNKの歴史': 'bg-amber-900/30 text-amber-300 border-amber-700/40',\n}"
)

// Add CATEGORY_DOT entry
content = content.replace(
  "  'カプコンの歴史': 'bg-cyan-400',\n}",
  "  'カプコンの歴史': 'bg-cyan-400',\n  'SNKの歴史': 'bg-amber-400',\n}"
)

const snkSection = `
  // ── SNKの歴史 (68件) ──────────────────────────────────
  { id: 's001', year: 1980, title: 'サスケ VS コマンダー　稼働開始　AC', description: 'SNK初期のアーケードゲーム。固定画面シューティングでSNKの原点となった作品。', category: 'SNKの歴史', era: '昭和' },
  { id: 's002', year: 1985, title: 'ASO　稼働開始　AC', description: 'アーマード・スクラム・オブジェクト。縦スクロールシューティングで自機のパワーアップシステムが特徴。', category: 'SNKの歴史', era: '昭和' },
  { id: 's003', year: 1985, title: 'TANK　稼働開始　AC', description: 'SNKが送り出した戦車シューティングゲーム。2人同時プレイが可能な協力型アクション。', category: 'SNKの歴史', era: '昭和' },
  { id: 's004', year: 1986, title: '2月　怒 -IKARI-　稼働開始　AC', description: '二人同時プレイの縦スクロールアクションシューティング。ロータリースティックが印象的で国内外でヒット。', category: 'SNKの歴史', era: '昭和' },
  { id: 's005', year: 1986, title: '7月　アテナ　稼働開始　AC', description: '女神アテナが主人公のアクションゲーム。その後サイコソルジャーに続きKOFシリーズでも活躍するSNKヒロインの原点。', category: 'SNKの歴史', era: '昭和' },
  { id: 's006', year: 1986, title: '10月　怒号層圏　稼働開始　AC', description: '怒の続編（Victory Road）。前作を強化したロータリースティック操作の縦スクロールシューティング。', category: 'SNKの歴史', era: '昭和' },
  { id: 's007', year: 1987, title: '3月　サイコソルジャー　稼働開始　AC', description: '超能力少女アテナが活躍するアクションゲーム。KOFシリーズへ繋がるSNKヒロインの系譜。', category: 'SNKの歴史', era: '昭和' },
  { id: 's008', year: 1989, title: 'ビーストバスターズ　稼働開始　AC', description: '3人同時プレイ対応のガンシューティング。ゾンビを倒すホラーテイストのアーケードアクション。', category: 'SNKの歴史', era: '平成' },
  { id: 's009', year: 1989, title: '3月　怒III　稼働開始　AC', description: '怒シリーズ第3弾（Search & Destroy）。ミリタリーアクションシリーズの集大成として登場。', category: 'SNKの歴史', era: '平成' },
  { id: 's010', year: 1990, title: '4月　NAM-1975　稼働開始　AC', description: 'ネオジオMVS稼働開始タイトルの一つ。ベトナム戦争をモチーフにした2人協力アクションシューティング。', category: 'SNKの歴史', era: '平成' },
  { id: 's011', year: 1991, title: '2月　キング・オブ・ザ・モンスターズ　稼働開始　AC', description: '怪獣プロレスゲーム。ゴジラ等をモチーフにした巨大モンスター同士の格闘アクション。', category: 'SNKの歴史', era: '平成' },
  { id: 's012', year: 1991, title: '11月　餓狼伝説　稼働開始　AC', description: 'SNK対戦格闘の原点。テリー・アンディ・ジョー対ギース・ハワードの宿命の戦いを描く。', category: 'SNKの歴史', era: '平成' },
  { id: 's013', year: 1992, title: '7月　ワールドヒーローズ　稼働開始　AC', description: '歴史上の英雄が戦う対戦格闘。ハンニバルや武蔵など個性的なキャラクターが揃う。', category: 'SNKの歴史', era: '平成' },
  { id: 's014', year: 1992, title: '9月　龍虎の拳　稼働開始　AC', description: '気力ゲージと超必殺技を初めて採用した格闘ゲーム。リョウ・サカザキとKOFシリーズの源流となった作品。', category: 'SNKの歴史', era: '平成' },
  { id: 's015', year: 1992, title: '12月　餓狼伝説2　稼働開始　AC', description: '餓狼伝説の続編。ビリー・カーン等新キャラが追加され対戦の奥深さが増した。', category: 'SNKの歴史', era: '平成' },
  { id: 's016', year: 1993, title: '4月　ワールドヒーローズ2　稼働開始　AC', description: 'キャラクター追加と格闘システムを強化した続編。デスマッチモードが話題を呼んだ。', category: 'SNKの歴史', era: '平成' },
  { id: 's017', year: 1993, title: '7月　サムライスピリッツ　稼働開始　AC', description: '刀剣を用いた武器格闘ゲームの金字塔。斬鉄閃・一閃など独自の必殺技と和の世界観が話題になった。', category: 'SNKの歴史', era: '平成' },
  { id: 's018', year: 1993, title: '9月　餓狼伝説SPECIAL　稼働開始　AC', description: '餓狼シリーズの人気作。ギース・ハワードが使用可能になりスーパーキャンセルを初搭載した傑作。', category: 'SNKの歴史', era: '平成' },
  { id: 's019', year: 1994, title: '2月　龍虎の拳2　稼働開始　AC', description: '龍虎の拳の続編。ロバート・ガルシア等が加わり対戦の深みが増した。', category: 'SNKの歴史', era: '平成' },
  { id: 's020', year: 1994, title: '4月　ワールドヒーローズ2 JET　稼働開始　AC', description: 'WH2の強化版。スピードアップと新必殺技追加で対戦ゲームとして完成度が高まった。', category: 'SNKの歴史', era: '平成' },
  { id: 's021', year: 1994, title: '8月　THE KING OF FIGHTERS \'94　稼働開始　AC', description: 'SNK格闘ゲームの総決算。餓狼・龍虎・サムスピのキャラが一堂に会した3on3チーム対戦の傑作。', category: 'SNKの歴史', era: '平成' },
  { id: 's022', year: 1994, title: '10月　真SAMURAI SPIRITS 覇王丸地獄変　稼働開始　AC', description: 'サムライスピリッツ第2弾。覇王丸が主役のストーリーと新キャラ追加で完成度が向上した。', category: 'SNKの歴史', era: '平成' },
  { id: 's023', year: 1995, title: '3月　餓狼伝説3　稼働開始　AC', description: '餓狼シリーズ第3弾。ライン移動廃止と新システムで刷新された新世代の格闘ゲーム。', category: 'SNKの歴史', era: '平成' },
  { id: 's024', year: 1995, title: '4月　風雲黙示録　稼働開始　AC', description: '武器格闘ゲームの新タイトル。個性豊かなキャラクターそれぞれが武器を持ち激闘を繰り広げる。', category: 'SNKの歴史', era: '平成' },
  { id: 's025', year: 1995, title: '5月　ワールドヒーローズパーフェクト　稼働開始　AC', description: 'ワールドヒーローズシリーズ集大成。5種のゲージシステムと新キャラ追加で格闘の奥深さが頂点に。', category: 'SNKの歴史', era: '平成' },
  { id: 's026', year: 1995, title: '7月　THE KING OF FIGHTERS \'95　稼働開始　AC', description: 'KOFシリーズ第2弾。オリジナルチーム編成を初採用し草薙チームとオロチの因縁が始まる。', category: 'SNKの歴史', era: '平成' },
  { id: 's027', year: 1995, title: '11月　サムライスピリッツ 斬紅郎無双剣　稼働開始　AC', description: 'サムスピシリーズ第3弾。斬紅郎という新たな強敵と一閃システムのさらなる深化が特徴。', category: 'SNKの歴史', era: '平成' },
  { id: 's028', year: 1995, title: '11月　REAL BOUT 餓狼伝説　稼働開始　AC', description: 'リングアウトシステムとギース・ハワードの衝撃的な結末が話題になった餓狼シリーズのリブート作。', category: 'SNKの歴史', era: '平成' },
  { id: 's029', year: 1996, title: '3月　龍虎の拳 外伝　稼働開始　AC', description: '龍虎の拳シリーズ番外編。ジャック・ターナーなど新キャラが多数登場するスピンオフ格闘。', category: 'SNKの歴史', era: '平成' },
  { id: 's030', year: 1996, title: '5月　メタルスラッグ　稼働開始　AC', description: 'スラッグ（戦車）を操る2Dアクションシューティングの傑作。緻密なドット絵と爽快感が世界中で大人気。', category: 'SNKの歴史', era: '平成' },
  { id: 's031', year: 1996, title: '7月　THE KING OF FIGHTERS \'96　稼働開始　AC', description: 'KOFシリーズ第3弾。バッシュシステム廃止とネオマックスの追加でシステムが大幅刷新された。', category: 'SNKの歴史', era: '平成' },
  { id: 's032', year: 1996, title: '9月　風雲 SUPER TAG BATTLE　稼働開始　AC', description: '風雲シリーズのタッグバトル版。2人のキャラを切り替えながら戦う対戦格闘。', category: 'SNKの歴史', era: '平成' },
  { id: 's033', year: 1996, title: '10月　サムライスピリッツ 天草降臨　稼働開始　AC', description: 'サムスピシリーズ第4弾。天草四郎時貞との決戦とシリーズ最高クラスの完成度が評価された。', category: 'SNKの歴史', era: '平成' },
  { id: 's034', year: 1997, title: '1月　REAL BOUT 餓狼伝説SPECIAL　稼働開始　AC', description: 'REAL BOUT餓狼の強化版。全キャラ使用可能となりバランスも大幅改善された人気作。', category: 'SNKの歴史', era: '平成' },
  { id: 's035', year: 1997, title: '7月　THE KING OF FIGHTERS \'97　稼働開始　AC', description: 'KOFオロチ編完結。オールスター的な豪華キャスト最高の完成度でシリーズの頂点と評される傑作。', category: 'SNKの歴史', era: '平成' },
  { id: 's036', year: 1997, title: '12月　SAMURAI SPIRITS 〜侍魂〜　稼働開始　AC', description: 'サムライスピリッツシリーズの新展開。刷新されたシステムで武器格闘の新境地を開いた。', category: 'SNKの歴史', era: '平成' },
  { id: 's037', year: 1997, title: '12月　幕末浪漫 月華の剣士　稼働開始　AC', description: '幕末を舞台にした剣客格闘ゲーム（The Last Blade）。美麗なグラフィックと深い剣術システムが好評。', category: 'SNKの歴史', era: '平成' },
  { id: 's038', year: 1998, title: '2月　METAL SLUG 2　稼働開始　AC', description: 'メタルスラッグ第2弾。エリとターマが追加され4キャラ体制に。変身イベントなど演出も豊富になった。', category: 'SNKの歴史', era: '平成' },
  { id: 's039', year: 1998, title: '3月　REAL BOUT 餓狼伝説2 THE NEWCOMERS　稼働開始　AC', description: 'REAL BOUT餓狼シリーズ最終作。ホンフゥ・リックの新キャラ追加と最終章のシナリオが展開。', category: 'SNKの歴史', era: '平成' },
  { id: 's040', year: 1998, title: '3月　THE KING OF FIGHTERS \'98　稼働開始　AC', description: 'KOFシリーズの完成形。ドリームマッチと称されバランス調整の傑作としてシリーズ最高人気を誇る。', category: 'SNKの歴史', era: '平成' },
  { id: 's041', year: 1998, title: '3月　SAMURAI SPIRITS 2 〜アスラ斬魔伝〜　稼働開始　AC', description: 'サムライスピリッツシリーズ新作。新システムで武器格闘の迫力が増した作品。', category: 'SNKの歴史', era: '平成' },
  { id: 's042', year: 1998, title: '11月　幕末浪漫第二幕 月華の剣士　稼働開始　AC', description: '月華の剣士シリーズ第2弾（The Last Blade 2）。完成度が高くシリーズ最高傑作との評価も高い。', category: 'SNKの歴史', era: '平成' },
  { id: 's043', year: 1999, title: '1月　餓狼伝説 WILD AMBITION　稼働開始　AC', description: '餓狼伝説シリーズ初の3Dポリゴン格闘ゲーム。新システムと3Dグラフィックで新境地を開拓した。', category: 'SNKの歴史', era: '平成' },
  { id: 's044', year: 1999, title: '3月　METAL SLUG X　稼働開始　AC', description: 'メタルスラッグ2の強化版。武器バランス改善と新エネミー追加で完成度が大幅に向上した。', category: 'SNKの歴史', era: '平成' },
  { id: 's045', year: 1999, title: '5月　武力 〜BURIKI ONE〜　稼働開始　AC', description: 'Hyper Neo Geo 64基板の格闘ゲーム。3D空間での立体的な格闘が特徴のユニークな作品。', category: 'SNKの歴史', era: '平成' },
  { id: 's046', year: 1999, title: '7月　THE KING OF FIGHTERS \'99　稼働開始　AC', description: 'KOFネスツ編開始作。4on3ストライカーシステムと草薙京の復活が話題になった。', category: 'SNKの歴史', era: '平成' },
  { id: 's047', year: 1999, title: '11月　餓狼 MARK OF THE WOLVES　稼働開始　AC', description: '餓狼シリーズ最終作。ギースの息子ロック・ハワードを主人公にT.O.P.システムで新世代の格闘へ。', category: 'SNKの歴史', era: '平成' },
  { id: 's048', year: 1999, title: '12月　サムライスピリッツ新章 〜剣客異聞録〜　稼働開始　AC', description: 'サムライスピリッツシリーズの新展開。新たなキャラクターと刷新されたシステムで武器格闘の未来を探った作品。', category: 'SNKの歴史', era: '平成' },
  { id: 's049', year: 2000, title: '5月　METAL SLUG 3　稼働開始　AC', description: 'メタルスラッグシリーズ最高傑作との呼び声高い第3弾。豊富なルート分岐と圧倒的なボリュームが話題。', category: 'SNKの歴史', era: '平成' },
  { id: 's050', year: 2000, title: '7月　THE KING OF FIGHTERS 2000　稼働開始　AC', description: 'KOFネスツ編第2作。アクティブストライカーシステムとネスツとの激闘が展開。', category: 'SNKの歴史', era: '平成' },
  { id: 's051', year: 2001, title: '11月　THE KING OF FIGHTERS 2001　稼働開始　AC', description: 'KOFネスツ編完結作。ネスツとの最終決戦とN.E.S.T.Sの真相が明かされる。', category: 'SNKの歴史', era: '平成' },
  { id: 's052', year: 2002, title: '3月　METAL SLUG 4　稼働開始　AC', description: 'プラスモアが開発したメタルスラッグ第4弾。新キャラ・ナディアとトレヴァーが参戦。', category: 'SNKの歴史', era: '平成' },
  { id: 's053', year: 2002, title: '10月　THE KING OF FIGHTERS 2002　稼働開始　AC', description: 'KOF\'98同様のドリームマッチ形式。歴代人気キャラが揃い踏みしたバランスの傑作。', category: 'SNKの歴史', era: '平成' },
  { id: 's054', year: 2003, title: '10月　サムライスピリッツ零　稼働開始　AC', description: 'サムスピシリーズ原点回帰作。過去を舞台に新旧キャラが揃いシリーズの原点を見つめ直した。', category: 'SNKの歴史', era: '平成' },
  { id: 's055', year: 2003, title: '12月　THE KING OF FIGHTERS 2003　稼働開始　AC', description: 'KOF灰編開始作。タッグシステムと灰という謎の少年によるオロチ封印解除が新たな因縁を生む。', category: 'SNKの歴史', era: '平成' },
  { id: 's056', year: 2004, title: '4月　METAL SLUG 5　稼働開始　AC', description: 'メタルスラッグ第5弾。敵組織プトレマイクが登場し激しい攻防が繰り広げられる。', category: 'SNKの歴史', era: '平成' },
  { id: 's057', year: 2005, title: '9月　サムライスピリッツ零SPECIAL　稼働開始　AC', description: 'サムスピ零の強化版。ラスボス羅将神ミヅキが使用可能となり新必殺技も追加された。', category: 'SNKの歴史', era: '平成' },
  { id: 's058', year: 2005, title: '10月　サムライスピリッツ 天下一剣客伝　稼働開始　AC', description: 'サムスピシリーズ初の3D格闘ゲーム（AC専用）。ポリゴングラフィックで新たな武器格闘を提示。', category: 'SNKの歴史', era: '平成' },
  { id: 's059', year: 2006, title: '2月　THE KING OF FIGHTERS XI　稼働開始　AC', description: 'KOF灰編完結作。ドリームキャンセルとQシステムで戦略の幅が広がった格闘ゲーム。', category: 'SNKの歴史', era: '平成' },
  { id: 's060', year: 2007, title: '6月　METAL SLUG 6　稼働開始　AC', description: 'メタルスラッグ第6弾。マルコ・フィオ・クラーク・ラルフが参戦しキャラの個性が追加された。', category: 'SNKの歴史', era: '平成' },
  { id: 's061', year: 2008, title: '7月　METAL SLUG 7　発売　DS', description: 'DS向けメタルスラッグ。下画面でサポート攻撃を指示するタッチ操作を採用した携帯版。', category: 'SNKの歴史', era: '平成' },
  { id: 's062', year: 2009, title: '4月　THE KING OF FIGHTERS XII　稼働開始　AC', description: 'KOFシリーズのリブート作。1ドット単位のHD手描きグラフィックに刷新され全キャラ描き直し。', category: 'SNKの歴史', era: '平成' },
  { id: 's063', year: 2009, title: '12月　METAL SLUG XX　発売　PSP', description: 'メタルスラッグ7の強化PSP移植版。新たなミッションとキャラクターが追加された。', category: 'SNKの歴史', era: '平成' },
  { id: 's064', year: 2010, title: '7月　THE KING OF FIGHTERS XIII　稼働開始　AC', description: 'KOF灰編最終章。超必殺技とMAX2システムで爽快感が頂点に達しシリーズ最高傑作の一つ。', category: 'SNKの歴史', era: '平成' },
  { id: 's065', year: 2016, title: '8月　THE KING OF FIGHTERS XIV　稼働開始　AC', description: 'KOFシリーズ初のフル3Dポリゴン作品。50キャラ超の大ボリュームでeスポーツ展開も加速。', category: 'SNKの歴史', era: '平成' },
  { id: 's066', year: 2018, title: '9月　SNKヒロインズ Tag Team Frenzy　発売　Switch/PS4', description: 'SNK女性キャラが大集合するタッグ格闘ゲーム。不知火舞・テリーの女性化版など個性的な参戦が話題に。', category: 'SNKの歴史', era: '平成' },
  { id: 's067', year: 2019, title: '6月　SAMURAI SPIRITS　稼働開始　AC', description: 'サムライスピリッツシリーズ22年ぶりの完全新作。PS4/Switchでも展開し世界的に注目を集めた。', category: 'SNKの歴史', era: '令和' },
  { id: 's068', year: 2022, title: '2月　THE KING OF FIGHTERS XV　発売　PS4/PC', description: 'KOFシリーズ最新作。39キャラ収録のオンライン対戦格闘。eスポーツとしての展開も強化された。', category: 'SNKの歴史', era: '令和' },
`

const insertPos = content.lastIndexOf('\n]')
content = content.slice(0, insertPos) + snkSection + content.slice(insertPos)

writeFileSync(eventsPath, content, 'utf-8')
console.log('✓ events.ts updated (68件追加)')
