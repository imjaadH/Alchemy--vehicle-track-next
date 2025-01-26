import dynamic from 'next/dynamic'
import TripsList from '@/components/trips/trips-list'
import { getAllTrips } from './trips/actions'
import { Loader2 } from 'lucide-react'

export default async function Home() {
  const tripsData = await getAllTrips()

  const MapView = dynamic(() => import('@/components/map-view'), {
    ssr: false,
    loading: () => <Loader2 className='mr-2 h-4 w-4 animate-spin' />,
  })
  return (
    <div className=' h-full'>
      <div className='grid grid-rows-3 md:grid-cols-4  md:gap-4 gap-2 h-full'>
        <div className='md:col-span-1 row-span-2 md:row-span-3 overflow-auto h-full'>
          <TripsList data={tripsData ?? []} />
        </div>
        <div className='md:col-span-3 row-span-1 md:row-span-3 h-full p-4 z-0'>
          <div className='inline-flex w-full h-full'>
            <MapView position={[51.505, -0.09]} />
          </div>
        </div>
      </div>
    </div>
  )
}
