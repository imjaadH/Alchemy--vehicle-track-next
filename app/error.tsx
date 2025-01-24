'use client'

import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export default function ErrorPage() {
  return (
    <div className='text-center space-y-4'>
      <h2 className='text-xl font-semibold'>Internal server error</h2>
      <p>The page you requested failed to load.</p>
      <Button onClick={() => location.reload()}>
        <RotateCcw /> Reload page
      </Button>
    </div>
  )
}
