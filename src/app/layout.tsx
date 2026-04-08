import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '年代記 — 歴史年表サービス',
  description: '歴史の流れを自分だけの年表に刻む',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSerifJP.variable}>
      <body className="min-h-screen bg-ink-900 text-paper-100 font-serif">
        {children}
      </body>
    </html>
  )
}
