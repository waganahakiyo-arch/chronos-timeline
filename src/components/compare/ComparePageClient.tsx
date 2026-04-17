'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CATEGORY_COLORS } from '@/data/events'
import type { Timeline, TimelineEvent, Category } from '@/types'

type TimelineWithEvents = Timeline & { events: TimelineEvent[] }

// ─── タイトルから年月日を解析 ───────────────────────────────────────
// sortValue = year*10000 + month*100 + day (月のみの場合 day=0)
// event_date ("YYYY/MM/DD HH:mm") も参照して month/day/time を補完
function parseEventDate(title: string, year: number, event_date?: string | null): {
  month: number | null
  day: number | null
  time: string | null
  sortValue: number
  label: string
} {
  const fullMatch = title.match(/^(\d+)月(\d+)日/)
  if (fullMatch) {
    const month = parseInt(fullMatch[1])
    const day = parseInt(fullMatch[2])
    const time = event_date ? event_date.slice(11, 16) || null : null
    return { month, day, time, sortValue: year * 10000 + month * 100 + day, label: `${year}年` }
  }
  const monthOnly = title.match(/^(\d+)月/)
  if (monthOnly) {
    const month = parseInt(monthOnly[1])
    const time = event_date ? event_date.slice(11, 16) || null : null
    return { month, day: null, time, sortValue: year * 10000 + month * 100, label: `${year}年` }
  }
  // タイトルに日付パターンがない場合、event_date から月日を補完
  if (event_date && event_date.length >= 10) {
    const parts = event_date.split('/')
    if (parts.length === 3) {
      const month = parseInt(parts[1])
      const day = parseInt(parts[2].slice(0, 2))
      const time = event_date.slice(11, 16) || null
      return { month, day, time, sortValue: year * 10000 + month * 100 + day, label: `${year}年` }
    }
  }
  return { month: null, day: null, time: null, sortValue: year * 10000, label: `${year}年` }
}

// ─── 列ヘッダーの色（最大6本まで） ────────────────────────────────
const COLUMN_COLORS = [
  { border: 'border-green-500/50', text: 'text-green-300', bg: 'bg-green-900/20' },
  { border: 'border-blue-500/50',  text: 'text-blue-300',  bg: 'bg-blue-900/20' },
  { border: 'border-vermilion/50', text: 'text-vermilion', bg: 'bg-vermilion/10' },
  { border: 'border-purple-500/50',text: 'text-purple-300',bg: 'bg-purple-900/20' },
  { border: 'border-yellow-500/50',text: 'text-yellow-300',bg: 'bg-yellow-900/20' },
  { border: 'border-teal-500/50',  text: 'text-teal-300',  bg: 'bg-teal-900/20' },
]

export default function ComparePageClient() {
  const router = useRouter()
  const supabase = createClient()

  const [userId, setUserId] = useState<string | null>(null)
  const [timelines, setTimelines] = useState<TimelineWithEvents[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showCategory, setShowCategory] = useState(true)
  const [dateFormat, setDateFormat] = useState<1|2|3>(1)
  const [showPrintDialog, setShowPrintDialog] = useState(false)
  const [printOpt, setPrintOpt] = useState<{ bg: 'dark' | 'light'; orientation: 'portrait' | 'landscape' }>({ bg: 'light', orientation: 'landscape' })
  // モバイル用サイドバー開閉
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      setUserId(user.id)
      await fetchTimelines(user.id)
      setLoading(false)
    })()
  }, [])

  const fetchTimelines = useCallback(async (uid: string) => {
    const { data: tlData } = await supabase
      .from('timelines')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
    if (!tlData) return

    const withEvents: TimelineWithEvents[] = await Promise.all(
      tlData.map(async tl => {
        const { data: evData } = await supabase
          .from('timeline_events')
          .select('*')
          .eq('timeline_id', tl.id)
          .order('year', { ascending: true })
        return { ...tl, events: evData ?? [] }
      })
    )
    setTimelines(withEvents)
  }, [supabase])

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    // モバイルでは選択後にサイドバーを閉じる
    if (window.innerWidth < 768) setSidebarOpen(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // 選択中の年表（選択順を保持）
  const selectedTimelines = selectedIds
    .map(id => timelines.find(tl => tl.id === id))
    .filter((tl): tl is TimelineWithEvents => tl != null)

  // 全選択年表のユニーク日付キーを昇順で集約
  // M/D形式(3)の場合は時刻ごとに別行にする
  const allDateKeys = (() => {
    const parsed = selectedTimelines.flatMap(tl =>
      tl.events.map(ev => parseEventDate(ev.title, ev.year, ev.event_date))
    )
    if (dateFormat === 3) {
      const map = new Map<string, ReturnType<typeof parseEventDate>>()
      for (const info of parsed) {
        const key = `${info.sortValue}:${info.time ?? ''}`
        if (!map.has(key)) map.set(key, info)
      }
      return Array.from(map.values()).sort((a, b) => {
        if (a.sortValue !== b.sortValue) return a.sortValue - b.sortValue
        const ta = a.time ? parseInt(a.time.replace(':', '')) : -1
        const tb = b.time ? parseInt(b.time.replace(':', '')) : -1
        return ta - tb
      })
    }
    return Array.from(
      parsed.reduce((map, info) => {
        const existing = map.get(info.sortValue)
        if (!existing || (info.time && !existing.time)) map.set(info.sortValue, info)
        return map
      }, new Map<number, ReturnType<typeof parseEventDate>>())
      .values()
    ).sort((a, b) => a.sortValue - b.sortValue)
  })()

  // 全選択年表の全イベントが独自イベントのみかどうか
  const allCustomEvents =
    selectedTimelines.length > 0 &&
    selectedTimelines.flatMap(tl => tl.events).every(ev => ev.category === '独自イベント')

  return (
    <>
    <style>{`
      @media print {
        @page { size: ${printOpt.orientation}; margin: 1.5cm 1cm; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .sticky { position: static !important; }
        .absolute.pointer-events-none { display: none !important; }
        tr { page-break-inside: avoid; }
      }
      ${printOpt.bg === 'dark' ? `
      @media print {
        body, html { background: #0f0e0d !important; }
        .bg-ink-950 { background-color: #0a0806 !important; }
        .bg-ink-900 { background-color: #0f0e0d !important; }
        .bg-ink-800 { background-color: #1a1614 !important; }
        .bg-ink-800\\/80 { background-color: #1a1614 !important; }
        /* 基本テキスト */
        .text-paper-100 { color: #f5ebd8 !important; }
        .text-paper-200 { color: #ecd9be !important; }
        .text-sepia-300 { color: #9a7e60 !important; }
        .text-sepia-400 { color: #7a6248 !important; }
        .text-sepia-500 { color: #5e4a34 !important; }
        .text-sepia-600 { color: #4a3a28 !important; }
        .text-green-400 { color: #4ade80 !important; }
        .text-vermilion { color: #8b2020 !important; }
        /* COLUMN_COLORS テキスト */
        .text-green-300  { color: #86efac !important; }
        .text-blue-300   { color: #93c5fd !important; }
        .text-purple-300 { color: #d8b4fe !important; }
        .text-yellow-300 { color: #fde047 !important; }
        .text-teal-300   { color: #5eead4 !important; }
        /* カテゴリバッジ テキスト */
        .text-orange-300  { color: #fdba74 !important; }
        .text-rose-300    { color: #fda4af !important; }
        .text-indigo-300  { color: #a5b4fc !important; }
        .text-red-300     { color: #fca5a5 !important; }
        .text-red-200     { color: #fecaca !important; }
        .text-cyan-300    { color: #67e8f9 !important; }
        .text-amber-300   { color: #fcd34d !important; }
        .text-amber-200   { color: #fde68a !important; }
        .text-emerald-300 { color: #6ee7b7 !important; }
        .text-pink-300    { color: #f9a8d4 !important; }
        .text-fuchsia-300 { color: #f0abfc !important; }
        .text-sky-300     { color: #7dd3fc !important; }
        .text-violet-300  { color: #c4b5fd !important; }
      }` : ''}
      ${printOpt.bg === 'light' ? `
      @media print {
        body, html { background: #fff !important; color: #000 !important; }
        .bg-ink-950, .bg-ink-900, .bg-ink-800 { background-color: #fff !important; }
        [class*='border-sepia'] { border-color: #ccc !important; }
        .border-green-500\\/50, .border-blue-500\\/50, .border-purple-500\\/50,
        .border-yellow-500\\/50, .border-teal-500\\/50 { border-color: #999 !important; }
        * { color: #000 !important; }
      }` : ''}
    `}</style>
    <div className="flex flex-col h-screen overflow-hidden bg-ink-900 print:block print:h-auto print:overflow-visible">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-ink-950 border-b border-sepia-700/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* モバイル：サイドバートグル */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="md:hidden p-1.5 text-sepia-400 hover:text-paper-100 transition-colors"
            aria-label="年表を選択"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="2" y1="4" x2="16" y2="4"/>
              <line x1="2" y1="9" x2="16" y2="9"/>
              <line x1="2" y1="14" x2="16" y2="14"/>
            </svg>
          </button>
          <span className="text-vermilion text-xl select-none">✦</span>
          <h1 className="text-base md:text-lg font-bold tracking-widest text-paper-100">年代記</h1>
          <span className="text-sepia-600 text-xs tracking-wider hidden sm:block">年表比較</span>
          {selectedIds.length > 0 && (
            <span className="md:hidden text-sepia-500 text-xs">{selectedIds.length}件選択</span>
          )}
        </div>
        <nav className="flex items-center gap-3 md:gap-6 print:hidden">
          {selectedTimelines.length > 0 && (
            <button
              onClick={() => setShowPrintDialog(true)}
              className="px-3 py-1.5 text-xs tracking-wider border border-sepia-600/50 text-sepia-300 hover:border-paper-200/50 hover:text-paper-100 rounded-sm transition-colors"
            >
              PDF出力
            </button>
          )}
          <Link href="/app" className="text-sepia-300 hover:text-paper-100 text-xs md:text-sm tracking-wider transition-colors">
            年表を作る
          </Link>
          <Link href="/timelines" className="text-sepia-300 hover:text-paper-100 text-xs md:text-sm tracking-wider transition-colors">
            年表一覧
          </Link>
          <button onClick={signOut} className="text-sepia-400 hover:text-vermilion text-xs md:text-sm tracking-wider transition-colors">
            退出
          </button>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden print:block print:overflow-visible">
        {/* モバイル：サイドバー背景オーバーレイ */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ─── サイドバー：年表選択 ──────────────────────────────── */}
        <aside className={`
          ${sidebarOpen ? 'flex' : 'hidden'} md:flex flex-col
          fixed md:relative top-0 left-0 h-full md:h-auto
          z-50 md:z-auto
          w-72 md:w-56 flex-shrink-0
          bg-ink-800 border-r border-sepia-700/30
          overflow-y-auto print:hidden
        `}>
          <div className="px-4 py-3 border-b border-sepia-700/30 flex-shrink-0 flex items-center justify-between">
            <div>
              <p className="text-xs text-sepia-500 tracking-wider">年表を選択</p>
              <p className="text-sepia-600 text-xs mt-0.5">{selectedIds.length} 件選択中</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-sepia-500 hover:text-paper-100 text-lg leading-none p-1 transition-colors"
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>

          <div className="px-4 py-2.5 border-b border-sepia-700/30 flex-shrink-0">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showCategory}
                onChange={e => setShowCategory(e.target.checked)}
                className="w-3.5 h-3.5 accent-vermilion"
              />
              <span className="text-xs text-sepia-400">カテゴリを表示</span>
            </label>
          </div>

          <div className="px-4 py-2.5 border-b border-sepia-700/30 flex-shrink-0">
            <p className="text-[10px] text-sepia-500 tracking-wider mb-1.5">日付表示形式</p>
            <div className="flex gap-1">
              {([1, 2, 3] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setDateFormat(f)}
                  title={f === 1 ? 'YYYY形式' : f === 2 ? 'YYYY/MM/DD hh:mm形式' : 'MM/DD hh:mm形式'}
                  className={`flex-1 py-1 text-[10px] border rounded-sm transition-colors ${
                    dateFormat === f
                      ? 'border-sepia-600/60 bg-sepia-700/40 text-paper-200'
                      : 'border-sepia-700/30 text-sepia-500 hover:text-sepia-300'
                  }`}
                >
                  {f === 1 ? 'YYYY' : f === 2 ? 'Y/M/D' : 'M/D'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-2 space-y-1">
            {loading ? (
              <p className="text-sepia-600 text-xs px-2 py-4 text-center">読み込み中...</p>
            ) : timelines.length === 0 ? (
              <div className="text-center px-2 py-6">
                <p className="text-sepia-600 text-xs">年表がありません</p>
                <Link href="/app" className="mt-2 inline-block text-xs text-vermilion hover:text-vermilion-light transition-colors">
                  作成する →
                </Link>
              </div>
            ) : (
              timelines.map((tl, i) => {
                const selected = selectedIds.includes(tl.id)
                const colorIdx = selectedIds.indexOf(tl.id)
                const color = colorIdx >= 0 ? COLUMN_COLORS[colorIdx % COLUMN_COLORS.length] : null
                return (
                  <button
                    key={tl.id}
                    onClick={() => toggleSelect(tl.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-sm text-xs border transition-colors ${
                      selected && color
                        ? `${color.bg} ${color.border} ${color.text}`
                        : 'border-sepia-700/30 text-sepia-300 hover:bg-ink-700/60 hover:text-paper-200 hover:border-sepia-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {selected && color && (
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color.bg} border ${color.border}`} />
                      )}
                      <span className="font-medium truncate">{tl.name}</span>
                    </div>
                    <div className="text-sepia-600 mt-0.5 ml-0.5">{tl.events.length}件</div>
                  </button>
                )
              })
            )}
          </div>
        </aside>

        {/* ─── メイン：比較グリッド ──────────────────────────────── */}
        <main className="flex-1 overflow-auto print:overflow-visible print:block" style={{ WebkitOverflowScrolling: 'touch' }}>
          {selectedTimelines.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3 text-sepia-600">
                <p className="text-4xl">◎</p>
                <p className="text-sm tracking-wider hidden md:block">左のパネルから年表を選択してください</p>
                <p className="text-sm tracking-wider md:hidden">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-vermilion hover:text-vermilion-light transition-colors"
                  >
                    ☰ 年表を選択
                  </button>
                </p>
                <p className="text-xs text-sepia-700">複数選択して年表を横並びに比較できます</p>
              </div>
            </div>
          ) : allDateKeys.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sepia-600 text-sm">
              <p>選択した年表にイベントがありません</p>
            </div>
          ) : (
            <>
            {/* 印刷専用タイトル */}
            <div className="hidden print:block px-6 py-4 border-b border-gray-300">
              <p className="text-sm font-bold text-gray-800">年代記 — 年表比較</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedTimelines.map(tl => tl.name).join(' ／ ')}
              </p>
            </div>
            {/* 全独自イベント時のヘッダー */}
            {allCustomEvents && (
              <div className="px-4 py-2.5 bg-ink-800/60 border-b border-sepia-700/30 text-center print:py-1">
                <span className="text-sepia-300 text-sm tracking-widest">【独自イベントの比較年表】</span>
              </div>
            )}
            <table className="border-collapse text-sm print:w-full">
              <thead>
                <tr>
                  {/* 左上コーナー（日付ヘッダー） */}
                  <th className="sticky top-0 left-0 z-40 bg-ink-950 px-2 md:px-4 py-2 md:py-3 font-normal text-xs text-sepia-500 tracking-wider border-b border-r border-sepia-700/40 w-20 md:w-28 whitespace-nowrap">
                    日付
                  </th>
                  {selectedTimelines.map((tl, i) => {
                    const color = COLUMN_COLORS[i % COLUMN_COLORS.length]
                    const yearRange = tl.events.length > 0
                      ? `${tl.events[0].year}–${tl.events[tl.events.length - 1].year}`
                      : ''
                    return (
                      <th
                        key={tl.id}
                        className={`sticky top-0 z-30 bg-ink-950 px-3 md:px-4 py-2 md:py-3 text-left font-normal border-b border-r border-sepia-700/40 min-w-[160px] md:min-w-[200px] max-w-[280px]`}
                      >
                        <div className={`text-xs font-bold tracking-wider truncate ${color.text}`}>
                          {tl.name}
                        </div>
                        <div className="text-sepia-600 text-[10px] mt-0.5 tabular-nums">
                          {yearRange && <span>{yearRange}年</span>}
                          <span className="ml-2">{tl.events.length}件</span>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {allDateKeys.map(({ sortValue, month, day, time }, idx) => {
                  // sortValue から年を逆算
                  const year = Math.floor(sortValue / 10000)
                  const monthDay = month != null
                    ? `${month}月${day != null ? `${day}日` : ''}${time ? ` ${time}` : ''}`
                    : null
                  const prev = idx > 0 ? allDateKeys[idx - 1] : null
                  const prevYear = prev ? Math.floor(prev.sortValue / 10000) : null
                  const sameYearAsPrev = prevYear === year
                  const sameDateAsPrev = prev?.sortValue === sortValue
                  return (
                    <tr key={`${sortValue}:${time ?? ''}`} className="group/row">
                      {/* 日付ラベル（sticky left） */}
                      <td className="sticky left-0 z-20 bg-ink-900 group-hover/row:bg-ink-800/80 px-2 md:px-4 py-1.5 md:py-2 border-b border-r border-sepia-700/25 align-top whitespace-nowrap">
                        {dateFormat === 1 && (
                          !sameYearAsPrev
                            ? <div className="text-green-400 font-bold tabular-nums text-sm">{year}年</div>
                            : <div className="text-sepia-700 text-xs tabular-nums">″</div>
                        )}
                        {dateFormat === 2 && (
                          <>
                            {!sameYearAsPrev && <div className="text-green-400 font-bold tabular-nums text-sm">{year}年</div>}
                            {monthDay && !sameDateAsPrev && <div className="text-sepia-300 text-xs tabular-nums mt-0.5">{monthDay}</div>}
                            {monthDay && sameDateAsPrev && <div className="text-sepia-700 text-xs tabular-nums mt-0.5">″</div>}
                          </>
                        )}
                        {dateFormat === 3 && (
                          month != null
                            ? <>
                                {!sameDateAsPrev && (
                                  <div className="text-green-400 font-bold tabular-nums text-sm">
                                    {month}月{day != null ? `${day}日` : ''}
                                  </div>
                                )}
                                {time && <div className="text-sepia-300 text-xs tabular-nums mt-0.5">{time}</div>}
                              </>
                            : (!sameYearAsPrev && <div className="text-green-400 font-bold tabular-nums text-sm">{year}年</div>)
                        )}
                      </td>

                      {/* 各年表の該当日付イベント */}
                      {selectedTimelines.map((tl, i) => {
                        const events = tl.events.filter(ev => {
                          const info = parseEventDate(ev.title, ev.year, ev.event_date)
                          if (dateFormat === 3) {
                            return info.sortValue === sortValue && info.time === time
                          }
                          return info.sortValue === sortValue
                        })
                        const color = COLUMN_COLORS[i % COLUMN_COLORS.length]
                        return (
                          <td
                            key={tl.id}
                            className={`px-2 md:px-3 py-1.5 md:py-2 border-b border-r border-sepia-700/15 align-top`}
                          >
                            {events.length > 0 ? (
                              <div className="space-y-2.5">
                                {events.map(ev => (
                                  <div
                                    key={ev.id}
                                    className={`relative pl-2 border-l-2 ${color.border} group/ev`}
                                  >
                                    <div className={`text-xs font-medium leading-snug ${color.text}`}>
                                      {!allCustomEvents && !showCategory && ev.category === '独自イベント' ? `【独】${ev.title}` : ev.title}
                                    </div>
                                    {showCategory && ev.category && (
                                      <span className={`mt-1 inline-flex items-center px-1.5 py-0.5 text-[10px] border rounded-sm ${
                                        CATEGORY_COLORS[ev.category as Category] ?? 'bg-sepia-700/30 text-sepia-300 border-sepia-600/40'
                                      }`}>
                                        {ev.category}
                                      </span>
                                    )}
                                    {/* ホバーツールチップ */}
                                    {(ev.description || (ev.keywords && ev.keywords.length > 0) || ev.wiki_url) && (
                                      <div className="pointer-events-none absolute top-full left-0 mt-1 z-50 w-72 bg-ink-950 border border-sepia-700/50 rounded-sm px-3 py-2 text-xs text-sepia-300 leading-relaxed shadow-xl opacity-0 group-hover/ev:opacity-100 transition-opacity duration-150">
                                        {ev.description && (
                                          <p>{ev.description}</p>
                                        )}
                                        {ev.keywords && ev.keywords.length > 0 && (
                                          <div className="flex flex-wrap gap-1 mt-2">
                                            {ev.keywords.map(kw => (
                                              <span key={kw} className="px-1.5 py-0 text-[10px] border border-sepia-600/50 text-sepia-400 rounded-full">
                                                {kw}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                        {ev.wiki_url && (
                                          <a
                                            href={ev.wiki_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pointer-events-auto mt-2 block text-sky-400 hover:text-sky-300 underline text-[10px] truncate"
                                          >
                                            Wikipedia →
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="h-5" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </>
          )}
        </main>
      </div>
    </div>

    {/* 印刷オプション選択ダイアログ */}
    {showPrintDialog && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 print:hidden">
        <div className="bg-ink-950 border border-sepia-700/50 rounded-sm p-6 w-80 shadow-2xl">
          <p className="text-paper-200 text-sm tracking-wider mb-4 text-center">PDF出力オプション</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {([
              { orientation: 'portrait',  bg: 'dark',  label: '縦　黒背景', icon: '▯' },
              { orientation: 'portrait',  bg: 'light', label: '縦　白背景', icon: '▯' },
              { orientation: 'landscape', bg: 'dark',  label: '横　黒背景', icon: '▭' },
              { orientation: 'landscape', bg: 'light', label: '横　白背景', icon: '▭' },
            ] as const).map(({ orientation, bg, label, icon }) => (
              <button
                key={`${orientation}-${bg}`}
                onClick={() => {
                  setPrintOpt({ bg, orientation })
                  setShowPrintDialog(false)
                  setTimeout(() => window.print(), 50)
                }}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 text-xs tracking-wider border rounded-sm transition-colors ${
                  bg === 'dark'
                    ? 'border-sepia-700/40 bg-ink-800 text-sepia-200 hover:border-sepia-500/60 hover:text-paper-100'
                    : 'border-gray-400 bg-white text-black hover:bg-gray-50'
                }`}
              >
                <span className="text-lg leading-none">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowPrintDialog(false)}
            className="w-full py-1.5 text-xs text-sepia-600 hover:text-sepia-400 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </div>
    )}
    </>
  )
}
