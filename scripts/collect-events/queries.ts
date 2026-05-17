/**
 * Wikidata SPARQL クエリ定義
 *
 * タイムアウト対策のため軽量構成を維持：
 *   - wdt:P31 のみ（P279* なし）
 *   - OPTIONAL/GROUP_CONCAT/SERVICE wikibase:label なし
 *   - 取得フィールドは event / year / label のみ
 */

export const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'

/** 年範囲・上限を指定してクエリを生成 */
export function buildQuery(
  whereClause: string,
  yearFrom: number,
  yearTo: number,
  limit = 5000
): string {
  return `
SELECT ?event (YEAR(?date) AS ?year) ?label WHERE {
  ${whereClause}
  ?event wdt:P585 ?date .
  FILTER(YEAR(?date) >= ${yearFrom} && YEAR(?date) <= ${yearTo})
  ?event rdfs:label ?label .
  FILTER(LANG(?label) = "ja")
}
ORDER BY ?year
LIMIT ${limit}
`
}

// ── カテゴリごとの WHERE 句 ──────────────────────────────────────────

const JAPAN_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q3882219 wd:Q2001305 wd:Q625994
    wd:Q16466660 wd:Q1190554
  }
  ?event wdt:P17 wd:Q17 .
`

const EUROPE_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305 wd:Q625994
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q145 wd:Q142 wd:Q183 wd:Q38 wd:Q29
    wd:Q31  wd:Q55  wd:Q35  wd:Q34 wd:Q33
    wd:Q20  wd:Q40  wd:Q36  wd:Q28 wd:Q218
    wd:Q219 wd:Q214 wd:Q213 wd:Q191 wd:Q211
    wd:Q37  wd:Q39  wd:Q45  wd:Q189 wd:Q41
    wd:Q403 wd:Q236 wd:Q224 wd:Q225
  }
`

const MIDDLE_EAST_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q79 wd:Q794 wd:Q796 wd:Q801
    wd:Q858 wd:Q805 wd:Q810 wd:Q822
    wd:Q843 wd:Q399 wd:Q244 wd:Q977
  }
`

const CHINA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397 wd:Q3882219
  }
  ?event wdt:P17 ?country .
  VALUES ?country { wd:Q29520 wd:Q865 wd:Q148 }
`

const KOREA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305 wd:Q625994
  }
  ?event wdt:P17 ?country .
  VALUES ?country { wd:Q884 wd:Q423 }
`

const SOUTH_ASIA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305 wd:Q625994
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q668 wd:Q902 wd:Q837 wd:Q854
  }
`

const SOUTHEAST_ASIA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q881 wd:Q869 wd:Q252 wd:Q928 wd:Q836
    wd:Q424 wd:Q819 wd:Q833 wd:Q334 wd:Q408 wd:Q664
  }
`

const AMERICAS_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305 wd:Q625994
    wd:Q3882219
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q30 wd:Q16 wd:Q96 wd:Q155 wd:Q414
    wd:Q298 wd:Q419 wd:Q739 wd:Q717 wd:Q241
  }
`

const RUSSIA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q1190554 wd:Q2001305 wd:Q625994
    wd:Q3882219
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q159 wd:Q212 wd:Q184 wd:Q232 wd:Q265
    wd:Q227 wd:Q230
  }
`

/** 年範囲を指定して全カテゴリのクエリを生成 */
export function makeQueries(yearFrom: number, yearTo: number) {
  return [
    { name: '日本の歴史',                   query: buildQuery(JAPAN_WHERE,          yearFrom, yearTo) },
    { name: 'ヨーロッパの歴史',             query: buildQuery(EUROPE_WHERE,         yearFrom, yearTo) },
    { name: '中東の歴史',                   query: buildQuery(MIDDLE_EAST_WHERE,    yearFrom, yearTo) },
    { name: '中国の歴史',                   query: buildQuery(CHINA_WHERE,          yearFrom, yearTo) },
    { name: '韓国・朝鮮の歴史',             query: buildQuery(KOREA_WHERE,          yearFrom, yearTo) },
    { name: '南アジアの歴史',               query: buildQuery(SOUTH_ASIA_WHERE,     yearFrom, yearTo) },
    { name: '東南アジア・オセアニアの歴史', query: buildQuery(SOUTHEAST_ASIA_WHERE, yearFrom, yearTo) },
    { name: 'アメリカ大陸の歴史',           query: buildQuery(AMERICAS_WHERE,       yearFrom, yearTo) },
    { name: 'ロシア・中央アジアの歴史',     query: buildQuery(RUSSIA_WHERE,         yearFrom, yearTo) },
  ]
}

// 後方互換（固定エクスポート）
export const JAPAN_QUERY       = buildQuery(JAPAN_WHERE,       -3000, 2030)
export const EUROPE_QUERY      = buildQuery(EUROPE_WHERE,      -3000, 2030)
export const MIDDLE_EAST_QUERY = buildQuery(MIDDLE_EAST_WHERE, -3000, 2030)
export const CHINA_QUERY       = buildQuery(CHINA_WHERE,       -3000, 2030)
