import { readFileSync, writeFileSync } from 'fs'
const filePath = 'src/data/events.ts'
let content = readFileSync(filePath, 'utf-8').trimEnd()
if (content.endsWith(']')) content = content.slice(0, -1)

const data = `
  // ── 人物 追加100人（p101–p200）+ 業績（h235–）──────────────────────────
  // p101 卑弥呼
  { id: 'p101', year: 170,  title: '卑弥呼',       description: '邪馬台国の女王。鬼道を使い国を治め魏に使節を送った古代日本の実在する最古の指導者。', category: '人物', subcategory: '政治', keywords: ['卑弥呼'], era: '縄文弥生' },
  { id: 'h235', year: 239,  title: '卑弥呼が魏に使節を送り「親魏倭王」の金印を授かる', description: '魏志倭人伝に記された邪馬台国の女王卑弥呼が魏に使節を派遣し金印と銅鏡100枚を授かった。日本の対外交渉の最初の記録。', category: '人物', subcategory: '外交', keywords: ['卑弥呼'], era: '縄文弥生' },
  // p102 推古天皇
  { id: 'p102', year: 554,  title: '推古天皇',     description: '日本初の女性天皇。聖徳太子を摂政に任じ冠位十二階・十七条憲法の制定など大改革を推進した。', category: '人物', subcategory: '政治', keywords: ['推古天皇'], era: '飛鳥奈良' },
  { id: 'h236', year: 593,  title: '推古天皇が即位し聖徳太子を摂政に任じる', description: '用明天皇の崩御後に即位。甥・聖徳太子を摂政に起用し仏教振興・律令整備・外交刷新を進めた。日本最初の女性天皇として36年間在位した。', category: '人物', subcategory: '政治', keywords: ['推古天皇'], era: '飛鳥奈良' },
  // p103 元明天皇
  { id: 'p103', year: 661,  title: '元明天皇',     description: '奈良時代初頭の女性天皇。平城京への遷都・和同開珎の鋳造・古事記編纂を命じた。', category: '人物', subcategory: '政治', keywords: ['元明天皇'], era: '飛鳥奈良' },
  { id: 'h237', year: 708,  title: '元明天皇が和同開珎を鋳造し日本初の流通貨幣を作る', description: '武蔵国から銅が献上されたのを機に和同開珎を鋳造。蓄銭叙位令で流通を促し日本最初の本格的な通貨制度を整備した。', category: '人物', subcategory: '経済', keywords: ['元明天皇'], era: '飛鳥奈良' },
  { id: 'h238', year: 710,  title: '元明天皇が平城京に遷都する', description: '奈良の平城京に都を移し奈良時代が始まった。唐の長安を模した大規模な都城で天平文化の舞台となった。', category: '人物', subcategory: '政治', keywords: ['元明天皇'], era: '飛鳥奈良' },
  // p104 藤原良房
  { id: 'p104', year: 804,  title: '藤原良房',     description: '摂関政治の創始者。臣下として初めて摂政に就任し藤原氏の権力基盤を確立した。', category: '人物', subcategory: '政治', keywords: ['藤原良房'], era: '平安' },
  { id: 'h239', year: 858,  title: '藤原良房が臣下として初めて摂政に就任する', description: '清和天皇の外祖父として摂政に就任。皇族以外で初の摂政となり以後の摂関政治の先例を作った。', category: '人物', subcategory: '政治', keywords: ['藤原良房'], era: '平安' },
  // p105 在原業平
  { id: 'p105', year: 825,  title: '在原業平',     description: '平安時代の歌人。六歌仙・三十六歌仙の一人。伊勢物語の主人公のモデルとされる美男の貴族歌人。', category: '人物', subcategory: '文化', keywords: ['在原業平'], era: '平安' },
  { id: 'h240', year: 860,  title: '在原業平が伊勢物語のモデルとなる恋愛・漂白の生涯を送る', description: '皇族の血を引きながら政治的に不遇だった業平は各地を漂い恋愛に生きた。その生涯が伊勢物語として物語化され平安文学の源流となった。', category: '人物', subcategory: '文化', keywords: ['在原業平'], era: '平安' },
  // p106 小野小町
  { id: 'p106', year: 834,  title: '小野小町',     description: '平安初期の女性歌人。六歌仙の一人で絶世の美女として伝説化された。その和歌は情熱的かつ優美で後世の文学に多大な影響を与えた。', category: '人物', subcategory: '文化', keywords: ['小野小町'], era: '平安' },
  { id: 'h241', year: 860,  title: '小野小町が情熱的な恋の歌で六歌仙に選ばれる', description: '「花の色はうつりにけりな…」など情熱的な恋愛歌を詠み古今和歌集に多くの歌が収録。紀貫之に六歌仙の一人と称された。', category: '人物', subcategory: '文化', keywords: ['小野小町'], era: '平安' },
  // p107 安倍晴明
  { id: 'p107', year: 921,  title: '安倍晴明',     description: '平安中期の陰陽師。陰陽道の第一人者として朝廷に仕え天文・占術・呪術で活躍。晴明神社に祀られる。', category: '人物', subcategory: '文化', keywords: ['安倍晴明'], era: '平安' },
  { id: 'h242', year: 970,  title: '安倍晴明が陰陽頭として朝廷の祭祀・占術を主導する', description: '天文博士・陰陽頭として一条天皇朝の宮廷に仕え、天変地異の予測・怨霊退散など多くの呪術的事業を担った。土御門家の礎を作った。', category: '人物', subcategory: '文化', keywords: ['安倍晴明'], era: '平安' },
  // p108 平将門
  { id: 'p108', year: 903,  title: '平将門',       description: '平安中期の武将。関東で独立政権を樹立し「新皇」を称したが藤原秀郷・平貞盛に討たれた。東国武士の象徴的存在。', category: '人物', subcategory: '軍事', keywords: ['平将門'], era: '平安' },
  { id: 'h243', year: 939,  title: '平将門が新皇を称し関東独立国家の樹立を宣言する', description: '坂東諸国を制圧し自ら新皇と称した天慶の乱を起こした。朝廷が派遣した藤原秀郷らに討たれたが東国武士の自立意識の象徴となった。', category: '人物', subcategory: '軍事', keywords: ['平将門'], era: '平安' },
  // p109 白河天皇
  { id: 'p109', year: 1053, title: '白河天皇',     description: '院政の開始者。退位後も上皇・法皇として政治を主導し「治天の君」として100年続く院政政治を確立した。', category: '人物', subcategory: '政治', keywords: ['白河天皇'], era: '平安' },
  { id: 'h244', year: 1086, title: '白河天皇が院政を開始し朝廷の実権を握る', description: '堀河天皇に譲位後も上皇として政務を執った院政を開始。摂関家の政治支配を排除し天皇家主導の院政政治の時代を開いた。', category: '人物', subcategory: '政治', keywords: ['白河天皇'], era: '平安' },
  // p110 木曾義仲
  { id: 'p110', year: 1154, title: '木曾義仲',     description: '平安末期の武将。信濃から挙兵し倶利伽羅峠の戦いで平氏を破り一時京都を制圧した。頼朝の命で義経に討たれた。', category: '人物', subcategory: '軍事', keywords: ['木曾義仲'], era: '平安' },
  { id: 'h245', year: 1183, title: '木曾義仲が倶利伽羅峠の戦いで平氏を破り上洛する', description: '越中・倶利伽羅峠で平維盛率いる平氏軍を大破。勢いよく京都に入ったが略奪・粗暴な振る舞いで朝廷・庶民の支持を失った。', category: '人物', subcategory: '軍事', keywords: ['木曾義仲'], era: '平安' },
  // p111 北条義時
  { id: 'p111', year: 1163, title: '北条義時',     description: '鎌倉幕府第2代執権。承久の乱で後鳥羽上皇を退け武家政権の優位を確立した。北条得宗家の実質的な創始者。', category: '人物', subcategory: '政治', keywords: ['北条義時'], era: '鎌倉' },
  { id: 'h246', year: 1213, title: '北条義時が和田合戦で有力御家人を排除し執権体制を固める', description: '侍所別当・和田義盛を滅ぼして侍所別当を兼ね、政所・侍所の二所別当として執権の権限を強化した。', category: '人物', subcategory: '政治', keywords: ['北条義時'], era: '鎌倉' },
  { id: 'h247', year: 1221, title: '北条義時が承久の乱で後鳥羽上皇を退ける', description: '後鳥羽上皇の討幕令（北条義時追討の宣旨）に対し幕府軍を率いて上洛し勝利。上皇を隠岐に流して武家支配を確立した。', category: '人物', subcategory: '軍事', keywords: ['北条義時'], era: '鎌倉' },
  // p112 後鳥羽上皇
  { id: 'p112', year: 1180, title: '後鳥羽上皇',   description: '鎌倉時代の上皇。新古今和歌集の編纂を命じ文化的才能に優れた。承久の乱で幕府打倒を図ったが失敗し隠岐に流された。', category: '人物', subcategory: '政治', keywords: ['後鳥羽上皇'], era: '鎌倉' },
  { id: 'h248', year: 1205, title: '後鳥羽上皇が新古今和歌集の編纂を命じる', description: '藤原定家ら六名に勅撰和歌集の編纂を命じた。自ら作歌・選歌にも深く関与し古今集に次ぐ日本最高の歌集とされる。', category: '人物', subcategory: '文化', keywords: ['後鳥羽上皇'], era: '鎌倉' },
  { id: 'h249', year: 1221, title: '後鳥羽上皇が承久の乱を起こし隠岐に流される', description: '北条義時追討の宣旨を発し挙兵したが幕府軍に敗北。隠岐に流され22年後に配所で没した。', category: '人物', subcategory: '政治', keywords: ['後鳥羽上皇'], era: '鎌倉' },
  // p113 吉田兼好
  { id: 'p113', year: 1283, title: '吉田兼好',     description: '南北朝時代の随筆家・歌人。徒然草の作者。「つれづれなるままに…」で始まる随筆は日本三大随筆の一つ。', category: '人物', subcategory: '文化', keywords: ['吉田兼好'], era: '室町' },
  { id: 'h250', year: 1330, title: '吉田兼好が徒然草を著す', description: '出家後の隠者的生活の中で徒然草を執筆。無常観・美意識・人生訓など多様なテーマを軽妙な文体で描き枕草子・方丈記とともに日本三大随筆とされる。', category: '人物', subcategory: '文化', keywords: ['吉田兼好'], era: '室町' },
  // p114 新田義貞
  { id: 'p114', year: 1301, title: '新田義貞',     description: '鎌倉幕府を滅ぼした武将。後醍醐天皇の綸旨を受けて挙兵し鎌倉を陥落させた。湊川の戦いで足利尊氏と戦い北陸で戦死した。', category: '人物', subcategory: '軍事', keywords: ['新田義貞'], era: '室町' },
  { id: 'h251', year: 1333, title: '新田義貞が鎌倉を攻め落とし幕府を滅亡させる', description: '後醍醐天皇の討幕令を受けて挙兵。稲村ヶ崎から海岸を渡る奇策で鎌倉に入り北条高時を自害させ鎌倉幕府を滅ぼした。', category: '人物', subcategory: '軍事', keywords: ['新田義貞'], era: '室町' },
  // p115 観阿弥
  { id: 'p115', year: 1333, title: '観阿弥',       description: '猿楽能の大成者。足利義満に認められ息子・世阿弥とともに幽玄の能楽を確立した。能楽の祖とされる。', category: '人物', subcategory: '文化', keywords: ['観阿弥'], era: '室町' },
  { id: 'h252', year: 1374, title: '観阿弥が足利義満の前で演じ能楽の保護者を得る', description: '今熊野（京都）での猿楽に義満が見物し以後厚く保護された。息子世阿弥への義満の寵愛もここに始まり能楽が高級芸術へ発展する転機となった。', category: '人物', subcategory: '文化', keywords: ['観阿弥'], era: '室町' },
  // p116 山名宗全
  { id: 'p116', year: 1404, title: '山名宗全',     description: '室町時代の守護大名。応仁の乱の西軍の大将。赤入道と呼ばれ一時は全国の六分の一の国を支配した。', category: '人物', subcategory: '政治', keywords: ['山名宗全'], era: '室町' },
  { id: 'h253', year: 1467, title: '山名宗全が応仁の乱で西軍を率いる', description: '細川勝元と対立し足利将軍家の継嗣問題をきっかけに応仁の乱が勃発。西軍の総大将として京都を戦場に11年間戦った。', category: '人物', subcategory: '軍事', keywords: ['山名宗全'], era: '室町' },
  // p117 細川勝元
  { id: 'p117', year: 1430, title: '細川勝元',     description: '室町時代の有力守護大名。応仁の乱の東軍の大将。細川政権の基礎を作り日本随一の勢力を誇った。', category: '人物', subcategory: '政治', keywords: ['細川勝元'], era: '室町' },
  { id: 'h254', year: 1467, title: '細川勝元が応仁の乱で東軍を率いる', description: '山名宗全と対立し東軍の総大将として応仁の乱を戦った。乱中に病死したが細川氏の覇権は子・政元へと受け継がれた。', category: '人物', subcategory: '軍事', keywords: ['細川勝元'], era: '室町' },
  // p118 日野富子
  { id: 'p118', year: 1440, title: '日野富子',     description: '足利義政の正室。応仁の乱の一因を作った室町時代の権勢ある女性。土倉・酒屋からの徴税など蓄財でも知られた。', category: '人物', subcategory: '政治', keywords: ['日野富子'], era: '室町' },
  { id: 'h255', year: 1467, title: '日野富子が将軍継嗣問題に介入し応仁の乱の遠因を作る', description: '夫・足利義政の後継に弟・義視を推した後に我が子・義尚を推し義視支持派と対立。この対立が応仁の乱の一因となった。', category: '人物', subcategory: '政治', keywords: ['日野富子'], era: '室町' },
  // p119 毛利元就
  { id: 'p119', year: 1497, title: '毛利元就',     description: '戦国時代の大名。三本の矢の教えで知られる知略の武将。中国地方十一ヶ国を制圧した毛利氏の実質的な基礎を築いた。', category: '人物', subcategory: '軍事', keywords: ['毛利元就'], era: '室町' },
  { id: 'h256', year: 1555, title: '毛利元就が厳島の戦いで陶晴賢を撃破する', description: '大内氏の重臣・陶晴賢を厳島に誘い込んで奇襲した厳島合戦で大勝利。中国地方の覇権を握る決定的な戦いとなった。', category: '人物', subcategory: '軍事', keywords: ['毛利元就'], era: '室町' },
  { id: 'h257', year: 1557, title: '毛利元就が三本の矢の教えを子に残す', description: '三人の息子に一本の矢は折れやすいが三本束ねれば折れないと教えたとされる逸話。毛利の三子協力体制（隆元・元春・隆景）の象徴。', category: '人物', subcategory: '政治', keywords: ['毛利元就'], era: '室町' },
  // p120 松永久秀
  { id: 'p120', year: 1510, title: '松永久秀',     description: '戦国時代の武将。主君を殺し将軍を追放し東大寺大仏殿を焼いた「三つの悪事」で知られる下克上の体現者。', category: '人物', subcategory: '軍事', keywords: ['松永久秀'], era: '室町' },
  { id: 'h258', year: 1565, title: '松永久秀が足利義輝を暗殺する', description: '三好三人衆と連携し将軍・足利義輝を御所で暗殺。将軍殺しという前代未聞の行為で戦国時代の下克上の象徴とされた。', category: '人物', subcategory: '軍事', keywords: ['松永久秀'], era: '室町' },
  // p121 前田利家
  { id: 'p121', year: 1538, title: '前田利家',     description: '織田信長・豊臣秀吉に仕えた武将。加賀百万石の基礎を築き豊臣五大老の一人として秀吉没後の政権を支えた。', category: '人物', subcategory: '軍事', keywords: ['前田利家'], era: '安土桃山' },
  { id: 'h259', year: 1583, title: '前田利家が金沢城に入城し加賀藩の基礎を築く', description: '賤ヶ岳の戦い後に金沢城に入り北陸の支配を確立。100万石を超える大藩・加賀藩（前田家）の礎を築いた。', category: '人物', subcategory: '政治', keywords: ['前田利家'], era: '安土桃山' },
  // p122 長宗我部元親
  { id: 'p122', year: 1539, title: '長宗我部元親',  description: '戦国時代の大名。四国の覇者として土佐・阿波・伊予・讃岐の四国統一を達成したが秀吉の四国征伐で降伏した。', category: '人物', subcategory: '軍事', keywords: ['長宗我部元親'], era: '安土桃山' },
  { id: 'h260', year: 1585, title: '長宗我部元親が四国統一を達成するが秀吉に降伏する', description: '四国をほぼ統一したが豊臣秀吉の大軍（10万人）による四国征伐で降伏。土佐一国のみ安堵された。', category: '人物', subcategory: '軍事', keywords: ['長宗我部元親'], era: '安土桃山' },
  // p123 黒田官兵衛
  { id: 'p123', year: 1546, title: '黒田官兵衛',   description: '織田信長・豊臣秀吉に仕えた軍師。如水とも呼ばれ卓越した戦略眼で秀吉の天下統一を陰で支えた。', category: '人物', subcategory: '軍事', keywords: ['黒田官兵衛'], era: '安土桃山' },
  { id: 'h261', year: 1582, title: '黒田官兵衛が中国大返しを献策し秀吉の天下を開く', description: '本能寺の変の報を受けた秀吉に毛利との和議締結と即座の京都帰還（中国大返し）を進言。この判断が秀吉の天下人への道を開いた。', category: '人物', subcategory: '軍事', keywords: ['黒田官兵衛'], era: '安土桃山' },
  // p124 細川ガラシャ
  { id: 'p124', year: 1563, title: '細川ガラシャ',  description: '明智光秀の娘・玉。細川忠興の妻。キリスト教に帰依しガラシャの洗礼名を持つ。関ヶ原前夜に人質を拒んで自決した悲劇の女性。', category: '人物', subcategory: '文化', keywords: ['細川ガラシャ'], era: '安土桃山' },
  { id: 'h262', year: 1600, title: '細川ガラシャが関ヶ原前夜に石田三成の人質要求を拒んで死を選ぶ', description: '関ヶ原の戦い直前、西軍の人質となることを拒んで家老に介錯を命じ自決。キリスト教の信仰を貫いた悲劇的な最期として語り継がれる。', category: '人物', subcategory: '文化', keywords: ['細川ガラシャ'], era: '安土桃山' },
  // p125 真田幸村
  { id: 'p125', year: 1567, title: '真田幸村',     description: '戦国時代の武将。大坂の陣で徳川家康を追い詰めた「日本一の兵」。真田丸の活躍と最後の突撃は武将の鑑として称えられる。', category: '人物', subcategory: '軍事', keywords: ['真田幸村'], era: '江戸' },
  { id: 'h263', year: 1600, title: '真田幸村が関ヶ原で父・昌幸とともに上田城に籠城し徳川秀忠軍を足止めする', description: '関ヶ原の戦いで西軍に加わり父・昌幸と上田城に籠城。秀忠率いる徳川軍3万8000を足止めし本戦への参加を遅らせた。', category: '人物', subcategory: '軍事', keywords: ['真田幸村'], era: '江戸' },
  { id: 'h264', year: 1615, title: '真田幸村が大坂夏の陣で家康本陣に迫り戦死する', description: '大坂夏の陣で真田丸を構築して奮戦。最後の突撃で家康の本陣まで迫り本陣を壊乱させたが討ち死にした。「日本一の兵」の称号を残した。', category: '人物', subcategory: '軍事', keywords: ['真田幸村'], era: '江戸' },
  // p126 淀殿
  { id: 'p126', year: 1569, title: '淀殿',         description: '豊臣秀吉の側室。浅井長政の娘・茶々。豊臣秀頼を産み豊臣政権の実権を握った。大坂夏の陣で秀頼とともに自害した。', category: '人物', subcategory: '政治', keywords: ['淀殿'], era: '江戸' },
  { id: 'h265', year: 1615, title: '淀殿が大坂城落城とともに豊臣秀頼と自害する', description: '大坂夏の陣で徳川軍に大坂城を攻め落とされ息子・秀頼とともに自害。豊臣氏の終焉とともに悲劇の最期を遂げた。', category: '人物', subcategory: '政治', keywords: ['淀殿'], era: '江戸' },
  // p127 徳川秀忠
  { id: 'p127', year: 1579, title: '徳川秀忠',     description: '江戸幕府第2代将軍。武家諸法度・禁中並公家諸法度を整備し幕藩体制の基盤を固めた。徳川政権の制度的確立者。', category: '人物', subcategory: '政治', keywords: ['徳川秀忠'], era: '江戸' },
  { id: 'h266', year: 1615, title: '徳川秀忠が武家諸法度を制定し大名統制の法的基盤を作る', description: '大坂夏の陣後に武家諸法度・禁中並公家諸法度を制定。参勤交代制度の原型も整備し江戸幕府の統治体制を法的に確立した。', category: '人物', subcategory: '政治', keywords: ['徳川秀忠'], era: '江戸' },
  // p128 春日局
  { id: 'p128', year: 1579, title: '春日局',       description: '徳川家光の乳母。家光を三代将軍に据えるために尽力し朝廷への独断参内で従三位を得た。江戸幕府の大奥制度を確立した。', category: '人物', subcategory: '政治', keywords: ['春日局'], era: '江戸' },
  { id: 'h267', year: 1634, title: '春日局が朝廷に独断で参内し従三位を授かる', description: '家光の将軍権威強化のため幕府に無断で江戸から上洛し後水尾天皇に謁見。従三位を授かり大奥の最高権力者としての地位を確固とした。', category: '人物', subcategory: '政治', keywords: ['春日局'], era: '江戸' },
  // p129 柳生宗矩
  { id: 'p129', year: 1571, title: '柳生宗矩',     description: '江戸初期の剣客・大名。柳生新陰流を江戸幕府の兵法指南として確立。徳川秀忠・家光の剣術師範を務めた。', category: '人物', subcategory: '文化', keywords: ['柳生宗矩'], era: '江戸' },
  { id: 'h268', year: 1632, title: '柳生宗矩が兵法家伝書を著す', description: '剣の極意と武士の心得を論じた兵法家伝書を著述。剣の道を通じた人格形成を説き後の武士道思想に影響を与えた。', category: '人物', subcategory: '文化', keywords: ['柳生宗矩'], era: '江戸' },
  // p130 徳川家光
  { id: 'p130', year: 1604, title: '徳川家光',     description: '江戸幕府第3代将軍。参勤交代・鎖国体制を確立し幕藩体制を完成させた。「生まれながらの将軍」として幕府権力を磐石にした。', category: '人物', subcategory: '政治', keywords: ['徳川家光'], era: '江戸' },
  { id: 'h269', year: 1635, title: '徳川家光が参勤交代制度を確立する', description: '武家諸法度改訂で参勤交代を義務化。大名が定期的に江戸と国元を往復する制度で大名の財力を消耗させ反乱を防いだ。', category: '人物', subcategory: '政治', keywords: ['徳川家光'], era: '江戸' },
  { id: 'h270', year: 1641, title: '徳川家光が鎖国体制を完成させる', description: 'ポルトガル船の来航禁止・出島のオランダ商館設置により鎖国体制を完成。以後200年の対外政策の基盤となった。', category: '人物', subcategory: '政治', keywords: ['徳川家光'], era: '江戸' },
  // p131 徳川綱吉
  { id: 'p131', year: 1646, title: '徳川綱吉',     description: '江戸幕府第5代将軍。生類憐みの令で知られるが儒学振興・文治政治を推進した元禄文化の擁護者でもある。', category: '人物', subcategory: '政治', keywords: ['徳川綱吉'], era: '江戸' },
  { id: 'h271', year: 1685, title: '徳川綱吉が生類憐みの令を発する', description: '犬や生き物を大切にするよう命じた一連の法令。特に犬を保護したため犬公方と呼ばれた。元禄文化を花開かせた一方で悪法として批判も受けた。', category: '人物', subcategory: '政治', keywords: ['徳川綱吉'], era: '江戸' },
  // p132 松平定信
  { id: 'p132', year: 1758, title: '松平定信',     description: '江戸幕府老中。寛政の改革を断行し幕府財政の再建・風紀粛正に取り組んだ。「白河の清きに魚のすみかねて…」と批判も受けた。', category: '人物', subcategory: '政治', keywords: ['松平定信'], era: '江戸' },
  { id: 'h272', year: 1787, title: '松平定信が寛政の改革を実施する', description: '老中として倹約令・棄捐令（旗本の借金帳消し）・囲米・異学の禁などを断行。田沼時代の腐敗を正そうとしたが厳格すぎると批判を受けた。', category: '人物', subcategory: '政治', keywords: ['松平定信'], era: '江戸' },
  // p133 二宮尊徳
  { id: 'p133', year: 1787, title: '二宮尊徳',     description: '江戸後期の農政家・思想家。報徳思想を説き荒廃した農村の復興に尽力した。薪を背負いながら本を読む姿は勤勉の象徴とされた。', category: '人物', subcategory: '文化', keywords: ['二宮尊徳'], era: '江戸' },
  { id: 'h273', year: 1820, title: '二宮尊徳が報徳仕法により農村復興を実践する', description: '小田原藩士から独立し報徳仕法（農業技術・精神改革の総合復興策）を各地の農村で実施。600以上の村の復興に関わり農民の生活を向上させた。', category: '人物', subcategory: '経済', keywords: ['二宮尊徳'], era: '江戸' },
  // p134 高野長英
  { id: 'p134', year: 1804, title: '高野長英',     description: '幕末の蘭方医・洋学者。蛮社の獄で投獄されたが脱獄し西洋医学・兵学の普及に尽くした。鎖国批判の先駆者。', category: '人物', subcategory: '文化', keywords: ['高野長英'], era: '江戸' },
  { id: 'h274', year: 1839, title: '高野長英が蛮社の獄で幕府に弾圧される', description: '幕府の外交批判（モリソン号事件批判）を著した「戊戌夢物語」が問題視され渡辺崋山らとともに弾圧された。鎖国の矛盾を批判した先駆的知識人。', category: '人物', subcategory: '政治', keywords: ['高野長英'], era: '江戸' },
  // p135 篤姫（天璋院）
  { id: 'p135', year: 1836, title: '篤姫（天璋院）', description: '薩摩藩主島津家出身。徳川家定の正室となり将軍家の一員として幕末を生きた。江戸城無血開城の実現に尽力した女性。', category: '人物', subcategory: '政治', keywords: ['篤姫'], era: '幕末' },
  { id: 'h275', year: 1868, title: '篤姫が西郷隆盛への書状で江戸城無血開城に貢献する', description: '薩摩出身でありながら徳川家の一員として西郷隆盛に書状を送り江戸城無血開城実現への橋渡し役を果たした。', category: '人物', subcategory: '政治', keywords: ['篤姫'], era: '幕末' },
  // p136 河井継之助
  { id: 'p136', year: 1827, title: '河井継之助',   description: '幕末の長岡藩家老。ガトリング砲を購入し武装中立を目指したが戊辰戦争で北越戦争を戦い銃傷がもとで死去した。', category: '人物', subcategory: '軍事', keywords: ['河井継之助'], era: '幕末' },
  { id: 'h276', year: 1868, title: '河井継之助が長岡藩の武装中立を掲げ北越戦争を戦う', description: '長岡藩の武装中立交渉が決裂し新政府軍と戦った北越戦争。ガトリング砲を活用した戦いで名をはせたが銃創を受け戦後死去した。', category: '人物', subcategory: '軍事', keywords: ['河井継之助'], era: '幕末' },
  // p137 榎本武揚
  { id: 'p137', year: 1836, title: '榎本武揚',     description: '幕末・明治の軍人・政治家。旧幕府軍を率いて北海道に渡り蝦夷共和国を樹立したが降伏後は明治政府に仕え多くの要職を歴任した。', category: '人物', subcategory: '政治', keywords: ['榎本武揚'], era: '明治' },
  { id: 'h277', year: 1868, title: '榎本武揚が旧幕府艦隊を率いて北海道に渡る', description: '戊辰戦争で旧幕府軍が敗れる中、軍艦8隻を率いて蝦夷地（北海道）に渡り五稜郭を拠点に抵抗した。', category: '人物', subcategory: '軍事', keywords: ['榎本武揚'], era: '明治' },
  { id: 'h278', year: 1869, title: '榎本武揚が蝦夷共和国を樹立するが新政府に降伏する', description: '蝦夷共和国（箱館政府）の総裁に就任したが新政府軍に敗れ降伏。特赦後に明治政府の外務大臣・逓信大臣など要職を歴任した。', category: '人物', subcategory: '政治', keywords: ['榎本武揚'], era: '明治' },
  // p138 大隈重信
  { id: 'p138', year: 1838, title: '大隈重信',     description: '明治の政治家・教育者。立憲改進党を創設し早稲田大学の前身・東京専門学校を設立した。2度内閣総理大臣を務めた。', category: '人物', subcategory: '政治', keywords: ['大隈重信'], era: '明治' },
  { id: 'h279', year: 1882, title: '大隈重信が立憲改進党を結成し早稲田大学を設立する', description: '自由民権運動の中で立憲改進党を結成。同年に東京専門学校（現・早稲田大学）を設立し近代的な高等教育機関の普及に貢献した。', category: '人物', subcategory: '政治', keywords: ['大隈重信'], era: '明治' },
  // p139 板垣退助
  { id: 'p139', year: 1837, title: '板垣退助',     description: '明治の政治家。自由民権運動の指導者として自由党を結成。「板垣死すとも自由は死せず」の言葉で知られる民主主義の先駆者。', category: '人物', subcategory: '政治', keywords: ['板垣退助'], era: '明治' },
  { id: 'h280', year: 1874, title: '板垣退助が民撰議院設立建白書を提出する', description: '国会開設を求める民撰議院設立建白書を政府に提出。自由民権運動の出発点となり立憲政治確立への世論を高めた。', category: '人物', subcategory: '政治', keywords: ['板垣退助'], era: '明治' },
  // p140 陸奥宗光
  { id: 'p140', year: 1844, title: '陸奥宗光',     description: '明治の外交官・政治家。「剃刀大臣」と呼ばれ日英通商航海条約締結・日清戦争の講和を主導。不平等条約の改正に尽力した。', category: '人物', subcategory: '外交', keywords: ['陸奥宗光'], era: '明治' },
  { id: 'h281', year: 1894, title: '陸奥宗光が日英通商航海条約を締結し不平等条約を改正する', description: '外務大臣として日英通商航海条約を締結し領事裁判権の撤廃に成功。幕末以来の懸案だった不平等条約改正の突破口を開いた。', category: '人物', subcategory: '外交', keywords: ['陸奥宗光'], era: '明治' },
  // p141 乃木希典
  { id: 'p141', year: 1849, title: '乃木希典',     description: '明治の陸軍大将。旅順要塞攻略で多大な犠牲を出したが日露戦争の英雄。明治天皇崩御に際し妻とともに殉死した。', category: '人物', subcategory: '軍事', keywords: ['乃木希典'], era: '明治' },
  { id: 'h282', year: 1905, title: '乃木希典が旅順要塞を攻略する', description: '日露戦争で旅順のロシア要塞を203高地奪取により陥落させた。多大な犠牲を伴った戦いで乃木将軍の名が世界に知られることになった。', category: '人物', subcategory: '軍事', keywords: ['乃木希典'], era: '明治' },
  // p142 正岡子規
  { id: 'p142', year: 1867, title: '正岡子規',     description: '明治の俳人・歌人。俳句・短歌の近代的革新を主導し写生を重視した文学運動を起こした。34歳で結核により早世した。', category: '人物', subcategory: '文化', keywords: ['正岡子規'], era: '明治' },
  { id: 'h283', year: 1895, title: '正岡子規が俳句の近代的革新を主導する', description: '写生を重視した俳句革新運動を展開し日本派を形成。ホトトギスの創刊（1897年）を通じ芭蕉以来の俳句観を根本から変えた。', category: '人物', subcategory: '文化', keywords: ['正岡子規'], era: '明治' },
  // p143 二葉亭四迷
  { id: 'p143', year: 1864, title: '二葉亭四迷',   description: '明治の作家。浮雲（1887年）で言文一致体を確立した近代日本文学の開拓者。ロシア語にも堪能でゴーゴリ・ツルゲーネフの翻訳を行った。', category: '人物', subcategory: '文化', keywords: ['二葉亭四迷'], era: '明治' },
  { id: 'h284', year: 1887, title: '二葉亭四迷が浮雲を著し言文一致体を確立する', description: '口語体で書かれた小説・浮雲を発表し言文一致運動の先頭に立った。日本近代文学の出発点とされる歴史的な作品。', category: '人物', subcategory: '文化', keywords: ['二葉亭四迷'], era: '明治' },
  // p144 岡倉天心
  { id: 'p144', year: 1863, title: '岡倉天心',     description: '明治の美術思想家。日本美術院を設立し日本の伝統美術の復興を主導した。英文で書いた茶の本（The Book of Tea）は世界で読まれた。', category: '人物', subcategory: '文化', keywords: ['岡倉天心'], era: '明治' },
  { id: 'h285', year: 1906, title: '岡倉天心が茶の本（The Book of Tea）を英語で出版する', description: '英語で茶道・日本文化の精神を世界に伝えたThe Book of Teaを出版。日本の美学をアジア主義の観点から西洋に伝えた文化使節的著作。', category: '人物', subcategory: '文化', keywords: ['岡倉天心'], era: '明治' },
  // p145 幸田露伴
  { id: 'p145', year: 1867, title: '幸田露伴',     description: '明治・大正の小説家。五重塔（1891年）で有名な写実主義文学の作家。尾崎紅葉と並び紅露時代を形成した。', category: '人物', subcategory: '文化', keywords: ['幸田露伴'], era: '明治' },
  { id: 'h286', year: 1891, title: '幸田露伴が五重塔を著す', description: '職人の理想と情熱を描いた中編小説。不器用だが信念を貫く主人公・のっそり十兵衛の姿は日本近代文学の傑作として高く評価される。', category: '人物', subcategory: '文化', keywords: ['幸田露伴'], era: '明治' },
  // p146 島崎藤村
  { id: 'p146', year: 1872, title: '島崎藤村',     description: '明治・大正の詩人・小説家。若菜集で近代詩を確立し破戒・夜明け前など自然主義文学の代表作を著した。', category: '人物', subcategory: '文化', keywords: ['島崎藤村'], era: '明治' },
  { id: 'h287', year: 1906, title: '島崎藤村が破戒を著す', description: '被差別部落出身の教師の苦悩を描いた自然主義文学の先駆的作品。日本近代文学における社会問題・自己解放の先駆けとなった。', category: '人物', subcategory: '文化', keywords: ['島崎藤村'], era: '明治' },
  // p147 永井荷風
  { id: 'p147', year: 1879, title: '永井荷風',     description: '明治・大正・昭和の小説家。墨東綺譚など下町・花街の風俗を描いた唯美派文学の代表者。明治・大正のモダニズムを体現した。', category: '人物', subcategory: '文化', keywords: ['永井荷風'], era: '明治' },
  { id: 'h288', year: 1937, title: '永井荷風が墨東綺譚を著す', description: '東京・玉の井の私娼窟を舞台にした老小説家の恋愛を描いた作品。消えゆく江戸・東京の風情への哀惜が込められた代表作。', category: '人物', subcategory: '文化', keywords: ['永井荷風'], era: '昭和' },
  // p148 谷崎潤一郎
  { id: 'p148', year: 1886, title: '谷崎潤一郎',   description: '大正・昭和の小説家。細雪・痴人の愛・陰翳礼讃など官能的・唯美的な作品で知られる近代日本文学の巨人。', category: '人物', subcategory: '文化', keywords: ['谷崎潤一郎'], era: '大正' },
  { id: 'h289', year: 1943, title: '谷崎潤一郎が細雪を著す', description: '大阪の旧家・蒔岡家四姉妹の生活を描いた長編小説。日本的な美意識・家族の崩壊を繊細に描き日本文学の最高傑作の一つとされる。', category: '人物', subcategory: '文化', keywords: ['谷崎潤一郎'], era: '昭和' },
  // p149 志賀直哉
  { id: 'p149', year: 1883, title: '志賀直哉',     description: '大正・昭和の小説家。暗夜行路・城の崎にてなど精緻な文体で知られ「小説の神様」と称された白樺派の代表者。', category: '人物', subcategory: '文化', keywords: ['志賀直哉'], era: '大正' },
  { id: 'h290', year: 1917, title: '志賀直哉が城の崎にてを著す', description: '死の体験を静謐な文体で描いた短編傑作。日本語の美しさを極めた文体は「小説の神様」の称号の源泉となった。', category: '人物', subcategory: '文化', keywords: ['志賀直哉'], era: '大正' },
  // p150 石川啄木
  { id: 'p150', year: 1886, title: '石川啄木',     description: '明治の歌人・詩人。一握の砂・悲しき玩具などで知られる天才歌人。貧困と病苦の中で26歳で早世した。', category: '人物', subcategory: '文化', keywords: ['石川啄木'], era: '明治' },
  { id: 'h291', year: 1910, title: '石川啄木が一握の砂を出版する', description: '「東海の小島の磯の白砂に…」など口語調の短歌を収めた歌集。労働・貧困・望郷など近代人の哀愁を詠んだ大正浪漫の傑作。', category: '人物', subcategory: '文化', keywords: ['石川啄木'], era: '明治' },
  // p151 吉川英治
  { id: 'p151', year: 1892, title: '吉川英治',     description: '大正・昭和の作家。宮本武蔵・三国志・新書太閤記など歴史小説で知られる「国民文学の父」。多くの作品が映画・ドラマ化された。', category: '人物', subcategory: '文化', keywords: ['吉川英治'], era: '大正' },
  { id: 'h292', year: 1935, title: '吉川英治が宮本武蔵を連載し国民的人気を得る', description: '朝日新聞で連載された宮本武蔵は空前の大ヒットとなり剣豪小説・時代小説ブームを起こした。剣の求道者としての武蔵像を作り上げた。', category: '人物', subcategory: '文化', keywords: ['吉川英治'], era: '昭和' },
  // p152 小林多喜二
  { id: 'p152', year: 1903, title: '小林多喜二',   description: '昭和の小説家。蟹工船（1929年）で知られるプロレタリア文学の旗手。特高警察に逮捕され拷問により29歳で死去した。', category: '人物', subcategory: '文化', keywords: ['小林多喜二'], era: '昭和' },
  { id: 'h293', year: 1929, title: '小林多喜二が蟹工船を著す', description: 'カムチャツカ沖の蟹工船での過酷な労働と争議を描いたプロレタリア文学の代表作。2008年に再ブームが起き「蟹工船ブーム」が社会現象となった。', category: '人物', subcategory: '文化', keywords: ['小林多喜二'], era: '昭和' },
  // p153 林芙美子
  { id: 'p153', year: 1903, title: '林芙美子',     description: '昭和の小説家。放浪記・浮雲など女性の自立と生の充実を描いた作家。貧困から身を起こした自伝的作品で広く読まれた。', category: '人物', subcategory: '文化', keywords: ['林芙美子'], era: '昭和' },
  { id: 'h294', year: 1930, title: '林芙美子が放浪記を出版する', description: '日記体で貧困と自由への渇望を綴った自伝的作品。改造社から刊行され大ベストセラーとなり林芙美子の名を一躍有名にした。', category: '人物', subcategory: '文化', keywords: ['林芙美子'], era: '昭和' },
  // p154 本田宗一郎
  { id: 'p154', year: 1906, title: '本田宗一郎',   description: '本田技研工業の創業者。世界一のオートバイメーカーを一代で築き上げた技術者・実業家。夢を追い続けた経営者として世界で尊敬される。', category: '人物', subcategory: '経済', keywords: ['本田宗一郎'], era: '昭和' },
  { id: 'h295', year: 1948, title: '本田宗一郎が本田技研工業を創業する', description: '本田技術研究所に続き本田技研工業株式会社を創業。スーパーカブなどオートバイの世界シェアNo.1を達成し自動車事業にも進出した。', category: '人物', subcategory: '経済', keywords: ['本田宗一郎'], era: '昭和' },
  { id: 'h296', year: 1964, title: '本田宗一郎がF1グランプリでホンダエンジンを初優勝させる', description: 'F1参戦から2年でメキシコGPにおいてホンダエンジンが初優勝。世界最高峰の技術競争への挑戦が日本製品の品質証明となった。', category: '人物', subcategory: '経済', keywords: ['本田宗一郎'], era: '昭和' },
  // p155 井深大
  { id: 'p155', year: 1908, title: '井深大',       description: 'ソニーの共同創業者。トランジスタラジオ・ウォークマンなど革新的な家電を世に送り出した技術者。盛田昭夫とともに日本の家電産業を世界水準に引き上げた。', category: '人物', subcategory: '経済', keywords: ['井深大'], era: '昭和' },
  { id: 'h297', year: 1946, title: '井深大が東京通信工業（ソニーの前身）を設立する', description: '盛田昭夫とともに東京通信工業を設立。日本初のテープレコーダー・トランジスタラジオを開発し世界的な電機メーカーSONYへと成長させた。', category: '人物', subcategory: '経済', keywords: ['井深大'], era: '昭和' },
  // p156 盛田昭夫
  { id: 'p156', year: 1921, title: '盛田昭夫',     description: 'ソニーの共同創業者。ウォークマンなどの革新的製品を世界市場に売り込んだマーケター・経営者。Made in Japanの地位を高めた。', category: '人物', subcategory: '経済', keywords: ['盛田昭夫'], era: '昭和' },
  { id: 'h298', year: 1979, title: '盛田昭夫がウォークマンを発売し音楽体験を変える', description: 'ソニーのウォークマンを世界に発売。音楽を外に持ち出す文化を創出しiPodに至る個人用音楽プレーヤーの原型を作った。', category: '人物', subcategory: '経済', keywords: ['盛田昭夫'], era: '昭和' },
  // p157 松本清張
  { id: 'p157', year: 1909, title: '松本清張',     description: '昭和の作家。点と線・砂の器など社会派推理小説の第一人者。41歳で芥川賞を受賞し多作な創作で昭和の文壇に君臨した。', category: '人物', subcategory: '文化', keywords: ['松本清張'], era: '昭和' },
  { id: 'h299', year: 1958, title: '松本清張が点と線を発表し社会派推理小説を確立する', description: '鉄道のアリバイを解くトリックと社会の不条理を絡めた点と線を発表。社会派ミステリーという新ジャンルを切り開き推理小説の大衆化を促した。', category: '人物', subcategory: '文化', keywords: ['松本清張'], era: '昭和' },
  // p158 吉田茂
  { id: 'p158', year: 1878, title: '吉田茂',       description: '戦後日本の宰相。サンフランシスコ講和条約を締結し日本の独立と日米同盟を確立した。高度経済成長の基盤を作った戦後最大の政治家。', category: '人物', subcategory: '政治', keywords: ['吉田茂'], era: '昭和' },
  { id: 'h300', year: 1951, title: '吉田茂がサンフランシスコ講和条約・日米安全保障条約に調印する', description: 'サンフランシスコ講和条約で連合国との平和条約を締結し日本の独立を回復。同時に日米安保条約を締結し戦後の安全保障体制を確立した。', category: '人物', subcategory: '外交', keywords: ['吉田茂'], era: '昭和' },
  // p159 鳩山一郎
  { id: 'p159', year: 1883, title: '鳩山一郎',     description: '昭和の政治家。自由民主党の初代総裁・内閣総理大臣。日ソ共同宣言でソ連と国交を正常化し日本の国連加盟を実現した。', category: '人物', subcategory: '政治', keywords: ['鳩山一郎'], era: '昭和' },
  { id: 'h301', year: 1956, title: '鳩山一郎が日ソ共同宣言に調印し国連加盟を実現する', description: '日ソ共同宣言を締結してソ連と国交を正常化。ソ連の拒否権行使を排除し日本の国連加盟（1956年12月）を実現した。', category: '人物', subcategory: '外交', keywords: ['鳩山一郎'], era: '昭和' },
  // p160 池田勇人
  { id: 'p160', year: 1899, title: '池田勇人',     description: '昭和の政治家・内閣総理大臣。所得倍増計画を掲げ高度経済成長を主導した。1960年代の日本の急速な経済発展を政策的に後押しした。', category: '人物', subcategory: '政治', keywords: ['池田勇人'], era: '昭和' },
  { id: 'h302', year: 1960, title: '池田勇人が所得倍増計画を発表する', description: '10年間で国民所得を2倍にするという所得倍増計画を閣議決定。高度経済成長の象徴的な政策として実際には7年で達成され日本経済の奇跡を演出した。', category: '人物', subcategory: '経済', keywords: ['池田勇人'], era: '昭和' },
  // p161 佐藤栄作
  { id: 'p161', year: 1901, title: '佐藤栄作',     description: '昭和の政治家・内閣総理大臣。沖縄返還を実現し非核三原則を提唱してノーベル平和賞を受賞した。憲政史上最長の在任記録を持つ。', category: '人物', subcategory: '政治', keywords: ['佐藤栄作'], era: '昭和' },
  { id: 'h303', year: 1972, title: '佐藤栄作が沖縄返還を実現する', description: '1972年に沖縄の施政権がアメリカから日本に返還された。在任7年8ヶ月の長期政権を通じた粘り強い交渉の結果。ノーベル平和賞を受賞した。', category: '人物', subcategory: '政治', keywords: ['佐藤栄作'], era: '昭和' },
  // p162 中曽根康弘
  { id: 'p162', year: 1918, title: '中曽根康弘',   description: '昭和・平成の政治家・内閣総理大臣。国鉄・電電公社の民営化（JR・NTT）を断行し日本の産業構造を変革した。', category: '人物', subcategory: '政治', keywords: ['中曽根康弘'], era: '昭和' },
  { id: 'h304', year: 1987, title: '中曽根康弘が国鉄・電電公社を民営化する', description: '長年の懸案だった国鉄をJRグループに、電電公社をNTTに民営化。行政改革・民間活力導入の代表例として国際的にも注目された。', category: '人物', subcategory: '政治', keywords: ['中曽根康弘'], era: '昭和' },
  // p163 稲盛和夫
  { id: 'p163', year: 1932, title: '稲盛和夫',     description: '京セラ・KDDIの創業者。破綻したJALの会長として経営再建を主導した。アメーバ経営・フィロソフィなど独自の経営哲学で知られる。', category: '人物', subcategory: '経済', keywords: ['稲盛和夫'], era: '昭和' },
  { id: 'h305', year: 1959, title: '稲盛和夫が京セラ（京都セラミック）を創業する', description: '27歳で京都セラミック株式会社を創業。ファインセラミクス技術を基盤に世界的企業に成長させ後にKDDI創業・JAL再建も果たした。', category: '人物', subcategory: '経済', keywords: ['稲盛和夫'], era: '昭和' },
  // p164 水木しげる
  { id: 'p164', year: 1922, title: '水木しげる',   description: '昭和・平成の漫画家。ゲゲゲの鬼太郎の作者。戦争体験と妖怪愛が融合した独自の世界観で日本の妖怪文化を現代に甦らせた。', category: '人物', subcategory: '文化', keywords: ['水木しげる'], era: '昭和' },
  { id: 'h306', year: 1965, title: '水木しげるがゲゲゲの鬼太郎を連載開始する', description: '鬼太郎を主人公とした妖怪漫画をガロ・少年マガジンで連載開始。日本の妖怪文化を現代に甦らせアニメ化で国民的キャラクターとなった。', category: '人物', subcategory: '文化', keywords: ['水木しげる'], era: '昭和' },
  // p165 手塚治虫
  { id: 'p165', year: 1928, title: '手塚治虫',     description: '昭和の漫画家・アニメーター。鉄腕アトム・ブラックジャック・火の鳥など多数の名作を生み出した「漫画の神様」。日本の漫画・アニメの父。', category: '人物', subcategory: '文化', keywords: ['手塚治虫'], era: '昭和' },
  { id: 'h307', year: 1952, title: '手塚治虫が鉄腕アトムを連載開始する', description: '少年漫画誌・少年に鉄腕アトムを連載開始。ロボットと人間の共存を描いたSF漫画は日本漫画の革新的先駆けとなり1963年にアニメ化された。', category: '人物', subcategory: '文化', keywords: ['手塚治虫'], era: '昭和' },
  { id: 'h308', year: 1973, title: '手塚治虫がブラックジャック・火の鳥を連載する', description: 'モラルと生命をテーマにした医療漫画ブラックジャック、生命の輪廻を描く火の鳥を同時期に連載。漫画表現の可能性を極限まで広げた。', category: '人物', subcategory: '文化', keywords: ['手塚治虫'], era: '昭和' },
  // p166 宮崎駿
  { id: 'p166', year: 1941, title: '宮崎駿',       description: 'スタジオジブリの監督。風の谷のナウシカ・もののけ姫・千と千尋の神隠しなど世界的に愛されるアニメ映画を創造した。', category: '人物', subcategory: '文化', keywords: ['宮崎駿'], era: '昭和' },
  { id: 'h309', year: 1997, title: '宮崎駿がもののけ姫を製作し日本映画興行記録を塗り替える', description: '人間と自然の共生をテーマにしたもののけ姫が当時の日本映画最高興行収入を記録。ジブリアニメが世界的地位を確立する転換点となった。', category: '人物', subcategory: '文化', keywords: ['宮崎駿'], era: '平成' },
  { id: 'h310', year: 2003, title: '宮崎駿が千と千尋の神隠しでアカデミー賞を受賞する', description: '千と千尋の神隠しがアカデミー賞長編アニメーション賞を受賞。日本のアニメーションが世界最高峰の映画賞を受賞した歴史的快挙。', category: '人物', subcategory: '文化', keywords: ['宮崎駿'], era: '平成' },
  // p167 大江健三郎
  { id: 'p167', year: 1935, title: '大江健三郎',   description: '昭和・平成の小説家。個人的な体験（障害を持つ息子との生活）と政治的・社会的テーマを融合した文学でノーベル文学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['大江健三郎'], era: '昭和' },
  { id: 'h311', year: 1994, title: '大江健三郎がノーベル文学賞を受賞する', description: '「詩的な力によって現実と神話が絡み合う想像力の世界を創りだし、現代人の苦境を描いた」として日本人二人目のノーベル文学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['大江健三郎'], era: '平成' },
  // p168 村上春樹
  { id: 'p168', year: 1949, title: '村上春樹',     description: '平成の小説家。ノルウェイの森・海辺のカフカ・1Q84など世界中で読まれる国際的作家。独自のスタイルで日本語小説の世界的評価を高めた。', category: '人物', subcategory: '文化', keywords: ['村上春樹'], era: '昭和' },
  { id: 'h312', year: 1987, title: '村上春樹がノルウェイの森を発表し世界的作家となる', description: '喪失と青春を描いたノルウェイの森を発表。日本で440万部のベストセラーとなり多言語に翻訳されて国際的な評価を確立した。', category: '人物', subcategory: '文化', keywords: ['村上春樹'], era: '昭和' },
  // p169 坂本龍一
  { id: 'p169', year: 1952, title: '坂本龍一',     description: '昭和・平成・令和の音楽家。YMOのメンバーとして世界的評価を得たのちソロで活躍。戦場のメリークリスマスでアカデミー賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['坂本龍一'], era: '昭和' },
  { id: 'h313', year: 1978, title: '坂本龍一がYMO（イエロー・マジック・オーケストラ）を結成する', description: '細野晴臣・高橋幸宏とYMOを結成。テクノポップ・シンセサイザー音楽で世界を席巻し日本のポップカルチャーの国際化を先導した。', category: '人物', subcategory: '文化', keywords: ['坂本龍一'], era: '昭和' },
  { id: 'h314', year: 1983, title: '坂本龍一が戦場のメリークリスマスでアカデミー賞を受賞する', description: '大島渚監督・戦場のメリークリスマスの音楽を担当しBAFTA賞（英国アカデミー賞）音楽賞を受賞。映画音楽家としても世界的評価を確立した。', category: '人物', subcategory: '文化', keywords: ['坂本龍一'], era: '昭和' },
  // p170 北野武
  { id: 'p170', year: 1947, title: '北野武',       description: 'ビートたけし名義のお笑いタレント・映画監督。HANA-BI（1997年）でヴェネツィア映画祭金獅子賞を受賞し世界的映画監督となった。', category: '人物', subcategory: '文化', keywords: ['北野武'], era: '昭和' },
  { id: 'h315', year: 1997, title: '北野武がHANA-BIでヴェネツィア映画祭金獅子賞を受賞する', description: '暴力と静寂・生と死をテーマにしたHANA-BIがヴェネツィア映画祭最高賞・金獅子賞を受賞。日本映画・アジア映画の国際的評価を高めた。', category: '人物', subcategory: '文化', keywords: ['北野武'], era: '平成' },
  // p171 山中伸弥
  { id: 'p171', year: 1962, title: '山中伸弥',     description: '京都大学教授。iPS細胞（人工多能性幹細胞）の作製に成功しノーベル生理学・医学賞を受賞した再生医療の革命的研究者。', category: '人物', subcategory: '文化', keywords: ['山中伸弥'], era: '昭和' },
  { id: 'h316', year: 2006, title: '山中伸弥がiPS細胞の作製に成功する', description: '成熟した細胞に4つの因子を導入するだけで多能性幹細胞（iPS細胞）を作製することに成功。再生医療・創薬に革命をもたらした2012年ノーベル賞受賞業績。', category: '人物', subcategory: '文化', keywords: ['山中伸弥'], era: '平成' },
  // p172 本庶佑
  { id: 'p172', year: 1942, title: '本庶佑',       description: '京都大学名誉教授。PD-1（免疫チェックポイント阻害剤）の発見によりがん免疫療法オプジーボの開発に貢献しノーベル生理学・医学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['本庶佑'], era: '昭和' },
  { id: 'h317', year: 2018, title: '本庶佑がノーベル生理学・医学賞を受賞する', description: '免疫チェックポイント阻害によるがん治療法の発見でジェームズ・アリソンとともにノーベル生理学・医学賞を共同受賞した。', category: '人物', subcategory: '文化', keywords: ['本庶佑'], era: '平成' },
  // p173 大隅良典
  { id: 'p173', year: 1945, title: '大隅良典',     description: '東京工業大学名誉教授。オートファジー（細胞の自食作用）の仕組みの解明でノーベル生理学・医学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['大隅良典'], era: '昭和' },
  { id: 'h318', year: 2016, title: '大隅良典がオートファジーの解明でノーベル生理学・医学賞を受賞する', description: '細胞が自らの成分を分解・再利用するオートファジーの分子メカニズムを解明しノーベル賞を単独受賞。飢餓応答・がん・パーキンソン病との関連も注目された。', category: '人物', subcategory: '文化', keywords: ['大隅良典'], era: '平成' },
  // p174 赤崎勇
  { id: 'p174', year: 1929, title: '赤崎勇',       description: '名古屋大学名誉教授。青色LEDを世界で初めて実用化し照明革命をもたらした。天野浩・中村修二とともにノーベル物理学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['赤崎勇'], era: '昭和' },
  { id: 'h319', year: 1993, title: '赤崎勇・天野浩が青色LEDの実用化に成功する', description: '長年不可能とされた青色LEDを窒化ガリウムを用いて実用化。赤・緑と合わせた白色照明の実現で省エネ照明革命をもたらし2014年ノーベル物理学賞受賞。', category: '人物', subcategory: '文化', keywords: ['赤崎勇'], era: '平成' },
  // p175 田中耕一
  { id: 'p175', year: 1959, title: '田中耕一',     description: '島津製作所の技術者。ソフトレーザー脱離イオン化法の開発でノーベル化学賞を受賞した。企業研究者としてのノーベル賞受賞は異例の快挙だった。', category: '人物', subcategory: '文化', keywords: ['田中耕一'], era: '昭和' },
  { id: 'h320', year: 2002, title: '田中耕一がノーベル化学賞を受賞する', description: 'タンパク質の質量分析法（ソフトレーザー脱離イオン化法）の開発でノーベル化学賞を受賞。企業の一技術者がノーベル賞を受賞した異例の快挙として日本中が驚いた。', category: '人物', subcategory: '文化', keywords: ['田中耕一'], era: '平成' },
  // p176 利根川進
  { id: 'p176', year: 1939, title: '利根川進',     description: 'MIT教授。抗体の多様性を生み出す遺伝的原理の解明でノーベル生理学・医学賞を受賞した免疫学の権威。日本人単独受賞では最初期の研究者の一人。', category: '人物', subcategory: '文化', keywords: ['利根川進'], era: '昭和' },
  { id: 'h321', year: 1987, title: '利根川進が抗体の多様性の遺伝的原理でノーベル賞を受賞する', description: '抗体の多様性が遺伝子の再編成によって生まれることを解明したノーベル生理学・医学賞を受賞。免疫学の基盤を確立した日本人研究者として世界で評価された。', category: '人物', subcategory: '文化', keywords: ['利根川進'], era: '昭和' },
  // p177 美空ひばり
  { id: 'p177', year: 1937, title: '美空ひばり',   description: '昭和の歌手。9歳でデビューし川の流れのようになど数多くのヒット曲で「歌謡曲の女王」として昭和の大衆音楽を象徴した存在。', category: '人物', subcategory: '文化', keywords: ['美空ひばり'], era: '昭和' },
  { id: 'h322', year: 1989, title: '美空ひばりが川の流れのようにを発表し52歳で死去する', description: '没年に発売した川の流れのようにが大ヒット。昭和最後の年に52歳で死去し国民栄誉賞を追贈された。昭和の歌謡曲の象徴的存在。', category: '人物', subcategory: '文化', keywords: ['美空ひばり'], era: '昭和' },
  // p178 三宅一生
  { id: 'p178', year: 1938, title: '三宅一生',     description: '平成の服飾デザイナー。一枚の布から生まれる服というコンセプトでイッセイミヤケを世界的ブランドに育てた。プリーツプリーツが代表作。', category: '人物', subcategory: '文化', keywords: ['三宅一生'], era: '昭和' },
  { id: 'h323', year: 1993, title: '三宅一生がプリーツプリーズを発表し素材革命を起こす', description: '特殊加工で半永久的なプリーツを施したプリーツプリーズを発表。軽くて洗えて機能的なファッションは世界中で支持され日本発のファッション革命となった。', category: '人物', subcategory: '文化', keywords: ['三宅一生'], era: '平成' },
  // p179 イチロー
  { id: 'p179', year: 1973, title: 'イチロー',     description: 'プロ野球・MLB選手。鈴木一朗。NPBでの7年間首位打者後にマリナーズに移籍しMLB年間最多安打記録（262安打）や10年連続200安打など多くの記録を樹立した。', category: '人物', subcategory: '文化', keywords: ['イチロー'], era: '平成' },
  { id: 'h324', year: 2004, title: 'イチローがMLB年間最多安打記録262安打を樹立する', description: 'シアトル・マリナーズでMLB年間最多安打記録を84年ぶりに更新する262安打を記録。日本人野手がメジャーで通用することを証明し野球の国際化を推進した。', category: '人物', subcategory: '文化', keywords: ['イチロー'], era: '平成' },
  // p180 大谷翔平
  { id: 'p180', year: 1994, title: '大谷翔平',     description: 'MLB選手。二刀流（投手・打者）でMLB史上最高の選手の一人と評価される。MVP2回受賞・WBC優勝・50本塁打50盗塁達成など前人未踏の記録を次々と打ち立てた。', category: '人物', subcategory: '文化', keywords: ['大谷翔平'], era: '平成' },
  { id: 'h325', year: 2021, title: '大谷翔平がMLBMVPを二刀流で受賞する', description: 'エンゼルスで投手・打者の二刀流でシーズンを完走しMVPを満票で受賞。100年以上ぶりとされる投打二刀流の復活で野球の常識を覆した。', category: '人物', subcategory: '文化', keywords: ['大谷翔平'], era: '令和' },
  { id: 'h326', year: 2024, title: '大谷翔平が50本塁打50盗塁を達成しドジャースでワールドシリーズ優勝する', description: 'ドジャース移籍1年目に史上初の50本塁打50盗塁を達成しドジャースのワールドシリーズ優勝に貢献。ポストシーズンMVPも受賞した。', category: '人物', subcategory: '文化', keywords: ['大谷翔平'], era: '令和' },
  // p181 安倍晋三
  { id: 'p181', year: 1954, title: '安倍晋三',     description: '内閣総理大臣。日本憲政史上最長の在任期間を誇る。アベノミクスによる経済政策・安全保障法制改定を主導し2022年に参院選応援演説中に暗殺された。', category: '人物', subcategory: '政治', keywords: ['安倍晋三'], era: '平成' },
  { id: 'h327', year: 2013, title: '安倍晋三がアベノミクスで経済再生を主導する', description: '大胆な金融緩和・財政出動・成長戦略の三本の矢からなるアベノミクスを推進。円安・株高を実現し長期デフレからの脱却を目指した経済政策。', category: '人物', subcategory: '政治', keywords: ['安倍晋三'], era: '平成' },
  { id: 'h328', year: 2022, title: '安倍晋三が参院選応援演説中に銃撃され死去する', description: '奈良市での参院選演説中に銃撃され死去。享年67歳。憲政史上最長の通算在職日数3188日を記録した元首相の衝撃的な死だった。', category: '人物', subcategory: '政治', keywords: ['安倍晋三'], era: '令和' },
  // p182 司馬遼太郎
  { id: 'p182', year: 1923, title: '司馬遼太郎',   description: '昭和・平成の歴史小説家。竜馬がゆく・坂の上の雲・翔ぶが如くなど幕末・明治をテーマにした大河小説で「国民作家」と称された。', category: '人物', subcategory: '文化', keywords: ['司馬遼太郎'], era: '昭和' },
  { id: 'h329', year: 1962, title: '司馬遼太郎が竜馬がゆくを連載開始する', description: '産経新聞で連載した竜馬がゆくは空前の大ヒット。坂本龍馬を自由と革新の英雄として描き現代日本人の龍馬像を作り上げた国民的小説。', category: '人物', subcategory: '文化', keywords: ['司馬遼太郎'], era: '昭和' },
  // p183 横山大観
  { id: 'p183', year: 1868, title: '横山大観',     description: '明治・昭和の日本画家。朦朧体と呼ばれる没線描法を開発し日本美術院を岡倉天心とともに設立。近代日本画の確立に最も貢献した画家。', category: '人物', subcategory: '文化', keywords: ['横山大観'], era: '明治' },
  { id: 'h330', year: 1898, title: '横山大観が岡倉天心とともに日本美術院を設立する', description: '東京美術学校を追われた岡倉天心に従い日本美術院を設立。朦朧体という新しい描法を開発し近代日本画の革新に取り組んだ。', category: '人物', subcategory: '文化', keywords: ['横山大観'], era: '明治' },
  // p184 黒田清輝
  { id: 'p184', year: 1866, title: '黒田清輝',     description: '明治の洋画家。フランスで印象派の技法を学び帰国後に洋画革新運動を主導した。東京美術学校教授として日本近代洋画の確立に貢献した。', category: '人物', subcategory: '文化', keywords: ['黒田清輝'], era: '明治' },
  { id: 'h331', year: 1896, title: '黒田清輝が白馬会を結成し日本近代洋画を革新する', description: '明るい色調・外光派の洋画技法を持ち帰り白馬会を設立。湖畔など代表作を残し日本洋画壇を牽引した。東京美術学校教授として後進も育てた。', category: '人物', subcategory: '文化', keywords: ['黒田清輝'], era: '明治' },
  // p185 岡本太郎
  { id: 'p185', year: 1911, title: '岡本太郎',     description: '昭和・平成の芸術家。太陽の塔（1970年大阪万博）で知られる前衛芸術の旗手。「芸術は爆発だ」の言葉で親しまれた日本を代表するアーティスト。', category: '人物', subcategory: '文化', keywords: ['岡本太郎'], era: '昭和' },
  { id: 'h332', year: 1970, title: '岡本太郎が大阪万博で太陽の塔を制作する', description: '大阪万博のテーマ館として制作された太陽の塔は高さ70mの巨大彫刻。半世紀後も大阪・吹田に残り日本の前衛芸術の象徴として愛され続けている。', category: '人物', subcategory: '文化', keywords: ['岡本太郎'], era: '昭和' },
  // p186 南部陽一郎
  { id: 'p186', year: 1921, title: '南部陽一郎',   description: '素粒子物理学者。自発的対称性の破れの概念を発見しノーベル物理学賞を受賞した。シカゴ大学教授として活躍しアメリカ国籍を持ちながら日本出身の研究者として評価された。', category: '人物', subcategory: '文化', keywords: ['南部陽一郎'], era: '大正' },
  { id: 'h333', year: 2008, title: '南部陽一郎が自発的対称性の破れの発見でノーベル物理学賞を受賞する', description: '素粒子物理学における自発的対称性の破れの概念の発見で益川敏英・小林誠とともにノーベル物理学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['南部陽一郎'], era: '平成' },
  // p187 小柴昌俊
  { id: 'p187', year: 1926, title: '小柴昌俊',     description: '東京大学名誉教授。カミオカンデによる宇宙ニュートリノの観測でノーベル物理学賞を受賞した。超新星1987Aからのニュートリノ検出は素粒子物理学の金字塔。', category: '人物', subcategory: '文化', keywords: ['小柴昌俊'], era: '大正' },
  { id: 'h334', year: 2002, title: '小柴昌俊がカミオカンデによるニュートリノ観測でノーベル物理学賞を受賞する', description: '岐阜県神岡鉱山地下のカミオカンデで超新星1987Aからのニュートリノを世界で初めて検出しノーベル物理学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['小柴昌俊'], era: '平成' },
  // p188 益川敏英
  { id: 'p188', year: 1940, title: '益川敏英',     description: '名古屋大学教授。小林誠とともにCP対称性の破れを説明するコバヤシ・マスカワ理論を発表しノーベル物理学賞を受賞した。英語が苦手なことでも親しまれた。', category: '人物', subcategory: '文化', keywords: ['益川敏英'], era: '昭和' },
  { id: 'h335', year: 2008, title: '益川敏英がCP対称性の破れの理論でノーベル物理学賞を受賞する', description: '1973年に発表したコバヤシ・マスカワ理論（クォーク6種類の存在を予言）が実験で検証されノーベル物理学賞受賞。英語でのスピーチを敢えて短くしたことでも注目された。', category: '人物', subcategory: '文化', keywords: ['益川敏英'], era: '平成' },
  // p189 植村直己
  { id: 'p189', year: 1941, title: '植村直己',     description: '昭和の冒険家。世界初の五大陸最高峰単独登頂・北極点犬ぞり単独到達などを成し遂げた。1984年に厳冬期マッキンリー登頂後に行方不明となった。', category: '人物', subcategory: '文化', keywords: ['植村直己'], era: '昭和' },
  { id: 'h336', year: 1970, title: '植村直己がエベレスト登頂に成功し五大陸最高峰制覇を目指す', description: '日本人として初めてエベレスト登頂に成功。その後マッキンリー・キリマンジャロ・アコンカグアなど五大陸最高峰の単独登頂を次々と達成した。', category: '人物', subcategory: '文化', keywords: ['植村直己'], era: '昭和' },
  // p190 野依良治
  { id: 'p190', year: 1938, title: '野依良治',     description: '名古屋大学教授。不斉合成の研究でノーベル化学賞を受賞した有機化学の権威。医薬品・香料などの精密合成に革命をもたらした。', category: '人物', subcategory: '文化', keywords: ['野依良治'], era: '昭和' },
  { id: 'h337', year: 2001, title: '野依良治が不斉触媒合成の研究でノーベル化学賞を受賞する', description: '鏡像異性体の一方だけを選択的に合成する不斉合成触媒（BINAP）の開発でノーベル化学賞を受賞。医薬品・食品・農薬の精密製造に広く応用されている。', category: '人物', subcategory: '文化', keywords: ['野依良治'], era: '平成' },
  // p191 白川英樹
  { id: 'p191', year: 1936, title: '白川英樹',     description: '筑波大学名誉教授。導電性ポリマー（導電性プラスチック）の発見と開発でノーベル化学賞を受賞した。プラスチックに電気を流す逆転の発想が世界を驚かせた。', category: '人物', subcategory: '文化', keywords: ['白川英樹'], era: '昭和' },
  { id: 'h338', year: 2000, title: '白川英樹が導電性ポリマーの発見でノーベル化学賞を受賞する', description: '従来は絶縁体とされていたプラスチック（ポリアセチレン）に電気が流れることを発見しノーベル化学賞を受賞。有機ELや太陽電池への応用が広がった。', category: '人物', subcategory: '文化', keywords: ['白川英樹'], era: '平成' },
  // p192 福川敬通（福祉省）→ 代わりに福澤諭吉はp77済 → 天野浩に変更
  // p192 天野浩
  { id: 'p192', year: 1960, title: '天野浩',       description: '名古屋大学教授。青色LEDの実用化（高品質窒化ガリウム結晶の成長）に成功し赤崎勇・中村修二とともにノーベル物理学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['天野浩'], era: '昭和' },
  { id: 'h339', year: 2014, title: '天野浩がノーベル物理学賞を受賞する', description: '青色LEDの実用化に不可欠な高品質窒化ガリウム薄膜の成長を実現しノーベル物理学賞を受賞。白色LEDによる照明革命で年間数千億円規模のエネルギー節約が実現した。', category: '人物', subcategory: '文化', keywords: ['天野浩'], era: '平成' },
  // p193 中村修二
  { id: 'p193', year: 1954, title: '中村修二',     description: '日亜化学工業出身の研究者。高輝度青色LEDの開発に成功しノーベル物理学賞を受賞した。企業研究者の特許問題でも注目された。', category: '人物', subcategory: '文化', keywords: ['中村修二'], era: '昭和' },
  { id: 'h340', year: 1993, title: '中村修二が高輝度青色LEDを発明する', description: '日亜化学工業在籍中に高輝度青色LEDを発明。この発明が白色LEDによる照明革命をもたらしノーベル物理学賞受賞につながったが特許権をめぐる訴訟でも話題となった。', category: '人物', subcategory: '文化', keywords: ['中村修二'], era: '平成' },
  // p194 梶田隆章
  { id: 'p194', year: 1959, title: '梶田隆章',     description: '東京大学宇宙線研究所長。スーパーカミオカンデを用いたニュートリノ振動の発見でノーベル物理学賞を受賞した。ニュートリノに質量があることを証明した。', category: '人物', subcategory: '文化', keywords: ['梶田隆章'], era: '昭和' },
  { id: 'h341', year: 2015, title: '梶田隆章がニュートリノ振動の発見でノーベル物理学賞を受賞する', description: 'スーパーカミオカンデでニュートリノが異なる種類に変化する振動現象を発見しノーベル物理学賞を受賞。ニュートリノが質量を持つことを初めて証明した。', category: '人物', subcategory: '文化', keywords: ['梶田隆章'], era: '平成' },
  // p195 吉野彰
  { id: 'p195', year: 1948, title: '吉野彰',       description: '旭化成名誉フェロー。リチウムイオン電池を実用化しスマートフォン・EVの普及を可能にした。2019年にノーベル化学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['吉野彰'], era: '昭和' },
  { id: 'h342', year: 2019, title: '吉野彰がリチウムイオン電池の開発でノーベル化学賞を受賞する', description: '1985年に開発したリチウムイオン電池がスマートフォン・ノートPC・電気自動車に不可欠なエネルギー源となりノーベル化学賞受賞。現代社会を支えるエネルギー革命。', category: '人物', subcategory: '文化', keywords: ['吉野彰'], era: '令和' },
  // p196 真鍋淑郎
  { id: 'p196', year: 1931, title: '真鍋淑郎',     description: '気象学者・プリンストン大学上席研究員。気候変動・地球温暖化のシミュレーションモデルを確立し2021年にノーベル物理学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['真鍋淑郎'], era: '昭和' },
  { id: 'h343', year: 2021, title: '真鍋淑郎が地球温暖化モデルの確立でノーベル物理学賞を受賞する', description: '大気と海洋の相互作用による気候変動の数値モデルを確立しCO2増加と地球温暖化の関係を予測。2021年ノーベル物理学賞を受賞した。', category: '人物', subcategory: '文化', keywords: ['真鍋淑郎'], era: '令和' },
  // p197 後藤象二郎
  { id: 'p197', year: 1838, title: '後藤象二郎',   description: '幕末・明治の政治家。土佐藩参政として大政奉還の建白に関わり明治政府でも要職を歴任した。板垣退助らとともに自由民権運動を支えた。', category: '人物', subcategory: '政治', keywords: ['後藤象二郎'], era: '明治' },
  { id: 'h344', year: 1867, title: '後藤象二郎が大政奉還建白に関与する', description: '坂本龍馬の船中八策をもとに山内容堂を通じて15代将軍徳川慶喜への大政奉還建白を主導。幕府から朝廷への政権返上という歴史的転換に寄与した。', category: '人物', subcategory: '政治', keywords: ['後藤象二郎'], era: '幕末' },
  // p198 小村寿太郎
  { id: 'p198', year: 1855, title: '小村寿太郎',   description: '明治の外交官・外務大臣。ポーツマス条約を交渉して日露戦争を終結させ日韓併合条約調印を主導した。関税自主権の回復など不平等条約改正を完成させた。', category: '人物', subcategory: '外交', keywords: ['小村寿太郎'], era: '明治' },
  { id: 'h345', year: 1905, title: '小村寿太郎がポーツマス条約を交渉し日露戦争を終結させる', description: 'アメリカのルーズベルト大統領の仲介でロシアとポーツマスで講和会議を開き日露戦争を終結させた。南樺太割譲・旅順・大連租借権などを獲得した。', category: '人物', subcategory: '外交', keywords: ['小村寿太郎'], era: '明治' },
  { id: 'h346', year: 1911, title: '小村寿太郎が関税自主権の完全回復を達成する', description: '外務大臣として日米通商航海条約の改訂に成功し関税自主権を完全回復。陸奥宗光の領事裁判権撤廃とあわせ幕末以来の不平等条約改正を完成させた。', category: '人物', subcategory: '外交', keywords: ['小村寿太郎'], era: '明治' },
  // p199 幣原喜重郎
  { id: 'p199', year: 1872, title: '幣原喜重郎',   description: '大正・昭和の外交家・政治家。協調外交の推進者として幣原外交と呼ばれる国際協調路線を主導し戦後憲法第9条の発案者ともされる。', category: '人物', subcategory: '政治', keywords: ['幣原喜重郎'], era: '大正' },
  { id: 'h347', year: 1924, title: '幣原喜重郎が協調外交を推進する', description: '外務大臣として英米との協調・内政不干渉を基本方針とした幣原外交を展開。ワシントン体制を基盤とした国際協調路線を推進した。', category: '人物', subcategory: '外交', keywords: ['幣原喜重郎'], era: '大正' },
  { id: 'h348', year: 1946, title: '幣原喜重郎が憲法9条の発案に関与したとされる', description: 'GHQ主導の憲法草案策定において幣原首相がマッカーサーに戦争放棄条項を提案したとの説がある。平和憲法の理念形成に関わった政治家として評価される。', category: '人物', subcategory: '政治', keywords: ['幣原喜重郎'], era: '昭和' },
  // p200 花山院師賢（代わりに重要人物を追加）→ 藤原定家
  { id: 'p200', year: 1162, title: '藤原定家',     description: '鎌倉時代の歌人。新古今和歌集の撰者の一人。小倉百人一首を選んだことでも知られる平安・鎌倉の最大の歌人。', category: '人物', subcategory: '文化', keywords: ['藤原定家'], era: '鎌倉' },
  { id: 'h349', year: 1205, title: '藤原定家が新古今和歌集の撰者となる', description: '後鳥羽上皇の命で新古今和歌集の撰者の一人となり技巧的・幽玄な歌風を確立。有心体と呼ばれる独自の美学で平安末期・鎌倉の和歌を代表する歌人となった。', category: '人物', subcategory: '文化', keywords: ['藤原定家'], era: '鎌倉' },
  { id: 'h350', year: 1235, title: '藤原定家が小倉百人一首を撰する', description: '京都・嵐山の小倉山荘の障子に貼るために選んだとされる百首の和歌集が小倉百人一首。現在もかるたとして親しまれる日本文化の定番となった。', category: '人物', subcategory: '文化', keywords: ['藤原定家'], era: '鎌倉' },
`

content += data + '\n]\n'
writeFileSync(filePath, content, 'utf-8')
console.log('Done. Added p101-p200 + h235-h350')
