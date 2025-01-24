import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/providers/SessionProvider'
import { twMerge } from 'tailwind-merge'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/providers/QueryProvider'

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
    <html lang='en'>
      <body className={twMerge(`antialiased`, font.className)}>
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
