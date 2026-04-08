# 年代記 — Chronos Timeline

漆黒×古紙色の和風デザインで歴史を刻む、Next.js + Supabase 製年表 Web サービス。

## 機能

- メール認証でログイン／新規登録
- 歴史事件（18件）をクリックして自分の年表に追加
- カテゴリ（政治・文化・経済・技術・外交）でフィルタリング
- 年表を保存・公開/非公開切り替え
- 公開年表の一覧表示

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (認証 + PostgreSQL)

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. Supabase の準備

`SUPABASE_SETUP.md` を参照して、Supabase プロジェクトとテーブルを作成してください。

### 3. 環境変数の設定

`.env.local` を編集して、Supabase の URL と anon key を設定します。

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## 画面構成

| パス | 説明 |
|---|---|
| `/` | ログイン・新規登録 |
| `/app` | 年表エディタ（メイン画面） |
| `/timelines` | 年表一覧（自分の年表＋公開年表） |

## プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx          # Noto Serif JP フォント設定
│   ├── page.tsx            # ログインページ
│   ├── app/page.tsx        # 年表エディタ
│   └── timelines/page.tsx  # 年表一覧
├── components/
│   ├── auth/AuthForm.tsx               # ログイン・登録フォーム
│   ├── app/AppPageClient.tsx           # 年表エディタ（クライアント）
│   └── timelines/TimelinesPageClient.tsx # 年表一覧（クライアント）
├── data/events.ts          # 歴史事件データ（18件）
├── lib/supabase/
│   ├── client.ts           # ブラウザ用 Supabase クライアント
│   └── server.ts           # サーバー用 Supabase クライアント
├── middleware.ts            # 認証ミドルウェア（ルート保護）
└── types/index.ts          # TypeScript 型定義
```
