import { z } from 'zod'

export const VehicleCreate = z.object({
  make: z.string().min(2),
  model: z.string().min(1),
  vin: z.string().min(10),
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

export const DriverCreate = z.object({
  full_name: z.string().nonempty(),
  status: z.string().nonempty(),
})
