import CreateDriver from '@/components/drivers/create-driver'
import { getAllDrivers } from './actions'
import { columns } from './columns'
import { DataTable } from './data-table'

const DriversPage = async () => {
  const resposne = await getAllDrivers()
  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Your Drivers</h3>
      <p className='text-gray-500'>manage your drivers here</p>
      <section className='mt-6 md:max-w-6xl mx-auto'>
        <div className='flex justify-end'>
          <CreateDriver />
        </div>
        <DataTable columns={columns} data={resposne ?? []} />
      </section>
    </div>
  )
}

export default DriversPage
