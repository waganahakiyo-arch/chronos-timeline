'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function toJapaneseError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'メールアドレスまたはパスワードが正しくありません'
  if (msg.includes('Email not confirmed')) return 'メールアドレスの確認が完了していません'
  if (msg.includes('User already registered')) return 'このメールアドレスはすでに登録されています'
  if (msg.includes('Password should be')) return 'パスワードは6文字以上で入力してください'
  if (msg.includes('Unable to validate email')) return '有効なメールアドレスを入力してください'
  return 'エラーが発生しました。しばらくしてから再度お試しください。'
}

export default function AuthForm() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const supabase = createClient()

  const handleGuestLogin = async () => {
    setGuestLoading(true)
    setError('')
    try {
      const res = await fetch('/api/guest-login', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'ゲストログイン失敗')
      await supabase.auth.setSession({ access_token: json.access_token, refresh_token: json.refresh_token })
      router.push('/app')
      router.refresh()
    } catch {
      setError('ゲストログインに失敗しました')
    } finally {
      setGuestLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/app')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('確認メールを送信しました。メールをご確認ください。')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(toJapaneseError(err.message))
      } else {
        setError('エラーが発生しました。しばらくしてから再度お試しください。')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-ink-800 border border-sepia-700/40 rounded-sm p-8 shadow-ink paper-texture">
      {/* タブ切り替え */}
      <div className="flex mb-8 border-b border-sepia-700/40">
        <button
          onClick={() => { setMode('login'); setError(''); setMessage('') }}
          className={`flex-1 pb-3 text-sm tracking-widest transition-colors ${
            mode === 'login'
              ? 'text-vermilion border-b-2 border-vermilion -mb-px'
              : 'text-sepia-400 hover:text-paper-200'
          }`}
        >
          ログイン
        </button>
        <button
          onClick={() => { setMode('signup'); setError(''); setMessage('') }}
          className={`flex-1 pb-3 text-sm tracking-widest transition-colors ${
            mode === 'signup'
              ? 'text-vermilion border-b-2 border-vermilion -mb-px'
              : 'text-sepia-400 hover:text-paper-200'
          }`}
        >
          新規登録
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs tracking-widest text-sepia-300 mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="メールアドレスを入力"
            className="w-full bg-ink-950 border border-sepia-700/50 rounded-sm px-4 py-3 text-paper-100 placeholder-sepia-600 focus:outline-none focus:border-vermilion/70 transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest text-sepia-300 mb-2">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={6}
            className="w-full bg-ink-950 border border-sepia-700/50 rounded-sm px-4 py-3 text-paper-100 placeholder-sepia-600 focus:outline-none focus:border-vermilion/70 transition-colors text-sm"
          />
        </div>

        {error && (
          <p className="text-vermilion-light text-sm bg-vermilion/10 border border-vermilion/30 rounded-sm px-3 py-2">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-400 text-sm bg-green-900/20 border border-green-700/30 rounded-sm px-3 py-2">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-vermilion hover:bg-vermilion-light disabled:opacity-50 disabled:cursor-not-allowed text-paper-100 py-3 rounded-sm text-sm tracking-widest font-medium transition-colors"
        >
          {loading ? '処理中...' : mode === 'login' ? '入 場' : '登 録'}
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-sepia-700/30">
        <button
          onClick={handleGuestLogin}
          disabled={guestLoading}
          className="w-full py-2.5 text-xs tracking-wider border border-sepia-700/40 text-sepia-400 hover:border-sepia-500/60 hover:text-sepia-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
        >
          {guestLoading ? '接続中...' : 'ログインせず使う（全ユーザ共通のゲストで利用）'}
        </button>
        <p className="mt-2 text-center text-sepia-600 text-[10px] tracking-wide">
          ゲストのデータは全利用者で共有されます
        </p>
      </div>
    </div>
  )
}
