'use client'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AddVehicle, UpdateVehicle } from '@/app/utils/actions'
import { useToast } from '@/hooks/use-toast'
import { Vehicle } from '@/app/dashboard/vehicles/columns'

const formSchema = z.object({
  make: z.string().min(2),
  model: z.string().min(2),
  vin: z.string().min(10),
})

interface VehicleFormProps {
  vehicleId?: string
  onFormSubmitted?: () => void
  defaultData?: Vehicle
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  vehicleId,
  onFormSubmitted,
  defaultData,
}) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultData,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (defaultData) {
      //update vehicle
      await UpdateVehicle(values, defaultData.id)
    } else {
      //create vehicle
      await AddVehicle(values)
      form.reset({})
      toast({
        title: 'Vehicle added successfully',
      })
    }

    if (onFormSubmitted) {
      onFormSubmitted()
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='make'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Make</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='make' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='model'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Model</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='model' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='vin'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Vin</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='vin' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit'>Save changes</Button>
      </form>
    </Form>
  )
}

export default VehicleForm
