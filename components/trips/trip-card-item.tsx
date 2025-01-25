'use client'
import { TripType } from '@/app/dashboard/trips/columns'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Activity, CircleCheck, Clock, MapPin } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  data: TripType
}

const statusIcon = {
  STARTED: <Activity size={15} className='text-orange-600' />,
  PENDING: <Clock size={15} className='text-gray-500' />,
  COMPLETED: <CircleCheck size={15} className='text-lime-600' />,
}

const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams()
  params.set(name, value)

  return params.toString()
}
const TripCard = ({ data }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get('location')

  const isActive = search?.includes(String(data?.latitude))

  return (
    <div
      onClick={() =>
        router.push(
          '/dashboard?' +
            createQueryString(
              'location',
              `${data?.latitude},${data?.longitude}`,
            ),
        )
      }
      className={cn(
        `flex flex-col gap-1 border-b px-2 py-4 hover:bg-slate-100 hover:rounded-lg cursor-pointer`,
        isActive && 'bg-gray-100 rounded-lg',
      )}
    >
      <div className='flex items-center gap-1'>
        <MapPin size={15} className={cn(`${isActive && 'text-blue-950'}`)} />
        <p
          className={cn(
            `font-semibold text-gray-800 text-sm ${
              isActive && 'text-blue-900'
            }`,
          )}
        >
          {data?.location_name}
        </p>
      </div>

      <div>
        <p className='font-regular text-gray-500 text-sm  '>
          {data?.driver.full_name}
        </p>

        <div className='flex gap-2 items-end'>
          <p className='font-regular text-gray-500 text-sm  '>
            {data?.vehicle.make} {data?.vehicle.model}
          </p>
        </div>

        <div className='mt-3 flex items-center gap-2'>
          <div title={data.status.toLowerCase()}>
            {statusIcon[data?.status]}
          </div>
          <p className='font-regular text-gray-500 text-xs'>
            {format(data?.created, 'LLLL d, yyyy')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TripCard
