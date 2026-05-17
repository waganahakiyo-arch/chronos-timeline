/**
 * Wikidata SPARQL クエリ定義
 *
 * 改善点:
 *   - P585（時点）と P580（開始日）を UNION で両対応
 *   - SERVICE wikibase:label で ja,en フォールバック
 *   - 選挙・地震・条約・クーデター等の追加タイプ
 *   - グローバルクエリ（国フィルターなし）を追加
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
SELECT ?event (YEAR(?date) AS ?year) ?eventLabel WHERE {
  ${whereClause}
  { ?event wdt:P585 ?date } UNION { ?event wdt:P580 ?date . FILTER NOT EXISTS { ?event wdt:P585 [] } }
  FILTER(YEAR(?date) >= ${yearFrom} && YEAR(?date) <= ${yearTo})
  SERVICE wikibase:label { bd:serviceParam wikibase:language "ja,en" }
}
ORDER BY ?year
LIMIT ${limit}
`
}

// ── 共通タイプリスト ────────────────────────────────────────────────
// 歴史的出来事として有意義なタイプ
const COMMON_TYPES = `
    wd:Q198 wd:Q132821 wd:Q13418847 wd:Q350604
    wd:Q178561 wd:Q7735147 wd:Q2912397
    wd:Q3882219 wd:Q2001305 wd:Q625994
    wd:Q16466660 wd:Q1190554 wd:Q40231
    wd:Q7944 wd:Q131569 wd:Q45382
    wd:Q3199915 wd:Q124757 wd:Q49776
    wd:Q188055 wd:Q8068 wd:Q171558
`

// ── カテゴリごとの WHERE 句 ──────────────────────────────────────────

const JAPAN_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
${COMMON_TYPES}
    wd:Q12890393
  }
  ?event wdt:P17 wd:Q17 .
`

const EUROPE_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
${COMMON_TYPES}
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
${COMMON_TYPES}
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
${COMMON_TYPES}
  }
  ?event wdt:P17 ?country .
  VALUES ?country { wd:Q29520 wd:Q865 wd:Q148 }
`

const KOREA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
${COMMON_TYPES}
  }
  ?event wdt:P17 ?country .
  VALUES ?country { wd:Q884 wd:Q423 }
`

const SOUTH_ASIA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
${COMMON_TYPES}
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q668 wd:Q902 wd:Q837 wd:Q854
  }
`

const SOUTHEAST_ASIA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
${COMMON_TYPES}
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
${COMMON_TYPES}
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
${COMMON_TYPES}
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q159 wd:Q212 wd:Q184 wd:Q232 wd:Q265
    wd:Q227 wd:Q230
  }
`

const AFRICA_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
${COMMON_TYPES}
  }
  ?event wdt:P17 ?country .
  VALUES ?country {
    wd:Q1028 wd:Q115 wd:Q117 wd:Q916 wd:Q1016
    wd:Q1049 wd:Q1030 wd:Q1032 wd:Q1033 wd:Q1008
    wd:Q1006 wd:Q1007 wd:Q1013 wd:Q1014 wd:Q1019
    wd:Q1020 wd:Q1023 wd:Q1024 wd:Q1025 wd:Q1029
    wd:Q1031 wd:Q1034 wd:Q1038 wd:Q1039 wd:Q1040
    wd:Q1041 wd:Q1042 wd:Q1044 wd:Q1045 wd:Q953
  }
`

// ── グローバルクエリ（国フィルターなし） ──────────────────────────

const GLOBAL_CONFLICT_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q178561 wd:Q198 wd:Q132821 wd:Q188055
    wd:Q13418847 wd:Q3882219 wd:Q3199915
  }
`

const GLOBAL_POLITICS_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q40231 wd:Q45382 wd:Q131569
    wd:Q2001305 wd:Q350604
  }
`

const GLOBAL_DISASTER_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q7944 wd:Q8068 wd:Q8065 wd:Q168247
    wd:Q171558 wd:Q179057 wd:Q7692
  }
`

const GLOBAL_SOCIETY_WHERE = `
  ?event wdt:P31 ?type .
  VALUES ?type {
    wd:Q124757 wd:Q49776 wd:Q1190554
    wd:Q625994 wd:Q149086
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
    { name: 'アフリカの歴史',               query: buildQuery(AFRICA_WHERE,         yearFrom, yearTo) },
    { name: '世界の戦争・紛争',             query: buildQuery(GLOBAL_CONFLICT_WHERE, yearFrom, yearTo) },
    { name: '世界の政治',                   query: buildQuery(GLOBAL_POLITICS_WHERE, yearFrom, yearTo) },
    { name: '世界の天災',                   query: buildQuery(GLOBAL_DISASTER_WHERE, yearFrom, yearTo) },
    { name: '世界の社会運動',               query: buildQuery(GLOBAL_SOCIETY_WHERE,  yearFrom, yearTo) },
  ]
}

// 後方互換（固定エクスポート）
export const JAPAN_QUERY       = buildQuery(JAPAN_WHERE,       -3000, 2030)
export const EUROPE_QUERY      = buildQuery(EUROPE_WHERE,      -3000, 2030)
export const MIDDLE_EAST_QUERY = buildQuery(MIDDLE_EAST_WHERE, -3000, 2030)
export const CHINA_QUERY       = buildQuery(CHINA_WHERE,       -3000, 2030)
