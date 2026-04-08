import { readFileSync, writeFileSync } from 'fs'

// Helper: extract event lines from a script's template literal
function extractEventLines(src) {
  const m = src.match(/const (?:toAppend|data) = `([\s\S]*?)`/)
  if (!m) return []
  return m[1].split('\n').filter(l => l.trimStart().startsWith('{ id:'))
}

const h2 = extractEventLines(readFileSync('append-h2.mjs', 'utf-8'))   // h051-h112
const h3 = extractEventLines(readFileSync('append-h3.mjs', 'utf-8'))   // h113-h171
const h4 = extractEventLines(readFileSync('append-h4.mjs', 'utf-8'))   // h172-h234
const pp = extractEventLines(readFileSync('add-people2.mjs', 'utf-8')) // p101-p200 + h235-h350

// p01-p20: person birth entries
const p01_20 = [
  `  { id: 'p01', year: 574,  title: '聖徳太子',   description: '推古天皇の摂政として十七条憲法・冠位十二階を制定し遣隋使を派遣した飛鳥時代の改革者。仏教を国家の柱として日本の国家体制を整備した。', category: '人物', subcategory: '政治', keywords: ['聖徳太子'], era: '飛鳥奈良' },`,
  `  { id: 'p02', year: 614,  title: '藤原鎌足',   description: '中大兄皇子とともに蘇我氏を打倒し大化の改新を起こした政治家。臨終に際し藤原の姓を賜り日本最大の貴族氏族・藤原氏の始祖となった。', category: '人物', subcategory: '政治', keywords: ['藤原鎌足'], era: '飛鳥奈良' },`,
  `  { id: 'p03', year: 626,  title: '天智天皇',   description: '中大兄皇子として藤原鎌足と大化の改新を主導し後に天智天皇として即位。近江令の制定・庚午年籍の作成など国家体制の整備を進めた。', category: '人物', subcategory: '政治', keywords: ['天智天皇'], era: '飛鳥奈良' },`,
  `  { id: 'p04', year: 660,  title: '柿本人麻呂', description: '万葉集最大の歌人。天皇・皇族を称える長歌・短歌で宮廷歌人として活躍し「歌聖」と称された。日本語詩歌の頂点に立つ古代文学の巨人。', category: '人物', subcategory: '文化', keywords: ['柿本人麻呂'], era: '飛鳥奈良' },`,
  `  { id: 'p05', year: 660,  title: '山上憶良',   description: '奈良時代の歌人・官人。万葉集に貧窮問答歌・子らを思ふ歌など社会的・人間的情感を詠んだ歌を残した。庶民や家族への愛情を詠んだ異色の歌人。', category: '人物', subcategory: '文化', keywords: ['山上憶良'], era: '飛鳥奈良' },`,
  `  { id: 'p06', year: 668,  title: '行基',       description: '奈良時代の僧。民衆とともに道路・橋・池などの社会事業を行い東大寺大仏建立に協力した。朝廷から行基菩薩と称えられた民衆仏教の先駆者。', category: '人物', subcategory: '文化', keywords: ['行基'], era: '飛鳥奈良' },`,
  `  { id: 'p07', year: 701,  title: '阿倍仲麻呂', description: '奈良時代の遣唐留学生。唐の官僚として最高位まで昇りながら帰国を念じ続けた。李白・王維ら唐の詩人と交流し天の原ふりさけ見ればの歌で知られる。', category: '人物', subcategory: '文化', keywords: ['阿倍仲麻呂'], era: '飛鳥奈良' },`,
  `  { id: 'p08', year: 718,  title: '大伴家持',   description: '万葉集の最終編纂者とされる奈良時代の歌人・官人。万葉集に最多の473首が収録される。春の野に霞たなびきの歌など叙情的な歌風で知られる。', category: '人物', subcategory: '文化', keywords: ['大伴家持'], era: '飛鳥奈良' },`,
  `  { id: 'p09', year: 767,  title: '最澄',       description: '天台宗の開祖。比叡山に延暦寺を建立し唐から天台教学を伝えた。空海とともに平安仏教の二大巨峰をなし後に伝教大師と諡された。', category: '人物', subcategory: '文化', keywords: ['最澄'], era: '平安' },`,
  `  { id: 'p10', year: 774,  title: '空海',       description: '真言宗の開祖。唐で密教を学び帰国後に高野山金剛峯寺を開いた。書・詩・哲学にも優れ弘法大師として日本で最も親しまれる仏教者。', category: '人物', subcategory: '文化', keywords: ['空海'], era: '平安' },`,
  `  { id: 'p11', year: 845,  title: '菅原道真',   description: '平安時代の学者・政治家。遣唐使の廃止を建議し右大臣まで昇ったが藤原時平に陥れられ大宰府に左遷。学問の神・天神様として全国の天満宮に祀られる。', category: '人物', subcategory: '政治', keywords: ['菅原道真'], era: '平安' },`,
  `  { id: 'p12', year: 872,  title: '紀貫之',     description: '平安時代の歌人。古今和歌集の撰者の中心人物として仮名序を執筆し土佐日記を著した。和歌の理論と実践で平安文学の確立に最大の貢献をした。', category: '人物', subcategory: '文化', keywords: ['紀貫之'], era: '平安' },`,
  `  { id: 'p13', year: 903,  title: '空也',       description: '平安中期の僧。市の聖と呼ばれ都の市場で踊りながら念仏を広めた。六波羅蜜寺を創建し庶民への仏教普及の先駆者となった。', category: '人物', subcategory: '文化', keywords: ['空也'], era: '平安' },`,
  `  { id: 'p14', year: 942,  title: '源信',       description: '平安時代の天台宗の僧。往生要集を著し極楽浄土と地獄の様相を描写して末法思想・浄土信仰を大衆に広めた。後の法然・親鸞に大きな影響を与えた。', category: '人物', subcategory: '文化', keywords: ['源信'], era: '平安' },`,
  `  { id: 'p15', year: 966,  title: '藤原道長',   description: '平安時代の摂関政治の絶頂を体現した貴族。この世をば我が世とぞ思ふ望月の…の和歌に示される権勢の頂点に立った。三人の娘を天皇の后にした。', category: '人物', subcategory: '政治', keywords: ['藤原道長'], era: '平安' },`,
  `  { id: 'p16', year: 966,  title: '清少納言',   description: '平安時代の女性文学者。一条天皇の中宮・定子に仕え枕草子を著した。春はあけぼので始まる機知あふれる随筆は日本三大随筆の一つとして後世に名を残す。', category: '人物', subcategory: '文化', keywords: ['清少納言'], era: '平安' },`,
  `  { id: 'p17', year: 973,  title: '紫式部',     description: '平安時代の女性文学者。一条天皇の中宮・彰子に仕え源氏物語を著した。光源氏を主人公とした長編物語は世界最古の小説とも称され日本文学の至宝。', category: '人物', subcategory: '文化', keywords: ['紫式部'], era: '平安' },`,
  `  { id: 'p18', year: 976,  title: '和泉式部',   description: '平安時代の女性歌人。情熱的な恋愛歌で知られ百人一首にも歌が選ばれた六歌仙に準じる歌人。あらざらむこの世のほかの思ひ出にという名歌で知られる。', category: '人物', subcategory: '文化', keywords: ['和泉式部'], era: '平安' },`,
  `  { id: 'p19', year: 980,  title: '一条天皇',   description: '平安時代の天皇。紫式部・清少納言・和泉式部ら才女を宮廷に集め平安文化の黄金期を演出した。文化・学問への深い理解で知られ治世は平安文学の全盛期となった。', category: '人物', subcategory: '政治', keywords: ['一条天皇'], era: '平安' },`,
  `  { id: 'p20', year: 992,  title: '藤原頼通',   description: '藤原道長の長男。宇治に平等院鳳凰堂を建立し摂関政治を継承したが武家の台頭により摂関家の権勢は衰退した。宇治文化の担い手として知られる。', category: '人物', subcategory: '政治', keywords: ['藤原頼通'], era: '平安' },`,
]

// p21-p100: person birth entries (reconstructed from known history)
const p21_100 = [
  `  { id: 'p21', year: 1039, title: '源義家',     description: '平安後期の武将。源頼義の子。前九年の役・後三年の役で活躍し東国武士の棟梁としての源氏の地位を確立した。八幡太郎義家の名で知られる。', category: '人物', subcategory: '軍事', keywords: ['源義家'], era: '平安' },`,
  `  { id: 'p22', year: 1118, title: '平清盛',     description: '平安末期の武将・太政大臣。武士として初めて朝廷の最高職に就き日宋貿易を推進した。平氏政権を打ち立てたが源平合戦で一族は滅亡した。', category: '人物', subcategory: '政治', keywords: ['平清盛'], era: '平安' },`,
  `  { id: 'p23', year: 1123, title: '源義朝',     description: '平安末期の武将。源為義の嫡男。保元の乱で勝利したが平治の乱で平清盛に敗れ尾張で謀殺された。源頼朝・義経の父。', category: '人物', subcategory: '軍事', keywords: ['源義朝'], era: '平安' },`,
  `  { id: 'p24', year: 1127, title: '後白河法皇', description: '平安後期の天皇・院政の主導者。保元の乱で崇徳上皇を退けた後34年間院政を行い「日本一の大天狗」と称された。梁塵秘抄を編纂した文化人でもある。', category: '人物', subcategory: '政治', keywords: ['後白河法皇'], era: '平安' },`,
  `  { id: 'p25', year: 1133, title: '法然',       description: '鎌倉仏教の先駆者。専修念仏を唱え浄土宗を開宗した。南無阿弥陀仏を称えれば誰でも救われるという教えは庶民に広まり後の親鸞ら多くの弟子を育てた。', category: '人物', subcategory: '文化', keywords: ['法然'], era: '鎌倉' },`,
  `  { id: 'p26', year: 1141, title: '栄西',       description: '鎌倉時代の僧。臨済宗を日本に伝え建仁寺を創建した。宋から茶の種を持ち帰り喫茶養生記を著して日本に茶の習慣を広めた禅と茶の伝道者。', category: '人物', subcategory: '文化', keywords: ['栄西'], era: '鎌倉' },`,
  `  { id: 'p27', year: 1147, title: '源頼朝',     description: '鎌倉幕府の創始者。壇ノ浦で平氏を滅ぼし征夷大将軍に就任して鎌倉に幕府を開いた。約700年続く武家政権時代の幕を開いた。', category: '人物', subcategory: '政治', keywords: ['源頼朝'], era: '鎌倉' },`,
  `  { id: 'p28', year: 1157, title: '北条政子',   description: '源頼朝の妻。頼朝没後に尼将軍として鎌倉幕府の実権を握り承久の乱で御家人を鼓舞して後鳥羽上皇の討幕を退けた。日本三大悪女の一人ともされる。', category: '人物', subcategory: '政治', keywords: ['北条政子'], era: '鎌倉' },`,
  `  { id: 'p29', year: 1159, title: '源義経',     description: '源頼朝の弟。一ノ谷・屋島・壇ノ浦で平氏を破った天才的武将。兄・頼朝と対立し追われて平泉で自害した。判官贔屓の原点となった悲劇の英雄。', category: '人物', subcategory: '軍事', keywords: ['源義経'], era: '鎌倉' },`,
  `  { id: 'p30', year: 1173, title: '親鸞',       description: '浄土真宗の開祖。師・法然の念仏思想を深化させ悪人正機を説いた。教行信証を著し非僧非俗として肉食妻帯を公言した革新的な宗教家。', category: '人物', subcategory: '文化', keywords: ['親鸞'], era: '鎌倉' },`,
  `  { id: 'p31', year: 1183, title: '北条泰時',   description: '鎌倉幕府第3代執権。承久の乱の幕府軍総大将として勝利し御成敗式目（武家法度）を制定した。武家最初の成文法で道理に基づく政治を確立した。', category: '人物', subcategory: '政治', keywords: ['北条泰時'], era: '鎌倉' },`,
  `  { id: 'p32', year: 1200, title: '道元',       description: '曹洞宗の開祖。入宋して禅を修め帰国後に越前・永平寺を開いた。只管打坐（ただ座禅を組むこと）を説き修行そのものが悟りと論じた。', category: '人物', subcategory: '文化', keywords: ['道元'], era: '鎌倉' },`,
  `  { id: 'p33', year: 1222, title: '日蓮',       description: '日蓮宗の開祖。南無妙法蓮華経の題目を唱えることで成仏できると説き他宗を激しく批判した。立正安国論を幕府に提出し蒙古来襲を予言した。', category: '人物', subcategory: '文化', keywords: ['日蓮'], era: '鎌倉' },`,
  `  { id: 'p34', year: 1239, title: '一遍',       description: '時宗の開祖。踊り念仏で知られ全国遊行の旅を続けながら庶民に念仏を広めた。他力本願を徹底し阿弥陀仏の本願に一切を任せることを説いた。', category: '人物', subcategory: '文化', keywords: ['一遍'], era: '鎌倉' },`,
  `  { id: 'p35', year: 1251, title: '北条時宗',   description: '鎌倉幕府第8代執権。文永・弘安の役で元の大軍を二度退けた。神風（暴風雨）の助けもあったが外交を拒否し国難を乗り越えた鎌倉幕府の英雄。', category: '人物', subcategory: '軍事', keywords: ['北条時宗'], era: '鎌倉' },`,
  `  { id: 'p36', year: 1288, title: '後醍醐天皇', description: '鎌倉幕府を倒した天皇。建武の新政を始めたが論功行賞の不公平で武士の支持を失い足利尊氏に京都を追われ吉野に南朝を開いた。', category: '人物', subcategory: '政治', keywords: ['後醍醐天皇'], era: '室町' },`,
  `  { id: 'p37', year: 1294, title: '楠木正成',   description: '南北朝時代の武将。後醍醐天皇に忠節を尽くし千早城籠城戦のゲリラ戦術で幕府軍を翻弄した。湊川の戦いで戦死し忠臣の鑑として後世に称えられた。', category: '人物', subcategory: '軍事', keywords: ['楠木正成'], era: '室町' },`,
  `  { id: 'p38', year: 1305, title: '足利尊氏',   description: '室町幕府の初代将軍。後醍醐天皇から離反し南北朝の内乱を経て室町幕府を開いた。北朝の光明天皇を立て征夷大将軍に就任した。', category: '人物', subcategory: '政治', keywords: ['足利尊氏'], era: '室町' },`,
  `  { id: 'p39', year: 1358, title: '足利義満',   description: '室町幕府第3代将軍。南北朝を合一し金閣寺を建立した。日明貿易（勘合貿易）を開始し幕府権力の絶頂を体現した北山文化の担い手。', category: '人物', subcategory: '政治', keywords: ['足利義満'], era: '室町' },`,
  `  { id: 'p40', year: 1363, title: '世阿弥',     description: '室町時代の能楽師・能作者。父・観阿弥とともに猿楽能を洗練させ風姿花伝を著した。幽玄の美を追求し初心忘るべからずの言葉でも知られる日本芸術の巨人。', category: '人物', subcategory: '文化', keywords: ['世阿弥'], era: '室町' },`,
  `  { id: 'p41', year: 1394, title: '一休宗純',   description: '室町時代の禅僧。大徳寺を復興し破戒的な行動で権威を批判しながら禅の本質を問い続けた奇僧。一休さんのアニメで広く親しまれる。', category: '人物', subcategory: '文化', keywords: ['一休宗純'], era: '室町' },`,
  `  { id: 'p42', year: 1415, title: '蓮如',       description: '浄土真宗本願寺第8世。御文（御文章）と呼ばれる平易な仮名書きの手紙で教義を広め本願寺を急成長させた。一向宗を庶民信仰として確立した中興の祖。', category: '人物', subcategory: '文化', keywords: ['蓮如'], era: '室町' },`,
  `  { id: 'p43', year: 1420, title: '雪舟',       description: '室町時代の禅僧・水墨画家。明に渡り水墨画を極め帰国後に日本独自の水墨画様式を確立した。天橋立図・四季山水図など国宝多数。日本絵画の革新者。', category: '人物', subcategory: '文化', keywords: ['雪舟'], era: '室町' },`,
  `  { id: 'p44', year: 1432, title: '北条早雲',   description: '戦国大名の先駆け。伊豆・相模を制圧し下剋上の先例を作った後北条氏の始祖。今川氏の客将から独立した戦国大名となり戦国時代の幕を開いた。', category: '人物', subcategory: '軍事', keywords: ['北条早雲'], era: '室町' },`,
  `  { id: 'p45', year: 1519, title: '今川義元',   description: '東海道の覇者として知られた戦国大名。今川仮名目録を整備した法制度の整備者でもあった。桶狭間の戦いで織田信長に奇襲され戦死した。', category: '人物', subcategory: '軍事', keywords: ['今川義元'], era: '室町' },`,
  `  { id: 'p46', year: 1521, title: '武田信玄',   description: '甲斐の戦国大名。信玄堤・甲州法度之次第など治水・法制度に優れ川中島の戦いで上杉謙信と激突した。騎馬軍団を率いた戦国最強の武将の一人。', category: '人物', subcategory: '軍事', keywords: ['武田信玄'], era: '室町' },`,
  `  { id: 'p47', year: 1522, title: '千利休',     description: '戦国・安土桃山時代の茶人。侘び茶を大成させ秀吉の茶頭として活躍した。草庵・侘びの美学を極め日本茶道の祖とされるが秀吉の命により切腹した。', category: '人物', subcategory: '文化', keywords: ['千利休'], era: '安土桃山' },`,
  `  { id: 'p48', year: 1528, title: '明智光秀',   description: '戦国・安土桃山時代の武将。織田信長の重臣として活躍したが本能寺の変で信長を討った。山崎の戦いで羽柴秀吉に敗れわずか13日で討たれた。', category: '人物', subcategory: '軍事', keywords: ['明智光秀'], era: '安土桃山' },`,
  `  { id: 'p49', year: 1530, title: '上杉謙信',   description: '越後の戦国大名。義を重んじ関東管領に就任し川中島で武田信玄と5度激突した。毘沙門天の加護を信じ自ら軍神と称された。', category: '人物', subcategory: '軍事', keywords: ['上杉謙信'], era: '室町' },`,
  `  { id: 'p50', year: 1534, title: '織田信長',   description: '戦国・安土桃山時代の大名。桶狭間の奇跡から天下統一直前まで駆け上がった。楽市楽座・鉄砲活用・室町幕府滅亡など革新的政策を次々と実行した。', category: '人物', subcategory: '政治', keywords: ['織田信長'], era: '安土桃山' },`,
  `  { id: 'p51', year: 1537, title: '豊臣秀吉',   description: '織田信長の後継者として天下統一を果たした武将。農民出身から太政大臣・関白まで昇り詰めた。刀狩・太閤検地で近世社会の基礎を作った。', category: '人物', subcategory: '政治', keywords: ['豊臣秀吉'], era: '安土桃山' },`,
  `  { id: 'p52', year: 1543, title: '徳川家康',   description: '江戸幕府の創始者。関ヶ原の戦いに勝利し征夷大将軍に就任。265年続く江戸幕府を開き泰平の世の礎を築いた。鳴くまで待とうほととぎすの逸話で知られる。', category: '人物', subcategory: '政治', keywords: ['徳川家康'], era: '江戸' },`,
  `  { id: 'p53', year: 1560, title: '石田三成',   description: '豊臣秀吉の五奉行の一人。関ヶ原の戦いで西軍を組織して徳川家康に挑んだ。秀吉への忠義を貫き戦後捕らえられて処刑された律義者の武将。', category: '人物', subcategory: '政治', keywords: ['石田三成'], era: '安土桃山' },`,
  `  { id: 'p54', year: 1562, title: '加藤清正',   description: '豊臣秀吉の武将。朝鮮出兵での活躍と熊本城築城で知られる。虎退治の逸話でも有名で賤ヶ岳七本槍の一人として戦国武将の象徴的存在。', category: '人物', subcategory: '軍事', keywords: ['加藤清正'], era: '安土桃山' },`,
  `  { id: 'p55', year: 1567, title: '伊達政宗',   description: '奥州の戦国大名。独眼竜の異名を持ち東北を制覇した。支倉常長をヨーロッパに派遣するなど開明的な政策を採り仙台城下町を建設した。', category: '人物', subcategory: '軍事', keywords: ['伊達政宗'], era: '安土桃山' },`,
  `  { id: 'p56', year: 1584, title: '宮本武蔵',   description: '江戸時代の剣客。巌流島の決闘で佐々木小次郎を破り生涯不敗を誇った。晩年に五輪書を著し二天一流を創始。剣豪の代名詞的存在。', category: '人物', subcategory: '文化', keywords: ['宮本武蔵'], era: '江戸' },`,
  `  { id: 'p57', year: 1628, title: '徳川光圀',   description: '水戸藩第2代藩主。大日本史の編纂を開始し水戸学の基礎を築いた。黄門様として庶民に親しまれ全国漫遊のイメージで知られる。', category: '人物', subcategory: '政治', keywords: ['徳川光圀'], era: '江戸' },`,
  `  { id: 'p58', year: 1642, title: '井原西鶴',   description: '江戸時代の浮世草子作家・俳人。好色一代男・日本永代蔵など元禄期の町人文化を描いた作品で知られる。近代文学の先駆けとなる写実的な描写が特徴。', category: '人物', subcategory: '文化', keywords: ['井原西鶴'], era: '江戸' },`,
  `  { id: 'p59', year: 1644, title: '松尾芭蕉',   description: '江戸時代の俳人。俳諧を芸術に高めた俳聖。奥の細道の旅で古池や蛙飛び込む水の音など数多くの名句を詠んだ。侘び・寂びの美学を俳句で表現した。', category: '人物', subcategory: '文化', keywords: ['松尾芭蕉'], era: '江戸' },`,
  `  { id: 'p60', year: 1653, title: '近松門左衛門', description: '江戸時代の浄瑠璃・歌舞伎作者。曽根崎心中・国性爺合戦など町人の情愛を描いた作品で日本のシェイクスピアと称された。世話物浄瑠璃の確立者。', category: '人物', subcategory: '文化', keywords: ['近松門左衛門'], era: '江戸' },`,
  `  { id: 'p61', year: 1657, title: '新井白石',   description: '江戸中期の儒学者・政治家。六代・七代将軍の侍講として正徳の治を推進した。折たく柴の記・西洋紀聞を著した江戸の知識人。', category: '人物', subcategory: '政治', keywords: ['新井白石'], era: '江戸' },`,
  `  { id: 'p62', year: 1684, title: '徳川吉宗',   description: '江戸幕府第8代将軍。享保の改革で財政再建・制度整備を行い米将軍と呼ばれた。目安箱の設置・公事方御定書の制定など名君として知られる。', category: '人物', subcategory: '政治', keywords: ['徳川吉宗'], era: '江戸' },`,
  `  { id: 'p63', year: 1728, title: '平賀源内',   description: '江戸時代の発明家・本草学者・文人。エレキテルの復元や土用の丑の日ウナギの普及など奇抜な発想の多才な人物。蘭学・浄瑠璃・戯作と幅広く活躍した。', category: '人物', subcategory: '文化', keywords: ['平賀源内'], era: '江戸' },`,
  `  { id: 'p64', year: 1730, title: '本居宣長',   description: '江戸時代の国学者。古事記伝を35年かけて完成させ国学を大成した。もののあわれ論を提唱し日本固有の文学・精神の解明に最大の貢献をした。', category: '人物', subcategory: '文化', keywords: ['本居宣長'], era: '江戸' },`,
  `  { id: 'p65', year: 1733, title: '杉田玄白',   description: '江戸時代の蘭方医。解体新書を翻訳・出版し日本に近代解剖学を伝えた。蘭学の普及に尽力し日本近代医学の父とも称される。', category: '人物', subcategory: '文化', keywords: ['杉田玄白'], era: '江戸' },`,
  `  { id: 'p66', year: 1745, title: '伊能忠敬',   description: '江戸後期の測量家。55歳から17年かけて全国を歩き測量し大日本沿海輿地全図を完成させた。現代地図と比肩する正確さは驚異的精度を誇る。', category: '人物', subcategory: '文化', keywords: ['伊能忠敬'], era: '江戸' },`,
  `  { id: 'p67', year: 1760, title: '葛飾北斎',   description: '江戸後期の浮世絵師。富嶽三十六景の神奈川沖浪裏はモネ・ゴッホら西洋印象派に影響を与えた。北斎漫画など生涯に3万点以上の作品を残した。', category: '人物', subcategory: '文化', keywords: ['葛飾北斎'], era: '江戸' },`,
  `  { id: 'p68', year: 1793, title: '大塩平八郎', description: '江戸後期の陽明学者・大坂町奉行所与力。飢饉の中で窮民救済を幕府に訴えたが聞き入れられず大坂で反乱を起こした。元役人の反乱として幕府に衝撃を与えた。', category: '人物', subcategory: '政治', keywords: ['大塩平八郎'], era: '江戸' },`,
  `  { id: 'p69', year: 1797, title: '歌川広重',   description: '江戸後期の浮世絵師。東海道五十三次など風景版画の傑作を残した。モネ・ゴッホら西洋印象派の画家に影響を与えた日本絵画の国際的代表者。', category: '人物', subcategory: '文化', keywords: ['歌川広重'], era: '江戸' },`,
  `  { id: 'p70', year: 1815, title: '井伊直弼',   description: '幕末の大老。日米修好通商条約を勅許なく調印し安政の大獄で反対派を弾圧した。水戸・薩摩の浪士により桜田門外で暗殺されて幕府権威は失墜した。', category: '人物', subcategory: '政治', keywords: ['井伊直弼'], era: '幕末' },`,
  `  { id: 'p71', year: 1823, title: '勝海舟',     description: '幕末・明治の政治家・海軍軍人。咸臨丸で太平洋を横断し西郷隆盛と会談して江戸城を無血開城させた。100万都市・江戸の戦禍を救った英雄。', category: '人物', subcategory: '政治', keywords: ['勝海舟'], era: '幕末' },`,
  `  { id: 'p72', year: 1828, title: '西郷隆盛',   description: '幕末・明治の薩摩藩士。討幕運動を主導し明治維新を実現したが征韓論に破れて下野し西南戦争で政府軍に敗れ城山で自刃した。明治維新三傑の一人。', category: '人物', subcategory: '政治', keywords: ['西郷隆盛'], era: '明治' },`,
  `  { id: 'p73', year: 1830, title: '吉田松陰',   description: '幕末の思想家・教育者。松下村塾で伊藤博文・高杉晋作ら明治維新の指導者を育てた。安政の大獄で29歳で処刑されたが弟子たちを通じて明治維新を動かした。', category: '人物', subcategory: '文化', keywords: ['吉田松陰'], era: '幕末' },`,
  `  { id: 'p74', year: 1830, title: '大久保利通', description: '明治維新三傑の一人。廃藩置県・殖産興業を推進した。岩倉使節団で欧米を視察し富国強兵・近代化を推進したが紀尾井坂の変で暗殺された。', category: '人物', subcategory: '政治', keywords: ['大久保利通'], era: '明治' },`,
  `  { id: 'p75', year: 1833, title: '木戸孝允',   description: '明治維新三傑の一人。薩長同盟の締結に尽力し版籍奉還・廃藩置県を推進した。五箇条の御誓文の原案作成にも関与し明治国家の骨格を作った。', category: '人物', subcategory: '政治', keywords: ['木戸孝允'], era: '幕末' },`,
  `  { id: 'p76', year: 1834, title: '近藤勇',     description: '幕末の剣客・新選組局長。京都守護職のもとで新選組を組織し尊攘派を取り締まった。池田屋事件で名を馳せたが戊辰戦争後に処刑された。', category: '人物', subcategory: '軍事', keywords: ['近藤勇'], era: '幕末' },`,
  `  { id: 'p77', year: 1835, title: '福沢諭吉',   description: '明治の啓蒙思想家・教育者。学問のすゝめ・文明論之概略を著し独立自尊を説いた。慶應義塾を設立し日本の近代化・西洋化を主導した。一万円札の肖像。', category: '人物', subcategory: '文化', keywords: ['福沢諭吉'], era: '明治' },`,
  `  { id: 'p78', year: 1835, title: '土方歳三',   description: '幕末の武士・新選組副長。鬼の副長として新選組を統率し戊辰戦争では最後まで戦い函館・五稜郭で銃弾に倒れた。幕末最後の武士とも称される。', category: '人物', subcategory: '軍事', keywords: ['土方歳三'], era: '幕末' },`,
  `  { id: 'p79', year: 1836, title: '坂本龍馬',   description: '幕末の志士。薩長同盟の仲介と大政奉還建議に貢献し歴史の転換点を作った。享年32歳で暗殺されたが自由と革新の英雄として後世に愛され続ける。', category: '人物', subcategory: '政治', keywords: ['坂本龍馬'], era: '幕末' },`,
  `  { id: 'p80', year: 1838, title: '山縣有朋',   description: '明治の陸軍大将・首相。近代陸軍を創設し元老として明治・大正の政治を主導した。軍閥の形成者として政党政治の発展を阻んだ側面もある。', category: '人物', subcategory: '政治', keywords: ['山縣有朋'], era: '明治' },`,
  `  { id: 'p81', year: 1839, title: '高杉晋作',   description: '幕末の長州藩士。奇兵隊を結成し第二次長州征伐で幕府軍を撃退した。歴史は奇をもって勝つを実践した改革者。27歳で病死した。', category: '人物', subcategory: '軍事', keywords: ['高杉晋作'], era: '幕末' },`,
  `  { id: 'p82', year: 1840, title: '渋沢栄一',   description: '明治の実業家。第一国立銀行設立など500以上の企業設立に関与した日本資本主義の父。論語と算盤の思想で道徳と経済の両立を説いた。一万円札の新肖像。', category: '人物', subcategory: '経済', keywords: ['渋沢栄一'], era: '明治' },`,
  `  { id: 'p83', year: 1841, title: '伊藤博文',   description: '初代内閣総理大臣。大日本帝国憲法の制定を主導し日清戦争後の下関条約交渉も担った。4度首相を務めたが韓国・ハルビンで安重根に暗殺された。', category: '人物', subcategory: '政治', keywords: ['伊藤博文'], era: '明治' },`,
  `  { id: 'p84', year: 1848, title: '東郷平八郎', description: '明治の海軍大将。日露戦争の日本海海戦でバルチック艦隊を撃滅したことから東洋のネルソンと称された。聯合艦隊司令長官として日本に大勝利をもたらした。', category: '人物', subcategory: '軍事', keywords: ['東郷平八郎'], era: '明治' },`,
  `  { id: 'p85', year: 1853, title: '北里柴三郎', description: '明治の細菌学者。破傷風菌の純粋培養と血清療法を開発しペスト菌を発見した。北里研究所を設立し日本近代医学の基礎を築いた。千円札の新肖像。', category: '人物', subcategory: '文化', keywords: ['北里柴三郎'], era: '明治' },`,
  `  { id: 'p86', year: 1862, title: '森鷗外',     description: '明治・大正の小説家・軍医。舞姫・阿部一族・高瀬舟など多彩な文学作品を残し夏目漱石と並ぶ近代文学の二大巨峰とされる。', category: '人物', subcategory: '文化', keywords: ['森鷗外'], era: '明治' },`,
  `  { id: 'p87', year: 1864, title: '津田梅子',   description: '明治の女性教育者。岩倉使節団で6歳の時渡米した最年少留学生。帰国後に女子英学塾（津田塾大学）を設立した女子高等教育の先駆者。', category: '人物', subcategory: '文化', keywords: ['津田梅子'], era: '明治' },`,
  `  { id: 'p88', year: 1867, title: '夏目漱石',   description: '明治・大正の小説家。吾輩は猫である・坊っちゃん・こころなど近代日本文学の代表作を著した。千円札の旧肖像として親しまれた国民的作家。', category: '人物', subcategory: '文化', keywords: ['夏目漱石'], era: '明治' },`,
  `  { id: 'p89', year: 1872, title: '樋口一葉',   description: '明治の女性作家。たけくらべ・にごりえなど女性の悲哀を描いた近代女性文学の先駆者。24歳で夭逝したが五千円札の旧肖像として親しまれた。', category: '人物', subcategory: '文化', keywords: ['樋口一葉'], era: '明治' },`,
  `  { id: 'p90', year: 1876, title: '野口英世',   description: '明治の細菌学者。梅毒スピロヘータの純粋培養など感染症研究に取り組んだ。ガーナで黄熱病研究中に自ら感染し死去した。千円札の旧肖像。', category: '人物', subcategory: '文化', keywords: ['野口英世'], era: '明治' },`,
  `  { id: 'p91', year: 1878, title: '与謝野晶子', description: '明治・大正の歌人。みだれ髪で情熱的な恋愛を大胆に詠み因習を打ち破った。君死にたまふことなかれで反戦を詠んだ女性の自立と表現の先駆者。', category: '人物', subcategory: '文化', keywords: ['与謝野晶子'], era: '明治' },`,
  `  { id: 'p92', year: 1892, title: '芥川龍之介', description: '大正の小説家。羅生門・鼻・藪の中など短編小説の傑作を多数残した。将来に対する唯ぼんやりした不安の遺書を残し35歳で自殺した。芥川賞の由来。', category: '人物', subcategory: '文化', keywords: ['芥川龍之介'], era: '大正' },`,
  `  { id: 'p93', year: 1894, title: '松下幸之助', description: '昭和の実業家。パナソニックの前身・松下電器産業を創業し経営の神様と称された。水道哲学・ダム式経営など独自の経営哲学でグローバル企業を育てた。', category: '人物', subcategory: '経済', keywords: ['松下幸之助'], era: '大正' },`,
  `  { id: 'p94', year: 1896, title: '宮沢賢治',   description: '大正・昭和の詩人・童話作家。春と修羅・銀河鉄道の夜・注文の多い料理店など生前は無名だったが死後に高く評価された。岩手の農業普及にも尽力した。', category: '人物', subcategory: '文化', keywords: ['宮沢賢治'], era: '大正' },`,
  `  { id: 'p95', year: 1899, title: '川端康成',   description: '昭和の小説家。雪国・伊豆の踊子など日本の美意識を繊細に描いた作品で日本人初のノーベル文学賞を受賞した。日本の美の表現者として世界に評価された。', category: '人物', subcategory: '文化', keywords: ['川端康成'], era: '大正' },`,
  `  { id: 'p96', year: 1907, title: '湯川秀樹',   description: '昭和の物理学者。核力を媒介する中間子の存在を理論的に予言し日本人・アジア人初のノーベル物理学賞を受賞した。戦後日本の科学者の象徴。', category: '人物', subcategory: '文化', keywords: ['湯川秀樹'], era: '大正' },`,
  `  { id: 'p97', year: 1909, title: '太宰治',     description: '昭和の小説家。走れメロス・人間失格など自己の苦悩を描いた作品で昭和の無頼派文学を代表した。人間失格を書き上げ38歳で玉川上水に入水自殺した。', category: '人物', subcategory: '文化', keywords: ['太宰治'], era: '昭和' },`,
  `  { id: 'p98', year: 1910, title: '黒澤明',     description: '昭和の映画監督。羅生門・七人の侍・乱など世界映画史の傑作を監督した。スピルバーグ・コッポラら世界の巨匠に影響を与えた映画の神様。', category: '人物', subcategory: '文化', keywords: ['黒澤明'], era: '昭和' },`,
  `  { id: 'p99', year: 1918, title: '田中角栄',   description: '昭和の政治家。日中国交正常化と日本列島改造論を推進した。小学校卒業で首相まで昇り詰めた今太閤。ロッキード事件で逮捕された。', category: '人物', subcategory: '政治', keywords: ['田中角栄'], era: '昭和' },`,
  `  { id: 'p100', year: 1925, title: '三島由紀夫', description: '昭和の小説家。金閣寺・豊饒の海など純文学の傑作を著し楯の会を率いて自衛隊市ヶ谷駐屯地でクーデターを呼びかけ割腹自決した。', category: '人物', subcategory: '文化', keywords: ['三島由紀夫'], era: '昭和' },`,
]

// h001-h050: achievement events for p01-p20
const h001_050 = [
  // p01 聖徳太子
  `  { id: 'h001', year: 593,  title: '聖徳太子が摂政に就任し仏教振興と国家体制整備を進める', description: '推古天皇の摂政として即位し仏教を国家の柱とした。法隆寺の建立・四天王寺の創建を行い東アジアの先進文化を積極的に取り込んだ。', category: '人物', subcategory: '政治', keywords: ['聖徳太子'], era: '飛鳥奈良' },`,
  `  { id: 'h002', year: 604,  title: '聖徳太子が冠位十二階・十七条憲法を制定する', description: '個人の才能・功績で位階を与える冠位十二階と役人の心得を定めた十七条憲法を制定。仏教・儒教を基盤とした日本初の成文法的規範を確立した。', category: '人物', subcategory: '政治', keywords: ['聖徳太子'], era: '飛鳥奈良' },`,
  `  { id: 'h003', year: 607,  title: '聖徳太子が遣隋使（小野妹子）を派遣する', description: '日出ずる処の天子…の国書を持たせた遣隋使を派遣し対等外交を宣言した。中国文化・仏教・律令制度を積極的に学ぶ開かれた国家方針を示した。', category: '人物', subcategory: '外交', keywords: ['聖徳太子'], era: '飛鳥奈良' },`,
  // p02 藤原鎌足
  `  { id: 'h004', year: 645,  title: '藤原鎌足が中大兄皇子と大化の改新を起こす', description: '蘇我入鹿を宮中で暗殺（乙巳の変）し大化の改新を開始。公地公民制・国郡里制など中央集権国家の骨格を作った日本最大の政治改革。', category: '人物', subcategory: '政治', keywords: ['藤原鎌足'], era: '飛鳥奈良' },`,
  // p03 天智天皇
  `  { id: 'h005', year: 663,  title: '天智天皇が白村江の戦いで唐・新羅連合軍に敗れる', description: '百済復興支援のため朝鮮半島に大軍を派遣したが唐・新羅連合軍に大敗。以後の日本の外交・国防政策を大きく変える転換点となった。', category: '人物', subcategory: '軍事', keywords: ['天智天皇'], era: '飛鳥奈良' },`,
  `  { id: 'h006', year: 667,  title: '天智天皇が近江大津宮に遷都し庚午年籍を作成する', description: '都を飛鳥から近江大津宮に移し全国的な戸籍（庚午年籍）を初めて作成。律令国家建設の基礎となる人口把握・土地把握の先駆けとなった。', category: '人物', subcategory: '政治', keywords: ['天智天皇'], era: '飛鳥奈良' },`,
  // p04 柿本人麻呂
  `  { id: 'h007', year: 689,  title: '柿本人麻呂が宮廷歌人として長歌の傑作を詠む', description: '天武・持統天皇期の宮廷で天皇・皇族を称える壮大な長歌を詠んだ。東の野に炎の立つ見えてなど自然と人間を大スケールで詠んだ万葉集の代表歌人。', category: '人物', subcategory: '文化', keywords: ['柿本人麻呂'], era: '飛鳥奈良' },`,
  // p05 山上憶良
  `  { id: 'h008', year: 727,  title: '山上憶良が貧窮問答歌・子らを思ふ歌を詠む', description: '農民の貧しさを描いた貧窮問答歌と子への愛情を詠んだ子らを思ふ歌を万葉集に残した。社会的視点と人間的情感で万葉集の中でも異色の歌人。', category: '人物', subcategory: '文化', keywords: ['山上憶良'], era: '飛鳥奈良' },`,
  // p06 行基
  `  { id: 'h009', year: 745,  title: '行基が東大寺大仏建立に協力し行基菩薩と称えられる', description: '当初は私的説法を禁じられたが庶民の支持を背景に道路・橋・池の建設などの社会事業を続け朝廷に認められた。東大寺大仏建立に多大な貢献をした。', category: '人物', subcategory: '文化', keywords: ['行基'], era: '飛鳥奈良' },`,
  // p07 阿倍仲麻呂
  `  { id: 'h010', year: 717,  title: '阿倍仲麻呂が遣唐使として唐に渡り最高位の官職に就く', description: '17歳で唐に渡り科挙に合格して唐の官僚として最高位（光禄大夫）まで昇った。李白・王維ら詩人と交流し天の原ふりさけ見ればの歌を詠んだ。', category: '人物', subcategory: '文化', keywords: ['阿倍仲麻呂'], era: '飛鳥奈良' },`,
  // p08 大伴家持
  `  { id: 'h011', year: 759,  title: '大伴家持が万葉集を最終的に編纂する', description: '673年から759年頃に至る4500首以上の和歌を集めた万葉集の最終的な編者とされる。天平の風土・人々の感情を和歌で記録した日本最古の和歌集の完成。', category: '人物', subcategory: '文化', keywords: ['大伴家持'], era: '飛鳥奈良' },`,
  // p09 最澄
  `  { id: 'h012', year: 804,  title: '最澄が遣唐使船で唐に渡り天台教学を学ぶ', description: '天台山で修学し天台宗の奥義を学んで帰国。比叡山延暦寺を天台宗の根本道場として整備し後に日本仏教の全宗派の母山と呼ばれる大教育機関を作った。', category: '人物', subcategory: '文化', keywords: ['最澄'], era: '平安' },`,
  `  { id: 'h013', year: 822,  title: '最澄が比叡山延暦寺に大乗戒壇を設立する', description: '従来の奈良仏教の支配から独立した大乗戒壇設立を求めて戦い続け死後3日に勅許が下りた。天台宗の自立と後の鎌倉仏教を生む土壌を作った。', category: '人物', subcategory: '文化', keywords: ['最澄'], era: '平安' },`,
  // p10 空海
  `  { id: 'h014', year: 806,  title: '空海が唐から密教を持ち帰り真言宗を開く', description: '入唐して恵果阿闍梨から密教の全てを授かり帰国。東寺を与えられ高野山金剛峯寺を開創した。書・詩・哲学にも卓越した才能を持つ平安文化の巨人。', category: '人物', subcategory: '文化', keywords: ['空海'], era: '平安' },`,
  `  { id: 'h015', year: 818,  title: '空海が綜芸種智院（日本最初の庶民教育機関）を設立する', description: '庶民も学べる総合教育機関・綜芸種智院を京都に設立。宗教・学問・芸術を体系的に教えた日本最初の庶民向け学校として教育史に名を残す。', category: '人物', subcategory: '文化', keywords: ['空海'], era: '平安' },`,
  // p11 菅原道真
  `  { id: 'h016', year: 894,  title: '菅原道真が遣唐使の廃止を建議する', description: '唐の衰退と航海の危険を理由に遣唐使廃止を建議し採用された。以後日本は国風文化を発展させる方向に転換した。歴史的な外交政策の転換点。', category: '人物', subcategory: '外交', keywords: ['菅原道真'], era: '平安' },`,
  `  { id: 'h017', year: 901,  title: '菅原道真が藤原時平の讒言で大宰府に左遷される', description: '右大臣まで昇り詰めたが左大臣・藤原時平に讒言されて大宰府に左遷。東風吹かばにほひおこせよ梅の花の歌を残して2年後に没した。死後に天神・学問の神として祀られた。', category: '人物', subcategory: '政治', keywords: ['菅原道真'], era: '平安' },`,
  // p12 紀貫之
  `  { id: 'h018', year: 905,  title: '紀貫之が古今和歌集の撰者として仮名序を執筆する', description: '勅撰和歌集・古今和歌集の中心的撰者として序文（仮名序）を執筆。やまとうたは人の心を種としてを書き出す仮名序は日本最初の文学論として高く評価された。', category: '人物', subcategory: '文化', keywords: ['紀貫之'], era: '平安' },`,
  `  { id: 'h019', year: 935,  title: '紀貫之が土佐日記を著し仮名文学を確立する', description: '土佐守任期を終えての帰京を女性の語り口で書いた土佐日記を著述。男性が女性に仮装して仮名文字で書く手法は後の女性文学を刺激し仮名文学の確立に貢献した。', category: '人物', subcategory: '文化', keywords: ['紀貫之'], era: '平安' },`,
  // p13 空也
  `  { id: 'h020', year: 951,  title: '空也が市場で踊念仏を広め六波羅蜜寺を創建する', description: '都の市場で踊りながら念仏を広める踊念仏を始め市の聖と呼ばれた。京都に六波羅蜜寺を建立し庶民への仏教普及の草分けとなった。', category: '人物', subcategory: '文化', keywords: ['空也'], era: '平安' },`,
  // p14 源信
  `  { id: 'h021', year: 985,  title: '源信が往生要集を著し浄土信仰を広める', description: '地獄・餓鬼・畜生など六道の様相と極楽浄土を詳しく描写した往生要集を著述。末法思想の広まりとともに貴族・庶民の間に浄土信仰を広め法然・親鸞に大きな影響を与えた。', category: '人物', subcategory: '文化', keywords: ['源信'], era: '平安' },`,
  // p15 藤原道長
  `  { id: 'h022', year: 1000, title: '藤原道長が一家三后を実現し摂関政治の絶頂を迎える', description: '三人の娘（彰子・妍子・威子）を立て続けに天皇の后にした。この世をば我が世とぞ思ふ望月の欠けたることも無しと思へばの歌はこの権勢の頂点を示す。', category: '人物', subcategory: '政治', keywords: ['藤原道長'], era: '平安' },`,
  `  { id: 'h023', year: 1019, title: '藤原道長が法成寺を建立し仏教信仰に生涯を捧げる', description: '晩年に出家し荘厳な法成寺を建立した。浄土信仰に深く帰依し往生要集を愛読した。摂関政治の頂点に立ちながら深い宗教心を持った稀有な権力者。', category: '人物', subcategory: '文化', keywords: ['藤原道長'], era: '平安' },`,
  // p16 清少納言
  `  { id: 'h024', year: 993,  title: '清少納言が定子の後宮で枕草子を執筆する', description: '一条天皇の中宮・藤原定子に仕え宮廷生活の機知と洞察を仮名文で書いた枕草子を執筆。春はあけぼの…で始まる鋭い観察眼と才気が光る随筆の傑作。', category: '人物', subcategory: '文化', keywords: ['清少納言'], era: '平安' },`,
  // p17 紫式部
  `  { id: 'h025', year: 1008, title: '紫式部が源氏物語を完成させ世界最古の長編小説を残す', description: '光源氏を主人公に宮廷生活・恋愛・人間の心理を繊細に描いた源氏物語は54帖100万字に及ぶ。世界最古の長編小説として世界文学に位置づけられる不朽の大作。', category: '人物', subcategory: '文化', keywords: ['紫式部'], era: '平安' },`,
  `  { id: 'h026', year: 1002, title: '紫式部が彰子の後宮に仕え紫式部日記を著す', description: '藤原道長の娘・中宮彰子に女房として仕えた。宮廷生活の様子と自己の心情を綴った紫式部日記は平安文化の第一次資料として歴史的価値が高い。', category: '人物', subcategory: '文化', keywords: ['紫式部'], era: '平安' },`,
  // p18 和泉式部
  `  { id: 'h027', year: 1003, title: '和泉式部が情熱的な恋愛歌で平安詩歌の最高峰に立つ', description: '複数の皇子との恋愛を経て和泉式部日記を著した。あらざらむこの世のほかの思ひ出に今ひとたびの逢ふこともがなという情熱的な歌は後世に高く評価された。', category: '人物', subcategory: '文化', keywords: ['和泉式部'], era: '平安' },`,
  // p19 一条天皇
  `  { id: 'h028', year: 986,  title: '一条天皇が才女を後宮に集め平安文化の黄金期を演出する', description: '紫式部・清少納言・和泉式部ら才能ある女性たちを後宮に集め平安文学の黄金時代を作った。自らも才能豊かで漢籍・音楽に通じた文化天皇として後世に称えられた。', category: '人物', subcategory: '文化', keywords: ['一条天皇'], era: '平安' },`,
  // p20 藤原頼通
  `  { id: 'h029', year: 1052, title: '藤原頼通が宇治に平等院鳳凰堂を建立する', description: '道長の別荘を寺に改め鳳凰堂（阿弥陀堂）を建立。末法の世に極楽浄土を地上に表現しようとした。十円硬貨にも描かれる日本の国宝建築の傑作。', category: '人物', subcategory: '文化', keywords: ['藤原頼通'], era: '平安' },`,
  `  { id: 'h030', year: 1020, title: '藤原頼通が摂関政治を継承するも武家台頭により衰退する', description: '父・道長から摂政・関白を引き継ぎ50年以上にわたり政治を担ったが前九年の役・後三年の役で源氏の武力が台頭し摂関政治は急速に影響力を失っていった。', category: '人物', subcategory: '政治', keywords: ['藤原頼通'], era: '平安' },`,
]

const filePath = 'src/data/events.ts'
const content = readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

const isEventLine = l => l.trimStart().startsWith('{ id:')
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }

// Remove old 人物 section headers and any remaining 人物 events
const cleaned = lines.filter(l =>
  !l.includes('// ── 人物 (334件') &&
  !l.includes('// ── 人物 追加100人') &&
  !l.includes('// ── 人物の業績イベント') &&
  !(isEventLine(l) && getCategory(l) === '人物')
)

// Combine all 人物 data
const all = [
  ...p01_20,
  ...h001_050,
  ...p21_100,
  ...h2,
  ...h3,
  ...h4,
  ...pp,
]

// Sort by year
all.sort((a, b) => getYear(a) - getYear(b))
console.log('Total 人物 events:', all.length)

// Find insertion point: before 政治 追加 section
const insertPos = cleaned.findIndex(l => l.includes('// ── 政治 追加 (30件)'))
console.log('Insert at line:', insertPos + 1)

// Build final output
const header = `  // ── 人物 (${all.length}件・年代順) ─────────────────────────`
cleaned.splice(insertPos, 0, header, ...all)

writeFileSync(filePath, cleaned.join('\n'), 'utf-8')
console.log('Done. Output lines:', cleaned.length)

// Verify
const out = readFileSync(filePath, 'utf-8').split('\n')
const jinbutsuCount = out.filter(l => isEventLine(l) && getCategory(l) === '人物').length
console.log('人物 events in output:', jinbutsuCount)
