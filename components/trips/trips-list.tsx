'use client'
import TripCard from './trip-card-item'
import { Input } from '../ui/input'
import { useState } from 'react'
import { TripType } from '@/app/dashboard/trips/columns'

interface Props {
  data: any[]
}

const TripsList = ({ data }: Props) => {
  const [searchText, setSearchText] = useState<string>('')

  return (
    <div className='bg-white p-2 border-e h-full'>
      <div className=' my-2 px-2 mt-4'>
        <label className='sr-only'> Search </label>

        <div className='flex items-center'>
          <Input
            placeholder='search vehicle or driver...'
            onChange={e => setSearchText(e.target.value.trim().toLowerCase())}
            className='focus:border-transparent focus:outline-0 focus:ring-0 focus:border-0'
          />
        </div>
      </div>
      <div className='text-sm text-gray-500 font-semibold'>
        Trips ({data?.length ?? '...'})
      </div>

      <div className='flex flex-col mt-1'>
        {data
          ?.filter(
            (item: TripType) =>
              (item?.driver.full_name).toLowerCase().includes(searchText) ||
              (item?.vehicle.make).toLowerCase().includes(searchText) ||
              (item?.vehicle.model).toLowerCase().includes(searchText),
          )
          .map((item, index) => (
            <TripCard key={index} data={item} />
          ))}
      </div>
    </div>
  )
}

export default TripsList
