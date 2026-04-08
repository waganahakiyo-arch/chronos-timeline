import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/data/events.ts'
const content = readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

const newEvents = `  { id: 'q136', year: -35000, title: '初期の象徴的刻み目', description: '南アフリカのブロンボス洞窟などで幾何学的な刻み目や顔料による記号が使用された。抽象的思考と記号使用の最初の証拠とされる。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['象徴', '洞窟', '記号', '先史'], era: '先史' },
  { id: 'q137', year: -9000, title: 'トークン（計数用粘土片）の使用', description: 'メソポタミアで羊・穀物などの数量を記録するために粘土製のトークンが使われ始めた。文字の前身となる記号体系。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['トークン', 'メソポタミア', '記録', '会計'], era: '古代文明' },
  { id: 'q138', year: -3400, title: '楔形文字の誕生', description: 'シュメール人がウルクで粘土板に葦で刻む楔形文字を発明。最初は会計記録用だったが後に神話・法律・文学へと発展した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['楔形文字', 'シュメール', 'ウルク', 'メソポタミア'], era: '古代文明' },
  { id: 'q139', year: -3200, title: 'ヒエログリフの誕生', description: 'エジプトで象形文字（ヒエログリフ）が発展。神殿・墓・パピルスに刻まれ、宗教・行政・文学に用いられた。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ヒエログリフ', 'エジプト', '象形文字', 'パピルス'], era: '古代文明' },
  { id: 'q140', year: -3000, title: '中国最古の文字記号', description: '良渚文化や龍山文化の陶器に刻まれた記号が中国最古の文字前駆体とされる。後の甲骨文字へつながる系譜の出発点。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['中国', '記号', '良渚', '原始文字'], era: '古代文明' },
  { id: 'q141', year: -2600, title: 'インダス文字の使用', description: 'インダス文明（モヘンジョダロ・ハラッパー）で印章に刻まれた文字が広く使用された。現在も未解読で、世界最大の謎の一つ。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['インダス文字', 'モヘンジョダロ', '未解読', '印章'], era: '古代文明' },
  { id: 'q142', year: -2000, title: '甲骨文字（亀甲獣骨文字）', description: '商（殷）王朝で占いの結果を亀の甲や牛の骨に刻んだ甲骨文字が登場。中国語文字体系の直接の祖先。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['甲骨文字', '殷', '占い', '中国語'], era: '古代文明' },
  { id: 'q143', year: -1700, title: 'プロト・シナイ文字（最初のアルファベット）', description: 'エジプトで働くセム系労働者がヒエログリフを簡略化して子音記号を作成。すべてのアルファベットの祖先となる画期的発明。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['アルファベット', 'プロトシナイ', 'セム語', '子音文字'], era: '古代文明' },
  { id: 'q144', year: -1700, title: 'ハンムラビ法典の楔形文字', description: 'バビロニア王ハンムラビが282条の法律を石柱に楔形文字で刻んだ。文字による法の公布・保存の先駆け。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ハンムラビ法典', '楔形文字', '法律', 'バビロニア'], era: '古代文明' },
  { id: 'q145', year: -1400, title: 'ウガリット・アルファベット', description: 'シリアのウガリットで30文字の楔形アルファベットが発明。子音のみを表す最初の完全なアルファベット体系の一つ。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ウガリット', 'アルファベット', 'シリア', '楔形'], era: '古代文明' },
  { id: 'q146', year: -1200, title: 'フェニキア文字の確立', description: 'レバント海岸のフェニキア人が22文字の子音アルファベットを完成させた。地中海貿易を通じて広まり、ギリシャ・ラテン・アラビア文字の直接の祖先。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['フェニキア文字', 'アルファベット', 'レバント', '地中海'], era: '古代文明' },
  { id: 'q147', year: -800, title: 'ギリシャ文字の誕生（母音の追加）', description: 'ギリシャ人がフェニキア文字に母音記号を加え、完全な音素文字を完成させた。西洋アルファベットの直接の祖先。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ギリシャ文字', '母音', 'アルファベット', '音素文字'], era: '古代文明' },
  { id: 'q148', year: -700, title: 'アラム語の国際語化', description: 'アッシリア帝国がアラム語を公用語として採用。中東・中央アジア全域で国際共通語となり、ヘブライ文字・アラビア文字の系譜に影響。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['アラム語', 'リンガフランカ', 'アッシリア', '中東'], era: '古代文明' },
  { id: 'q149', year: -600, title: 'ラテン文字の成立', description: 'エトルリア文字をもとにローマ人がラテン文字を発展させた。現在世界で最も広く使用される文字体系の起源。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ラテン文字', 'ローマ', 'エトルリア', 'アルファベット'], era: '古代文明' },
  { id: 'q150', year: -500, title: 'パーニニのサンスクリット文法', description: 'インドの文法学者パーニニが『アシュターディヤーイー』でサンスクリット語の文法を約4000条の規則で記述。現代言語学の基礎となる最初の体系的文法書。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['パーニニ', 'サンスクリット', '文法', '言語学'], era: '古代文明' },
  { id: 'q151', year: -300, title: 'ブラーフミー文字の普及', description: 'インド亜大陸でブラーフミー文字が広まる。現在のデーヴァナーガリー・タイ文字・チベット文字など南・東南アジアの多くの文字の祖先。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ブラーフミー文字', 'インド', '文字体系', 'アジア'], era: '古代文明' },
  { id: 'q152', year: -221, title: '秦の文字統一', description: '秦の始皇帝が篆書（小篆）を統一文字として全国に普及。多様な地域文字が統一され、中国語書記の基礎が確立された。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['秦', '文字統一', '篆書', '始皇帝'], era: '古代文明' },
  { id: 'q153', year: -200, title: 'ラテン語の帝国公用語化', description: 'ローマ帝国の拡大でラテン語が地中海世界全域の行政・法律・文化の言語となった。後のロマンス語群（フランス語・スペイン語・イタリア語等）の直接の祖先。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ラテン語', 'ローマ帝国', 'リンガフランカ', 'ロマンス語'], era: '古代文明' },
  { id: 'q154', year: -100, title: 'パピルスから羊皮紙へ', description: '羊皮紙（ペルガモン起源）がパピルスに代わる書写材料として普及。耐久性が高く、折り畳んで製本できるコデックス（本）形式を可能にした。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['羊皮紙', 'コデックス', '書写材料', 'ペルガモン'], era: '古代文明' },
  { id: 'q155', year: 100, title: 'アラビア文字の起源', description: 'ナバテア文字（アラム語系）からアラビア文字が発展し始める。右から左へ書き、22の子音文字からなる体系が形成された。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['アラビア文字', 'ナバテア', 'アラム語', '書記方向'], era: '中世' },
  { id: 'q156', year: 400, title: 'アルメニア文字の創制', description: 'メスロプ・マシュトツが聖書翻訳のためにアルメニア文字（36文字）を創案。民族文化・宗教の保存に貢献し、現在も使用される。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['アルメニア文字', 'メスロプ', '聖書', '民族文字'], era: '中世' },
  { id: 'q157', year: 500, title: 'デーヴァナーガリー文字の発展', description: 'ブラーフミー文字から発展したデーヴァナーガリーがサンスクリット・ヒンディー語の標準文字となる。現在インドで最も広く使われる文字。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['デーヴァナーガリー', 'ヒンディー語', 'サンスクリット', 'インド'], era: '中世' },
  { id: 'q158', year: 600, title: 'クルアーンとアラビア語の標準化', description: 'イスラーム台頭後、クルアーンの書写のためにアラビア文字・文法が標準化。アラビア語はイスラーム科学・哲学の国際語となった。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['アラビア語', 'クルアーン', 'イスラーム', '標準化'], era: '中世' },
  { id: 'q159', year: 700, title: '万葉仮名の発展', description: '日本で漢字の音を借りて日本語を表す万葉仮名が使われ始めた。『万葉集』に代表される和歌文化を記録する文字体系の先駆け。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['万葉仮名', '万葉集', '日本語', '漢字音仮借'], era: '中世' },
  { id: 'q160', year: 863, title: 'グラゴール文字の創制（キリル文字の前身）', description: 'キュリロスとメトディオスがスラブ語の聖書翻訳のためにグラゴール文字を発明。これをもとに後にキリル文字が作られ、現在のロシア語等に使用される。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['グラゴール文字', 'キリル文字', 'スラブ語', 'キュリロス'], era: '中世' },
  { id: 'q161', year: 900, title: 'ひらがな・カタカナの完成', description: '平安時代に万葉仮名が簡略化されてひらがな・カタカナが成立。女性貴族を中心に普及し、『源氏物語』など日本語文学を生んだ。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ひらがな', 'カタカナ', '平仮名', '片仮名', '平安'], era: '中世' },
  { id: 'q162', year: 1000, title: 'アラビア語の学術国際語としての確立', description: 'イスラーム黄金時代にアラビア語が数学・医学・哲学の共通言語として確立。ギリシャ知識を保存・翻訳し、ヨーロッパへの知識伝達を担った。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['アラビア語', 'イスラーム黄金時代', '学術語', '翻訳運動'], era: '中世' },
  { id: 'q163', year: 1066, title: 'ノルマン征服と英語の変容', description: 'ノルマン人のイングランド征服後、フランス語が宮廷・法律・文学の言語となり、英語はフランス語・ラテン語から大量の語彙を吸収して中英語へと変容した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['中英語', 'ノルマン征服', 'フランス語', '英語史'], era: '中世' },
  { id: 'q164', year: 1300, title: 'ダンテのイタリア語文学', description: 'ダンテが『神曲』をラテン語ではなくトスカーナ地方語（イタリア語）で執筆。俗語文学の地位を高め、標準イタリア語の形成に貢献した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ダンテ', '神曲', 'イタリア語', '俗語文学'], era: '中世' },
  { id: 'q165', year: 1443, title: 'ハングルの創制', description: '朝鮮の世宗大王がハングル（訓民正音）を創案・公布。漢字に依存しない朝鮮語専用の科学的文字体系で、識字率向上に画期的な役割を果たした。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ハングル', '訓民正音', '世宗大王', '朝鮮語'], era: '近世' },
  { id: 'q166', year: 1492, title: '最初のスペイン語文法書', description: 'アントニオ・デ・ネブリハが初の体系的スペイン語文法書を出版。「言語は帝国の道具」と述べ、国民語の標準化と植民地拡大を結びつけた。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['スペイン語', '文法書', 'ネブリハ', '言語標準化'], era: '近世' },
  { id: 'q167', year: 1517, title: 'ルターのドイツ語聖書', description: 'マルティン・ルターが聖書をドイツ語に翻訳。印刷術と組み合わさり、標準高地ドイツ語の形成と普及に決定的な役割を果たした。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ルター', 'ドイツ語', '聖書翻訳', '標準語形成'], era: '近世' },
  { id: 'q168', year: 1611, title: 'キング・ジェームズ聖書', description: '英国国王ジェームズ1世命令による英語聖書（KJV）が出版。英語散文の標準として数百年間英語文化を形成し、現代英語の語彙と表現に深い影響を残した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['キングジェームズ聖書', '英語', '聖書翻訳', '標準英語'], era: '近世' },
  { id: 'q169', year: 1755, title: 'ジョンソン英語辞典', description: 'サミュエル・ジョンソンが最初の体系的英語辞典を出版。約40,000語を収録し、英語の標準化・記述化に大きく貢献した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ジョンソン辞典', '英語辞典', '語彙標準化', 'サミュエルジョンソン'], era: '近世' },
  { id: 'q170', year: 1786, title: 'インド・ヨーロッパ語族の発見', description: 'ウィリアム・ジョーンズがサンスクリット・ギリシャ語・ラテン語の類似を指摘し、印欧語族の概念を提唱。比較言語学・歴史言語学の創始となった。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['印欧語族', 'ウィリアムジョーンズ', '比較言語学', 'サンスクリット'], era: '近代' },
  { id: 'q171', year: 1799, title: 'ロゼッタストーンの発見', description: 'ナポレオンのエジプト遠征でロゼッタストーンが発見。同一テキストの3言語併記がヒエログリフ解読への鍵となった。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ロゼッタストーン', 'ヒエログリフ', 'エジプト', 'ナポレオン'], era: '近代' },
  { id: 'q172', year: 1820, title: 'グリムの法則（音韻変化の規則発見）', description: 'ヤコブ・グリムが印欧語族内の子音変化の規則（グリムの法則）を発見。言語が規則的に変化することを示し、科学的言語学の基礎を築いた。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['グリムの法則', 'ヤコブグリム', '音韻変化', '比較言語学'], era: '近代' },
  { id: 'q173', year: 1822, title: 'ヒエログリフの解読', description: 'シャンポリオンがロゼッタストーンを用いてエジプトのヒエログリフを解読。3000年以上の沈黙を破り、古代エジプト文明の直接読解が可能になった。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ヒエログリフ解読', 'シャンポリオン', 'ロゼッタストーン', 'エジプト学'], era: '近代' },
  { id: 'q174', year: 1828, title: 'ウェブスター米語辞典', description: 'ノア・ウェブスターが「アメリカン・ディクショナリー」を出版。米国独自の綴り（color/colour等）を定め、アメリカ英語の標準化に決定的役割を果たした。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ウェブスター辞典', 'アメリカ英語', '綴り標準化', 'アメリカ英語'], era: '近代' },
  { id: 'q175', year: 1887, title: 'エスペラントの発明', description: 'ルドヴィコ・ザメンホフが国際共通語エスペラントを考案・公表。規則的な文法と混合語彙を持つ最も成功した人工言語で、現在も話者が存在する。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['エスペラント', 'ザメンホフ', '人工言語', '国際語'], era: '近代' },
  { id: 'q176', year: 1916, title: 'ソシュールの構造言語学', description: 'フェルディナン・ド・ソシュールの『一般言語学講義』が出版（死後）。言語記号の恣意性・共時態と通時態の区別など、現代言語学の基本概念を確立した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ソシュール', '構造言語学', '記号論', '共時態'], era: '近代' },
  { id: 'q177', year: 1924, title: 'ラジオと話し言葉の標準化', description: 'BBC放送開始以降、ラジオが「標準発音（RP）」を全国に普及させた。話し言葉の標準化が書き言葉から独立して進む現象の始まり。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ラジオ', '標準発音', 'BBC', '話し言葉'], era: '近代' },
  { id: 'q178', year: 1952, title: '線文字Bの解読', description: 'マイケル・ヴェントリスが線文字Bをギリシャ語の最古形態として解読。ミケーネ文明の言語が解明され、ギリシャ語史が500年遡った。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['線文字B', 'ヴェントリス', 'ミケーネ', 'ギリシャ語'], era: '現代' },
  { id: 'q179', year: 1957, title: 'チョムスキーの生成文法', description: 'ノーム・チョムスキーが『統語構造』を発表し、普遍文法・変形生成文法の概念を提唱。言語を人間固有の生物学的能力として捉える革命的パラダイム転換。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['チョムスキー', '生成文法', '普遍文法', '変形文法'], era: '現代' },
  { id: 'q180', year: 1966, title: '消滅危機言語の認識', description: 'UNESCO等が世界の言語の消滅危機を公式に認識し始めた。現在約7000言語のうち半数以上が今世紀中に消滅するとされ、言語保全活動が始まった。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['消滅危機言語', 'UNESCO', '言語保全', '多様性'], era: '現代' },
  { id: 'q181', year: 1991, title: 'Unicode 1.0の公開', description: 'Unicodeコンソーシアムがすべての言語・文字体系を単一のコード空間で扱うUnicode 1.0を公開。デジタル多言語化の基盤となり、現在は140,000以上の文字を収録。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['Unicode', '文字コード', 'デジタル', '多言語'], era: '現代' },
  { id: 'q182', year: 2006, title: 'Google翻訳のサービス開始', description: 'Googleが統計的機械翻訳に基づく無料翻訳サービスを開始。2016年にニューラル翻訳に移行し、精度が劇的向上。言語の壁を下げる技術として世界中に普及した。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['Google翻訳', '機械翻訳', '統計翻訳', 'ニューラル翻訳'], era: '現代' },
  { id: 'q183', year: 2017, title: 'Transformerモデルの発明', description: 'GoogleのAttention Is All You Needでトランスフォーマーアーキテクチャが発表。自然言語処理を革命的に変え、BERT・GPT・ChatGPT等すべての現代大規模言語モデルの基盤となった。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['Transformer', 'Attention機構', 'NLP', '大規模言語モデル'], era: '現代' },
  { id: 'q184', year: 2022, title: 'ChatGPTと言語AIの大衆化', description: 'OpenAIのChatGPT公開から2ヶ月で1億ユーザーを突破。AIが自然な多言語テキストを生成・翻訳できる時代が到来し、コミュニケーション・教育・翻訳の概念が根本から変わり始めた。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['ChatGPT', 'OpenAI', 'AI翻訳', '大規模言語モデル'], era: '現代' },
  { id: 'q185', year: 2024, title: 'リアルタイムAI翻訳の実用化', description: 'イヤホン型デバイスやスマートフォンによるリアルタイム同時通訳AIが実用レベルに到達。言語習得の必要性が問われ始め、人類の多言語コミュニケーション史上最大の転換点となる可能性がある。', category: '発明・伝播', subcategory: '文字・言語', keywords: ['AI翻訳', 'リアルタイム翻訳', '言語バリア', '同時通訳'], era: '現代' },`

// Parse new event lines
const newLines = newEvents.split('\n').filter(l => l.trimStart().startsWith('{ id:'))

// Extract existing 発明・伝播 events from file
const isEventLine = l => l.trimStart().startsWith('{ id:')
const getYear = l => { const m = l.match(/year:\s*(-?\d+)/); return m ? parseInt(m[1]) : 0 }
const getCategory = l => l.match(/category:\s*'([^']+)'/)?.[1]

const existingEvents = lines.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播')
console.log('Existing 発明・伝播 events:', existingEvents.length)
console.log('New events:', newLines.length)

// Merge and sort
const allEvents = [...existingEvents, ...newLines]
const sorted = [...allEvents].sort((a, b) => getYear(a) - getYear(b))
console.log('Total after merge:', sorted.length)

// Find section header line index
const sectionIdx = lines.findIndex(l => l.includes('// ── 発明・伝播'))
console.log('発明・伝播 section at line:', sectionIdx + 1)

// Find the end of 発明・伝播 section (next section header)
let sectionEnd = lines.findIndex((l, i) => i > sectionIdx && l.match(/^\s*\/\/ ── /))
console.log('Next section at line:', sectionEnd + 1)

// Build output
const output = [
  ...lines.slice(0, sectionIdx),
  `  // ── 発明・伝播 (${sorted.length}件・年代順) ─────────────────────────`,
  ...sorted,
  ...lines.slice(sectionEnd)
]

console.log('Output lines:', output.length)
import { writeFileSync as wfs } from 'fs'
wfs(filePath, output.join('\n'), 'utf-8')

// Verify
const finalCount = output.filter(l => isEventLine(l) && getCategory(l) === '発明・伝播').length
console.log('発明・伝播 events in output:', finalCount)
console.log('Done.')
