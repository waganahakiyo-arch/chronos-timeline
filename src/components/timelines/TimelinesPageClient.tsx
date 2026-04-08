'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Timeline, TimelineEvent } from '@/types'

interface TimelineWithEvents extends Timeline {
  events: TimelineEvent[]
}

export default function TimelinesPageClient() {
  const router = useRouter()
  const supabase = createClient()

  const [userId, setUserId] = useState<string | null>(null)
  const [myTimelines, setMyTimelines] = useState<TimelineWithEvents[]>([])
  const [publicTimelines, setPublicTimelines] = useState<TimelineWithEvents[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)
      await fetchAll(user?.id ?? null)
      setLoading(false)
    })()
  }, [])

  const fetchAll = async (uid: string | null) => {
    // 全公開年表を取得（RLS: is_public=true or own）
    const { data: tls } = await supabase
      .from('timelines')
      .select('*')
      .order('created_at', { ascending: false })

    if (!tls) return

    // 各年表のイベントを取得
    const enriched: TimelineWithEvents[] = await Promise.all(
      tls.map(async (tl) => {
        const { data: events } = await supabase
          .from('timeline_events')
          .select('*')
          .eq('timeline_id', tl.id)
          .order('year', { ascending: true })
        return { ...tl, events: events ?? [] }
      })
    )

    const isEffectivelyPublic = (tl: Timeline) =>
      tl.is_public && (!tl.public_until || new Date(tl.public_until) > new Date())

    if (uid) {
      setMyTimelines(enriched.filter(tl => tl.user_id === uid))
      setPublicTimelines(enriched.filter(tl => isEffectivelyPublic(tl) && tl.user_id !== uid))
    } else {
      setPublicTimelines(enriched.filter(tl => isEffectivelyPublic(tl)))
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-ink-900">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-3 bg-ink-950 border-b border-sepia-700/30">
        <div className="flex items-center gap-4">
          <span className="text-vermilion text-xl select-none">✦</span>
          <Link href="/app" className="text-lg font-bold tracking-widest text-paper-100 hover:text-paper-50 transition-colors">
            年代記
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/app" className="text-sepia-300 hover:text-paper-100 text-sm tracking-wider transition-colors">
            年表を作る
          </Link>
          <Link href="/compare" className="text-sepia-300 hover:text-paper-100 text-sm tracking-wider transition-colors">
            比較
          </Link>
          {userId && (
            <button onClick={signOut} className="text-sepia-400 hover:text-vermilion text-sm tracking-wider transition-colors">
              退出
            </button>
          )}
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center text-sepia-500 py-20 text-sm tracking-wider">
            読み込み中...
          </div>
        ) : (
          <>
            {/* 自分の年表 */}
            {userId && (
              <section className="mb-14">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold tracking-widest text-paper-100">
                    自分の年表
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-sepia-700/50 to-transparent" />
                  <Link
                    href="/app"
                    className="text-xs text-vermilion hover:text-vermilion-light tracking-wider transition-colors"
                  >
                    ＋ 新規作成
                  </Link>
                </div>
                {myTimelines.length === 0 ? (
                  <div className="text-center text-sepia-500 py-10 border border-sepia-700/20 rounded-sm">
                    <p className="text-2xl mb-2">◎</p>
                    <p className="text-sm">まだ年表がありません</p>
                    <Link href="/app" className="mt-3 inline-block text-xs text-vermilion hover:text-vermilion-light transition-colors">
                      年表を作成する →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myTimelines.map(tl => (
                      <TimelineCard key={tl.id} timeline={tl} isOwn />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 公開年表 */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl font-bold tracking-widest text-paper-100">
                  公開年表
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-sepia-700/50 to-transparent" />
              </div>
              {publicTimelines.length === 0 ? (
                <div className="text-center text-sepia-500 py-10 border border-sepia-700/20 rounded-sm">
                  <p className="text-sm">公開されている年表はありません</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {publicTimelines.map(tl => (
                    <TimelineCard key={tl.id} timeline={tl} isOwn={false} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

// ─── TimelineCard ─────────────────────────────────────────────────

function TimelineCard({
  timeline,
  isOwn,
}: {
  timeline: TimelineWithEvents
  isOwn: boolean
}) {
  const yearRange =
    timeline.events.length > 0
      ? `${timeline.events[0].year}年 〜 ${timeline.events[timeline.events.length - 1].year}年`
      : '（事件なし）'

  return (
    <div className="bg-ink-800 border border-sepia-700/30 rounded-sm p-5 hover:border-sepia-600/50 transition-colors paper-texture">
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-paper-100 font-bold leading-snug">{timeline.name}</h3>
        <div className="flex gap-1 ml-2 flex-shrink-0">
          {timeline.is_public && (() => {
            const expired = timeline.public_until && new Date(timeline.public_until) <= new Date()
            const expiring = timeline.public_until && !expired && new Date(timeline.public_until).getTime() - Date.now() < 3600000
            return expired ? (
              <span className="px-2 py-0.5 text-xs border border-sepia-600/40 text-sepia-500 rounded-sm line-through">
                期限切れ
              </span>
            ) : expiring ? (
              <span className="px-2 py-0.5 text-xs border border-amber-600/50 text-amber-400 rounded-sm">
                まもなく非公開
              </span>
            ) : (
              <span className="px-2 py-0.5 text-xs border border-vermilion/40 text-vermilion rounded-sm">
                公開
              </span>
            )
          })()}
          {isOwn && (
            <span className="px-2 py-0.5 text-xs border border-sepia-600/40 text-sepia-400 rounded-sm">
              自分
            </span>
          )}
        </div>
      </div>

      {/* 期間 */}
      <p className="text-green-400 text-xs tracking-wider mb-3">{yearRange}</p>

      {/* イベントプレビュー */}
      <div className="space-y-1.5 mb-4 max-h-32 overflow-hidden relative">
        {timeline.events.slice(0, 4).map(ev => (
          <div key={ev.id} className="flex items-center gap-2 text-xs">
            <span className="text-green-400 tabular-nums flex-shrink-0">{ev.year}</span>
            <span className="text-sepia-300 truncate">{ev.title}</span>
          </div>
        ))}
        {timeline.events.length > 4 && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-ink-800 to-transparent" />
        )}
      </div>

      {/* フッター */}
      <div className="flex items-center justify-between border-t border-sepia-700/20 pt-3">
        <span className="text-sepia-500 text-xs">
          {timeline.events.length} 件の事件
        </span>
        <div className="text-right">
          {timeline.is_public && timeline.public_until && (
            <p className={`text-xs mb-0.5 ${new Date(timeline.public_until) <= new Date() ? 'text-sepia-600' : 'text-sepia-500'}`}>
              〜{new Date(timeline.public_until).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
          <span className="text-sepia-600 text-xs">
            {new Date(timeline.created_at).toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>
    </div>
  )
}
