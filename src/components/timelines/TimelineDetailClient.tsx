'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CATEGORY_COLORS, CATEGORY_DOT } from '@/data/events'
import type { Timeline, TimelineEvent } from '@/types'

export default function TimelineDetailClient({ timelineId }: { timelineId: string }) {
  const router = useRouter()
  const supabase = createClient()

  const [timeline, setTimeline] = useState<Timeline | null>(null)
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: tl } = await supabase
        .from('timelines')
        .select('*')
        .eq('id', timelineId)
        .single()

      if (!tl) { setNotFound(true); setLoading(false); return }

      // 有効な公開年表かチェック
      const isPublic = tl.is_public && (!tl.public_until || new Date(tl.public_until) > new Date())
      // 自分の年表かもチェック
      const { data: { user } } = await supabase.auth.getUser()
      const isOwn = user?.id === tl.user_id

      if (!isPublic && !isOwn) { setNotFound(true); setLoading(false); return }

      const { data: evs } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('timeline_id', timelineId)
        .order('year', { ascending: true })

      setTimeline(tl)
      setEvents(evs ?? [])
      setLoading(false)
    })()
  }, [timelineId])

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center">
        <span className="text-sepia-500 text-sm tracking-wider">読み込み中...</span>
      </div>
    )
  }

  if (notFound || !timeline) {
    return (
      <div className="min-h-screen bg-ink-900 flex flex-col items-center justify-center gap-4">
        <p className="text-sepia-400 text-sm tracking-wider">年表が見つかりません</p>
        <Link href="/timelines" className="text-xs text-vermilion hover:text-vermilion-light transition-colors tracking-wider">
          ← 年表一覧に戻る
        </Link>
      </div>
    )
  }

  // カテゴリ別集計
  const categoryCount = events.reduce<Record<string, number>>((acc, ev) => {
    const cat = ev.category ?? '未分類'
    acc[cat] = (acc[cat] ?? 0) + 1
    return acc
  }, {})

  const yearRange = events.length > 0
    ? `${events[0].year}年 〜 ${events[events.length - 1].year}年`
    : null

  return (
    <div className="min-h-screen bg-ink-900">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-3 bg-ink-950 border-b border-sepia-700/30">
        <div className="flex items-center gap-4">
          <span className="text-vermilion text-xl select-none">✦</span>
          <Link href="/app" className="text-lg font-bold tracking-widest text-paper-100 hover:text-paper-50 transition-colors">
            年代記
          </Link>
          <span className="text-sepia-600 text-xs tracking-wider hidden sm:block">年表閲覧</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/timelines" className="text-sepia-300 hover:text-paper-100 text-sm tracking-wider transition-colors">
            ← 一覧に戻る
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* タイトル・メタ情報 */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold tracking-widest text-paper-100">{timeline.name}</h1>
            <span className="px-2 py-0.5 text-xs border border-vermilion/40 text-vermilion rounded-sm flex-shrink-0 ml-3">
              公開
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-sepia-500 tracking-wider">
            {yearRange && <span>{yearRange}</span>}
            <span>{events.length} 件</span>
            <span>作成: {new Date(timeline.created_at).toLocaleDateString('ja-JP')}</span>
            {timeline.public_until && (
              <span>公開期限: {new Date(timeline.public_until).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            )}
          </div>
        </div>

        {/* カテゴリ内訳 */}
        {Object.keys(categoryCount).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {Object.entries(categoryCount).map(([cat, count]) => {
              const colorClass = CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] ?? 'bg-sepia-900/30 text-sepia-300 border-sepia-700/40'
              return (
                <span key={cat} className={`px-2 py-0.5 text-xs border rounded-sm ${colorClass}`}>
                  {cat} {count}
                </span>
              )
            })}
          </div>
        )}

        {/* イベント一覧 */}
        {events.length === 0 ? (
          <div className="text-center text-sepia-500 py-16 border border-sepia-700/20 rounded-sm">
            <p className="text-sm">この年表にはまだイベントがありません</p>
          </div>
        ) : (
          <div className="space-y-0">
            {events.map((ev, idx) => {
              const dotColor = ev.category
                ? (CATEGORY_DOT[ev.category as keyof typeof CATEGORY_DOT] ?? 'bg-sepia-500')
                : 'bg-sepia-500'
              const showYear = idx === 0 || events[idx - 1].year !== ev.year
              return (
                <div key={ev.id} className="flex gap-4">
                  {/* 年ラベル */}
                  <div className="w-16 flex-shrink-0 pt-3 text-right">
                    {showYear && (
                      <span className="text-green-400 text-xs tabular-nums">{ev.year}</span>
                    )}
                  </div>
                  {/* タイムライン線 */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full mt-4 flex-shrink-0 ${dotColor}`} />
                    {idx < events.length - 1 && (
                      <div className="w-px flex-1 bg-sepia-700/30 mt-1" />
                    )}
                  </div>
                  {/* イベント内容 */}
                  <div className="flex-1 pb-4 pt-2.5">
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="text-paper-200 text-sm leading-snug">{ev.title}</span>
                      {ev.category && (
                        <span className={`px-1.5 py-0.5 text-[10px] border rounded-sm flex-shrink-0 ${CATEGORY_COLORS[ev.category as keyof typeof CATEGORY_COLORS] ?? 'bg-sepia-900/30 text-sepia-300 border-sepia-700/40'}`}>
                          {ev.category}
                        </span>
                      )}
                    </div>
                    {ev.description && (
                      <p className="text-sepia-400 text-xs mt-1 leading-relaxed">{ev.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
