import { DataTable } from './data-table'
import { columns, TripType } from './columns'
import CreateTrip from '@/components/trips/create-trip'
import { getAllTrips } from './actions'

const TripsPage = async () => {
  const trips = await getAllTrips()

  console.log(trips)

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Your Trips</h3>
      <p className='text-gray-500'>manage your trips here</p>
      <section className='mt-6 md:max-w-6xl mx-auto'>
        <div className='flex justify-end'>
          <CreateTrip />
        </div>
        <DataTable columns={columns} data={trips ?? []} />
      </section>
    </div>
  )
}

export default TripsPage
