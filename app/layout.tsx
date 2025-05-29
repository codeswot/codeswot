import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Codeswot',
  description: 'I am Mubarak Ibrahim an intermediate developer with 5 years experience who loves to code, I am skilled with in-depth understanding in Mobile application development and Website development',
  generator: 'Codeswot',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
