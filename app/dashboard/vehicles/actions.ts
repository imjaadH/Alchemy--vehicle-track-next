'use server'
import { prisma } from '@/lib/prisma'
import { vehicleSchema } from '@/schemas'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Response = {
  message: string
  type: 'success' | 'error'
  error?: string
}

const createVehicle = async (vehicle: any): Promise<Response> => {
  try {
    const validation = vehicleSchema.safeParse(vehicle)

    if (validation.success) {
      await prisma.vehicle.create({
        data: vehicle,
      })
      revalidatePath('/dashboard/vehicles')

      return {
        message: 'Vehicle created successfully',
        type: 'success',
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    return {
      error: 'Failed to create vehicle',
      message: 'Failed to create vehicle',
      type: 'error',
    }
  }
}

const updateVehicle = async (data: any, id: string) => {
  const validation = vehicleSchema.safeParse(data)
  if (validation.success) {
    await prisma.vehicle.update({
      where: {
        id: `${id}`,
      },
      data: data,
    })
    revalidatePath('/dashboard/vehicles')
    redirect('/dashboard/vehicles')
  }

  throw new Error('Error occured')
}

const removeVehicle = async (id: string) => {
  await prisma.vehicle.delete({
    where: {
      id: id,
    },
  })
  revalidatePath('/dashboard/vehicles')
}

const getVehicleById = async (vehicleId: string) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: `${vehicleId}`,
    },
  })

  return vehicle
}

const getVehicles = async () => {
  const records = await prisma.vehicle.findMany({
    orderBy: {
      created: 'desc',
    },
  })
  return records
}

export {
  createVehicle,
  updateVehicle,
  removeVehicle,
  getVehicleById,
  getVehicles,
}
