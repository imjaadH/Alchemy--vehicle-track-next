'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import VehicleForm from '../forms/create-vehicle-form'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const CreateVehicle = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <div>
      <Button variant={'default'} onClick={() => setDialogOpen(prev => !prev)}>
        Create new Vehicle
      </Button>
      <Dialog open={dialogOpen} modal onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create a Vehicle</DialogTitle>
            <DialogDescription>Add new vehicle details here</DialogDescription>
          </DialogHeader>
          <VehicleForm onFormSubmitted={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateVehicle
