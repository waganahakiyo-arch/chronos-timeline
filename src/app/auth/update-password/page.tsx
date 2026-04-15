'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('パスワードが一致しません')
      return
    }
    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('パスワードを変更しました。ログイン画面へ移動します...')
      setTimeout(() => router.push('/'), 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-ink-900 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-vermilion/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-vermilion text-5xl select-none">✦</span>
          <h1 className="text-4xl font-bold tracking-widest text-paper-100 mb-2 mt-4">年代記</h1>
          <p className="text-sepia-300 text-sm tracking-wider">パスワードの再設定</p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-vermilion/50 to-transparent" />
        </div>

        <div className="bg-ink-800 border border-sepia-700/40 rounded-sm p-8 shadow-ink paper-texture">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest text-sepia-300 mb-2">
                新しいパスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-ink-950 border border-sepia-700/50 rounded-sm px-4 py-3 text-paper-100 placeholder-sepia-600 focus:outline-none focus:border-vermilion/70 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-sepia-300 mb-2">
                パスワードの確認
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
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
              {loading ? '処理中...' : '変 更'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
