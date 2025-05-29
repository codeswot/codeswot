import type { Metadata } from 'next'
import { Source_Code_Pro } from 'next/font/google'
import './globals.css'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

export const metadata: Metadata = {
  title: 'Codeswot',
  description: 'I am Mubarak Ibrahim an intermediate developer with 5 years experience who loves to code, I am skilled with in-depth understanding in Mobile application development and Website development',
  generator: 'Codeswot',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceCodePro.variable}`}>
      <body>{children}</body>
    </html>
  )
}
