'use client'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FieldError } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { taskSchema } from '@/schemas'
import { Types } from '@/types'
import { createTrip, updateTrip } from '@/app/dashboard/trips/actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { AddressSearchInput } from '../trips/address-search-input'

type FormSchema = z.infer<typeof taskSchema>

interface FormProps {
  vehicles: Types.Vehicle[]
  drivers: Types.Driver[]
  onFormSubmitted?: () => void
  defaultData?: Types.Task
}

const UpdateTripForm: React.FC<FormProps> = ({
  onFormSubmitted,
  defaultData,
  drivers,
  vehicles,
}) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultData,
  })

  const mutation = useMutation({
    mutationFn: async (values: FormSchema & { id?: string }) =>
      await updateTrip(values, values.id!!),
  })

  async function onSubmit(values: FormSchema) {
    if (defaultData) {
      //update trip
      mutation.mutate({ ...values, id: defaultData.id })
    }
  }

  useEffect(() => {
    const toastMessage = defaultData
      ? 'Trip updated'
      : '✔ Trip added successfully'

    if (mutation.data) {
    }
  }, [mutation.status])

  const loading = mutation.status === 'pending'
  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {mutation.error && (
          <div className='text-red-600'>Could not perform this action..</div>
        )}
        <div className='grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='latitude'
            render={({ field }) => (
              <FormItem>
                <AddressSearchInput
                  defaultLocation={
                    defaultData && {
                      name: defaultData?.location_name,
                      coordinates: {
                        latitude: defaultData?.latitude,
                        longitude: defaultData?.longitude,
                      },
                    }
                  }
                  onAddress={data => {
                    form.setValue('latitude', data.coordinates.latitude, {
                      shouldValidate: true,
                    })
                    form.setValue('longitude', data.coordinates.longitude, {
                      shouldValidate: true,
                    })
                    form.setValue('location_name', data.name)
                  }}
                />
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='driver_id'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Driver</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='col-span-3'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select driver' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {drivers.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='vehicle_id'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Vehicle</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='col-span-3'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select vehicle' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.make} {item.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='col-span-3'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(Types.TaskStatus).map(item => (
                      <SelectItem key={item} value={item.toString()}>
                        {item.toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Save changes
        </Button>
      </form>
    </Form>
  )
}

export default UpdateTripForm
