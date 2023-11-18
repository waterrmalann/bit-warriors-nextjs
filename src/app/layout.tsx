import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import UserProvider from './providers/UserProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BitWarriors',
  description: 'Competitive Coding Platform for All',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </ThemeProvider>
        </body>
    </html>
  )
}
