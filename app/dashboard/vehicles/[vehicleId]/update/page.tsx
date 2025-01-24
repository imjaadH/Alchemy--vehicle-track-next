import VehicleForm from '@/components/forms/create-vehicle-form'
import { getVehicleById } from '@/app/dashboard/vehicles/actions'

const UpdateVehiclePage = async ({
  params,
}: {
  params: { vehicleId: string }
}) => {
  const response = await getVehicleById(params.vehicleId)

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Update Vehicle</h3>
      <p className='text-gray-500'>manage your vehicle here</p>
      <div className='md:mx-auto grid md:grid-cols-6 '>
        <div className='md:col-span-2 md:col-start-3'>
          <VehicleForm defaultData={response ?? undefined} />
        </div>
      </div>
    </div>
  )
}

export default UpdateVehiclePage
