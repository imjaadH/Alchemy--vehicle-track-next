import { Types } from '@/types'
import TripCard from './trip-card-item'
import { TripType } from '@/app/dashboard/trips/columns'

interface Props {
  data: any[]
}
const TripsList = ({ data }: Props) => {
  return (
    <div className='bg-white p-2 border-e h-full '>
      <div className=' my-2 px-2 mt-4'>
        <label className='sr-only'> Search </label>

        <input
          type='text'
          id='Search'
          placeholder='Search for...'
          className='w-full rounded-md px-2 border-gray-200 border  py-2.5 pe-10 shadow-sm sm:text-sm'
        />
      </div>
      <div className='text-sm text-gray-500 font-semibold'>
        Trips ({data?.length ?? '...'})
      </div>

      <div className='flex flex-col mt-1'>
        {data?.map((item, index) => (
          <TripCard key={index} data={item} />
        ))}
      </div>
    </div>
  )
}

export default TripsList
