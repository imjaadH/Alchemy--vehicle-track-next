'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import DriverForm from '../forms/create-driver-form'

const CreateDriver = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <div>
      <Button variant={'default'} onClick={() => setDialogOpen(prev => !prev)}>
        Create new Driver
      </Button>
      <Dialog open={dialogOpen} modal onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create a Driver</DialogTitle>
            <DialogDescription>Add new driver details here</DialogDescription>
          </DialogHeader>
          <DriverForm onFormSubmitted={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateDriver
