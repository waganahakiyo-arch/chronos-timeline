import AuthForm from '@/components/auth/AuthForm'
import SampleTimelines from '@/components/landing/SampleTimelines'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-900 px-4 py-10">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-vermilion/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16 justify-center">
        {/* 左：ログイン */}
        <div className="w-full max-w-md mx-auto lg:mx-0 flex-shrink-0">
          {/* ロゴ */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <span className="text-vermilion text-5xl select-none">✦</span>
            </div>
            <h1 className="text-4xl font-bold tracking-widest text-paper-100 mb-2">
              年代記
            </h1>
            <p className="text-sepia-300 text-sm tracking-wider">
              歴史年表アーカイブ
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-vermilion/50 to-transparent" />
          </div>

          <AuthForm />

          <p className="text-center text-sepia-400 text-xs mt-8 tracking-wide">
            歴史の流れを、自分だけの年表に刻む
          </p>
        </div>

        {/* 右：サンプル年表 */}
        <div className="w-full max-w-md mx-auto lg:mx-0 pt-0 lg:pt-24">
          <SampleTimelines />
        </div>
      </div>
    </main>
  )
}
