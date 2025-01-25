import { UpdateTrip } from '@/components/trips/update-trip'
import { getTripById } from '../../actions'

interface Props {
  params: {
    tripId: string
  }
}
const UpdateTripPage = async ({ params }: Props) => {
  const response = await getTripById(params.tripId)

  return (
    <div className='p-5'>
      <h3 className='text-2xl font-semibold'>Update Trip</h3>
      <p className='text-gray-500'>manage your vehicle here</p>
      <div className='md:mx-auto grid md:grid-cols-6 '>
        <UpdateTrip tripData={response ?? undefined} />
      </div>
    </div>
  )
}

export default UpdateTripPage
