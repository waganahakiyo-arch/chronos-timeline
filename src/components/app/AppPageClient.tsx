'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { historicalEvents, CATEGORIES, ERAS, CATEGORY_COLORS, CATEGORY_DOT } from '@/data/events'
import type { Timeline, TimelineEvent, Category, Era, HistoricalEvent, UserEvent } from '@/types'

type MasterEvent = HistoricalEvent & { event_date?: string | null; isUserEvent?: boolean }

// ─── 小コンポーネント ──────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category as Category] ?? 'bg-sepia-700/30 text-sepia-300 border-sepia-600/40'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs border rounded-sm ${cls}`}>
      {category}
    </span>
  )
}

function YearBadge({ year }: { year: number }) {
  return (
    <span className="text-green-400 font-bold text-sm tabular-nums tracking-wider">
      {year}年
    </span>
  )
}

// ─── メインコンポーネント ──────────────────────────────────────────

export default function AppPageClient() {
  const router = useRouter()
  const supabase = createClient()

  // ユーザー
  const [userId, setUserId] = useState<string | null>(null)

  // 保存済み年表一覧
  const [savedTimelines, setSavedTimelines] = useState<Timeline[]>([])

  // 現在編集中の年表
  const [selectedTimelineId, setSelectedTimelineId] = useState<string | null>(null)
  const [timelineName, setTimelineName] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [publicUntil, setPublicUntil] = useState<string | null>(null)
  const [currentEvents, setCurrentEvents] = useState<TimelineEvent[]>([])

  // UI状態
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [showSavedList, setShowSavedList] = useState(false)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [userEvents, setUserEvents] = useState<UserEvent[]>([])
  const importFileRef = useRef<HTMLInputElement>(null)
  const [dateFormat, setDateFormat] = useState<1|2|3>(1)
  const [editingUserEvent, setEditingUserEvent] = useState<UserEvent | null>(null)
  // モバイル用パネル切り替え
  const [leftOpen, setLeftOpen] = useState(true)

  // 左パネル比較列
  const [compareMode, setCompareMode] = useState(false)
  const [compareSourceType, setCompareSourceType] = useState<'category' | 'timeline'>('category')
  const [compareSourceId, setCompareSourceId] = useState<string>('日本の政治')
  const [compareDisplayEvents, setCompareDisplayEvents] = useState<{ year: number; title: string; category: string; event_date?: string | null }[]>([])

  // チュートリアル（毎ログインでリセット、0=非表示）
  const [tutorialStep, setTutorialStep] = useState<0|1|2|3>(0)
  // 比較ページ訪問済みフラグ（一度訪問したらフキダシ永久スキップ）
  const [compareVisited, setCompareVisited] = useState(false)

  // ─── 初期化 ───────────────────────────────────────────────────────
  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/'); return }
      setUserId(user.id)
      fetchTimelines(user.id)
      fetchUserEvents(user.id)
      // チュートリアルは毎ログインで step 1 からスタート
      setTutorialStep(1)
      // 比較ページ訪問済みかチェック
      setCompareVisited(localStorage.getItem('chronos_compare_visited') === '1')
    })()
  }, [])

  const fetchTimelines = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from('timelines')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
    if (data) setSavedTimelines(data)
  }, [supabase])

  const fetchUserEvents = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from('user_events')
      .select('*')
      .eq('user_id', uid)
      .order('year', { ascending: true })
    if (data) setUserEvents(data)
  }, [supabase])

  // ─── 年表操作 ────────────────────────────────────────────────────

  const loadTimeline = async (tl: Timeline) => {
    setSelectedTimelineId(tl.id)
    setTimelineName(tl.name)
    setIsPublic(tl.is_public)
    setPublicUntil(tl.public_until ?? null)
    const { data } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('timeline_id', tl.id)
      .order('year', { ascending: true })
    setCurrentEvents(data ?? [])
    setShowSavedList(false)
    setLeftOpen(false)
  }

  const newTimeline = () => {
    setSelectedTimelineId(null)
    setTimelineName('')
    setIsPublic(false)
    setPublicUntil(null)
    setCurrentEvents([])
    setShowSavedList(false)
    setLeftOpen(true)
  }

  const addEvent = (ev: MasterEvent) => {
    if (currentEvents.some(e => e.year === ev.year && e.title === ev.title)) return
    const newEv: TimelineEvent = {
      id: `tmp-${Date.now()}-${Math.random()}`,
      timeline_id: selectedTimelineId ?? '',
      year: ev.year,
      title: ev.title,
      description: ev.description ?? null,
      category: ev.category,
      era: ev.era,
      keywords: ev.keywords ?? null,
      wiki_url: ev.wikiUrl ?? null,
      event_date: ev.event_date ?? null,
      created_at: new Date().toISOString(),
    }
    setCurrentEvents(prev => [...prev, newEv].sort((a, b) => a.year - b.year))
  }

  const addAllFiltered = (events: MasterEvent[]) => {
    const toAdd = events.filter(ev => !currentEvents.some(e => e.year === ev.year && e.title === ev.title))
    if (toAdd.length === 0) return
    const newEvs: TimelineEvent[] = toAdd.map(ev => ({
      id: `tmp-${Date.now()}-${Math.random()}`,
      timeline_id: selectedTimelineId ?? '',
      year: ev.year,
      title: ev.title,
      description: ev.description ?? null,
      category: ev.category,
      era: ev.era,
      keywords: ev.keywords ?? null,
      wiki_url: ev.wikiUrl ?? null,
      event_date: ev.event_date ?? null,
      created_at: new Date().toISOString(),
    }))
    setCurrentEvents(prev => [...prev, ...newEvs].sort((a, b) => a.year - b.year))
    flash(`✦ ${toAdd.length} 件を追加しました`)
  }

  const removeEvent = (id: string) => {
    setCurrentEvents(prev => prev.filter(e => e.id !== id))
  }

  // スキーマキャッシュ未更新時でも保存できるよう、新カラムを含むペイロードが
  // 失敗した場合は新カラムなしで再試行するヘルパー
  const safeUpdate = async (id: string, payload: Record<string, unknown>) => {
    const res = await supabase.from('timelines').update(payload).eq('id', id)
    if (res.error && isSchemaCacheError(res.error.message)) {
      const { public_until: _, ...base } = payload
      return supabase.from('timelines').update(base).eq('id', id)
    }
    return res
  }

  const safeInsertTimeline = async (payload: Record<string, unknown>) => {
    const res = await supabase.from('timelines').insert(payload).select().single()
    if (res.error && isSchemaCacheError(res.error.message)) {
      const { public_until: _, ...base } = payload
      return supabase.from('timelines').insert(base).select().single()
    }
    return res
  }

  const isSchemaCacheError = (msg: string) =>
    msg.includes('schema cache') || msg.includes('Could not find')

  const saveTimeline = async () => {
    if (!timelineName.trim()) { flash('年表名を入力してください'); return }
    if (!userId) return
    setSaving(true)
    try {
      const effectivePublicUntil = isPublic ? publicUntil : null
      let tlId = selectedTimelineId
      if (tlId) {
        const { error: updateError } = await safeUpdate(tlId, { name: timelineName, is_public: isPublic, public_until: effectivePublicUntil })
        if (updateError) throw updateError
        await supabase.from('timeline_events').delete().eq('timeline_id', tlId)
      } else {
        const { data, error } = await safeInsertTimeline({ name: timelineName, is_public: isPublic, public_until: effectivePublicUntil, user_id: userId })
        if (error) throw error
        if (!data) throw new Error('データの取得に失敗しました')
        tlId = data.id
        setSelectedTimelineId(tlId)
      }
      if (currentEvents.length > 0 && tlId) {
        const evRows = currentEvents.map(e => ({
          timeline_id: tlId,
          year: e.year,
          title: e.title,
          description: e.description,
          category: e.category,
          era: e.era,
          ...(e.keywords != null && { keywords: e.keywords }),
          ...(e.wiki_url != null && { wiki_url: e.wiki_url }),
          ...(e.event_date != null && { event_date: e.event_date }),
        }))
        let { error: evError } = await supabase.from('timeline_events').insert(evRows)
        if (evError && isSchemaCacheError(evError.message)) {
          // 新カラムが未追加の場合、基本カラムのみで再試行
          const baseRows = currentEvents.map(e => ({
            timeline_id: tlId,
            year: e.year,
            title: e.title,
            description: e.description,
            category: e.category,
            era: e.era,
          }))
          evError = (await supabase.from('timeline_events').insert(baseRows)).error
        }
        if (evError) throw evError
      }
      await fetchTimelines(userId)
      flash('✦ 保存しました')
      if (tutorialStep === 2) setTutorialStep(3)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (err as { message?: string })?.message ?? '不明なエラー'
      flash(`保存失敗: ${msg}`)
    } finally {
      setSaving(false)
    }
  }

  const deleteTimeline = async (id: string) => {
    if (!userId) return
    await supabase.from('timelines').delete().eq('id', id)
    if (selectedTimelineId === id) newTimeline()
    await fetchTimelines(userId)
  }

  const flash = (msg: string) => {
    setStatusMsg(msg)
    setTimeout(() => setStatusMsg(''), 3000)
  }

  const completeTutorial = () => setTutorialStep(0)

  // step 3 のフキダシは 6 秒後に自動消去
  useEffect(() => {
    if (tutorialStep === 3) {
      const t = setTimeout(() => setTutorialStep(0), 6000)
      return () => clearTimeout(t)
    }
  }, [tutorialStep])


  const deleteUserEvent = async (id: string) => {
    await supabase.from('user_events').delete().eq('id', id)
    setUserEvents(prev => prev.filter(e => e.id !== id))
  }

  const updateUserEvent = async (id: string, updates: {
    year: number; title: string; description: string | null;
    era: string | null; keywords: string[] | null; wiki_url: string | null; event_date: string | null
  }) => {
    const { error } = await supabase.from('user_events').update(updates).eq('id', id)
    if (error) { flash(`更新失敗: ${error.message}`); return }
    const original = userEvents.find(e => e.id === id)
    setUserEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e).sort((a, b) => a.year - b.year))
    if (original) {
      setCurrentEvents(prev => prev.map(e =>
        e.year === original.year && e.title === original.title && e.category === '独自イベント'
          ? { ...e, year: updates.year, title: updates.title, description: updates.description,
              era: updates.era, keywords: updates.keywords, wiki_url: updates.wiki_url, event_date: updates.event_date }
          : e
      ).sort((a, b) => a.year - b.year))
    }
    flash('✦ 独自イベントを更新しました')
    setEditingUserEvent(null)
  }

  const exportUserEvents = () => {
    const exportData = userEvents.map(({ id: _id, user_id: _uid, created_at: _ca, ...rest }) => rest)
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `user-events-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importUserEvents = async (file: File) => {
    try {
      const text = await file.text()
      const cleaned = text.replace(/"(?:[^"\\]|\\.)*"/g, m => m.replace(/[\r\n]+\s*/g, ''))
      const data = JSON.parse(cleaned)
      if (!Array.isArray(data)) { flash('インポート失敗: 無効なフォーマット'); return }
      if (!userId) return
      const rows = data.map((ev: Record<string, unknown>) => ({
        user_id: userId,
        year: ev.year,
        title: ev.title,
        description: ev.description ?? null,
        keywords: ev.keywords ?? null,
        wiki_url: ev.wiki_url ?? null,
        event_date: ev.event_date ?? null,
        era: ev.era ?? null,
      }))
      const { error } = await supabase.from('user_events').insert(rows)
      if (error) { flash(`インポート失敗: ${error.message}`); return }
      await fetchUserEvents(userId)
      flash(`✦ ${rows.length} 件をインポートしました`)
    } catch {
      flash('インポート失敗: ファイルの解析に失敗しました')
    }
  }

  // datetime-local input用のローカル時刻文字列に変換
  const toLocalInputValue = (iso: string) => {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  // 残り時間を日本語で表示
  const formatRemaining = (iso: string) => {
    const diff = new Date(iso).getTime() - Date.now()
    if (diff <= 0) return '期限切れ'
    const totalMin = Math.floor(diff / 60000)
    const days = Math.floor(totalMin / 1440)
    const hours = Math.floor((totalMin % 1440) / 60)
    const mins = totalMin % 60
    if (days > 0) return `${days}日${hours > 0 ? hours + '時間' : ''}`
    if (hours > 0) return `${hours}時間${mins > 0 ? mins + '分' : ''}`
    return `${mins}分`
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // ─── フィルタリング済みイベント ───────────────────────────────────
  const [keywordFilters, setKeywordFilters] = useState<string[]>([])
  const [keywordBarOpen, setKeywordBarOpen] = useState(false)

  // タイトルから「MM月DD日」または「MM月」を読み取り月日の数値を返す
  // 月のみの場合は月末日扱い（例：9月 → 930）
  const extractMonthDay = (title: string): number => {
    const full = title.match(/^(\d+)月(\d+)日/)
    if (full) return parseInt(full[1]) * 100 + parseInt(full[2])
    const monthOnly = title.match(/^(\d+)月/)
    if (monthOnly) {
      const m = parseInt(monthOnly[1])
      const lastDay = new Date(2000, m, 0).getDate()
      return m * 100 + lastDay
    }
    return 9999
  }

  const DATE_SORT_CATEGORIES = new Set(['任天堂の歴史', 'カプコンの歴史', 'SNKの歴史', 'ベストセラー小説', 'ヒット漫画'])

  const userEventsAsHistorical = useMemo<MasterEvent[]>(() =>
    userEvents.map(ue => ({
      id: ue.id,
      year: ue.year,
      title: ue.title,
      description: ue.description ?? undefined,
      category: '独自イベント' as Category,
      keywords: ue.keywords ?? undefined,
      era: (ue.era ?? '現代') as Era,
      wikiUrl: ue.wiki_url ?? undefined,
      event_date: ue.event_date,
      isUserEvent: true,
    }))
  , [userEvents])

  const allMasterEvents = useMemo<MasterEvent[]>(
    () => [...historicalEvents, ...userEventsAsHistorical],
    [userEventsAsHistorical]
  )

  const filteredByCategory = categoryFilter
    ? allMasterEvents.filter(e => e.category === categoryFilter).sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year
        if (DATE_SORT_CATEGORIES.has(a.category)) return extractMonthDay(a.title) - extractMonthDay(b.title)
        return 0
      })
    : [...allMasterEvents].sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year
        return CATEGORIES.indexOf(a.category as Category) - CATEGORIES.indexOf(b.category as Category)
      })

  const filteredEvents = keywordFilters.length > 0
    ? filteredByCategory.filter(e => e.keywords?.some(kw => keywordFilters.includes(kw)))
    : filteredByCategory

  const availableKeywords = Array.from(
    new Set(filteredEvents.flatMap(e => e.keywords ?? []))
  ).sort()

  const handleCategoryFilter = (cat: Category | null) => {
    setCategoryFilter(cat)
    setKeywordFilters([])
    setKeywordBarOpen(false)
  }

  const toggleKeyword = (kw: string) => {
    setKeywordFilters(prev =>
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    )
  }

  const isAdded = (ev: MasterEvent) =>
    currentEvents.some(e => e.year === ev.year && e.title === ev.title)

  // 比較列のイベントを読み込む（allMasterEvents の後に配置）
  useEffect(() => {
    if (!compareMode) { setCompareDisplayEvents([]); return }
    if (compareSourceType === 'category') {
      setCompareDisplayEvents(
        allMasterEvents
          .filter(e => e.category === compareSourceId)
          .map(e => ({ year: e.year, title: e.title, category: e.category, event_date: e.event_date ?? null }))
      )
    } else {
      ;(async () => {
        const { data } = await supabase
          .from('timeline_events')
          .select('year, title, category, event_date')
          .eq('timeline_id', compareSourceId)
          .order('year', { ascending: true })
        setCompareDisplayEvents(data ?? [])
      })()
    }
  }, [compareMode, compareSourceType, compareSourceId, allMasterEvents])

  // ─── レンダリング ─────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-ink-900">
      {/* ヘッダー */}
      <header className="flex items-center px-4 md:px-6 py-2 md:py-3 bg-ink-950 border-b border-sepia-700/30 flex-shrink-0">
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-vermilion text-xl select-none">✦</span>
          <h1 className="text-base md:text-lg font-bold tracking-widest text-paper-100">年代記</h1>
          <span className="text-sepia-600 text-xs tracking-wider hidden sm:block">歴史年表アーカイブ</span>
        </div>
        {/* 右パネル説明（PC版のみ・ヘッダー中央） */}
        <div className="flex-1 hidden md:flex justify-center">
          <p className={`text-xs tracking-widest transition-all duration-500 ${
            tutorialStep === 2 ? 'text-paper-100 animate-pulse' : 'text-sepia-500'
          }`}>右パネルで歴史イベントをクリックして年表に追加</p>
        </div>
        <nav className="flex items-center gap-2 md:gap-6 ml-auto md:ml-0">
          <Link
            href="/timelines"
            className="text-sepia-300 hover:text-paper-100 text-xs md:text-sm tracking-wider transition-colors"
          >
            <span className="hidden sm:inline">年表</span>一覧
          </Link>
          <div className="relative">
            <Link
              href="/compare"
              onClick={() => {
                localStorage.setItem('chronos_compare_visited', '1')
                setCompareVisited(true)
                completeTutorial()
              }}
              className={`text-xs md:text-sm tracking-wider transition-colors ${
                tutorialStep === 3 && !compareVisited
                  ? 'text-paper-100 font-semibold animate-pulse'
                  : 'text-sepia-300 hover:text-paper-100'
              }`}
            >
              比較
            </Link>
            {tutorialStep === 3 && !compareVisited && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-ink-950 border border-sepia-600/60 rounded-sm px-3 py-2.5 text-xs text-paper-200 shadow-xl z-50 animate-fadeIn">
                <p className="leading-relaxed">比較モードで作った年表を並べて表示することができます</p>
                <button
                  onClick={completeTutorial}
                  className="mt-2 text-sepia-500 hover:text-sepia-300 text-[10px] transition-colors"
                >
                  閉じる ✕
                </button>
              </div>
            )}
          </div>
          <button
            onClick={signOut}
            className="text-sepia-400 hover:text-vermilion text-xs md:text-sm tracking-wider transition-colors"
          >
            退出
          </button>
        </nav>
      </header>

      {/* メインエリア */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── 左パネル：年表エディタ ─────────────────────────────── */}
        <aside className={`${leftOpen ? 'flex' : 'hidden'} md:flex flex-col w-full ${compareMode ? 'md:w-[40rem]' : 'md:w-80'} md:flex-shrink-0 bg-ink-800 border-r border-sepia-700/30`}>
          {/* 比較列トグル（PC版のみ） */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 border-b border-sepia-700/20 bg-ink-900/30 flex-shrink-0">
            <input type="checkbox" id="compareMode" checked={compareMode}
              onChange={e => setCompareMode(e.target.checked)}
              className="accent-vermilion cursor-pointer w-3.5 h-3.5" />
            <label htmlFor="compareMode" className="text-sepia-400 text-xs tracking-wider cursor-pointer select-none">
              比較列を表示
            </label>
          </div>
          {/* 列コンテナ */}
          <div className="flex flex-1 overflow-hidden">
          {/* ── 編集列 ── */}
          <div className="flex flex-col w-full md:w-80 md:flex-shrink-0 overflow-hidden">
          {/* パネル見出し */}
          <div className="px-4 pt-3 pb-2 border-b border-sepia-700/20">
            {/* モバイル */}
            <p className={`md:hidden text-xs tracking-widest transition-all duration-500 ${
              tutorialStep === 1 ? 'text-paper-100 animate-pulse' : 'text-sepia-400'
            }`}>編集対象の年表を選んでください</p>
            {/* PC */}
            <p className={`hidden md:block text-xs tracking-widest transition-all duration-500 ${
              tutorialStep === 1 ? 'text-paper-100 animate-pulse' : 'text-sepia-400'
            }`}>左パネルで編集対象の年表を選ぶ</p>
          </div>
          {/* タイトル入力 */}
          <div className="p-4 border-b border-sepia-700/30">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={timelineName}
                onChange={(e) => setTimelineName(e.target.value)}
                placeholder="年表のタイトルを入力..."
                className="flex-1 min-w-0 bg-ink-950 border border-sepia-700/40 rounded-sm px-3 py-2 text-paper-100 placeholder-sepia-600 text-sm focus:outline-none focus:border-vermilion/60 transition-colors"
              />
              <button
                onClick={() => {
                  setShowSavedList(v => !v)
                  if (tutorialStep === 1) setTutorialStep(2)
                }}
                title="保存済み年表を選択"
                className={`p-2 hover:text-paper-200 border rounded-sm hover:border-sepia-600/60 transition-all ${
                  tutorialStep === 1
                    ? 'text-paper-200 border-paper-100/50 ring-1 ring-paper-100/20 animate-pulse'
                    : 'text-sepia-400 border-sepia-700/40'
                }`}
              >
                ☰
              </button>
            </div>

            {/* 保存済み年表ドロップダウン */}
            {showSavedList && (
              <div className="bg-ink-950 border border-sepia-700/40 rounded-sm mb-2 max-h-48 overflow-y-auto">
                <button
                  onClick={newTimeline}
                  className="w-full text-left px-3 py-2 text-xs text-vermilion hover:bg-ink-800 transition-colors border-b border-sepia-700/20"
                >
                  ＋ 新規作成
                </button>
                {savedTimelines.length === 0 && (
                  <p className="px-3 py-2 text-sepia-500 text-xs">保存済み年表なし</p>
                )}
                {savedTimelines.map(tl => (
                  <div key={tl.id} className="flex items-center group">
                    <button
                      onClick={() => loadTimeline(tl)}
                      className={`flex-1 text-left px-3 py-2 text-xs transition-colors hover:bg-ink-700 ${
                        selectedTimelineId === tl.id ? 'text-vermilion' : 'text-paper-200'
                      }`}
                    >
                      {tl.name}
                      {tl.is_public && (
                        <span className={`ml-2 ${tl.public_until && new Date(tl.public_until) <= new Date() ? 'text-sepia-600 line-through' : 'text-sepia-500'}`}>
                          {tl.public_until && new Date(tl.public_until) <= new Date() ? '期限切れ' : '公開'}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => deleteTimeline(tl.id)}
                      className="px-2 text-sepia-600 hover:text-vermilion opacity-0 group-hover:opacity-100 transition-all text-xs"
                      title="削除"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 保存・公開ボタン */}
            <div className="flex gap-2 items-center">
              <span className="hidden md:block text-sepia-400 text-xs tracking-wider flex-shrink-0">{currentEvents.length}件</span>
              <button
                onClick={saveTimeline}
                disabled={saving}
                className="flex-1 bg-vermilion hover:bg-vermilion-light disabled:opacity-50 text-paper-100 py-2 rounded-sm text-xs tracking-widest transition-colors"
              >
                {saving ? '保存中...' : '保 存'}
              </button>
              <button
                onClick={() => {
                  const next = !isPublic
                  setIsPublic(next)
                  if (!next) setPublicUntil(null)
                }}
                className={`px-3 py-2 rounded-sm text-xs tracking-wider border transition-colors ${
                  isPublic
                    ? 'bg-vermilion/20 border-vermilion/50 text-vermilion'
                    : 'border-sepia-700/40 text-sepia-400 hover:border-sepia-600/60 hover:text-sepia-300'
                }`}
              >
                {isPublic ? '公開中' : '非公開'}
              </button>
            </div>
            {/* 公開期限設定 */}
            {isPublic && (
              <div className="mt-2 space-y-1.5">
                <label className="block text-xs text-sepia-500 tracking-wider">公開期限（省略で無期限）</label>
                <input
                  type="datetime-local"
                  value={publicUntil ? toLocalInputValue(publicUntil) : ''}
                  onChange={e => setPublicUntil(e.target.value ? new Date(e.target.value).toISOString() : null)}
                  min={toLocalInputValue(new Date().toISOString())}
                  className="w-full bg-ink-950 border border-sepia-700/40 rounded-sm px-2 py-1.5 text-paper-200 text-xs focus:outline-none focus:border-vermilion/60 transition-colors"
                />
                {publicUntil ? (
                  <p className={`text-xs ${new Date(publicUntil) > new Date() ? 'text-sepia-500' : 'text-vermilion'}`}>
                    {new Date(publicUntil) > new Date()
                      ? `${formatRemaining(publicUntil)} に自動非公開`
                      : '期限切れ（保存すると非公開になります）'}
                  </p>
                ) : (
                  <p className="text-xs text-sepia-600">無期限公開</p>
                )}
              </div>
            )}
            {statusMsg && (
              <p className="mt-2 text-xs text-center text-vermilion animate-fadeIn">{statusMsg}</p>
            )}
            {/* モバイル：右パネルへ切り替え */}
            <button
              onClick={() => setLeftOpen(false)}
              className="mt-2 md:hidden w-full py-2 text-xs tracking-wider border border-sepia-700/40 text-sepia-300 hover:border-vermilion/50 hover:text-vermilion rounded-sm transition-colors"
            >
              イベントを追加 →
            </button>
          </div>

          {/* 年表イベントリスト */}
          <div className="flex-1 overflow-y-auto p-3">
            {/* 独自イベント追加 */}
            <div className="mb-3">
              <button
                onClick={() => setShowCustomForm(v => !v)}
                className={`w-full text-left px-3 py-2 text-xs tracking-wider border border-dashed rounded-sm transition-colors ${
                  showCustomForm
                    ? 'border-vermilion/50 text-vermilion/80'
                    : 'border-sepia-700/50 text-sepia-500 hover:border-vermilion/40 hover:text-vermilion/70'
                }`}
              >
                {showCustomForm ? '▲ フォームを閉じる' : '＋ 独自イベントを追加'}
              </button>
              {showCustomForm && (
                <CustomEventForm
                  onAdd={(ev) => {
                    ;(async () => {
                      if (userId) {
                        const { data: ueData, error } = await supabase.from('user_events').insert({
                          user_id: userId,
                          year: ev.year,
                          title: ev.title,
                          description: ev.description,
                          keywords: ev.keywords,
                          wiki_url: ev.wiki_url,
                          event_date: ev.event_date,
                          era: ev.era,
                        }).select().single()
                        if (error) { flash(`独自イベント保存失敗: ${error.message}`); return }
                        if (ueData) setUserEvents(prev => [...prev, ueData].sort((a, b) => a.year - b.year))
                      }
                      const newEv: TimelineEvent = {
                        id: `tmp-${Date.now()}-${Math.random()}`,
                        timeline_id: selectedTimelineId ?? '',
                        ...ev,
                        created_at: new Date().toISOString(),
                      }
                      setCurrentEvents(prev => [...prev, newEv].sort((a, b) => a.year - b.year))
                      flash('✦ 独自イベントを追加しました')
                      setShowCustomForm(false)
                    })()
                  }}
                />
              )}
              {/* インポート・エクスポート */}
              <div className="flex gap-1.5 mt-1.5">
                {userEvents.length > 0 && (
                  <button
                    onClick={exportUserEvents}
                    className="flex-1 px-2 py-1 text-[10px] tracking-wider border border-sepia-700/40 text-sepia-400 hover:border-violet-700/50 hover:text-violet-300 rounded-sm transition-colors"
                  >
                    ↓ エクスポート
                  </button>
                )}
                <button
                  onClick={() => importFileRef.current?.click()}
                  className="flex-1 px-2 py-1 text-[10px] tracking-wider border border-sepia-700/40 text-sepia-400 hover:border-violet-700/50 hover:text-violet-300 rounded-sm transition-colors"
                >
                  ↑ インポート
                </button>
              </div>
              <input
                ref={importFileRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={e => {
                  if (e.target.files?.[0]) importUserEvents(e.target.files[0])
                  e.target.value = ''
                }}
              />
            </div>

            {currentEvents.length === 0 ? (
              <div className="text-center text-sepia-600 text-xs mt-8 space-y-2">
                <p className="text-2xl">◎</p>
                <p>右のパネルから事件を追加</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* 年表ライン */}
                <div className="relative">
                  <div className="absolute left-[26px] top-0 bottom-0 w-px bg-sepia-700/30" />
                  {currentEvents.map((ev, idx) => (
                    <div
                      key={ev.id}
                      className="relative flex items-start gap-3 pl-2 pr-1 py-2 group animate-fadeIn"
                    >
                      {/* タイムラインドット */}
                      <div className="relative z-10 mt-1 flex-shrink-0">
                        <div
                          className={`w-3 h-3 rounded-full border-2 border-ink-800 ${
                            CATEGORY_DOT[ev.category as Category] ?? 'bg-sepia-500'
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          {ev.event_date && dateFormat !== 1
                            ? <span className="text-green-400 font-bold text-xs tabular-nums tracking-wider">
                                {dateFormat === 2 ? ev.event_date : ev.event_date.slice(5)}
                              </span>
                            : <YearBadge year={ev.year} />
                          }
                          <span className="text-paper-200 text-xs font-medium truncate">{ev.title}</span>
                        </div>
                        {ev.category && (
                          <div className="mt-1">
                            <CategoryBadge category={ev.category} />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeEvent(ev.id)}
                        className="flex-shrink-0 text-sepia-700 hover:text-vermilion opacity-0 group-hover:opacity-100 transition-all text-xs mt-1"
                        title="削除"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>{/* /編集列 */}

          {/* ── 比較列（PC版のみ） ── */}
          {compareMode && (
            <div className="hidden md:flex flex-col w-80 flex-shrink-0 overflow-hidden border-l border-sepia-700/30">
              {/* ソース選択ヘッダー */}
              <div className="px-3 py-2.5 border-b border-sepia-700/20 flex-shrink-0">
                <p className="text-sepia-500 text-[10px] tracking-widest mb-1.5">比較対象</p>
                <select
                  value={`${compareSourceType}:${compareSourceId}`}
                  onChange={e => {
                    const idx = e.target.value.indexOf(':')
                    const type = e.target.value.slice(0, idx) as 'category' | 'timeline'
                    const id = e.target.value.slice(idx + 1)
                    setCompareSourceType(type)
                    setCompareSourceId(id)
                  }}
                  className="w-full bg-ink-950 border border-sepia-700/40 rounded-sm px-2 py-1.5 text-paper-200 text-xs focus:outline-none focus:border-vermilion/60 transition-colors cursor-pointer"
                >
                  <optgroup label="── カテゴリ">
                    {CATEGORIES.filter(c => c !== '独自イベント').map(c => (
                      <option key={c} value={`category:${c}`}>{c}</option>
                    ))}
                  </optgroup>
                  {savedTimelines.length > 0 && (
                    <optgroup label="── 保存済み年表">
                      {savedTimelines.map(tl => (
                        <option key={tl.id} value={`timeline:${tl.id}`}>{tl.name}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>
              {/* 比較イベントリスト */}
              <div className="flex-1 overflow-y-auto p-3">
                {compareDisplayEvents.length === 0 ? (
                  <p className="text-center text-sepia-600 text-xs mt-8">イベントなし</p>
                ) : (
                  <div className="relative">
                    <div className="absolute left-[26px] top-0 bottom-0 w-px bg-sepia-700/30" />
                    {compareDisplayEvents.map((ev, idx) => (
                      <div key={idx} className="relative flex items-start gap-3 pl-2 pr-1 py-2">
                        <div className="relative z-10 mt-1 flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full border-2 border-ink-800 ${CATEGORY_DOT[ev.category as Category] ?? 'bg-sepia-500'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <YearBadge year={ev.year} />
                            <span className="text-paper-200 text-xs font-medium truncate">{ev.title}</span>
                          </div>
                          <div className="mt-1">
                            <CategoryBadge category={ev.category} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          </div>{/* /列コンテナ */}
        </aside>

        {/* ─── 右パネル：歴史事件リスト ───────────────────────────── */}
        <main className={`${leftOpen ? 'hidden' : 'flex'} md:flex flex-1 flex-col overflow-hidden`}>
          {/* モバイル：左パネルへ戻るボタン + カテゴリフィルター */}
          <div className="flex-shrink-0 bg-ink-800/50 border-b border-sepia-700/20">
            {/* モバイル用上部バー */}
            <div className="flex items-center gap-2 px-3 py-2 md:hidden border-b border-sepia-700/15">
              <button
                onClick={() => setLeftOpen(true)}
                className="flex items-center gap-1.5 text-sepia-300 hover:text-paper-100 text-xs tracking-wider transition-colors"
              >
                ← 年表
              </button>
              {timelineName && (
                <span className="text-paper-200 text-xs truncate flex-1 text-center">{timelineName}</span>
              )}
              <button
                onClick={saveTimeline}
                disabled={saving}
                className="flex-shrink-0 px-2 py-1 bg-vermilion hover:bg-vermilion-light disabled:opacity-50 text-paper-100 rounded-sm text-xs tracking-widest transition-colors"
              >
                {saving ? '…' : '保存'}
              </button>
              <span className="text-sepia-500 text-xs flex-shrink-0">{filteredEvents.length}件</span>
            </div>
            {/* カテゴリフィルター */}
            <div className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 overflow-x-auto md:flex-wrap scrollbar-none">
            <span className="text-sepia-300 text-xs tracking-wider mr-1 flex-shrink-0">絞込：</span>
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`flex-shrink-0 px-3 py-1 rounded-sm text-xs tracking-wider border transition-colors ${
                !categoryFilter
                  ? 'bg-sepia-700/40 border-sepia-600/60 text-paper-200'
                  : 'border-sepia-700/30 text-sepia-300 hover:border-sepia-500/50 hover:text-paper-200'
              }`}
            >
              すべて
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat === categoryFilter ? null : cat)}
                className={`flex-shrink-0 px-3 py-1 rounded-sm text-xs tracking-wider border transition-colors ${
                  categoryFilter === cat
                    ? CATEGORY_COLORS[cat]
                    : 'border-sepia-700/30 text-sepia-300 hover:border-sepia-500/50 hover:text-paper-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto flex-shrink-0 hidden md:flex items-center gap-3">
              <div className="flex border border-sepia-700/40 rounded-sm overflow-hidden" title="日付表示形式">
                {([1, 2, 3] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setDateFormat(f)}
                    title={f === 1 ? 'YYYY形式' : f === 2 ? 'YYYY/MM/DD hh:mm形式' : 'MM/DD hh:mm形式'}
                    className={`px-2 py-1 text-[10px] transition-colors ${
                      dateFormat === f ? 'bg-sepia-700/40 text-paper-200' : 'text-sepia-300 hover:text-paper-200'
                    }`}
                  >
                    {f === 1 ? '年' : f === 2 ? '日時' : '月日'}
                  </button>
                ))}
              </div>
              <span className="text-sepia-400 text-xs">{filteredEvents.length} 件</span>
              <button
                onClick={() => addAllFiltered(filteredEvents)}
                className="px-3 py-1 text-xs tracking-wider border border-sepia-700/40 text-sepia-300 hover:border-vermilion/50 hover:text-vermilion rounded-sm transition-colors"
                title="フィルタ中の全件を年表に追加"
              >
                すべて追加
              </button>
            </div>
            </div>
          </div>

          {/* キーワードフィルター */}
          {availableKeywords.length > 0 && (
            <div className="px-3 md:px-5 py-2 bg-ink-800/30 border-b border-sepia-700/15 flex-shrink-0">
              <button
                onClick={() => setKeywordBarOpen(o => !o)}
                className="text-sepia-500 text-xs tracking-wider mr-1 hover:text-sepia-300 transition-colors flex items-center gap-1 mb-1"
              >
                キーワード
                <span className={`transition-transform duration-150 ${(keywordBarOpen || keywordFilters.length > 0) ? 'rotate-90' : ''}`}>▶</span>
                {keywordFilters.length > 0 && (
                  <span className="ml-1 text-rose-400">（{keywordFilters.length}件選択中）</span>
                )}
              </button>
              {(keywordBarOpen || keywordFilters.length > 0) && (
                <div className="overflow-y-auto flex flex-wrap gap-1.5" style={{ maxHeight: '4.5rem' }}>
                  {availableKeywords.map(kw => (
                    <button
                      key={kw}
                      onClick={() => toggleKeyword(kw)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] border transition-colors flex-shrink-0 ${
                        keywordFilters.includes(kw)
                          ? 'bg-rose-900/40 border-rose-700/60 text-rose-300'
                          : 'border-sepia-500/60 text-sepia-100 hover:border-sepia-400/80 hover:text-paper-100'
                      }`}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              )}
              {keywordFilters.length > 0 && (
                <button
                  onClick={() => { setKeywordFilters([]); setKeywordBarOpen(false) }}
                  className="ml-1 mt-1 text-sepia-600 hover:text-sepia-400 text-xs transition-colors"
                >
                  ✕ クリア
                </button>
              )}
            </div>
          )}

          {/* イベント一覧 */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 z-10 bg-ink-900">
                <tr className="border-b border-sepia-700/30 text-left text-xs text-sepia-500 tracking-wider">
                  <th className="px-3 md:px-4 py-2 font-normal w-16 md:w-24">年</th>
                  <th className="px-2 md:px-3 py-2 font-normal">事件名</th>
                  <th className="px-3 py-2 font-normal hidden md:table-cell">カテゴリ・キーワード</th>
                  <th className="px-3 py-2 font-normal w-8"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(ev => {
                  const added = isAdded(ev)
                  return (
                    <tr
                      key={ev.id}
                      onClick={() => !added && addEvent(ev)}
                      onContextMenu={ev.isUserEvent ? (e) => {
                        e.preventDefault()
                        const ue = userEvents.find(u => u.id === ev.id)
                        if (ue) setEditingUserEvent(ue)
                      } : undefined}
                      className={`border-b border-sepia-700/15 transition-colors group/row ${
                        added
                          ? 'opacity-50 cursor-default'
                          : 'hover:bg-ink-700/60 cursor-pointer'
                      }`}
                    >
                      <td className="px-3 md:px-4 py-2.5 md:py-2 tabular-nums text-green-400 font-bold whitespace-nowrap text-xs md:text-sm">
                        {ev.event_date && dateFormat !== 1
                          ? (dateFormat === 2 ? ev.event_date : ev.event_date.slice(5))
                          : `${ev.year}年`}
                      </td>
                      <td className="px-2 md:px-3 py-2.5 md:py-2 text-paper-200 font-medium relative">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs md:text-sm">{ev.title}</span>
                          {ev.isUserEvent && (
                            <button
                              onClick={e => {
                                e.stopPropagation()
                                if (confirm(`「${ev.title}」を削除しますか？`)) deleteUserEvent(ev.id)
                              }}
                              className="flex-shrink-0 text-sepia-600 hover:text-vermilion text-xs opacity-0 group-hover/row:opacity-100 transition-all"
                              title="削除"
                            >
                              ×
                            </button>
                          )}
                        </div>
                        {/* モバイル：カテゴリバッジをタイトル下に表示 */}
                        <div className="mt-0.5 md:hidden">
                          <CategoryBadge category={ev.category} />
                        </div>
                        {ev.description && (
                          <div className="pointer-events-none absolute left-[20ch] top-full mt-1 z-50 w-80 bg-ink-950 border border-sepia-700/50 rounded-sm px-3 py-2 text-xs text-sepia-300 leading-relaxed shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity duration-150">
                            {ev.description}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2 hidden md:table-cell">
                        <div className="flex flex-wrap items-center gap-1">
                          <CategoryBadge category={ev.category} />
                          {ev.keywords?.map(kw => (
                            <button
                              key={kw}
                              onClick={e => { e.stopPropagation(); toggleKeyword(kw) }}
                              className={`px-1.5 py-0 rounded-full text-[10px] border transition-colors ${
                                keywordFilters.includes(kw)
                                  ? 'bg-rose-900/40 border-rose-700/60 text-rose-300'
                                  : 'border-sepia-500/60 text-sepia-100 hover:border-rose-700/50 hover:text-rose-400'
                              }`}
                            >
                              {kw}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        {added && <span className="text-vermilion text-xs">✓</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* 独自イベント編集ダイアログ */}
      {editingUserEvent && (
        <EditUserEventDialog
          event={editingUserEvent}
          onSave={(updates) => updateUserEvent(editingUserEvent.id, updates)}
          onClose={() => setEditingUserEvent(null)}
        />
      )}
    </div>
  )
}

// ─── CustomEventForm ──────────────────────────────────────────────

type CustomEventInput = Omit<TimelineEvent, 'id' | 'timeline_id' | 'created_at'>

// datetime-local の値 "YYYY-MM-DDThh:mm" → 保存形式 "YYYY/MM/DD HH:mm"
const toStorageDate = (v: string) =>
  v.replace('T', ' ').replace(/-/g, '/').slice(0, 16)

// 保存形式 "YYYY/MM/DD HH:mm" → datetime-local の値
const toInputDate = (v: string) =>
  v.replace(' ', 'T').replace(/\//g, '-').slice(0, 16)

// テキスト入力から年と event_date を解析
// 受け付ける形式: "YYYY" / "YYYY/MM/DD" / "YYYY/MM/DD HH:mm"
function parseDateText(s: string): { year: number; event_date: string | null } | null {
  const t = s.trim()
  if (/^\d{4}$/.test(t)) return { year: parseInt(t), event_date: null }
  if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(t)) return { year: parseInt(t.slice(0, 4)), event_date: t + ' 00:00' }
  if (/^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{2}$/.test(t)) return { year: parseInt(t.slice(0, 4)), event_date: t }
  return null
}

function CustomEventForm({ onAdd }: { onAdd: (ev: CustomEventInput) => void }) {
  const [dateInput, setDateInput] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [era, setEra] = useState<string>('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState('')
  const [wikiUrl, setWikiUrl] = useState('')
  const [error, setError] = useState('')

  const addKeyword = () => {
    const kw = keywordInput.trim()
    if (kw && !keywords.includes(kw)) setKeywords(prev => [...prev, kw])
    setKeywordInput('')
  }

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); addKeyword() }
    if (e.key === ',') { e.preventDefault(); addKeyword() }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateInput.trim()) { setError('年を入力してください'); return }
    const parsed = parseDateText(dateInput)
    if (!parsed) { setError('形式が正しくありません（例：1901 / 1901/08/15 / 1901/08/15 14:30）'); return }
    if (!title.trim()) { setError('事件名を入力してください'); return }
    setError('')
    onAdd({
      year: parsed.year,
      event_date: parsed.event_date,
      title: title.trim(),
      description: description.trim() || null,
      category: '独自イベント',
      era: era || null,
      keywords: keywords.length > 0 ? keywords : null,
      wiki_url: wikiUrl.trim() || null,
    })
    setDateInput(''); setTitle(''); setDescription('')
    setEra(''); setKeywords([]); setKeywordInput(''); setWikiUrl('')
  }

  const inputCls = 'w-full bg-ink-950 border border-sepia-700/40 rounded-sm px-2 py-1.5 text-paper-200 text-xs placeholder-sepia-600 focus:outline-none focus:border-vermilion/60 transition-colors'
  const selectCls = `${inputCls} cursor-pointer`
  const labelCls = 'block text-sepia-500 text-[10px] tracking-wider mb-1'

  return (
    <form onSubmit={handleSubmit} className="mt-2 p-3 border border-sepia-700/30 rounded-sm bg-ink-900/60 space-y-2.5">
      {/* 日時 */}
      <div>
        <label className={labelCls}>年・日時 <span className="text-vermilion">*</span></label>
        <input
          type="text"
          value={dateInput}
          onChange={e => setDateInput(e.target.value)}
          placeholder="1901 または 1901/08/15 または 1901/08/15 14:30"
          className={inputCls}
        />
      </div>

      {/* 事件名 */}
      <div>
        <label className={labelCls}>事件名 <span className="text-vermilion">*</span></label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="事件名を入力..."
          className={inputCls}
        />
      </div>

      {/* 説明 */}
      <div>
        <label className={labelCls}>説明</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="詳細な説明（任意）"
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* 時代区分 */}
      <div>
        <label className={labelCls}>時代区分</label>
        <select value={era} onChange={e => setEra(e.target.value)} className={selectCls}>
          <option value="">— 未選択 —</option>
          {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      {/* キーワード */}
      <div>
        <label className={labelCls}>キーワード（Enter または , で追加）</label>
        <div className="flex gap-1">
          <input
            type="text"
            value={keywordInput}
            onChange={e => setKeywordInput(e.target.value)}
            onKeyDown={handleKeywordKeyDown}
            placeholder="キーワード..."
            className={`${inputCls} flex-1`}
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-2 py-1.5 text-xs border border-sepia-700/40 text-sepia-400 hover:text-paper-200 hover:border-sepia-600/60 rounded-sm transition-colors"
          >
            追加
          </button>
        </div>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {keywords.map(kw => (
              <span key={kw} className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink-800 border border-sepia-700/40 text-sepia-300 text-[10px] rounded-full">
                {kw}
                <button type="button" onClick={() => setKeywords(prev => prev.filter(k => k !== kw))} className="text-sepia-500 hover:text-vermilion transition-colors">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Wikipedia URL */}
      <div>
        <label className={labelCls}>Wikipedia URL</label>
        <input
          type="url"
          value={wikiUrl}
          onChange={e => setWikiUrl(e.target.value)}
          placeholder="https://ja.wikipedia.org/wiki/..."
          className={inputCls}
        />
      </div>

      {error && <p className="text-xs text-vermilion">{error}</p>}

      <button
        type="submit"
        className="w-full bg-vermilion/20 hover:bg-vermilion/30 border border-vermilion/50 text-vermilion py-2 rounded-sm text-xs tracking-widest transition-colors"
      >
        年表に追加
      </button>
    </form>
  )
}

// ─── EditUserEventDialog ───────────────────────────────────────────

type EditUpdates = {
  year: number; title: string; description: string | null;
  era: string | null; keywords: string[] | null; wiki_url: string | null; event_date: string | null
}

function EditUserEventDialog({
  event,
  onSave,
  onClose,
}: {
  event: UserEvent
  onSave: (updates: EditUpdates) => void
  onClose: () => void
}) {
  const [dateInput, setDateInput] = useState(event.event_date ?? String(event.year))
  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(event.description ?? '')
  const [era, setEra] = useState(event.era ?? '')
  const [keywords, setKeywords] = useState<string[]>(event.keywords ?? [])
  const [keywordInput, setKeywordInput] = useState('')
  const [wikiUrl, setWikiUrl] = useState(event.wiki_url ?? '')
  const [error, setError] = useState('')

  const addKeyword = () => {
    const kw = keywordInput.trim()
    if (kw && !keywords.includes(kw)) setKeywords(prev => [...prev, kw])
    setKeywordInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateInput.trim()) { setError('年を入力してください'); return }
    const parsed = parseDateText(dateInput)
    if (!parsed) { setError('形式が正しくありません（例：1901 / 1901/08/15 / 1901/08/15 14:30）'); return }
    if (!title.trim()) { setError('事件名を入力してください'); return }
    setError('')
    onSave({
      year: parsed.year,
      event_date: parsed.event_date,
      title: title.trim(),
      description: description.trim() || null,
      era: era || null,
      keywords: keywords.length > 0 ? keywords : null,
      wiki_url: wikiUrl.trim() || null,
    })
  }

  const inputCls = 'w-full bg-ink-950 border border-sepia-700/40 rounded-sm px-2 py-1.5 text-paper-200 text-xs placeholder-sepia-600 focus:outline-none focus:border-vermilion/60 transition-colors'
  const selectCls = `${inputCls} cursor-pointer`
  const labelCls = 'block text-sepia-500 text-[10px] tracking-wider mb-1'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-ink-950 border border-sepia-700/50 rounded-sm p-5 w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-paper-200 text-sm tracking-wider">独自イベントを編集</p>
          <button onClick={onClose} className="text-sepia-500 hover:text-paper-100 text-lg leading-none transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className={labelCls}>年・日時 <span className="text-vermilion">*</span></label>
            <input
              type="text"
              value={dateInput}
              onChange={e => setDateInput(e.target.value)}
              placeholder="1901 または 1901/08/15 または 1901/08/15 14:30"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>事件名 <span className="text-vermilion">*</span></label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>説明</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
          </div>

          <div>
            <label className={labelCls}>時代区分</label>
            <select value={era} onChange={e => setEra(e.target.value)} className={selectCls}>
              <option value="">— 未選択 —</option>
              {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>キーワード（Enter または , で追加）</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') { e.preventDefault(); addKeyword() }
                  if (e.key === ',') { e.preventDefault(); addKeyword() }
                }}
                placeholder="キーワード..."
                className={`${inputCls} flex-1`}
              />
              <button type="button" onClick={addKeyword} className="px-2 py-1.5 text-xs border border-sepia-700/40 text-sepia-400 hover:text-paper-200 hover:border-sepia-600/60 rounded-sm transition-colors">追加</button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {keywords.map(kw => (
                  <span key={kw} className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink-800 border border-sepia-700/40 text-sepia-300 text-[10px] rounded-full">
                    {kw}
                    <button type="button" onClick={() => setKeywords(prev => prev.filter(k => k !== kw))} className="text-sepia-500 hover:text-vermilion transition-colors">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className={labelCls}>Wikipedia URL</label>
            <input type="url" value={wikiUrl} onChange={e => setWikiUrl(e.target.value)} placeholder="https://ja.wikipedia.org/wiki/..." className={inputCls} />
          </div>

          {error && <p className="text-xs text-vermilion">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-xs tracking-wider border border-sepia-700/40 text-sepia-400 hover:text-paper-200 rounded-sm transition-colors">
              キャンセル
            </button>
            <button type="submit" className="flex-1 bg-vermilion/20 hover:bg-vermilion/30 border border-vermilion/50 text-vermilion py-2 rounded-sm text-xs tracking-widest transition-colors">
              更 新
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
