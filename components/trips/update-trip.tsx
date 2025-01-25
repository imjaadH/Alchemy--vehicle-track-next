'use client'

import { getAllDrivers } from '@/app/dashboard/drivers/actions'
import { getVehicles } from '@/app/dashboard/vehicles/actions'
import { useQuery } from '@tanstack/react-query'
import TripForm from '../forms/create-trip-form'
import { Types } from '@/types'
import UpdateTripForm from '../forms/update-trip-form'

interface Props {
  tripData?: Types.Task
}
export const UpdateTrip: React.FC<Props> = props => {
  const vehiclesQuery = useQuery({
    queryKey: ['all-vehicles'],
    queryFn: () => getVehicles(),
  })
  const driversQuery = useQuery({
    queryKey: ['all-drivers'],
    queryFn: () => getAllDrivers(),
  })
  const isFetchingData = driversQuery.isFetching || vehiclesQuery.isFetching
  return (
    <div className='md:col-span-2 md:col-start-3'>
      {vehiclesQuery.data && driversQuery.data && !isFetchingData && (
        <UpdateTripForm
          vehicles={vehiclesQuery.data.sort((a, b) =>
            a.make > b.make ? 1 : -1,
          )}
          defaultData={props.tripData ?? undefined}
          drivers={driversQuery.data}
        />
      )}
    </div>
  )
}
