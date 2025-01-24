'use client'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { createVehicle, updateVehicle } from '@/app/dashboard/vehicles/actions'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { vehicleSchema } from '@/schemas'
import { Types } from '@/types'

type FormSchema = z.infer<typeof vehicleSchema>

interface VehicleFormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.Vehicle
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  onFormSubmitted,
  defaultData,
}) => {
  const mutation = useMutation({
    mutationFn: async (values: FormSchema & { id?: string }) =>
      !defaultData
        ? await createVehicle(values)
        : await updateVehicle(values, values.id!!),
  })
  const { toast } = useToast()

  const form = useForm<FormSchema>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      ...defaultData,
    },
  })

  async function onSubmit(values: FormSchema) {
    if (defaultData) {
      //update vehicle
      mutation.mutate({ ...values, id: defaultData.id })
    } else {
      //create vehicle
      mutation.mutate(values)
    }
  }

  useEffect(() => {
    const toastMessage = defaultData
      ? 'Vehicle updated'
      : '✔ Vehicle added successfully'

    if (mutation.data) {
      const response = mutation.data
      if (response.type === 'success') {
        toast({
          title: toastMessage,
        })
        /* hide form dialog */
        if (onFormSubmitted) {
          onFormSubmitted()
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
        })
      }
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

        <Button type='submit' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Save changes
        </Button>
      </form>
    </Form>
  )
}

export default VehicleForm
