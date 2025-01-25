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
    <div className='bg-neutral-50 h-full'>
      <div className='grid grid-cols-4 gap-4 h-full'>
        <div className='col-span-1 overflow-auto'>
          <TripsList data={tripsData ?? []} />
        </div>
        <div className='col-span-3 h-full p-4'>
          <div className='inline-flex w-full h-full'>
            <MapView position={[51.505, -0.09]} />
          </div>
        </div>
      </div>
    </div>
  )
}
