import { signOut } from 'next-auth/react'
import { HiOutlineLogout } from 'react-icons/hi'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export const SignOutButton: React.FC = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className='group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'>
            <HiOutlineLogout size={22} className='text-red-800' />
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure about this?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <form
                action={() =>
                  signOut({
                    callbackUrl: '/user/signin',
                    redirect: true,
                  })
                }
              >
                <button type='submit'>Sign out</button>
              </form>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
