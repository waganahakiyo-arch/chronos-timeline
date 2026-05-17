'use client'

import { useState } from 'react'
import Link from 'next/link'

const EXAMPLES = [
  {
    label: '最小構成（必須項目のみ）',
    desc: 'year（年）と title（タイトル）だけで登録できます。',
    json: JSON.stringify(
      [
        { year: 1603, title: '江戸幕府の開府' },
        { year: 1868, title: '明治維新' },
      ],
      null, 2
    ),
  },
  {
    label: '全項目あり（1件）',
    desc: 'すべての項目を指定した例です。',
    json: JSON.stringify(
      [
        {
          year: 1853,
          title: 'ペリー来航',
          description: 'マシュー・ペリーが率いるアメリカ艦隊が浦賀に来航。日本の開国を求めた。',
          keywords: ['ペリー', '黒船', '開国'],
          wiki_url: 'https://ja.wikipedia.org/wiki/%E3%83%9A%E3%83%AA%E3%83%BC%E3%81%AE%E6%97%A5%E6%9C%AC%E9%81%A0%E5%BE%81',
          event_date: '1853/07/08 00:00',
          era: '幕末',
        },
      ],
      null, 2
    ),
  },
  {
    label: '複数件（混在）',
    desc: '必須のみの件と任意項目ありの件を混在させた例です。',
    json: JSON.stringify(
      [
        {
          year: 1941,
          title: '太平洋戦争勃発',
          era: '昭和',
        },
        {
          year: 1945,
          title: '終戦',
          description: '玉音放送により日本が無条件降伏を受け入れ、太平洋戦争が終結。',
          keywords: ['玉音放送', '終戦', 'GHQ'],
          event_date: '1945/08/15 12:00',
          era: '昭和',
        },
        {
          year: 1964,
          title: '東京オリンピック開催',
          era: '昭和',
        },
      ],
      null, 2
    ),
  },
]

function CopyBlock({ json, label, desc }: { json: string; label: string; desc: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-sepia-700/40 rounded-sm overflow-hidden">
      <div className="flex items-start justify-between px-4 py-2.5 bg-ink-800/60 border-b border-sepia-700/30">
        <div>
          <p className="text-paper-200 text-xs font-bold tracking-wider">{label}</p>
          <p className="text-sepia-500 text-[10px] mt-0.5">{desc}</p>
        </div>
        <button
          onClick={handleCopy}
          className={`flex-shrink-0 ml-4 px-3 py-1 text-[10px] tracking-wider border rounded-sm transition-colors ${
            copied
              ? 'border-green-600/50 text-green-400 bg-green-900/20'
              : 'border-sepia-600/50 text-sepia-400 hover:border-vermilion/40 hover:text-vermilion'
          }`}
        >
          {copied ? '✓ コピー済み' : 'コピー'}
        </button>
      </div>
      <pre className="px-4 py-3 text-[11px] text-sepia-300 leading-relaxed overflow-x-auto bg-ink-950/60">
        {json}
      </pre>
    </div>
  )
}

export default function ImportFormatPage() {
  return (
    <div className="min-h-screen bg-ink-900">
      <header className="flex items-center justify-between px-6 py-3 bg-ink-950 border-b border-sepia-700/30">
        <div className="flex items-center gap-4">
          <span className="text-vermilion text-xl select-none">✦</span>
          <Link href="/app" className="text-lg font-bold tracking-widest text-paper-100 hover:text-paper-50 transition-colors">
            年代記
          </Link>
          <span className="text-sepia-600 text-xs tracking-wider hidden sm:block">インポートフォーマット</span>
        </div>
        <Link href="/app" className="text-sepia-300 hover:text-paper-100 text-sm tracking-wider transition-colors">
          ← 年表作成に戻る
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-xl font-bold tracking-widest text-paper-100 mb-2">独自イベント インポートフォーマット</h1>
          <p className="text-sepia-400 text-sm">
            JSON形式のファイル（.json）を用意してインポートしてください。
          </p>
        </div>

        {/* フィールド一覧 */}
        <section>
          <h2 className="text-sm font-bold tracking-wider text-paper-200 mb-4 pb-2 border-b border-sepia-700/30">フィールド一覧</h2>
          <div className="space-y-2">
            {[
              { name: 'year', type: '数値', req: true,  desc: '西暦年。負の値（例: -500）も可。' },
              { name: 'title', type: '文字列', req: true,  desc: 'イベント名。' },
              { name: 'description', type: '文字列', req: false, desc: 'イベントの説明文。省略時は null。' },
              { name: 'keywords', type: '文字列の配列', req: false, desc: 'キーワード。例: ["戦争", "明治"]。省略時は null。' },
              { name: 'wiki_url', type: '文字列', req: false, desc: 'Wikipedia等のURL。省略時は null。' },
              { name: 'event_date', type: '文字列', req: false, desc: '日時。形式: "YYYY/MM/DD HH:mm"（例: "1853/07/08 00:00"）。省略時は null。' },
              { name: 'era', type: '文字列', req: false, desc: '時代区分。例: "明治" "昭和" "古代" など。省略時は null。' },
            ].map(f => (
              <div key={f.name} className="flex items-start gap-3 px-3 py-2 bg-ink-800/40 rounded-sm border border-sepia-700/20">
                <code className="text-green-400 text-xs font-mono flex-shrink-0 w-24">{f.name}</code>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm flex-shrink-0 ${f.req ? 'bg-vermilion/20 text-vermilion border border-vermilion/30' : 'bg-sepia-700/30 text-sepia-400 border border-sepia-600/30'}`}>
                  {f.req ? '必須' : '任意'}
                </span>
                <span className="text-sepia-500 text-[10px] flex-shrink-0">{f.type}</span>
                <span className="text-sepia-300 text-xs">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* サンプル */}
        <section>
          <h2 className="text-sm font-bold tracking-wider text-paper-200 mb-4 pb-2 border-b border-sepia-700/30">サンプル（コピーして使用可）</h2>
          <div className="space-y-4">
            {EXAMPLES.map(ex => (
              <CopyBlock key={ex.label} label={ex.label} desc={ex.desc} json={ex.json} />
            ))}
          </div>
        </section>

        {/* 注意事項 */}
        <section className="text-xs text-sepia-500 space-y-1 border-t border-sepia-700/20 pt-6">
          <p>・ファイル拡張子は <code className="text-sepia-300">.json</code> にしてください。</p>
          <p>・配列の形式（<code className="text-sepia-300">[...]</code>）である必要があります。</p>
          <p>・<code className="text-sepia-300">year</code> と <code className="text-sepia-300">title</code> は必須です。どちらかが欠けているとインポートに失敗します。</p>
          <p>・エクスポートしたファイルはそのままインポートできます。</p>
        </section>
      </div>
    </div>
  )
}
