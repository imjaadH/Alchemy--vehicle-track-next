'use client'

import { useMap } from 'react-leaflet'

const ChangeView = ({
  center,
  zoom,
}: {
  center: [number, number]
  zoom: number
}) => {
  const map = useMap()

  map.setView(center, zoom)
  return null
}

export default ChangeView
