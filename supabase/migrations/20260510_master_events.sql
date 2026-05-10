-- master_events テーブル
-- Wikidata から収集した歴史イベントを格納する

CREATE TABLE IF NOT EXISTS master_events (
  id              TEXT PRIMARY KEY,          -- Wikidata QID (例: Q12345)
  year            INTEGER NOT NULL,
  title           TEXT NOT NULL,             -- 日本語タイトル
  description     TEXT,                      -- 日本語説明文
  category        TEXT NOT NULL,             -- 日本の歴史 / ヨーロッパの歴史 / etc.
  era             TEXT,                      -- 縄文弥生 / 江戸 / 現代 / etc.
  keywords        TEXT[],                    -- 現在の国名・地名・人物など
  wiki_url        TEXT,                      -- 日本語 Wikipedia URL
  wikidata_id     TEXT UNIQUE NOT NULL,      -- Wikidata QID (id と同値、検索用)
  source          TEXT NOT NULL DEFAULT 'wikidata',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS master_events_category_idx ON master_events(category);
CREATE INDEX IF NOT EXISTS master_events_year_idx     ON master_events(year);
CREATE INDEX IF NOT EXISTS master_events_era_idx      ON master_events(era);
CREATE INDEX IF NOT EXISTS master_events_keywords_idx ON master_events USING GIN(keywords);

-- キーワード全文検索用（タイトル + 説明文）
CREATE INDEX IF NOT EXISTS master_events_fts_idx ON master_events
  USING GIN(to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, '')));

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER master_events_updated_at
  BEFORE UPDATE ON master_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: 読み取りは全員OK、書き込みは service_role のみ
ALTER TABLE master_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "master_events_select" ON master_events
  FOR SELECT USING (true);

-- service_role は RLS をバイパスするため INSERT/UPDATE/DELETE ポリシー不要
