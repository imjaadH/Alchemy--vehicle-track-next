'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import TripForm from '../forms/create-trip-form'
import { useQuery } from '@tanstack/react-query'
import { getAllDrivers } from '@/app/dashboard/drivers/actions'
import { getVehicles } from '@/app/dashboard/vehicles/actions'
import { Loader2 } from 'lucide-react'

const CreateTrip = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
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
    <div>
      <Button variant={'default'} onClick={() => setDialogOpen(prev => !prev)}>
        Create new Trip
      </Button>
      <Dialog open={dialogOpen} modal onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create a Trip</DialogTitle>
            <DialogDescription>Add new trip details here</DialogDescription>
            {isFetchingData && (
              <div className='text-sm'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin mx-auto' />
              </div>
            )}
          </DialogHeader>
          {vehiclesQuery.data && driversQuery.data && !isFetchingData && (
            <TripForm
              onFormSubmitted={() => setDialogOpen(false)}
              vehicles={vehiclesQuery.data.sort((a, b) =>
                a.make > b.make ? 1 : -1,
              )}
              drivers={driversQuery.data}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
