import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/providers/SessionProvider'
import { twMerge } from 'tailwind-merge'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alchemy Tracks - Home',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={twMerge(
          `antialiased bg-gray-50 dark:bg-neutral-900`,
          font.className,
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <QueryProvider>{children}</QueryProvider>
          </SessionProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
