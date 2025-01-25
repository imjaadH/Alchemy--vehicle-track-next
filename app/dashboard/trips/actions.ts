'use server'

import { prisma } from '@/lib/prisma'
import { taskSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type Response = {
  message: string
  type: 'success' | 'error'
  error?: string
}
const createTrip = async (trip: any) => {
  try {
    const validation = taskSchema.safeParse(trip)

    if (validation.success) {
      await prisma.task.create({
        data: trip,
      })
      revalidatePath('/dashboard/trips')

      return {
        message: 'Trip created successfully',
        type: 'success',
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    return {
      error: 'Failed to create trip',
      message: 'Failed to create trip',
      type: 'error',
    }
  }
}

const getAllTrips = async () => {
  const records = await prisma.task.findMany({
    orderBy: {
      created: 'desc',
    },
    include: {
      driver: true,
      vehicle: true,
    },
  })
  return records
}

const removeTrip = async (tripId: string) => {
  await prisma.task.delete({
    where: {
      id: tripId,
    },
  })
  revalidatePath('/dashboard/trips')
}

const getTripById = async (tripId: string) => {
  const trip = await prisma.task.findUnique({
    where: {
      id: `${tripId}`,
    },
  })

  return trip
}

const updateTrip = async (data: any, id: string) => {
  const validation = taskSchema.safeParse(data)
  if (validation.success) {
    await prisma.task.update({
      where: {
        id: `${id}`,
      },
      data: data,
    })
    revalidatePath('/dashboard/trips')
    redirect('/dashboard/trips')
  }

  throw new Error('Error occured')
}
export { createTrip, getAllTrips, removeTrip, getTripById, updateTrip }
