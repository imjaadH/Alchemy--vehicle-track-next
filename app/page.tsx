import { BackgroundLines } from '@/components/ui/background-lines'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRightCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const HomePage = () => {
  return (
    <a href={'/dashboard'}>
      Welcome to Alchemy Tracks
      <div className='text-lg text-black font-semibold border rounded p-2 flex gap-2'>
        Get started
        <ArrowUpRight />
      </div>
    </a>
  )
}

export default HomePage
