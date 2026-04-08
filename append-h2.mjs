import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/data/events.ts'
let content = readFileSync(filePath, 'utf-8')

const toAppend = `
  // ── 人物の業績イベント（h系列、p21–p50）──────────────────────────────
  // p21 源義家
  { id: 'h051', year: 1051, title: '源義家が前九年の役で活躍する', description: '陸奥の安倍氏の乱を父・頼義とともに鎮圧。東国武士の棟梁としての源氏の地位を確立した。', category: '人物', subcategory: '軍事', keywords: ['源義家'], era: '平安' },
  { id: 'h052', year: 1083, title: '源義家が後三年の役を戦う', description: '陸奥・出羽の清原氏の内紛に介入し鎮圧。私財で恩賞を与え東国武士の心をつかんだ。', category: '人物', subcategory: '軍事', keywords: ['源義家'], era: '平安' },
  // p22 平清盛
  { id: 'h053', year: 1159, title: '平清盛が平治の乱で源義朝を破る', description: '平治の乱で源義朝・藤原信頼を破り、武士として初めて朝廷政治の実権を握る足がかりを得た。', category: '人物', subcategory: '軍事', keywords: ['平清盛'], era: '平安' },
  { id: 'h054', year: 1167, title: '平清盛が武士として初めて太政大臣に就任する', description: '武家出身として初の太政大臣就任。一門で多くの要職を独占し平氏全盛期を迎えた。', category: '人物', subcategory: '政治', keywords: ['平清盛'], era: '平安' },
  { id: 'h055', year: 1168, title: '平清盛が日宋貿易を推進し厳島神社を整備する', description: '大輪田泊（神戸港の原型）を修築し日宋貿易で莫大な富を得た。厳島神社も壮麗に造営した。', category: '人物', subcategory: '経済', keywords: ['平清盛'], era: '平安' },
  // p23 源義朝
  { id: 'h056', year: 1156, title: '源義朝が保元の乱で後白河天皇方に参戦する', description: '崇徳上皇vs後白河天皇の対立で後白河方として戦い勝利。東国武士の組織化を進めた。', category: '人物', subcategory: '軍事', keywords: ['源義朝'], era: '平安' },
  { id: 'h057', year: 1159, title: '源義朝が平治の乱で平清盛に敗れ死去する', description: '藤原信頼と組んで後白河上皇を幽閉したが清盛の反撃に敗北。逃走中に謀殺された。', category: '人物', subcategory: '軍事', keywords: ['源義朝'], era: '平安' },
  // p24 後白河法皇
  { id: 'h058', year: 1156, title: '後白河天皇が保元の乱で崇徳上皇を退ける', description: '保元の乱で崇徳上皇側を破り天皇権力を回復。その後34年にわたり院政を行い日本一の大天狗と称された。', category: '人物', subcategory: '政治', keywords: ['後白河法皇'], era: '平安' },
  { id: 'h059', year: 1179, title: '後白河法皇が梁塵秘抄を編纂する', description: '今様（流行歌謡）を集めた歌謡集・梁塵秘抄を編纂。民衆文化への深い関心と審美眼を示す文化的業績。', category: '人物', subcategory: '文化', keywords: ['後白河法皇'], era: '平安' },
  // p25 法然
  { id: 'h060', year: 1175, title: '法然が浄土宗を開宗する', description: '南無阿弥陀仏の念仏を唱えれば誰でも極楽往生できると説き浄土宗を開宗。専修念仏の革新的な教えで庶民に広まった。', category: '人物', subcategory: '文化', keywords: ['法然'], era: '鎌倉' },
  { id: 'h061', year: 1198, title: '法然が選択本願念仏集を著す', description: '念仏の根拠を経典から体系的に論じた主著。弟子の親鸞らが浄土宗各派を形成する思想的基盤となった。', category: '人物', subcategory: '文化', keywords: ['法然'], era: '鎌倉' },
  // p26 栄西
  { id: 'h062', year: 1191, title: '栄西が臨済宗を日本に伝え建仁寺を創建する', description: '宋から禅宗（臨済宗）を持ち帰り建仁寺を創建。武士階級に受け入れられ鎌倉文化の精神的基盤となった。', category: '人物', subcategory: '文化', keywords: ['栄西'], era: '鎌倉' },
  { id: 'h063', year: 1214, title: '栄西が喫茶養生記を著し日本に茶を広める', description: '宋から茶の種を持ち帰り栽培を奨励。茶は養生の仙薬と説いた喫茶養生記で茶の習慣を日本に定着させた。', category: '人物', subcategory: '文化', keywords: ['栄西'], era: '鎌倉' },
  // p27 源頼朝
  { id: 'h064', year: 1180, title: '源頼朝が伊豆で挙兵する', description: '以仁王の令旨を受けて伊豆で平氏打倒の挙兵。富士川の戦いで平氏軍を破り鎌倉を本拠地に定めた。', category: '人物', subcategory: '軍事', keywords: ['源頼朝'], era: '鎌倉' },
  { id: 'h065', year: 1185, title: '源頼朝が守護・地頭を設置する', description: '壇ノ浦の戦いで平氏を滅ぼした後、諸国に守護・地頭を設置する権利を後白河法皇から認めさせた。武家政権の礎。', category: '人物', subcategory: '政治', keywords: ['源頼朝'], era: '鎌倉' },
  { id: 'h066', year: 1192, title: '源頼朝が征夷大将軍に就任し鎌倉幕府を開く', description: '征夷大将軍に任じられ鎌倉幕府を正式に開府。以後約700年続く武家政権の時代の幕開けとなった。', category: '人物', subcategory: '政治', keywords: ['源頼朝'], era: '鎌倉' },
  // p28 北条政子
  { id: 'h067', year: 1221, title: '北条政子が承久の乱で御家人を鼓舞する', description: '後鳥羽上皇が幕府打倒を図った承久の乱で御家人に頼朝の御恩を説いて結束を促し幕府を勝利に導いた。', category: '人物', subcategory: '政治', keywords: ['北条政子'], era: '鎌倉' },
  // p29 源義経
  { id: 'h068', year: 1184, title: '源義経が一ノ谷の戦いで平氏を破る', description: '断崖から騎馬で奇襲する鵯越の逆落としで平氏軍を壊滅させた。天才的な軍事戦術家としての名声を確立した。', category: '人物', subcategory: '軍事', keywords: ['源義経'], era: '鎌倉' },
  { id: 'h069', year: 1185, title: '源義経が壇ノ浦の戦いで平氏を滅ぼす', description: '長門国・壇ノ浦での海戦で平氏を全滅させ安徳天皇が入水。源平の争乱に終止符を打った決定的な戦い。', category: '人物', subcategory: '軍事', keywords: ['源義経'], era: '鎌倉' },
  { id: 'h070', year: 1189, title: '源義経が頼朝に追われ平泉で自害する', description: '頼朝と対立し奥州・藤原氏のもとへ逃れたが頼朝の圧力で討たれ自害。悲劇の英雄として後世に愛された。', category: '人物', subcategory: '軍事', keywords: ['源義経'], era: '鎌倉' },
  // p30 親鸞
  { id: 'h071', year: 1224, title: '親鸞が教行信証を著し浄土真宗を開く', description: '師・法然の念仏思想を深化させ悪人正機を説いた教行信証を著述。悪人こそが阿弥陀仏の救済対象と論じた。', category: '人物', subcategory: '文化', keywords: ['親鸞'], era: '鎌倉' },
  // p31 北条泰時
  { id: 'h072', year: 1221, title: '北条泰時が承久の乱で幕府軍を率いて勝利する', description: '承久の乱で幕府軍の総大将として京都に進撃し後鳥羽上皇方を圧倒。武家の朝廷に対する優位を確立した。', category: '人物', subcategory: '軍事', keywords: ['北条泰時'], era: '鎌倉' },
  { id: 'h073', year: 1232, title: '北条泰時が御成敗式目を制定する', description: '武家最初の成文法・御成敗式目51条を制定。道理に基づく公平な裁判基準を示した武家法の原点。', category: '人物', subcategory: '政治', keywords: ['北条泰時'], era: '鎌倉' },
  // p32 道元
  { id: 'h074', year: 1227, title: '道元が宋から曹洞宗の禅を伝えて帰国する', description: '入宋して禅の本質・只管打坐を学び帰国。修行そのものが悟りであるという修証一等を説いた。', category: '人物', subcategory: '文化', keywords: ['道元'], era: '鎌倉' },
  { id: 'h075', year: 1244, title: '道元が越前に永平寺を開く', description: '越前（福井県）の山中に永平寺を創建し厳格な禅の修行道場を建設。曹洞宗の大本山として現在も多くの僧が修行する。', category: '人物', subcategory: '文化', keywords: ['道元'], era: '鎌倉' },
  // p33 日蓮
  { id: 'h076', year: 1253, title: '日蓮が法華宗（日蓮宗）を開宗する', description: '南無妙法蓮華経の題目を唱えることで成仏できると説き日蓮宗を開宗。他宗を激しく批判し多くの弾圧を受けた。', category: '人物', subcategory: '文化', keywords: ['日蓮'], era: '鎌倉' },
  { id: 'h077', year: 1260, title: '日蓮が立正安国論を幕府に提出する', description: '他宗批判と他国侵逼・自界叛逆の予言を記した書を幕府に提出。蒙古襲来を予言したとして後に神格化された。', category: '人物', subcategory: '文化', keywords: ['日蓮'], era: '鎌倉' },
  // p34 一遍
  { id: 'h078', year: 1274, title: '一遍が時宗を開き踊り念仏を広める', description: '南無阿弥陀仏を称えながら踊る踊り念仏で民衆に念仏を広めた。全国遊行の旅を続け時宗を開宗した。', category: '人物', subcategory: '文化', keywords: ['一遍'], era: '鎌倉' },
  // p35 北条時宗
  { id: 'h079', year: 1274, title: '北条時宗が文永の役で元軍を撃退する', description: '元・高麗連合軍の日本侵攻を九州北部で迎え撃ち撃退。暴風雨（神風）の助けもあり元軍は撤退した。', category: '人物', subcategory: '軍事', keywords: ['北条時宗'], era: '鎌倉' },
  { id: 'h080', year: 1281, title: '北条時宗が弘安の役で元軍の再来を退ける', description: '元の大軍14万人の再来を迎え撃ち暴風雨（弘安の神風）で元軍が壊滅。日本防衛に成功したが幕府財政は疲弊した。', category: '人物', subcategory: '軍事', keywords: ['北条時宗'], era: '鎌倉' },
  // p36 後醍醐天皇
  { id: 'h081', year: 1333, title: '後醍醐天皇が鎌倉幕府を滅ぼし建武の新政を始める', description: '足利尊氏・新田義貞らの助けで幕府を滅ぼし親政を開始。しかし論功行賞の不公平で武士の支持を失った。', category: '人物', subcategory: '政治', keywords: ['後醍醐天皇'], era: '室町' },
  { id: 'h082', year: 1336, title: '後醍醐天皇が吉野に南朝を開く', description: '足利尊氏に京都を追われ吉野に逃れ南朝を開設。以後60年にわたる南北朝の動乱が続いた。', category: '人物', subcategory: '政治', keywords: ['後醍醐天皇'], era: '室町' },
  // p37 楠木正成
  { id: 'h083', year: 1333, title: '楠木正成が千早城の籠城戦で幕府軍を翻弄する', description: '河内・千早城での籠城戦で大軍の幕府軍を数ヶ月足止めし時間を稼いだ。ゲリラ戦術で知恵の武将と称された。', category: '人物', subcategory: '軍事', keywords: ['楠木正成'], era: '室町' },
  { id: 'h084', year: 1336, title: '楠木正成が湊川の戦いで足利尊氏と戦い戦死する', description: '勝ち目のない戦いと知りながら後醍醐天皇の命で出陣し湊川で戦死。忠臣の鑑として後世に語り継がれた。', category: '人物', subcategory: '軍事', keywords: ['楠木正成'], era: '室町' },
  // p38 足利尊氏
  { id: 'h085', year: 1338, title: '足利尊氏が征夷大将軍に就任し室町幕府を開く', description: '光明天皇から征夷大将軍に任じられ室町幕府を開設。南朝との内戦を抱えながら幕府体制を整備した。', category: '人物', subcategory: '政治', keywords: ['足利尊氏'], era: '室町' },
  // p39 足利義満
  { id: 'h086', year: 1392, title: '足利義満が南北朝を合一する', description: '60年に及んだ南北朝の内乱を終結させた。南朝の後亀山天皇が北朝の後小松天皇に神器を譲り合一が実現した。', category: '人物', subcategory: '政治', keywords: ['足利義満'], era: '室町' },
  { id: 'h087', year: 1397, title: '足利義満が金閣寺（鹿苑寺）を建立する', description: '北山に金閣を建立。北山文化の象徴として公家文化と武家文化を融合した室町文化の頂点を示す。', category: '人物', subcategory: '文化', keywords: ['足利義満'], era: '室町' },
  { id: 'h088', year: 1401, title: '足利義満が日明貿易（勘合貿易）を開始する', description: '明に使節を送り日本国王として冊封を受け勘合貿易を開始。明銭・生糸・陶磁器を輸入し莫大な利益を得た。', category: '人物', subcategory: '経済', keywords: ['足利義満'], era: '室町' },
  // p40 世阿弥
  { id: 'h089', year: 1384, title: '世阿弥が能楽を芸術として大成させる', description: '父・観阿弥とともに猿楽能を洗練させ、足利義満の庇護のもとで幽玄の美を追求した能楽を確立した。', category: '人物', subcategory: '文化', keywords: ['世阿弥'], era: '室町' },
  { id: 'h090', year: 1400, title: '世阿弥が風姿花伝を著す', description: '能の演技・演出・稽古法を論じた秘伝書を著述。初心忘るべからずの言葉でも知られる芸術論の古典。', category: '人物', subcategory: '文化', keywords: ['世阿弥'], era: '室町' },
  // p41 一休宗純
  { id: 'h091', year: 1474, title: '一休宗純が大徳寺を復興する', description: '応仁の乱で荒廃した大徳寺を81歳で再興。破戒的な行動で権威を批判しながら禅の本質を問い続けた奇僧。', category: '人物', subcategory: '文化', keywords: ['一休宗純'], era: '室町' },
  // p42 蓮如
  { id: 'h092', year: 1461, title: '蓮如が御文（御文章）で浄土真宗を大衆化する', description: '平易な仮名文で教義を説いた手紙（御文）を全国に配布。本願寺を急成長させ一向宗の爆発的普及をもたらした。', category: '人物', subcategory: '文化', keywords: ['蓮如'], era: '室町' },
  // p43 雪舟
  { id: 'h093', year: 1467, title: '雪舟が明に渡り水墨画を深める', description: '遣明船で明に渡り各地の山水を描き水墨画の技法を体得。帰国後に日本独自の水墨画様式を確立した。', category: '人物', subcategory: '文化', keywords: ['雪舟'], era: '室町' },
  { id: 'h094', year: 1486, title: '雪舟が天橋立図などの傑作を描く', description: '天橋立図・四季山水図など日本の風景を壮大なスケールで描いた名作を制作。国宝に指定された作品も多い。', category: '人物', subcategory: '文化', keywords: ['雪舟'], era: '室町' },
  // p44 北条早雲
  { id: 'h095', year: 1491, title: '北条早雲が伊豆を攻略し戦国大名の先駆けとなる', description: '今川氏の客将から伊豆国を奪い独立した戦国大名へ。下剋上の先駆けとして戦国時代の幕を開いた人物とされる。', category: '人物', subcategory: '軍事', keywords: ['北条早雲'], era: '室町' },
  { id: 'h096', year: 1495, title: '北条早雲が小田原城を奪い関東支配の拠点とする', description: '大森氏から小田原城を奪取し関東進出の拠点を確立。後北条氏5代の繁栄の礎を築いた。', category: '人物', subcategory: '軍事', keywords: ['北条早雲'], era: '室町' },
  // p45 今川義元
  { id: 'h097', year: 1553, title: '今川義元が今川仮名目録を整備する', description: '今川仮名目録（分国法）を整備し東海地方随一の法制度を確立。分国法の先進的事例として知られる。', category: '人物', subcategory: '政治', keywords: ['今川義元'], era: '室町' },
  { id: 'h098', year: 1560, title: '今川義元が桶狭間の戦いで織田信長に討たれる', description: '東海道の覇者として上洛を目指したが、桶狭間で織田信長の奇襲を受け戦死。その死が戦国時代の大きな転換点となった。', category: '人物', subcategory: '軍事', keywords: ['今川義元'], era: '安土桃山' },
  // p46 武田信玄
  { id: 'h099', year: 1542, title: '武田信玄が信玄堤（釜無川堤防）を築く', description: '釜無川・御勅使川の治水工事を行い農地を守る信玄堤を整備。現在も残る堤防は治水技術の傑作とされる。', category: '人物', subcategory: '経済', keywords: ['武田信玄'], era: '室町' },
  { id: 'h100', year: 1547, title: '武田信玄が甲州法度之次第を制定する', description: '武田家の分国法55条を定め領国支配を体系化。法治主義に基づく統治で甲斐・信濃を強固に支配した。', category: '人物', subcategory: '政治', keywords: ['武田信玄'], era: '室町' },
  { id: 'h101', year: 1553, title: '武田信玄が川中島の戦いで上杉謙信と激突する', description: '北信濃をめぐり上杉謙信と5度にわたり激突（1553-64年）。四度目の川中島（1561年）が最大の激戦として知られる。', category: '人物', subcategory: '軍事', keywords: ['武田信玄'], era: '室町' },
  // p47 千利休
  { id: 'h102', year: 1585, title: '千利休が秀吉の茶頭として侘び茶を大成させる', description: '豊臣秀吉の御前茶会を催し茶頭として活躍。草庵の茶・侘びの美学を完成させ日本の茶道の原型を確立した。', category: '人物', subcategory: '文化', keywords: ['千利休'], era: '安土桃山' },
  { id: 'h103', year: 1591, title: '千利休が秀吉の命により切腹する', description: '秀吉の怒りを買い切腹を命じられた。茶道における侘びの美学を完成させた千利休の死は文化史の一大事件。', category: '人物', subcategory: '文化', keywords: ['千利休'], era: '安土桃山' },
  // p48 明智光秀
  { id: 'h104', year: 1582, title: '明智光秀が本能寺の変で織田信長を討つ', description: '京都・本能寺に滞在中の信長を急襲。敵は本能寺にあり、で知られる歴史上最大の謀反で信長は自害した。', category: '人物', subcategory: '軍事', keywords: ['明智光秀'], era: '安土桃山' },
  { id: 'h105', year: 1582, title: '明智光秀が山崎の戦いで豊臣秀吉に敗れる', description: '本能寺の変からわずか11日後、秀吉の急速な反撃に対応できず山崎で敗北し落命した。', category: '人物', subcategory: '軍事', keywords: ['明智光秀'], era: '安土桃山' },
  // p49 上杉謙信
  { id: 'h106', year: 1561, title: '上杉謙信が川中島の戦い第四次で武田信玄と激突する', description: '最大の激戦となった第四次川中島の戦い。謙信自ら騎馬で信玄の本陣に斬り込んだとされる伝説的な一戦。', category: '人物', subcategory: '軍事', keywords: ['上杉謙信'], era: '室町' },
  { id: 'h107', year: 1561, title: '上杉謙信が関東管領に就任する', description: '北条氏に圧迫された関東諸将の要請で関東管領職を継承。義を掲げ北条氏と長年にわたり争った。', category: '人物', subcategory: '政治', keywords: ['上杉謙信'], era: '室町' },
  // p50 織田信長
  { id: 'h108', year: 1560, title: '織田信長が桶狭間の戦いで今川義元を破る', description: '約2000の兵で2万5000の今川軍を奇襲し義元を討ち取った奇跡の勝利。天下統一への道を開いた転換点。', category: '人物', subcategory: '軍事', keywords: ['織田信長'], era: '安土桃山' },
  { id: 'h109', year: 1573, title: '織田信長が室町幕府を滅ぼす', description: '将軍・足利義昭を京都から追放し室町幕府を滅亡させた。230年続いた武家政権の終焉。', category: '人物', subcategory: '政治', keywords: ['織田信長'], era: '安土桃山' },
  { id: 'h110', year: 1575, title: '織田信長が長篠の戦いで鉄砲を大量活用する', description: '3000丁の鉄砲を組織的に運用し武田の騎馬軍団を壊滅。戦国時代の戦術革命をもたらした歴史的な戦い。', category: '人物', subcategory: '軍事', keywords: ['織田信長'], era: '安土桃山' },
  { id: 'h111', year: 1576, title: '織田信長が安土城を築き楽市楽座を実施する', description: '琵琶湖畔に安土城を築き城下で座を廃止し自由な商業活動を促進する楽市楽座を実施した。', category: '人物', subcategory: '経済', keywords: ['織田信長'], era: '安土桃山' },
  { id: 'h112', year: 1582, title: '織田信長が本能寺の変で明智光秀に討たれる', description: '天下統一まであと一歩のところで家臣・明智光秀に本能寺で急襲され自害。享年49歳。', category: '人物', subcategory: '軍事', keywords: ['織田信長'], era: '安土桃山' },
]
`

content += toAppend
writeFileSync(filePath, content, 'utf-8')
console.log('p21-p50 done')
