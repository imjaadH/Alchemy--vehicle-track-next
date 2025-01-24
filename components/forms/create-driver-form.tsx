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
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { driverSchema, vehicleSchema } from '@/schemas'
import { Types } from '@/types'
import { createDriver, updateDriver } from '@/app/dashboard/drivers/actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type FormSchema = z.infer<typeof driverSchema>

interface FormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.Driver
}

const DriverForm: React.FC<FormProps> = ({ onFormSubmitted, defaultData }) => {
  const mutation = useMutation({
    mutationFn: async (values: FormSchema & { id?: string }) =>
      defaultData
        ? await updateDriver(values, values.id!!)
        : await createDriver(values),
  })
  const { toast } = useToast()

  const form = useForm<FormSchema>({
    resolver: zodResolver(driverSchema),
    defaultValues: { ...defaultData },
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
      ? 'Driver updated'
      : '✔ Driver added successfully'

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
            name='full_name'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Full name</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='full name' {...field} />
                </FormControl>
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
                    {Object.keys(Types.UserStatus).map(item => (
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

export default DriverForm
