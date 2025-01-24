import dynamic from 'next/dynamic'
import TripsList from '@/components/trips/trips-list'
import { getAllTrips } from './trips/actions'

export default async function Home() {
  const tripsData = await getAllTrips()

  const MapView = dynamic(() => import('@/components/map-view'), {
    ssr: false,
    loading: () => <p>loading map...</p>,
  })
  return (
    <div className='bg-neutral-50'>
      <div className='grid grid-cols-4'>
        <div className='col-span-1'>
          <TripsList data={tripsData ?? []} />
        </div>
        <div className='col-span-3 w-[100%] h-full'>
          <MapView position={[51.505, -0.09]} />
        </div>
      </div>
    </div>
  )
}
