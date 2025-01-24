'use server'
import { prisma } from '@/lib/prisma'
import { UserCreate, UserUpdate, vehicleSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Response = {
  message: string
  type: 'success' | 'error'
  error?: string
}

const UpdateVehicle = async (data: unknown, id: string) => {
  const body = vehicleSchema.parse(data)

  await prisma.vehicle.update({
    where: {
      id: `${id}`,
    },
    data: {
      ...body,
    },
  })
  revalidatePath('/dashboard/vehicles')
  redirect('/dashboard/vehicles')
}

const UpdateUser = async (data: unknown, id: string) => {
  const body = UserUpdate.parse(data)

  await prisma.user.update({
    where: {
      id: `${id}`,
    },
    data: {
      ...body,
    },
  })
  revalidatePath('/dashboard/profile')
  redirect('/dashboard/')
}
const GetVehicleById = async (vehicleId: string) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: `${vehicleId}`,
    },
  })

  return vehicle
}

const RemoveVehicle = async (id: string) => {
  await prisma.vehicle.delete({
    where: {
      id: id,
    },
  })
  revalidatePath('/dashboard/vehicles')
}

const FindUserById = async (userId: string, provider?: string) => {
  const user = await prisma.user.findFirst({
    where: {
      oauth_id: userId,
    },
  })
  return user
}

const CreateUser = async (data: unknown) => {
  const body = UserCreate.parse(data)
  await prisma.user.create({
    data: body,
  })
}

const GetVehicles = async () => {
  const records = await prisma.vehicle.findMany({
    orderBy: {
      created: 'desc',
    },
  })
  return records
}

export {
  FindUserById,
  CreateUser,
  GetVehicles,
  RemoveVehicle,
  GetVehicleById,
  UpdateVehicle,
  UpdateUser,
}
