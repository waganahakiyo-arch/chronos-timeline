export type Category = '日本の歴史' | '文化' | '経済' | '技術' | '外交' | '天災' | '人物' | '発明・伝播' | '創作物' | '任天堂の歴史'
  | 'カプコンの歴史'
  | 'SNKの歴史'
  | 'ベストセラー小説'
  | 'ヒット漫画'
  | 'ヒットソング'
  | 'ヒット映画'
  | 'ヨーロッパの歴史'
  | '中東の歴史'
  | '中国の歴史'
  | '韓国・朝鮮の歴史'
  | '南アジアの歴史'
  | '東南アジア・オセアニアの歴史'
  | 'アメリカ大陸の歴史'
  | 'ロシア・中央アジアの歴史'
  | 'アフリカの歴史'
  | '世界の戦争・紛争'
  | '世界の政治'
  | '世界の天災'
  | '世界の社会運動'
  | '独自イベント'

export type Era =
  | '縄文弥生'
  | '古墳'
  | '飛鳥奈良'
  | '平安'
  | '鎌倉'
  | '室町'
  | '安土桃山'
  | '江戸'
  | '幕末'
  | '明治'
  | '大正'
  | '昭和'
  | '平成'
  | '令和'
  | '古代'
  | '中世'
  | '近世'
  | '近代'
  | '現代'

export interface HistoricalEvent {
  id: string
  year: number
  title: string
  description?: string
  category: Category
  keywords?: string[]
  era: Era
  wikiUrl?: string
}

export interface Timeline {
  id: string
  user_id: string
  name: string
  is_public: boolean
  public_until: string | null
  created_at: string
}

export interface UserEvent {
  id: string
  user_id: string
  year: number
  title: string
  description: string | null
  keywords: string[] | null
  wiki_url: string | null
  event_date: string | null
  era: string | null
  created_at: string
}

export interface TimelineEvent {
  id: string
  timeline_id: string
  year: number
  title: string
  description: string | null
  category: string | null
  era: string | null
  keywords: string[] | null
  wiki_url: string | null
  event_date: string | null   // "YYYY/MM/DD HH:mm" カスタムイベント用
  created_at: string
}
