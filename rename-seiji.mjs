import { readFileSync, writeFileSync } from 'fs'

// ── 1. src/types/index.ts: Category型を更新 ──────────────────
const typesPath = 'src/types/index.ts'
let typesContent = readFileSync(typesPath, 'utf-8')
typesContent = typesContent.replace("'政治'", "'日本の政治'")
writeFileSync(typesPath, typesContent, 'utf-8')
console.log('types/index.ts updated')

// ── 2. src/data/events.ts: カテゴリ名・セクションヘッダ・CATEGORIES配列を更新 ──
const eventsPath = 'src/data/events.ts'
let content = readFileSync(eventsPath, 'utf-8')

// CATEGORIES配列
content = content.replace("'政治',", "'日本の政治',")
// CATEGORY_COLORS / CATEGORY_DOT の '政治' キー（行頭寄り）
content = content.replace(/^(\s+)'政治'(\s*:)/gm, "$1'日本の政治'$2")
// セクションヘッダ
content = content.replace('// ── 政治 (20件)', '// ── 日本の政治 (20件)')
content = content.replace('// ── 政治 追加 (30件)', '// ── 日本の政治 追加 (30件)')
// 全イベントの category: '政治' を変換（subcategory: '政治' は変えない）
content = content.replace(/category: '政治'/g, "category: '日本の政治'")

writeFileSync(eventsPath, content, 'utf-8')
console.log('category rename done')

// ── 3. 50件の新規イベントを追加 ──────────────────────────────
const newEvents = [
  `  { id: 'jp001', year: 587,  title: '物部氏の滅亡・蘇我氏の台頭', description: '蘇我馬子が物部守屋を河内で討ち物部氏が滅亡。仏教受容派の蘇我氏が反仏教派の物部氏に勝利し、以後蘇我氏が大和政権の最高権力者として君臨した。', category: '日本の政治', subcategory: '軍事衝突', era: '飛鳥奈良' },`,
  `  { id: 'jp002', year: 663,  title: '白村江の戦い', description: '百済復興支援のため派遣された日本・百済連合軍が唐・新羅連合軍に白村江で大敗。日本は朝鮮半島の拠点を失い、以後国内防衛強化と律令国家建設を急いだ。', category: '日本の政治', subcategory: '軍事衝突', era: '飛鳥奈良' },`,
  `  { id: 'jp003', year: 740,  title: '藤原広嗣の乱', description: '藤原宇合の子・広嗣が聖武天皇側近の玄昉・吉備真備排斥を求めて大宰府で挙兵したが鎮圧された。聖武天皇の相次ぐ遷都（恭仁・難波・紫香楽）のきっかけとなった。', category: '日本の政治', subcategory: '軍事衝突', era: '飛鳥奈良' },`,
  `  { id: 'jp004', year: 764,  title: '恵美押勝（藤原仲麻呂）の乱', description: '孝謙太上天皇と対立した太政大臣・藤原仲麻呂が挙兵したが鎮圧され処刑された。称徳天皇が復位し道鏡が権勢を握る時代が始まった。', category: '日本の政治', subcategory: '軍事衝突', era: '飛鳥奈良' },`,
  `  { id: 'jp005', year: 866,  title: '応天門の変', description: '応天門の放火犯として大納言・伴善男が左遷された政治事件。藤原良房が実権を握り、摂関政治の確立を促した奈良・平安初期最大の政変の一つ。', category: '日本の政治', era: '平安' },`,
  `  { id: 'jp006', year: 935,  title: '平将門の乱', description: '東国の武士・平将門が関東八ヶ国を支配下に置き「新皇」を名乗った。藤原秀郷・平貞盛に討伐されたが武士の自立と東国自治意識の高まりを示した。', category: '日本の政治', subcategory: '軍事衝突', era: '平安' },`,
  `  { id: 'jp007', year: 939,  title: '藤原純友の乱', description: '前伊予掾・藤原純友が海賊を率いて瀬戸内海を席巻した反乱。平将門の乱と同時期に起きたため「承平天慶の乱」と総称され、朝廷の権威の地方支配の限界を露わにした。', category: '日本の政治', subcategory: '軍事衝突', era: '平安' },`,
  `  { id: 'jp008', year: 1086,  title: '院政の開始（白河上皇）', description: '白河天皇が堀河天皇に譲位後も上皇として政治の実権を握り始めた。「院政」の先例となり、以後後鳥羽・後白河・後嵯峨ら上皇が幕府と対抗しながら朝廷権力を維持した。', category: '日本の政治', era: '平安' },`,
  `  { id: 'jp009', year: 1167,  title: '平清盛・太政大臣就任', description: '武士として初めて平清盛が太政大臣に就任。日宋貿易を推進し福原遷都を断行した。源氏との対立が深まり保元・平治の乱以降の平氏政権の頂点を示した。', category: '日本の政治', era: '平安' },`,
  `  { id: 'jp010', year: 1180,  title: '以仁王の令旨・源頼朝挙兵', description: '後白河法皇の皇子・以仁王が平氏追討の令旨を発し源頼朝が伊豆で挙兵。治承・寿永の乱（源平合戦）が本格化し、鎌倉を拠点とした武家政権の基礎が形成された。', category: '日本の政治', era: '鎌倉' },`,
  `  { id: 'jp011', year: 1232,  title: '御成敗式目の制定', description: '執権北条泰時が武家法として御成敗式目（貞永式目）51ヶ条を制定。武家独自の法体系を初めて成文化し、以後の武家立法の規範となった。', category: '日本の政治', era: '鎌倉' },`,
  `  { id: 'jp012', year: 1274,  title: '文永の役（元寇第1回）', description: '元のフビライ・ハンが朝鮮・モンゴル・漢人の連合軍3万で対馬・博多を攻撃。日本軍は苦戦したが暴風雨（神風）もあり元軍は撤退した。', category: '日本の政治', subcategory: '軍事衝突', era: '鎌倉' },`,
  `  { id: 'jp013', year: 1281,  title: '弘安の役（元寇第2回）', description: '元が14万の大軍で再来したが大暴風雨（神風）で元軍が壊滅し撤退した。以後「神国日本」の意識が強まるが幕府の恩賞問題が御家人の不満を高めた。', category: '日本の政治', subcategory: '軍事衝突', era: '鎌倉' },`,
  `  { id: 'jp014', year: 1297,  title: '永仁の徳政令', description: '北条貞時が経済的に困窮した御家人救済のため、所領の質入れ・売買を無効とする徳政令を発令。しかし効果は限定的で金融市場を混乱させ翌年撤回された。', category: '日本の政治', era: '鎌倉' },`,
  `  { id: 'jp015', year: 1334,  title: '建武の新政', description: '鎌倉幕府を倒した後醍醐天皇が天皇親政の復活を目指した「建武の新政」を開始。公家重視・武家軽視の政策が武士の不満を招き、2年余りで崩壊した。', category: '日本の政治', era: '室町' },`,
  `  { id: 'jp016', year: 1350,  title: '観応の擾乱', description: '足利尊氏と弟・直義の対立が幕府を二分した内乱。南朝勢力も巻き込みながら3年以上続き、室町幕府の基盤を大きく揺るがせた。', category: '日本の政治', subcategory: '軍事衝突', era: '室町' },`,
  `  { id: 'jp017', year: 1441,  title: '嘉吉の乱', description: '播磨・備前・美作の守護・赤松満祐が酒宴に6代将軍足利義教を招き暗殺した事件。将軍の権威が失墜し守護大名の跋扈と戦国時代への加速を招いた。', category: '日本の政治', subcategory: '軍事衝突', era: '室町' },`,
  `  { id: 'jp018', year: 1493,  title: '明応の政変', description: '細川政元が10代将軍・足利義材を廃して義澄を擁立したクーデター。「下剋上」の象徴的事件として戦国時代の本格的幕開けとされる。', category: '日本の政治', era: '室町' },`,
  `  { id: 'jp019', year: 1560,  title: '桶狭間の戦い', description: '今川義元の大軍を織田信長が奇襲で撃破。今川義元が戦死し東海の秩序が崩れた。無名に近かった信長の名が全国に知られるきっかけとなった。', category: '日本の政治', subcategory: '軍事衝突', era: '安土桃山' },`,
  `  { id: 'jp020', year: 1568,  title: '織田信長の上洛', description: '足利義昭を奉じて織田信長が上洛し、京都の支配権を握った。足利義昭を15代将軍に就任させ、天下統一への本格的な歩みが始まった。', category: '日本の政治', era: '安土桃山' },`,
  `  { id: 'jp021', year: 1573,  title: '室町幕府の滅亡', description: '織田信長が対立した足利義昭を京都から追放。1336年に成立した室町幕府が約240年の歴史に幕を閉じた。', category: '日本の政治', era: '安土桃山' },`,
  `  { id: 'jp022', year: 1575,  title: '長篠の戦い', description: '織田信長・徳川家康連合軍が武田勝頼の騎馬軍団を鉄砲三段撃ちで破った。戦国最強と恐れられた武田騎馬隊が壊滅し、火力による戦術の変革を示した。', category: '日本の政治', subcategory: '軍事衝突', era: '安土桃山' },`,
  `  { id: 'jp023', year: 1582,  title: '本能寺の変', description: '天下統一を目前にした織田信長が家臣・明智光秀の謀反により本能寺で自刃した。豊臣秀吉が山崎の戦いで光秀を撃ち、後継者争いを制して天下人への道を進んだ。', category: '日本の政治', subcategory: '軍事衝突', era: '安土桃山' },`,
  `  { id: 'jp024', year: 1585,  title: '豊臣秀吉・関白就任', description: '豊臣秀吉が関白に就任し公家と武家双方を掌握する権力基盤を確立。その後太政大臣にも就任し、全国統一の政治的権威を整えた。', category: '日本の政治', era: '安土桃山' },`,
  `  { id: 'jp025', year: 1588,  title: '刀狩令', description: '豊臣秀吉が農民・寺社から刀・脇差・弓・鑓・鉄砲を没収する刀狩令を発令。兵農分離を制度化し、農民が武装蜂起できない近世社会の基盤を作った。', category: '日本の政治', era: '安土桃山' },`,
  `  { id: 'jp026', year: 1635,  title: '参勤交代の制度化', description: '3代将軍徳川家光が武家諸法度を改正し、大名が1年交代で江戸と領国に住む参勤交代を義務化。大名の財政を消耗させ、幕府の統制を強化した。', category: '日本の政治', era: '江戸' },`,
  `  { id: 'jp027', year: 1637,  title: '島原の乱', description: '島原・天草の農民とキリシタンが重税と弾圧に抗して蜂起した江戸時代最大の一揆。翌年幕府軍に鎮圧され、以後鎖国が強化されキリシタン禁制が徹底された。', category: '日本の政治', subcategory: '軍事衝突', era: '江戸' },`,
  `  { id: 'jp028', year: 1716,  title: '享保の改革', description: '8代将軍徳川吉宗が主導した幕政改革。目安箱設置・公事方御定書制定・上米の制・新田開発など財政再建と統治機構の整備を行い「米将軍」と呼ばれた。', category: '日本の政治', era: '江戸' },`,
  `  { id: 'jp029', year: 1841,  title: '天保の改革', description: '老中水野忠邦が財政再建・風俗取り締まり・株仲間解散・上知令などを断行した幕末前夜の改革。庶民・大名・旗本の反発を受け2年余りで失敗に終わった。', category: '日本の政治', era: '江戸' },`,
  `  { id: 'jp030', year: 1853,  title: 'ペリー来航', description: 'アメリカ海軍提督マシュー・ペリーが黒船4隻を率いて浦賀に来航し、日本に開国を要求した。幕府は翌年日米和親条約を締結し、250年の鎖国が事実上終わった。', category: '日本の政治', era: '幕末' },`,
  `  { id: 'jp031', year: 1860,  title: '桜田門外の変', description: '水戸藩・薩摩藩士18名が大老・井伊直弼を江戸城桜田門外で暗殺した。安政の大獄への報復として行われ、幕府の権威を大きく失墜させた。', category: '日本の政治', subcategory: '軍事衝突', era: '幕末' },`,
  `  { id: 'jp032', year: 1866,  title: '薩長同盟の締結', description: '坂本龍馬・中岡慎太郎の仲介により薩摩藩・長州藩が秘密軍事同盟を締結。長州征討で幕府の権威が失墜した後、倒幕の主力となる同盟が形成された。', category: '日本の政治', era: '幕末' },`,
  `  { id: 'jp033', year: 1868,  title: '五箇条の御誓文', description: '明治新政府が公武一体・開国和親・旧来の陋習打破などを誓った建国の基本方針。国民統合と近代国家建設の理念を示した新政府最初の政治宣言。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp034', year: 1869,  title: '版籍奉還', description: '明治政府が藩主に土地（版）と人民（籍）を天皇に返上させた。旧藩主は知藩事として留まり即時の中央集権化には至らなかったが廃藩置県への布石となった。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp035', year: 1873,  title: '地租改正', description: '明治政府が土地の収穫高に基づく物納年貢制度を廃止し地価の3%を金納する地租制度に改めた。財政基盤が安定した反面農民の負担は重く各地で地租改正反対一揆が起きた。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp036', year: 1881,  title: '国会開設の勅諭', description: '明治天皇の名で1890年の国会開設を約束する勅諭が出された。大隈重信が下野し伊藤博文が主導権を握って、プロイセン型の憲法・議会制度の設計が始まった。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp037', year: 1890,  title: '帝国議会の開設', description: '大日本帝国憲法施行後初の帝国議会が開会。貴族院と衆議院の二院制で衆議院は選挙で選ばれた。以後民党（自由党・改進党）と藩閥政府の激しい予算論争が繰り広げられた。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp038', year: 1895,  title: '下関条約と三国干渉', description: '日清戦争の講和条約で清が台湾・遼東半島・澎湖諸島と賠償金2億両を割譲。しかしロシア・フランス・ドイツの三国干渉で遼東半島を返還。「臥薪嘗胆」でロシアへの対抗意識が高まった。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp039', year: 1910,  title: '韓国併合', description: '日本が大韓帝国を強制的に併合し朝鮮総督府を設置。植民地支配が始まり土地調査事業・皇民化政策・徴兵・徴用など現在に至る歴史認識問題の根源となった。', category: '日本の政治', era: '明治' },`,
  `  { id: 'jp040', year: 1912,  title: '大正政変（第一次護憲運動）', description: '桂太郎内閣の成立に反発した立憲政友会・立憲国民党と民衆が「閥族打破・憲政擁護」を掲げて運動を展開。桂内閣は53日で総辞職し政党政治の時代が近づいた。', category: '日本の政治', era: '大正' },`,
  `  { id: 'jp041', year: 1931,  title: '満州事変', description: '関東軍が奉天近郊の柳条湖で南満州鉄道を自ら爆破し中国軍の仕業として満州全土を占領した謀略事件。政府の不拡大方針を無視した軍部の独走が始まった。', category: '日本の政治', subcategory: '軍事衝突', era: '昭和' },`,
  `  { id: 'jp042', year: 1937,  title: '日中戦争の開戦', description: '盧溝橋事件をきっかけに日中戦争が全面化した。日本軍は上海・南京を占領したが蒋介石政権は抗戦を続け戦線は泥沼化。資源問題から南進政策と太平洋戦争へとつながった。', category: '日本の政治', subcategory: '軍事衝突', era: '昭和' },`,
  `  { id: 'jp043', year: 1951,  title: 'サンフランシスコ講和条約', description: '日本が連合国48ヶ国と平和条約を締結し独立を回復（1952年発効）。同時に日米安全保障条約も締結した。ソ連・中国・インドは署名せず「片面講和」と批判された。', category: '日本の政治', era: '昭和' },`,
  `  { id: 'jp044', year: 1960,  title: '安保闘争と日米安保条約改定', description: '岸信介内閣が日米新安全保障条約を強行採決した。議会を埋め尽くす大規模なデモが起きたが条約は自然成立し岸内閣は退陣。「戦後民主主義」の原体験となった。', category: '日本の政治', era: '昭和' },`,
  `  { id: 'jp045', year: 1993,  title: '55年体制の崩壊・細川連立政権', description: '自民党の分裂と宮沢内閣への不信任可決により衆院選で非自民8党派が過半数を獲得。細川護熙を首相とする連立政権が誕生し38年間続いた55年体制が終焉した。', category: '日本の政治', era: '平成' },`,
  `  { id: 'jp046', year: 2001,  title: '小泉純一郎の構造改革', description: '「聖域なき構造改革」を掲げた小泉純一郎首相が郵政民営化・不良債権処理・規制緩和を推進。「自民党をぶっ壊す」の言葉で国民の高い支持を集め、歴代最長に近い政権を維持した。', category: '日本の政治', era: '平成' },`,
  `  { id: 'jp047', year: 2011,  title: '東日本大震災後の政治対応と政権交代', description: '東日本大震災・福島第一原発事故の対応で民主党政権への批判が高まった。菅直人・野田佳彦内閣を経て2012年12月の衆院選で自民党が圧勝し安倍晋三政権が誕生した。', category: '日本の政治', era: '平成' },`,
  `  { id: 'jp048', year: 2015,  title: '安保法制の成立', description: '安倍政権が集団的自衛権の限定的行使を認める安全保障関連法を成立させた。憲法解釈の変更を伴うとして国会前に連日大規模デモが起き、戦後安保政策の大転換となった。', category: '日本の政治', era: '平成' },`,
  `  { id: 'jp049', year: 2019,  title: '令和への改元', description: '天皇陛下の退位により5月1日に令和と改元。「令和」は万葉集梅花の歌序文を出典とする日本初の国書由来の元号となった。平成の30年間の政治・社会変化を経た新時代の幕開け。', category: '日本の政治', era: '令和' },`,
  `  { id: 'jp050', year: 2024,  title: '自民党政治資金問題と政局混乱', description: '自民党派閥のパーティー券収入の裏金問題が発覚し安倍派を中心に多数の議員が立件・処分された。岸田文雄内閣は支持率が急落し総裁選で退陣を表明。石破茂新内閣が発足した。', category: '日本の政治', era: '令和' },`,
]

// events.tsを再読み込み（rename後のもの）
content = readFileSync(eventsPath, 'utf-8')
const lines = content.split('\n')

const isEventLine = l => l.trimStart().startsWith('{ id:')
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]

// 既存の 日本の政治 イベントを抽出（多行形式のものは除く）
const existingEvents = lines.filter(l => isEventLine(l) && getCategory(l) === '日本の政治')
console.log('Existing 日本の政治 one-liner events:', existingEvents.length)
console.log('New events:', newEvents.length)

const allEvents = [...existingEvents, ...newEvents]
const sorted = allEvents.sort((a, b) => getYear(a) - getYear(b))
console.log('Total:', sorted.length)

// セクション全体を再構築
// 方針: 日本の政治セクションの最初のヘッダーから次のセクションまでを置き換える
const sectionStart = lines.findIndex(l => l.includes('// ── 日本の政治'))
const sectionEnd = lines.findIndex((l, i) => i > sectionStart && l.match(/^\s*\/\/ ── (?!日本の政治)/))

// 既存のone-liner 政治イベント行と多行政治イベントを除去しつつ再構築
// 多行形式（e01-e20）はそのまま維持し、one-linerの追加分は削除して sorted に置き換える

// 多行形式の 日本の政治 イベントのidリスト
const multilineIds = []
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'e") && i < sectionEnd) {
    // Multi-line event block starts
    const idMatch = lines[i].match(/id:\s*'(e\d+)'/)
    if (idMatch) {
      // Find the category line nearby
      for (let j = i; j < Math.min(i+10, lines.length); j++) {
        if (lines[j].includes("category: '日本の政治'")) {
          multilineIds.push(idMatch[1])
          break
        }
      }
    }
  }
}
console.log('Multi-line 日本の政治 event IDs found:', multilineIds.length, multilineIds.slice(0,5))

// sorted から multiline events を除外（それらは既にファイル内に多行形式で存在）
const onlyNewOrOneliner = sorted.filter(l => {
  const idMatch = l.match(/id:\s*'([^']+)'/)
  if (!idMatch) return true
  return !multilineIds.includes(idMatch[1])
})

// 最終構築: 既存多行部分を維持し、セクション末尾のone-liner群を新sorted群で置き換える
// 追加セクションヘッダーを削除し、一つのセクションに統合
const outputLines = []
let inJpSection = false
let skippingOldOneliners = false
let insertedNew = false

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  // 日本の政治 追加セクションヘッダーをスキップ
  if (line.includes('// ── 日本の政治 追加')) {
    skippingOldOneliners = true
    continue
  }
  // 日本の政治 one-liner イベント行をスキップ（追加セクション内のもの）
  if (skippingOldOneliners && isEventLine(line) && getCategory(line) === '日本の政治') {
    continue
  }
  // 次のセクションに達したら挿入して通常モードへ
  if (skippingOldOneliners && line.match(/^\s*\/\/ ── /) && !line.includes('日本の政治')) {
    skippingOldOneliners = false
    if (!insertedNew) {
      for (const ev of onlyNewOrOneliner) outputLines.push(ev)
      outputLines.push('')
      insertedNew = true
    }
  }

  outputLines.push(line)
}

// セクションヘッダー更新
const finalLines = outputLines.map(l => {
  if (l.includes('// ── 日本の政治 (20件)')) {
    const total = onlyNewOrOneliner.length + multilineIds.length
    return `  // ── 日本の政治 (${total}件) ──────────────────────────────────`
  }
  return l
})

writeFileSync(eventsPath, finalLines.join('\n'), 'utf-8')

const finalCount = finalLines.filter(l => {
  if (isEventLine(l)) return getCategory(l) === '日本の政治'
  // 多行形式のカテゴリ行もカウント
  return l.trim() === "category: '日本の政治',"
}).length

console.log('日本の政治 events in output (approx):', finalCount)
console.log('Done.')
