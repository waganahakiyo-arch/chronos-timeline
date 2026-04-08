import { readFileSync, writeFileSync } from 'fs'
const filePath = 'src/data/events.ts'
let content = readFileSync(filePath, 'utf-8')
content = content.trimEnd()
if (content.endsWith(']')) content = content.slice(0, -1)

const toAppend = `
  // ── 人物の業績イベント（h系列、p76–p100）──────────────────────────────
  // p76 近藤勇
  { id: 'h172', year: 1863, title: '近藤勇が新選組を結成し局長となる', description: '京都守護職・松平容保のもとで新選組を組織し局長に就任。池田屋事件など尊攘志士の取り締まりで名を馳せた。', category: '人物', subcategory: '軍事', keywords: ['近藤勇'], era: '幕末' },
  { id: 'h173', year: 1864, title: '近藤勇が池田屋事件で尊攘派志士を急襲する', description: '長州・土佐の尊攘派が密議する池田屋を急襲し多数を斬殺・逮捕。新選組の名を全国に知らしめた事件。', category: '人物', subcategory: '軍事', keywords: ['近藤勇'], era: '幕末' },
  { id: 'h174', year: 1868, title: '近藤勇が戊辰戦争で敗北し処刑される', description: '鳥羽・伏見の戦いで新政府軍に敗れ江戸・甲州と転戦したが最終的に降伏し板橋で斬首された。', category: '人物', subcategory: '軍事', keywords: ['近藤勇'], era: '明治' },
  // p77 福沢諭吉
  { id: 'h175', year: 1872, title: '福沢諭吉が学問のすゝめを著す', description: '「天は人の上に人を造らず…」で始まる啓蒙書。独立自尊・実学の重要性を説き明治期に340万部以上を売り上げた。', category: '人物', subcategory: '文化', keywords: ['福沢諭吉'], era: '明治' },
  { id: 'h176', year: 1868, title: '福沢諭吉が慶應義塾を設立する', description: '1858年創設の蘭学塾を母体に慶應義塾を設立。西洋の学問・思想を広める近代日本の私学教育の先駆けとなった。', category: '人物', subcategory: '文化', keywords: ['福沢諭吉'], era: '明治' },
  { id: 'h177', year: 1875, title: '福沢諭吉が文明論之概略を著す', description: '文明の進歩段階論を論じた主著。日本が欧米に対抗するためには文明開化・脱亜論的な近代化が必要と論じた。', category: '人物', subcategory: '文化', keywords: ['福沢諭吉'], era: '明治' },
  // p78 土方歳三
  { id: 'h178', year: 1863, title: '土方歳三が新選組副長として局内を統率する', description: '近藤勇の片腕として新選組副長となり厳格な局中法度で組織を引き締めた。鬼の副長の異名をとった。', category: '人物', subcategory: '軍事', keywords: ['土方歳三'], era: '幕末' },
  { id: 'h179', year: 1869, title: '土方歳三が函館・五稜郭で最期を迎える', description: '戊辰戦争最後の戦場・箱館（函館）で新政府軍と戦い銃弾に倒れた。幕末最後の武士として語り継がれる。', category: '人物', subcategory: '軍事', keywords: ['土方歳三'], era: '明治' },
  // p79 坂本龍馬
  { id: 'h180', year: 1866, title: '坂本龍馬が薩長同盟の締結を仲介する', description: '犬猿の仲だった薩摩・長州の仲介に奔走し薩長同盟を成立させた。倒幕への最大の一歩を陰から支えた。', category: '人物', subcategory: '政治', keywords: ['坂本龍馬'], era: '幕末' },
  { id: 'h181', year: 1867, title: '坂本龍馬が船中八策で大政奉還の青写真を描く', description: '紀州藩船上で後藤象二郎に示した政体刷新案（船中八策）が大政奉還建議の基礎となった。議会制国家の先駆的構想。', category: '人物', subcategory: '政治', keywords: ['坂本龍馬'], era: '幕末' },
  { id: 'h182', year: 1867, title: '坂本龍馬が京都・近江屋で暗殺される', description: '大政奉還成立直後の慶応3年11月、京都・近江屋で何者かに暗殺された。享年32歳。犯人は未だ特定されていない。', category: '人物', subcategory: '政治', keywords: ['坂本龍馬'], era: '幕末' },
  // p80 山縣有朋
  { id: 'h183', year: 1873, title: '山縣有朋が徴兵令を発令し近代陸軍を創設する', description: '四民平等の徴兵制度を確立し士族中心の軍隊から国民軍へ転換。日本陸軍の創設者として近代軍制の礎を築いた。', category: '人物', subcategory: '政治', keywords: ['山縣有朋'], era: '明治' },
  { id: 'h184', year: 1889, title: '山縣有朋が内閣総理大臣に就任する', description: '初代と第3代の2度にわたり首相を務め陸軍閥（山縣閥）を形成。元老として明治・大正の政治を長く主導した。', category: '人物', subcategory: '政治', keywords: ['山縣有朋'], era: '明治' },
  // p81 高杉晋作
  { id: 'h185', year: 1863, title: '高杉晋作が奇兵隊を結成する', description: '身分を問わず武士・農民・商人が参加できる奇兵隊を創設。近代的な国民軍の先駆けとして倒幕運動の主力となった。', category: '人物', subcategory: '軍事', keywords: ['高杉晋作'], era: '幕末' },
  { id: 'h186', year: 1866, title: '高杉晋作が第二次長州征伐で幕府軍を撃退する', description: '奇兵隊を率いて幕府の大軍を門司・大島など各地で撃退。幕府権威の失墜と長州藩の地位向上に決定的な役割を果たした。', category: '人物', subcategory: '軍事', keywords: ['高杉晋作'], era: '幕末' },
  // p82 渋沢栄一
  { id: 'h187', year: 1873, title: '渋沢栄一が第一国立銀行を設立する', description: '日本最初の民間銀行・第一国立銀行（後の第一勧業銀行）を設立。近代的金融制度の礎を作った。', category: '人物', subcategory: '経済', keywords: ['渋沢栄一'], era: '明治' },
  { id: 'h188', year: 1882, title: '渋沢栄一が大阪紡績会社を設立し産業近代化を推進する', description: '蒸気力を使った大規模紡績会社を設立し日本の産業革命を主導。生涯で500以上の企業設立に関与した。', category: '人物', subcategory: '経済', keywords: ['渋沢栄一'], era: '明治' },
  { id: 'h189', year: 1840, title: '渋沢栄一が日本資本主義の父として後世に評価される', description: '農家出身から幕臣・官僚・実業家へ。論語と算盤の思想のもと道徳と経済の両立を説き日本資本主義を形成した。', category: '人物', subcategory: '経済', keywords: ['渋沢栄一'], era: '江戸' },
  // p83 伊藤博文
  { id: 'h190', year: 1885, title: '伊藤博文が初代内閣総理大臣に就任する', description: '内閣制度創設とともに初代内閣総理大臣に就任。4度にわたり首相を務め近代日本の政治制度を設計した。', category: '人物', subcategory: '政治', keywords: ['伊藤博文'], era: '明治' },
  { id: 'h191', year: 1889, title: '伊藤博文が大日本帝国憲法の制定を主導する', description: '欧米憲法を調査研究しプロイセン憲法を参考に大日本帝国憲法を起草。天皇主権・立憲君主制の憲法体制を確立した。', category: '人物', subcategory: '政治', keywords: ['伊藤博文'], era: '明治' },
  { id: 'h192', year: 1895, title: '伊藤博文が下関条約を交渉し日清戦争を終結させる', description: '日清戦争の講和交渉で清国全権・李鴻章と下関条約を締結。台湾・遼東半島割譲と賠償金2億両を獲得した。', category: '人物', subcategory: '外交', keywords: ['伊藤博文'], era: '明治' },
  { id: 'h193', year: 1909, title: '伊藤博文がハルビンで安重根に暗殺される', description: '満州視察中の哈爾浜駅頭で朝鮮の独立運動家・安重根に射殺された。享年68歳。初代韓国統監でもあった。', category: '人物', subcategory: '政治', keywords: ['伊藤博文'], era: '明治' },
  // p84 東郷平八郎
  { id: 'h194', year: 1904, title: '東郷平八郎が旅順のロシア艦隊を撃破する', description: '連合艦隊司令長官として旅順港のロシア太平洋艦隊を夜間奇襲で大打撃を与えた。', category: '人物', subcategory: '軍事', keywords: ['東郷平八郎'], era: '明治' },
  { id: 'h195', year: 1905, title: '東郷平八郎が日本海海戦でバルチック艦隊を全滅させる', description: 'T字戦法でロシアのバルチック艦隊に完勝。世界海戦史上まれな大勝利でポーツマス講和への道を開いた。', category: '人物', subcategory: '軍事', keywords: ['東郷平八郎'], era: '明治' },
  // p85 北里柴三郎
  { id: 'h196', year: 1889, title: '北里柴三郎が破傷風菌の純粋培養と血清療法を開発する', description: 'ベルリンのコッホ研究所で破傷風菌の純粋培養に成功し、血清療法（抗毒素）を開発。近代免疫学の基礎を築いた。', category: '人物', subcategory: '文化', keywords: ['北里柴三郎'], era: '明治' },
  { id: 'h197', year: 1894, title: '北里柴三郎がペスト菌を発見する', description: '香港のペスト流行地でペスト菌を発見。フランスのイェルサンとほぼ同時の発見で近代医学史に名を刻んだ。', category: '人物', subcategory: '文化', keywords: ['北里柴三郎'], era: '明治' },
  { id: 'h198', year: 1914, title: '北里柴三郎が北里研究所を設立する', description: '私立の細菌研究機関・北里研究所を設立。後に慶應義塾大学医学部も創設し日本近代医学の発展に多大な貢献をした。', category: '人物', subcategory: '文化', keywords: ['北里柴三郎'], era: '大正' },
  // p86 森鷗外
  { id: 'h199', year: 1890, title: '森鷗外が舞姫を著す', description: 'ドイツ留学体験をもとに書いた短編小説。日本近代文学の先駆けとして明治文壇に大きな衝撃を与えた。', category: '人物', subcategory: '文化', keywords: ['森鷗外'], era: '明治' },
  { id: 'h200', year: 1912, title: '森鷗外が阿部一族・高瀬舟などの歴史小説を著す', description: '軍医総監の激務の傍ら歴史小説・翻訳に取り組んだ。阿部一族・高瀬舟・山椒大夫など近代文学の傑作を残した。', category: '人物', subcategory: '文化', keywords: ['森鷗外'], era: '明治' },
  // p87 津田梅子
  { id: 'h201', year: 1871, title: '津田梅子が岩倉使節団で最年少留学生として渡米する', description: '6歳で岩倉使節団に加わりアメリカに留学した最年少の女子留学生。11年間の留学で英語・教育を学んだ。', category: '人物', subcategory: '文化', keywords: ['津田梅子'], era: '明治' },
  { id: 'h202', year: 1900, title: '津田梅子が女子英学塾（津田塾大学の前身）を創設する', description: '女性の英語教育・高等教育普及のため女子英学塾を設立。日本の女子教育の先駆者として5000円札の肖像となった。', category: '人物', subcategory: '文化', keywords: ['津田梅子'], era: '明治' },
  // p88 夏目漱石
  { id: 'h203', year: 1905, title: '夏目漱石が吾輩は猫であるを著す', description: '猫の視点から明治知識人の生態を風刺した長編小説。朝日新聞連載で大評判となり一躍人気作家となった。', category: '人物', subcategory: '文化', keywords: ['夏目漱石'], era: '明治' },
  { id: 'h204', year: 1906, title: '夏目漱石が坊っちゃん・草枕を著す', description: '痛快な青春小説・坊っちゃんと東洋的な美の理念を描いた草枕を同年に発表。多様な文学スタイルを確立した。', category: '人物', subcategory: '文化', keywords: ['夏目漱石'], era: '明治' },
  { id: 'h205', year: 1914, title: '夏目漱石がこころを著す', description: '個人主義と孤独・自殺をテーマにした晩年の代表作。近代日本人の心理を深く掘り下げた不朽の名作。', category: '人物', subcategory: '文化', keywords: ['夏目漱石'], era: '大正' },
  // p89 樋口一葉
  { id: 'h206', year: 1895, title: '樋口一葉がたけくらべ・にごりえを著す', description: '遊郭近くの下町を舞台に子供たちの成長を描いたたけくらべ、女の生き様を描いたにごりえを同年に発表した傑作。', category: '人物', subcategory: '文化', keywords: ['樋口一葉'], era: '明治' },
  { id: 'h207', year: 1896, title: '樋口一葉が24歳で夭逝し近代女性文学の先駆者となる', description: '肺結核のため24歳で死去。生前に発表した作品は日本近代文学の至宝とされ5000円札の肖像となっている。', category: '人物', subcategory: '文化', keywords: ['樋口一葉'], era: '明治' },
  // p90 野口英世
  { id: 'h208', year: 1900, title: '野口英世がアメリカに渡り細菌学の研究に従事する', description: 'ペンシルバニア大学・ロックフェラー研究所で梅毒・ポリオ・黄熱病など感染症研究に取り組んだ。', category: '人物', subcategory: '文化', keywords: ['野口英世'], era: '明治' },
  { id: 'h209', year: 1911, title: '野口英世が梅毒スピロヘータの純粋培養に成功する', description: '進行性麻痺患者の脳から梅毒スピロヘータを発見・純粋培養することに成功。神経梅毒の原因解明に貢献した。', category: '人物', subcategory: '文化', keywords: ['野口英世'], era: '明治' },
  { id: 'h210', year: 1928, title: '野口英世が黄熱病研究中にガーナで死去する', description: 'アフリカ・ガーナで黄熱病の研究中に自ら感染し死去。享年51歳。千円札の肖像として知られる。', category: '人物', subcategory: '文化', keywords: ['野口英世'], era: '昭和' },
  // p91 与謝野晶子
  { id: 'h211', year: 1901, title: '与謝野晶子がみだれ髪を出版する', description: '情熱的な恋愛を大胆に詠んだ第一歌集・みだれ髪を出版。明治の因習に縛られた女性の意識を解放した革命的な歌集。', category: '人物', subcategory: '文化', keywords: ['与謝野晶子'], era: '明治' },
  { id: 'h212', year: 1904, title: '与謝野晶子が君死にたまふことなかれを発表する', description: '日露戦争に出征した弟を思い書いた反戦歌。天皇のために死ぬことへの疑問を呈した問題作として広く知られる。', category: '人物', subcategory: '文化', keywords: ['与謝野晶子'], era: '明治' },
  // p92 芥川龍之介
  { id: 'h213', year: 1915, title: '芥川龍之介が羅生門・鼻を発表する', description: '今昔物語を題材にした短編小説で文壇にデビュー。師・夏目漱石から絶賛され一躍新世代の旗手となった。', category: '人物', subcategory: '文化', keywords: ['芥川龍之介'], era: '大正' },
  { id: 'h214', year: 1922, title: '芥川龍之介が藪の中を発表する', description: '同じ事件を複数の視点から描き客観的真実の不確かさを描いた傑作。黒澤明の映画「羅生門」の原作ともなった。', category: '人物', subcategory: '文化', keywords: ['芥川龍之介'], era: '大正' },
  { id: 'h215', year: 1927, title: '芥川龍之介が35歳で自殺する', description: '「将来に対する唯ぼんやりした不安」の遺書を残し服毒自殺。その死を悼み菊池寛が芥川龍之介賞を制定した。', category: '人物', subcategory: '文化', keywords: ['芥川龍之介'], era: '昭和' },
  // p93 松下幸之助
  { id: 'h216', year: 1918, title: '松下幸之助が松下電気器具製作所（パナソニックの前身）を創業する', description: '大阪で二股ソケットの製造販売から創業。水道哲学・ダム式経営など独自の経営理念で世界的企業へ成長させた。', category: '人物', subcategory: '経済', keywords: ['松下幸之助'], era: '大正' },
  { id: 'h217', year: 1946, title: '松下幸之助がPHP研究所を設立する', description: 'Peace and Happiness through Prosperityを理念とするPHP研究所を設立。経営哲学の普及と社会貢献を目指した。', category: '人物', subcategory: '経済', keywords: ['松下幸之助'], era: '昭和' },
  // p94 宮沢賢治
  { id: 'h218', year: 1924, title: '宮沢賢治が春と修羅・注文の多い料理店を出版する', description: '詩集・春と修羅と童話集・注文の多い料理店を自費出版。生前は全く売れなかったが死後に不朽の名作と評価された。', category: '人物', subcategory: '文化', keywords: ['宮沢賢治'], era: '大正' },
  { id: 'h219', year: 1933, title: '宮沢賢治が37歳で夭逝し銀河鉄道の夜が遺作となる', description: '農業指導・農民芸術の実践に取り組みながら37歳で病死。銀河鉄道の夜など未完の傑作が死後に高く評価された。', category: '人物', subcategory: '文化', keywords: ['宮沢賢治'], era: '昭和' },
  // p95 川端康成
  { id: 'h220', year: 1948, title: '川端康成が雪国を完成させる', description: '1935年から連載した雪国を完成版として刊行。トンネルを抜けると雪国であったの冒頭で知られる日本文学の傑作。', category: '人物', subcategory: '文化', keywords: ['川端康成'], era: '昭和' },
  { id: 'h221', year: 1968, title: '川端康成がノーベル文学賞を受賞する', description: '日本人として初めてノーベル文学賞を受賞。日本の美の伝統を繊細に表現する文学として世界に認められた。', category: '人物', subcategory: '文化', keywords: ['川端康成'], era: '昭和' },
  // p96 湯川秀樹
  { id: 'h222', year: 1935, title: '湯川秀樹が中間子理論を発表する', description: '核力を媒介する未知の粒子（中間子）の存在を理論的に予言した論文を発表。後にパイ中間子として発見された。', category: '人物', subcategory: '文化', keywords: ['湯川秀樹'], era: '昭和' },
  { id: 'h223', year: 1949, title: '湯川秀樹がノーベル物理学賞を受賞する', description: '中間子理論でノーベル物理学賞を受賞。日本人・アジア人として初のノーベル賞受賞者となり戦後日本の希望の象徴となった。', category: '人物', subcategory: '文化', keywords: ['湯川秀樹'], era: '昭和' },
  // p97 太宰治
  { id: 'h224', year: 1940, title: '太宰治が走れメロスを著す', description: '友情と信頼をテーマにした短編小説。シラーの詩を基にした作品で国語教科書にも掲載される太宰の代表作の一つ。', category: '人物', subcategory: '文化', keywords: ['太宰治'], era: '昭和' },
  { id: 'h225', year: 1948, title: '太宰治が人間失格を著し入水自殺する', description: '自己の人生を告白的に綴った代表作・人間失格を書き上げ間もなく玉川上水に入水自殺。享年38歳。', category: '人物', subcategory: '文化', keywords: ['太宰治'], era: '昭和' },
  // p98 黒澤明
  { id: 'h226', year: 1950, title: '黒澤明が羅生門を監督しヴェネツィア映画祭で金獅子賞を受賞する', description: '芥川龍之介の原作を映画化した羅生門がヴェネツィア国際映画祭で金獅子賞を受賞。日本映画を世界に知らしめた。', category: '人物', subcategory: '文化', keywords: ['黒澤明'], era: '昭和' },
  { id: 'h227', year: 1954, title: '黒澤明が七人の侍を監督する', description: '農民を守る7人の侍を描いた時代劇の傑作。スターウォーズ・マグニフィセント・セブンなど世界の映画に多大な影響を与えた。', category: '人物', subcategory: '文化', keywords: ['黒澤明'], era: '昭和' },
  { id: 'h228', year: 1980, title: '黒澤明がアカデミー名誉賞を受賞する', description: 'アカデミー賞名誉賞を受賞。スピルバーグ・コッポラ・ルーカスら世界の映画監督が影響を受けた映画の神様。', category: '人物', subcategory: '文化', keywords: ['黒澤明'], era: '昭和' },
  // p99 田中角栄
  { id: 'h229', year: 1972, title: '田中角栄が日中国交正常化を実現する', description: '首相として北京を訪問し毛沢東・周恩来と会談し日中共同声明に署名。戦後日本外交の最大の成果の一つ。', category: '人物', subcategory: '外交', keywords: ['田中角栄'], era: '昭和' },
  { id: 'h230', year: 1972, title: '田中角栄が日本列島改造論を発表する', description: '地方分散・全国新幹線・高速道路網整備を提唱した日本列島改造論を発表。インフレを招いたが地方振興政策の原型となった。', category: '人物', subcategory: '政治', keywords: ['田中角栄'], era: '昭和' },
  { id: 'h231', year: 1976, title: '田中角栄がロッキード事件で逮捕される', description: 'アメリカ・ロッキード社からの賄賂受取容疑で首相経験者として逮捕された戦後最大の疑獄事件。', category: '人物', subcategory: '政治', keywords: ['田中角栄'], era: '昭和' },
  // p100 三島由紀夫
  { id: 'h232', year: 1956, title: '三島由紀夫が金閣寺を著す', description: '金閣寺放火事件を題材にした傑作長編小説。美と破壊・孤独と狂気をテーマにした三島文学の代表作。', category: '人物', subcategory: '文化', keywords: ['三島由紀夫'], era: '昭和' },
  { id: 'h233', year: 1969, title: '三島由紀夫が豊饒の海（四部作）を完成させる', description: '転生をテーマにした四部作・豊饒の海（春の雪・奔馬・暁の寺・天人五衰）を完成させた最後の大作。', category: '人物', subcategory: '文化', keywords: ['三島由紀夫'], era: '昭和' },
  { id: 'h234', year: 1970, title: '三島由紀夫が自衛隊市ヶ谷駐屯地で割腹自決する', description: '楯の会を率いて自衛隊市ヶ谷駐屯地を占拠しクーデターを呼びかける演説を行い割腹自決。享年45歳。', category: '人物', subcategory: '政治', keywords: ['三島由紀夫'], era: '昭和' },
]
`

content += toAppend
// Now add closing bracket
content += '\n]\n'
writeFileSync(filePath, content, 'utf-8')
console.log('p76-p100 + closing bracket done')
