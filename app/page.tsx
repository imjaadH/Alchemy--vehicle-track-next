import { ArrowUpRight } from 'lucide-react'

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
