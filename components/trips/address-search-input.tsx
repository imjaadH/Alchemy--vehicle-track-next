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

import { useMemo, useState } from 'react'
import { Loader2, MapPin } from 'lucide-react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/use-debounce'

const getSearchResults = async (search: string) => {
  if (!search.length) return
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
  defaultLocation?: Point
}

export const AddressSearchInput: React.FC<InputProps> = props => {
  const [searchText, setSearchText] = useState('')
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(
    props.defaultLocation ?? null,
  )

  const debouncedText = useDebounce(searchText)

  const { data: results, isPending } = useQuery({
    queryKey: ['address-search', debouncedText],
    queryFn: () => getSearchResults(debouncedText),
    refetchOnWindowFocus: false,
  })

  const suggestions = useMemo(() => {
    if (searchText === '') return []
    return results?.data
  }, [searchText, results])

  return (
    <div>
      <Command>
        <CommandInput
          placeholder='Search a location...'
          onValueChange={setSearchText}
          value={searchText}
        />

        <CommandList>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}

          {suggestions && (
            <CommandGroup>
              {suggestions.map((item: any, index: number) => (
                <CommandItem
                  key={index}
                  onSelect={item => {
                    setSelectedPoint(suggestions[index])
                    setSearchText('')
                    props.onAddress(suggestions[index])
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
