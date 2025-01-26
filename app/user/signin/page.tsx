'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import GoogleIcon from '@/public/images/google-icon.svg'
import { signIn } from 'next-auth/react'
import { BackgroundBeams } from '@/components/ui/background-beams'

const LoginPage = () => {
  return (
    <section className='text-white body-font  bg-neutral-950 h-full'>
      <div className='text-center lg:w-2/3 w-full contianer mx-auto flex flex-col items-center justify-center h-full'>
        <h1 className='relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500  text-center font-sans font-bold'>
          Alchemy Track
        </h1>
        <p className='text-neutral-500 max-w-lg mx-auto my-2 text-sm md:text-lg text-center relative z-10 xs:mx-2'>
          Alchemy Tracks helps you manage your vehicles and trips
        </p>

        <div className='flex md:flex-row flex-col items-center gap-2 self-center justify-center text-neutral-200 text-sm mt-10 '>
          <div className='rounded-full p-1 px-3 border-2 border-purple-900'>
            🌟 Add your vehicles
          </div>
          <div className='rounded-full p-1 px-3 border-2 border-blue-800'>
            🌟 Add your drivers
          </div>
          <div className='rounded-full p-1 px-3 border-2 border-cyan-900'>
            🌟 Create new Trips
          </div>
        </div>
        <div className='flex justify-center mt-6 z-50 sm:mt-10'>
          <Button
            variant={'outline'}
            className='flex gap-3 bg-neutral-950 text-white'
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            <Image src={GoogleIcon} alt='google' width={20} height={20} />
            Login With Google
          </Button>
        </div>
      </div>
      <BackgroundBeams />
    </section>
  )
}

export default LoginPage
