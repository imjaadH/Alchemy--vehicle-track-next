import { findDriverById } from '@/app/dashboard/drivers/actions'
import DriverForm from '@/components/forms/create-driver-form'

const UpdateDriverPage = async ({
  params,
}: {
  params: { driverId: string }
}) => {
  const response = await findDriverById(params.driverId)

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Update Vehicle</h3>
      <p className='text-gray-500'>manage your vehicle here</p>
      <div className='md:mx-auto grid md:grid-cols-6 '>
        <div className='md:col-span-2 md:col-start-3'>
          <DriverForm defaultData={response ?? undefined} />
        </div>
      </div>
    </div>
  )
}

export default UpdateDriverPage
