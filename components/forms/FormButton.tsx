'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

export const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <div>
      <Button type='submit' disabled={pending}>
        Save changes
      </Button>
    </div>
  )
}
