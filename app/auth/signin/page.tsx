'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import GoogleIcon from '@/public/images/google-icon.svg'
import { signIn } from 'next-auth/react'

const LoginPage = () => {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
        <img
          className='lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded'
          alt='hero'
          src='https://blogger.googleusercontent.com/img/a/AVvXsEhcKwI-zoO6Gb1kDJ3E6DgZpcDdilvJQBgGJDQK9XXHkOJUH4jyb2acHNMR2aECkWHqn2RP8K2Uii5IKkV7S2eYNO0FCL-3DNdGvLyoPrNULqNrhVhlhVBQMDX8SUChrJdPT9g89caLFWLRI0vGYaGHbVY6SXHT2QdqeT4IzWdoaKIX6kAlU9Lsc0zMXu0=s1600-rw'
        />
        <div className='text-center lg:w-2/3 w-full'>
          <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
            Track Your Drivers On the Go
          </h1>
          <p className='mb-8 leading-relaxed'>
            Alchemy Tracks makes tracking your assets a breeze
          </p>
          <div className='flex justify-center'>
            <Button
              variant={'outline'}
              className='flex gap-3'
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            >
              <Image src={GoogleIcon} alt='google' width={20} height={20} />
              Login With Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
