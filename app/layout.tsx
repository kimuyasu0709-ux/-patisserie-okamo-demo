import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
})

const notoSerifJP = Noto_Serif_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap"
})

export const metadata: Metadata = {
  title: 'Pâtisserie OKAMO | 金沢の洋菓子店',
  description: '石川県金沢市にあるパティスリー「OKAMO」。素材にこだわった本格フランス菓子をお届けします。',
  generator: 'v0.app',
  keywords: ['パティスリー', '金沢', '洋菓子', 'ケーキ', 'フランス菓子', 'OKAMO'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2D5A3D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${notoSerifJP.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
