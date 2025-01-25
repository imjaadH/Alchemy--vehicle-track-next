'use client'

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ChangeView from './change-map-view'
import { Icon } from 'leaflet'

const MapView = (props: any) => {
  const [position, setPosition] = useState(props.position)
  const searchParams = useSearchParams()

  const search = searchParams.get('location')
  useEffect(() => {
    if (search) {
      const lat = search.split(',')[0]
      const lng = search.split(',')[1]
      setPosition([Number(lat), Number(lng)])
    }
  }, [search])
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 10,
      }}
      className='border-2 border-gray-100 shadow-md'
    >
      <ChangeView center={position} zoom={12} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={position}
        icon={
          new Icon({
            iconUrl: 'https://img.icons8.com/?size=48&id=40258&format=png',
            iconSize: [35, 35],
            iconAnchor: position,
            popupAnchor: [-3, -76],
          })
        }
      ></Marker>
    </MapContainer>
  )
}

export default MapView
