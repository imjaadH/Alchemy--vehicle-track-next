import { Skeleton } from '@/components/ui/skeleton'

export default function VehicleUpdateSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-10 rounded-md' />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-24 rounded-md' />
      </div>
      <div className='flex justify-end'>
        <Skeleton className='h-10 w-[110.5px] rounded-md' />
      </div>
    </div>
  )
}
