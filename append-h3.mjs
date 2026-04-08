import { readFileSync, writeFileSync } from 'fs'
const filePath = 'src/data/events.ts'
let content = readFileSync(filePath, 'utf-8')
// remove trailing ]
content = content.trimEnd()
if (content.endsWith(']')) content = content.slice(0, -1)

const toAppend = `
  // ── 人物の業績イベント（h系列、p51–p75）──────────────────────────────
  // p51 豊臣秀吉
  { id: 'h113', year: 1582, title: '豊臣秀吉が山崎の戦いで明智光秀を破り信長の後継者となる', description: '中国大返しで素早く撤退し山崎の戦いで光秀を破った。清洲会議で信長の後継権を握り天下人への道を開いた。', category: '人物', subcategory: '軍事', keywords: ['豊臣秀吉'], era: '安土桃山' },
  { id: 'h114', year: 1585, title: '豊臣秀吉が関白に就任する', description: '武家として前例のない関白就任。翌年には太政大臣となり豊臣の姓を賜り名実ともに天下人となった。', category: '人物', subcategory: '政治', keywords: ['豊臣秀吉'], era: '安土桃山' },
  { id: 'h115', year: 1590, title: '豊臣秀吉が天下統一を完成する', description: '小田原の北条氏を降伏させ奥州を平定し戦国時代を終結。約100年続いた乱世に終止符を打った。', category: '人物', subcategory: '政治', keywords: ['豊臣秀吉'], era: '安土桃山' },
  { id: 'h116', year: 1588, title: '豊臣秀吉が刀狩・太閤検地を実施する', description: '農民から武器を没収する刀狩と土地を統一規格で測量する太閤検地を実施。兵農分離を徹底し近世社会の基礎を作った。', category: '人物', subcategory: '政治', keywords: ['豊臣秀吉'], era: '安土桃山' },
  { id: 'h117', year: 1592, title: '豊臣秀吉が朝鮮出兵（文禄の役）を行う', description: '明の征服を名目に朝鮮に大軍を送った。当初は快進撃したが明の援軍・義兵の抵抗で膠着。秀吉の死で撤退した。', category: '人物', subcategory: '軍事', keywords: ['豊臣秀吉'], era: '安土桃山' },
  // p52 徳川家康
  { id: 'h118', year: 1600, title: '徳川家康が関ヶ原の戦いで石田三成ら西軍を破る', description: '豊臣政権の五奉行・石田三成らを関ヶ原で撃破。天下の帰趨を決した日本史最大の合戦。', category: '人物', subcategory: '軍事', keywords: ['徳川家康'], era: '江戸' },
  { id: 'h119', year: 1603, title: '徳川家康が征夷大将軍に就任し江戸幕府を開く', description: '征夷大将軍に就任し江戸に幕府を開設。265年続く江戸幕府の創始者となった。', category: '人物', subcategory: '政治', keywords: ['徳川家康'], era: '江戸' },
  { id: 'h120', year: 1615, title: '徳川家康が大坂の陣で豊臣氏を滅ぼす', description: '大坂夏の陣で豊臣秀頼・淀殿を自害させ豊臣氏を滅亡。徳川幕府の全国支配を確定させた。', category: '人物', subcategory: '軍事', keywords: ['徳川家康'], era: '江戸' },
  { id: 'h121', year: 1615, title: '徳川家康が武家諸法度・禁中並公家諸法度を制定する', description: '武家諸法度で大名を統制し禁中並公家諸法度で朝廷を制限。幕藩体制の法的基盤を確立した。', category: '人物', subcategory: '政治', keywords: ['徳川家康'], era: '江戸' },
  // p53 石田三成
  { id: 'h122', year: 1598, title: '石田三成が五奉行の一人として豊臣政権を支える', description: '豊臣秀吉の側近として検地・外交・兵站を担い豊臣政権の行政を一手に仕切った実務官僚。', category: '人物', subcategory: '政治', keywords: ['石田三成'], era: '安土桃山' },
  { id: 'h123', year: 1600, title: '石田三成が関ヶ原の戦いで西軍を率い敗北する', description: '徳川家康打倒のため毛利輝元を総大将に西軍を組織したが関ヶ原で敗北。捕らえられ京都で処刑された。', category: '人物', subcategory: '軍事', keywords: ['石田三成'], era: '江戸' },
  // p54 加藤清正
  { id: 'h124', year: 1592, title: '加藤清正が朝鮮出兵で活躍し虎退治の逸話を残す', description: '文禄・慶長の役で先鋒として活躍。朝鮮半島北部まで進撃しトラを退治したという逸話が残る武将。', category: '人物', subcategory: '軍事', keywords: ['加藤清正'], era: '安土桃山' },
  { id: 'h125', year: 1607, title: '加藤清正が熊本城を築城する', description: '難攻不落で知られる熊本城を完成させた。石垣の美しさと武骨な実用性を兼ね備えた近世城郭の傑作。', category: '人物', subcategory: '文化', keywords: ['加藤清正'], era: '江戸' },
  // p55 伊達政宗
  { id: 'h126', year: 1589, title: '伊達政宗が奥州を制覇し独眼竜と呼ばれる', description: '摺上原の戦いで蘆名氏を滅ぼし南奥羽を制覇。隻眼の若き大名として独眼竜の異名をとった。', category: '人物', subcategory: '軍事', keywords: ['伊達政宗'], era: '安土桃山' },
  { id: 'h127', year: 1613, title: '伊達政宗が支倉常長をヨーロッパに派遣する', description: '家臣・支倉常長を慶長遣欧使節としてスペイン・ローマへ派遣。キリスト教布教とスペインとの通商交渉を試みた。', category: '人物', subcategory: '外交', keywords: ['伊達政宗'], era: '江戸' },
  { id: 'h128', year: 1601, title: '伊達政宗が仙台城を築き仙台城下町を建設する', description: '青葉山に仙台城（青葉城）を築き城下町を整備。現在の仙台市の礎を作り東北最大の都市の基盤を形成した。', category: '人物', subcategory: '経済', keywords: ['伊達政宗'], era: '江戸' },
  // p56 宮本武蔵
  { id: 'h129', year: 1612, title: '宮本武蔵が巌流島の決闘で佐々木小次郎を破る', description: '船島（巌流島）での決闘で佐々木小次郎を木刀一刀で倒した。最も有名な武蔵の決闘として後世に語り継がれる。', category: '人物', subcategory: '軍事', keywords: ['宮本武蔵'], era: '江戸' },
  { id: 'h130', year: 1645, title: '宮本武蔵が五輪書を著す', description: '晩年に熊本・霊巌洞で執筆した兵法書。地・水・火・風・空の5巻からなり剣の哲学を論じた不朽の古典。', category: '人物', subcategory: '文化', keywords: ['宮本武蔵'], era: '江戸' },
  // p57 徳川光圀
  { id: 'h131', year: 1657, title: '徳川光圀が大日本史の編纂を開始する', description: '水戸藩主として大日本史の編纂事業を開始。神武天皇から後小松天皇までを記した大著で水戸学の基礎となった。', category: '人物', subcategory: '文化', keywords: ['徳川光圀'], era: '江戸' },
  // p58 井原西鶴
  { id: 'h132', year: 1682, title: '井原西鶴が好色一代男を著す', description: '浮世草子の先駆け作品。主人公・世之介の遍歴を通じて元禄時代の町人の欲望と生命力を描いた。', category: '人物', subcategory: '文化', keywords: ['井原西鶴'], era: '江戸' },
  { id: 'h133', year: 1688, title: '井原西鶴が日本永代蔵を著す', description: '商人の成功・失敗を描いた浮世草子。経済小説の先駆けとして元禄期の町人経済の実態を伝える作品。', category: '人物', subcategory: '文化', keywords: ['井原西鶴'], era: '江戸' },
  // p59 松尾芭蕉
  { id: 'h134', year: 1689, title: '松尾芭蕉が奥の細道の旅に出る', description: '江戸深川から東北・北陸を経て大垣まで約2400kmの俳諧紀行の旅。古人の足跡を辿りながら名句を詠んだ。', category: '人物', subcategory: '文化', keywords: ['松尾芭蕉'], era: '江戸' },
  { id: 'h135', year: 1694, title: '松尾芭蕉が蕉風俳諧を確立し俳諧を芸術に昇華する', description: '俳諧を単なる言葉遊びから侘び・寂びの精神を宿す芸術へ高めた。奥の細道など紀行文とともに日本文学の最高峰とされる。', category: '人物', subcategory: '文化', keywords: ['松尾芭蕉'], era: '江戸' },
  // p60 近松門左衛門
  { id: 'h136', year: 1703, title: '近松門左衛門が曽根崎心中を著す', description: '実際の心中事件を題材にした世話物浄瑠璃の傑作。人形浄瑠璃・歌舞伎の世話物ジャンルを確立し大評判を呼んだ。', category: '人物', subcategory: '文化', keywords: ['近松門左衛門'], era: '江戸' },
  { id: 'h137', year: 1721, title: '近松門左衛門が国性爺合戦を著す', description: '鄭成功の活躍を題材にした時代物浄瑠璃。17ヶ月の長期興行という異例の大ヒットを記録した。', category: '人物', subcategory: '文化', keywords: ['近松門左衛門'], era: '江戸' },
  // p61 新井白石
  { id: 'h138', year: 1709, title: '新井白石が正徳の治を推進する', description: '六代・七代将軍（家宣・家継）の侍講として政治改革を主導。貨幣改鋳・長崎貿易制限・朝鮮通信使の待遇改訂などを断行した。', category: '人物', subcategory: '政治', keywords: ['新井白石'], era: '江戸' },
  { id: 'h139', year: 1716, title: '新井白石が折たく柴の記・西洋紀聞を著す', description: '自伝的著作・折たく柴の記と、宣教師シドッチの尋問をもとにした西洋紀聞を著述。鎖国下で西洋の知識を体系化した。', category: '人物', subcategory: '文化', keywords: ['新井白石'], era: '江戸' },
  // p62 徳川吉宗
  { id: 'h140', year: 1716, title: '徳川吉宗が享保の改革を実施する', description: '八代将軍として財政再建・行政刷新を目指した享保の改革を実施。米価調整・新田開発・倹約令などを断行した。', category: '人物', subcategory: '政治', keywords: ['徳川吉宗'], era: '江戸' },
  { id: 'h141', year: 1721, title: '徳川吉宗が目安箱を設置する', description: '庶民の意見を直接将軍に届けるための目安箱を江戸に設置。小石川養生所設立など実際の政策に反映させた。', category: '人物', subcategory: '政治', keywords: ['徳川吉宗'], era: '江戸' },
  { id: 'h142', year: 1742, title: '徳川吉宗が公事方御定書を制定する', description: '刑事法・民事法を体系化した幕府の法典。以後の江戸幕府の裁判実務の基準となった成文法体系。', category: '人物', subcategory: '政治', keywords: ['徳川吉宗'], era: '江戸' },
  // p63 平賀源内
  { id: 'h143', year: 1770, title: '平賀源内がエレキテルを復元・改良する', description: '輸入された壊れた摩擦起電機を修理・改良し実演。蘭学・本草学・戯作・浄瑠璃と多才な発明家として知られた。', category: '人物', subcategory: '文化', keywords: ['平賀源内'], era: '江戸' },
  { id: 'h144', year: 1767, title: '平賀源内が土用の丑の日のうなぎを発案する', description: '夏に売れないウナギ屋のために土用の丑の日にウナギを食べる習慣を広告的手法で普及させたとされる逸話。', category: '人物', subcategory: '経済', keywords: ['平賀源内'], era: '江戸' },
  // p64 本居宣長
  { id: 'h145', year: 1798, title: '本居宣長が古事記伝を完成させ国学を大成する', description: '35年かけて古事記の全文を注釈した古事記伝44巻を完成。万葉仮名の解読・古代語の研究で国学の最高峰とされる。', category: '人物', subcategory: '文化', keywords: ['本居宣長'], era: '江戸' },
  { id: 'h146', year: 1771, title: '本居宣長がもののあわれ論を提唱する', description: '源氏物語の本質を「もののあわれ」と定義し日本文学の審美的概念を確立。日本固有の感性の哲学的定義とされる。', category: '人物', subcategory: '文化', keywords: ['本居宣長'], era: '江戸' },
  // p65 杉田玄白
  { id: 'h147', year: 1771, title: '杉田玄白が腑分け（解剖）を見学し解体新書を着想する', description: '刑死体の解剖観察でオランダ解剖書の正確さに驚き、前野良沢らとともに翻訳を決意した。', category: '人物', subcategory: '文化', keywords: ['杉田玄白'], era: '江戸' },
  { id: 'h148', year: 1774, title: '杉田玄白が解体新書を出版する', description: 'オランダ語解剖書を翻訳した解体新書を出版。日本初の西洋医学書として医学の近代化に革命をもたらした。', category: '人物', subcategory: '文化', keywords: ['杉田玄白'], era: '江戸' },
  // p66 伊能忠敬
  { id: 'h149', year: 1800, title: '伊能忠敬が日本全国の測量を開始する', description: '55歳で蝦夷地の測量から開始。以後17年かけて全国を歩き測量した空前の大事業。', category: '人物', subcategory: '文化', keywords: ['伊能忠敬'], era: '江戸' },
  { id: 'h150', year: 1821, title: '伊能忠敬の大日本沿海輿地全図が完成する', description: '忠敬の没後3年、弟子たちが大日本沿海輿地全図（214枚）を完成。現代地図と比較しても驚くほど正確な精度を誇る。', category: '人物', subcategory: '文化', keywords: ['伊能忠敬'], era: '江戸' },
  // p67 葛飾北斎
  { id: 'h151', year: 1831, title: '葛飾北斎が富嶽三十六景を出版する', description: '富士山をモチーフに様々な角度・場面を描いた浮世絵シリーズ。神奈川沖浪裏はモネ・ゴッホらに影響を与えた。', category: '人物', subcategory: '文化', keywords: ['葛飾北斎'], era: '江戸' },
  { id: 'h152', year: 1814, title: '葛飾北斎が北斎漫画を出版する', description: '人物・動植物・風景など多様な素描を集めた絵手本。全15編に及び西洋の漫画・アニメにも影響を与えた。', category: '人物', subcategory: '文化', keywords: ['葛飾北斎'], era: '江戸' },
  // p68 大塩平八郎
  { id: 'h153', year: 1837, title: '大塩平八郎が大坂で反乱を起こす', description: '飢饉の中で幕府の失政を糾弾し大坂で反乱を起こした。半日で鎮圧されたが元幕府役人の反乱として幕府に衝撃を与えた。', category: '人物', subcategory: '政治', keywords: ['大塩平八郎'], era: '江戸' },
  // p69 歌川広重
  { id: 'h154', year: 1833, title: '歌川広重が東海道五十三次を出版する', description: '東海道の53の宿場を描いた浮世絵シリーズ。日本の風景版画の傑作として西洋印象派（モネ・ヴァン・ゴッホ）に影響を与えた。', category: '人物', subcategory: '文化', keywords: ['歌川広重'], era: '江戸' },
  // p70 井伊直弼
  { id: 'h155', year: 1858, title: '井伊直弼が日米修好通商条約に調印する', description: '孝明天皇の勅許を得ないまま日米修好通商条約に調印。開国・自由貿易の開始となったが勅許なしの調印は大問題となった。', category: '人物', subcategory: '外交', keywords: ['井伊直弼'], era: '幕末' },
  { id: 'h156', year: 1858, title: '井伊直弼が安政の大獄で反対派を弾圧する', description: '条約調印への批判と将軍継嗣問題での反対派を大量処罰した安政の大獄。吉田松陰・橋本左内ら100名以上を処分した。', category: '人物', subcategory: '政治', keywords: ['井伊直弼'], era: '幕末' },
  { id: 'h157', year: 1860, title: '井伊直弼が桜田門外の変で暗殺される', description: '安政の大獄への報復として水戸・薩摩の浪士17名に桜田門外で暗殺された。強権的な政治の終焉と幕府の動揺を示した。', category: '人物', subcategory: '政治', keywords: ['井伊直弼'], era: '幕末' },
  // p71 勝海舟
  { id: 'h158', year: 1860, title: '勝海舟が咸臨丸で太平洋を横断する', description: '日本人が初めて太平洋を航海した咸臨丸の艦長として渡米。日本の近代海軍建設の先駆けとなった。', category: '人物', subcategory: '文化', keywords: ['勝海舟'], era: '幕末' },
  { id: 'h159', year: 1868, title: '勝海舟が西郷隆盛と会談し江戸城無血開城を実現する', description: '新政府軍が江戸総攻撃を計画する中、西郷隆盛と談判し江戸城を無血で開城させた。100万都市・江戸の戦禍を防いだ。', category: '人物', subcategory: '政治', keywords: ['勝海舟'], era: '明治' },
  // p72 西郷隆盛
  { id: 'h160', year: 1868, title: '西郷隆盛が討幕運動を主導し明治維新を実現する', description: '薩長同盟をもとに倒幕運動を主導し戊辰戦争を勝利に導いた。明治新政府の礎を築いた薩摩の英雄。', category: '人物', subcategory: '政治', keywords: ['西郷隆盛'], era: '明治' },
  { id: 'h161', year: 1873, title: '西郷隆盛が征韓論で敗れ下野する', description: '朝鮮との外交問題で征韓論を主張したが岩倉使節団帰国組に否決されて下野。以後の明治政府との対立の端緒となった。', category: '人物', subcategory: '政治', keywords: ['西郷隆盛'], era: '明治' },
  { id: 'h162', year: 1877, title: '西郷隆盛が西南戦争で政府軍と戦い戦死する', description: '士族の不満を背景に西南戦争を起こしたが近代陸軍に敗北。城山で自刃し征韓派・反新政府勢力の最後の戦いが終わった。', category: '人物', subcategory: '軍事', keywords: ['西郷隆盛'], era: '明治' },
  // p73 吉田松陰
  { id: 'h163', year: 1854, title: '吉田松陰がペリーの黒船に密航を試み失敗する', description: '西洋文明を学ぶためペリーの船に密航を試みたが拒絶された。藩に自首し獄中でも学問を続けた。', category: '人物', subcategory: '文化', keywords: ['吉田松陰'], era: '幕末' },
  { id: 'h164', year: 1856, title: '吉田松陰が松下村塾で伊藤博文・山縣有朋らを育てる', description: '萩の松下村塾で高杉晋作・伊藤博文・山縣有朋ら明治維新の指導者たちを育成した。', category: '人物', subcategory: '文化', keywords: ['吉田松陰'], era: '幕末' },
  { id: 'h165', year: 1859, title: '吉田松陰が安政の大獄で処刑される', description: '老中暗殺計画が発覚し安政の大獄で処刑された。享年29歳。その思想は弟子たちを通じて明治維新を動かした。', category: '人物', subcategory: '政治', keywords: ['吉田松陰'], era: '幕末' },
  // p74 大久保利通
  { id: 'h166', year: 1871, title: '大久保利通が廃藩置県を推進する', description: '西郷隆盛・木戸孝允と連携し廃藩置県を断行。封建的な藩体制を廃し中央集権国家の基盤を一気に確立した。', category: '人物', subcategory: '政治', keywords: ['大久保利通'], era: '明治' },
  { id: 'h167', year: 1871, title: '大久保利通が岩倉使節団で欧米を視察する', description: '岩倉具視を全権大使とする使節団に参加し欧米の制度・産業を視察。帰国後の殖産興業政策の基礎とした。', category: '人物', subcategory: '外交', keywords: ['大久保利通'], era: '明治' },
  { id: 'h168', year: 1878, title: '大久保利通が紀尾井坂の変で暗殺される', description: '西南戦争後の処置に不満を持つ元士族6名に紀尾井坂で暗殺された。明治維新三傑の最後の一人の死。', category: '人物', subcategory: '政治', keywords: ['大久保利通'], era: '明治' },
  // p75 木戸孝允
  { id: 'h169', year: 1866, title: '木戸孝允が薩長同盟を締結する', description: '坂本龍馬の仲介で西郷隆盛と会談し薩長同盟を締結。対立していた薩摩・長州が連携し倒幕への道が開かれた。', category: '人物', subcategory: '政治', keywords: ['木戸孝允'], era: '幕末' },
  { id: 'h170', year: 1868, title: '木戸孝允が五箇条の御誓文の起草に関与する', description: '明治新政府の基本方針を示した五箇条の御誓文の原案作成に関与。議会制・公議輿論を重視した条文を盛り込んだ。', category: '人物', subcategory: '政治', keywords: ['木戸孝允'], era: '明治' },
  { id: 'h171', year: 1871, title: '木戸孝允が版籍奉還・廃藩置県を推進する', description: '藩主に版籍（土地・人民）を返還させ廃藩置県を断行する改革を推進。封建制解体の主要な推進者の一人。', category: '人物', subcategory: '政治', keywords: ['木戸孝允'], era: '明治' },
]
`

content += toAppend
writeFileSync(filePath, content, 'utf-8')
console.log('p51-p75 done')
