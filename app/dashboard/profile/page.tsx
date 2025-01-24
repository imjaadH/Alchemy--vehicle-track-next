import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'
import { authOptions } from '@/lib/auth'
import { FindUserById } from '@/app/utils/actions'
import UserForm from '@/components/forms/user-profile-form'

export const metadata: Metadata = {
  title: 'Alchemy Tracks - Profile',
}
const ProfilePage = async () => {
  const serverSession: any = await getServerSession(authOptions)
  const user = await FindUserById(serverSession.id as string)

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Your Profile</h3>
      <p className='text-gray-500'>manage your profile here</p>
      <div className='grid md:grid-cols-4'>
        <div className='md:col-span-2 md:col-start-2'>
          {user && <UserForm defaultData={user} />}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
