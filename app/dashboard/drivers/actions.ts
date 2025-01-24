'use server'

import { prisma } from '@/lib/prisma'
import { driverSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type Response = {
  message: string
  type: 'success' | 'error'
  error?: string
}

const createDriver = async (driver: any): Promise<Response> => {
  await wait(3000)
  try {
    const validation = driverSchema.safeParse(driver)

    if (validation.success) {
      await prisma.driver.create({
        data: driver,
      })
      revalidatePath('/dashboard/drivers')

      return {
        message: 'Driver created successfully',
        type: 'success',
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    return {
      error: 'Failed to create driver',
      message: 'Failed to create driver',
      type: 'error',
    }
  }
}

const updateDriver = async (driver: any, id: string) => {
  const validation = driverSchema.safeParse(driver)

  if (validation.success) {
    await prisma.driver.update({
      where: {
        id: `${id}`,
      },
      data: driver,
    })

    revalidatePath('/dashboard/drivers')
    redirect('/dashboard/drivers')
  }
}

const getAllDrivers = async () => {
  const records = await prisma.driver.findMany({
    orderBy: {
      created: 'desc',
    },
  })
  return records
}

const findDriverById = async (id: string) => {
  const driver = await prisma.driver.findFirst({
    where: {
      id: id,
    },
  })

  return driver
}

const removeDriver = async (id: string) => {
  const response = await prisma.driver.delete({
    where: {
      id: id,
    },
  })
  revalidatePath('/dashboard/drivers')
}

export {
  createDriver,
  getAllDrivers,
  findDriverById,
  removeDriver,
  updateDriver,
}

function wait(duration: number) {
  return new Promise(res => {
    setTimeout(res, duration)
  })
}
