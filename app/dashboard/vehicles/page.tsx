import { DataTable } from './data-table'
import { columns } from './columns'
import CreateVehicle from '@/components/vehicles/create-vehicle'
import type { Metadata } from 'next'
import { getVehicles } from './actions'

export const metadata: Metadata = {
  title: 'Alchemy Tracks - Vehicles',
}

const VehiclesPage = async () => {
  const resposne = await getVehicles()

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Your Vehicles</h3>
      <p className='text-gray-500'>manage your vehicles here</p>
      <section className='mt-6 md:max-w-6xl mx-auto'>
        <div className='flex justify-end'>
          <CreateVehicle />
        </div>
        <DataTable columns={columns} data={resposne ?? []} />
      </section>
    </div>
  )
}

export default VehiclesPage
