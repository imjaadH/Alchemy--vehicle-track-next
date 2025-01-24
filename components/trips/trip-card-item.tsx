'use client'
import { TripType } from '@/app/dashboard/trips/columns'
import { cn } from '@/lib/utils'
import { ArrowRight, MapIcon, MoveUpRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  data: TripType
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
      <p
        className={cn(
          `font-semibold text-black text-sm ${isActive && 'text-blue-900'}`,
        )}
      >
        {data?.location_name}
      </p>

      <div>
        <p className='font-regular text-gray-500 text-sm  '>
          {data?.driver.full_name}
        </p>

        <div className='flex gap-2 items-end'>
          <p className='font-regular text-gray-500 text-sm  '>
            {data?.vehicle.make} {data?.vehicle.model}
          </p>

          <ArrowRight size={15} className={cn(`text-gray-500`)} />
        </div>
      </div>
    </div>
  )
}

export default TripCard
