import { Types } from '@/types'
import { z } from 'zod'

export const vehicleSchema = z.object({
  make: z.string().min(2),
  model: z.string().min(1),
  vin: z.string().min(10),
})

export const taskSchema = z.object({
  driver_id: z.string().uuid(),
  vehicle_id: z.string().uuid(),
  location_name: z.string(),
  latitude: z.number({ message: 'location is required' }).gt(-90).lt(90),
  longitude: z.number({ message: 'location is required' }).gt(-180).lt(180),
  status: z.nativeEnum(Types.TaskStatus).optional(),
})

export const UserCreate = z.object({
  auth_provider: z.string().min(5),
  oauth_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string().email(),
  job_location: z.string(),
})

export const UserUpdate = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email_address: z.string().email(),
  job_location: z.string().nonempty(),
})

export const driverSchema = z.object({
  full_name: z.string().min(5).nonempty(),
  status: z.nativeEnum(Types.UserStatus),
})
