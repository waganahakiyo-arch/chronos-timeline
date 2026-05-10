/**
 * 年 → 時代区分マッピング（日本史ベース、世界史は近似）
 */

export type Era =
  | '縄文弥生' | '古墳' | '飛鳥奈良' | '平安' | '鎌倉' | '室町'
  | '安土桃山' | '江戸' | '幕末' | '明治' | '大正' | '昭和'
  | '平成' | '令和' | '古代' | '中世' | '近世' | '近代' | '現代'

/**
 * 年から時代区分を返す
 * - 日本の歴史カテゴリ: 日本史の時代区分
 * - その他: 世界史の大区分
 */
export function getEra(year: number, category: string): Era {
  if (category === '日本の歴史') {
    if (year < 300)   return '縄文弥生'
    if (year < 593)   return '古墳'
    if (year < 794)   return '飛鳥奈良'
    if (year < 1185)  return '平安'
    if (year < 1336)  return '鎌倉'
    if (year < 1573)  return '室町'
    if (year < 1603)  return '安土桃山'
    if (year < 1854)  return '江戸'
    if (year < 1868)  return '幕末'
    if (year < 1912)  return '明治'
    if (year < 1926)  return '大正'
    if (year < 1989)  return '昭和'
    if (year < 2019)  return '平成'
    return '令和'
  }

  // 世界史共通
  if (year < -500)  return '古代'
  if (year < 500)   return '古代'
  if (year < 1500)  return '中世'
  if (year < 1800)  return '近世'
  if (year < 1945)  return '近代'
  return '現代'
}

/** Wikidata の結果行 */
export interface WikidataRow {
  event: { value: string }         // URI: http://www.wikidata.org/entity/QID
  eventLabel: { value: string }
  eventDescription?: { value: string }
  year: { value: string }
  article?: { value: string }      // 日本語 Wikipedia URL
  countries?: { value: string }    // カンマ区切り国名
}

export interface MasterEvent {
  id: string
  year: number
  title: string
  description: string | null
  category: string
  era: string
  keywords: string[]
  wiki_url: string | null
  wikidata_id: string
}

/** Wikidata 行を MasterEvent に変換 */
export function toMasterEvent(row: WikidataRow, category: string): MasterEvent | null {
  const year = parseInt(row.year.value, 10)
  if (isNaN(year)) return null

  const title = row.eventLabel.value.trim()
  if (!title) return null

  // QID を抽出
  const qid = row.event.value.replace('http://www.wikidata.org/entity/', '')
  if (!qid.startsWith('Q')) return null

  // キーワード：国名（重複除去・空除去）
  const keywords = row.countries
    ? Array.from(new Set(
        row.countries.value
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0 && s.length < 30)
      ))
    : []

  const wikiUrl = row.article?.value ?? null

  return {
    id: qid,
    year,
    title,
    description: row.eventDescription?.value?.trim() ?? null,
    category,
    era: getEra(year, category),
    keywords,
    wiki_url: wikiUrl,
    wikidata_id: qid,
  }
}
