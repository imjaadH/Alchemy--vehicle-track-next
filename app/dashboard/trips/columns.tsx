'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { parseISO, format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Types } from '@/types'
import { removeVehicle } from '@/app/dashboard/vehicles/actions'
import { removeTrip } from './actions'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type TripType = Types.Task & {
  driver: Types.Driver
  vehicle: Types.Vehicle
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'driver',
    header: 'Driver',
    accessorFn: row => row.driver.full_name,
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle',
    accessorFn: row => row.vehicle.make + ' ' + row.vehicle.model,
  },
  {
    accessorKey: 'location_name',
    header: 'Destination',
  },
  {
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => {
      return <div>{format(row.original.created, 'LLLL d, yyyy')}</div>
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const trip = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/dashboard/trips/${trip.id}/update`}>
              <DropdownMenuItem className='cursor-pointer'>
                Update
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-red-600 cursor-pointer hover:text-red-950'
              onClick={() => removeTrip(trip.id)}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
