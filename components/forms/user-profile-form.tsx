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
import { UpdateUser, UpdateVehicle } from '@/app/utils/actions'
import { useToast } from '@/hooks/use-toast'
import { Types } from '@/types'

const formSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email_address: z.string().email(),
  job_location: z.string().nonempty(),
})

interface UserFormProps {
  onFormSubmitted?: () => void
  defaultData?: Types.User
}

const UserForm: React.FC<UserFormProps> = ({
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
      await UpdateUser(values, defaultData.id)
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
            name='first_name'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>First name</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='first name' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Last name</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='last name' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_location'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Work Location</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='work location' {...field} />
                </FormControl>
                <FormMessage className='col-span-4' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email_address'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel>Email</FormLabel>
                <FormControl className='col-span-3'>
                  <Input placeholder='email' {...field} disabled />
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

export default UserForm
