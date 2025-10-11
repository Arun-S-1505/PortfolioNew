import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/navbar'
import ThemeToggle from '@/components/theme-toggle'
import LoadingScreen from '@/components/loading-screen'

export const metadata: Metadata = {
  title: 'Arun Saravanan S - Portfolio',
  description: 'Portfolio of Arun Saravanan S - Web Developer & Designer',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LoadingScreen />
        <Navbar />
        <ThemeToggle />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
