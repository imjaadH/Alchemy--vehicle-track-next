'use client'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { useState } from 'react'
import { Loader2, MapPin, Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

const getSearchResults = async (search: string) => {
  const response = await fetch(`/api/trips/places?query=${search}`)
  return response.json()
}

type Point = {
  name: string
  coordinates: {
    latitude: number
    longitude: number
  }
}
interface InputProps {
  onAddress: (value: Point) => void
}
export const AddressSearchInput: React.FC<InputProps> = props => {
  const [searchText, setSearchText] = useState('')
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)

  const { data: results, isPending } = useQuery({
    queryKey: ['address-search', searchText],
    queryFn: () => getSearchResults(searchText),
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      <Command>
        <CommandInput
          placeholder='Search a location...'
          onValueChange={setSearchText}
          value={searchText}
        />

        <CommandList onSelect={e => console.log(e)}>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}

          {results?.data && (
            <CommandGroup>
              {results.data?.map((item: any, index: number) => (
                <CommandItem
                  key={index}
                  onSelect={item => {
                    setSelectedPoint(results?.data[index])
                    setSearchText('')
                    props.onAddress(results?.data[index])
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        {selectedPoint && (
          <div className='flex py-2 px-4 text-sm rounded bg-gray-100 text-gray-900 gap-2 items-center'>
            <MapPin size={16} />
            {selectedPoint.name}
          </div>
        )}
      </Command>
    </div>
  )
}
