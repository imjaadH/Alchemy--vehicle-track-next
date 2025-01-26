'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import LoginButton from '../login-button'
import { ThemeButton } from './theme-button'

interface NavbarProps {
  children?: React.ReactNode
  className?: string
}

const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        `sticky top-0 border-b h-14 py-2 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`,
        className,
      )}
    >
      <div className='max-w-screen-2xl mx-auto flex items-center h-full justify-between py-2 px-2 md:px-8'>
        <p className='text-blue-800 font-bold font-mono '>Alchemy Tracks</p>

        <div className='flex items-center gap-2'>
          <ThemeButton />
          <LoginButton />
        </div>
      </div>
      {/* {children} */}
    </header>
  )
}

export default Navbar
