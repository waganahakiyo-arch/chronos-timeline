/**
 * Wikidata SPARQL クエリ定義（軽量版）
 *
 * タイムアウト対策のため以下を意図的に省略：
 *   - GROUP_CONCAT（国名集約）
 *   - OPTIONAL（説明文・Wikipedia URL）
 *   - DISTINCT
 *   - P279*（推移的サブクラス）
 *   - SERVICE wikibase:label
 *
 * 取得するのは id・年・タイトルのみ。説明文等は将来の別クエリで補完。
 */

export const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'

function buildQuery(whereClause: string, limit = 10000): string {
  return `
SELECT ?event (YEAR(?date) AS ?year) ?label WHERE {
  ${whereClause}

  ?event wdt:P585 ?date .
  FILTER(YEAR(?date) >= -500 && YEAR(?date) <= 2030)

  ?event rdfs:label ?label .
  FILTER(LANG(?label) = "ja")
}
ORDER BY ?year
LIMIT ${limit}
`
}

/** 日本の歴史 */
export const JAPAN_QUERY = buildQuery(`
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198       # war
    wd:Q132821    # battle
    wd:Q13418847  # historical event
    wd:Q350604    # armed conflict
    wd:Q7735147   # revolution
    wd:Q2912397   # coup d'état
    wd:Q3882219   # natural disaster
    wd:Q2001305   # treaty
  }
  ?event wdt:P17 wd:Q17 .
`)

/** ヨーロッパの歴史（主要国を明示列挙してコンチネント結合を回避） */
export const EUROPE_QUERY = buildQuery(`
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q7735147 wd:Q2912397 wd:Q2001305
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q145  # イギリス
    wd:Q142  # フランス
    wd:Q183  # ドイツ
    wd:Q38   # イタリア
    wd:Q29   # スペイン
    wd:Q31   # ベルギー
    wd:Q55   # オランダ
    wd:Q35   # デンマーク
    wd:Q34   # スウェーデン
    wd:Q33   # フィンランド
    wd:Q20   # ノルウェー
    wd:Q40   # オーストリア
    wd:Q36   # ポーランド
    wd:Q28   # ハンガリー
    wd:Q218  # ルーマニア
    wd:Q219  # ブルガリア
    wd:Q214  # スロバキア
    wd:Q213  # チェコ
    wd:Q191  # エストニア
    wd:Q211  # ラトビア
    wd:Q37   # リトアニア
    wd:Q39   # スイス
    wd:Q45   # ポルトガル
    wd:Q189  # アイスランド
    wd:Q41   # ギリシャ
    wd:Q403  # セルビア
    wd:Q236  # モンテネグロ
    wd:Q224  # クロアチア
    wd:Q225  # ボスニア・ヘルツェゴビナ
  }
`)

/** 中東の歴史 */
export const MIDDLE_EAST_QUERY = buildQuery(`
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q7735147 wd:Q2912397 wd:Q2001305
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q79   wd:Q794  wd:Q796  wd:Q801
    wd:Q858  wd:Q805  wd:Q810  wd:Q822
    wd:Q843  wd:Q399  wd:Q244  wd:Q977
  }
`)

/** 中国の歴史 */
export const CHINA_QUERY = buildQuery(`
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q7735147 wd:Q2912397 wd:Q3882219
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q29520 wd:Q865 wd:Q148
  }
`)
