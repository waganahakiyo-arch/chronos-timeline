/**
 * Wikidata SPARQL クエリ定義
 * 各カテゴリの歴史イベントを取得する
 */

export const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'

/** 共通 SPARQL ヘルパー：年・タイトル・説明・Wikipedia URL・国名を取得 */
function buildQuery(whereClause: string, limit = 50000): string {
  return `
SELECT DISTINCT
  ?event
  ?eventLabel
  ?eventDescription
  (YEAR(?date) AS ?year)
  ?article
  (GROUP_CONCAT(DISTINCT ?countryLabel; SEPARATOR=",") AS ?countries)
WHERE {
  ${whereClause}

  ?event wdt:P585 | wdt:P571 | wdt:P580 ?date .
  FILTER(YEAR(?date) >= -3000 && YEAR(?date) <= 2030)

  # 日本語ラベルがあるもののみ
  ?event rdfs:label ?eventLabel .
  FILTER(LANG(?eventLabel) = "ja")

  # 説明文（任意）
  OPTIONAL {
    ?event schema:description ?eventDescription .
    FILTER(LANG(?eventDescription) = "ja")
  }

  # 日本語 Wikipedia リンク（任意）
  OPTIONAL {
    ?article schema:about ?event .
    ?article schema:isPartOf <https://ja.wikipedia.org/> .
  }

  # 現在の国名（任意）
  OPTIONAL {
    ?event wdt:P17 ?country .
    ?country rdfs:label ?countryLabel .
    FILTER(LANG(?countryLabel) = "ja")
  }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "ja" }
}
GROUP BY ?event ?eventLabel ?eventDescription ?date ?article
LIMIT ${limit}
`
}

/** 日本の歴史 */
export const JAPAN_QUERY = buildQuery(`
  ?event wdt:P31/wdt:P279* ?type .
  VALUES ?type {
    wd:Q198       # war
    wd:Q132821    # battle
    wd:Q13418847  # historical event
    wd:Q350604    # armed conflict
    wd:Q178561    # battle
    wd:Q831663    # political party founding
    wd:Q7735147   # revolution
    wd:Q2912397   # coup d'état
    wd:Q3882219   # natural disaster
    wd:Q8065      # natural disaster
  }
  ?event wdt:P17 wd:Q17 .  # 日本
`)

/** ヨーロッパの歴史 */
export const EUROPE_QUERY = buildQuery(`
  ?event wdt:P31/wdt:P279* ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
  }
  ?event wdt:P17 ?country .
  # ヨーロッパの国（大陸: Q46）
  ?country wdt:P30 wd:Q46 .
`)

/** 中東の歴史 */
export const MIDDLE_EAST_QUERY = buildQuery(`
  ?event wdt:P31/wdt:P279* ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q79    # エジプト
    wd:Q794   # イラン
    wd:Q796   # イラク
    wd:Q801   # イスラエル
    wd:Q858   # シリア
    wd:Q878   # アラブ首長国連邦
    wd:Q805   # サウジアラビア
    wd:Q810   # ヨルダン
    wd:Q822   # レバノン
    wd:Q843   # パキスタン
    wd:Q833   # マレーシア
    wd:Q977   # バーレーン
    wd:Q783   # ホンジュラス
    wd:Q399   # アルメニア
    wd:Q244   # トルコ
  }
`)

/** 中国の歴史 */
export const CHINA_QUERY = buildQuery(`
  ?event wdt:P31/wdt:P279* ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397 wd:Q3882219
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q29520  # 中国
    wd:Q865    # 台湾
    wd:Q148    # 中華人民共和国
  }
`)
