import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import { useContextValue } from '../../ContextDashbard'
import MapDashbard from './MapDashbard'
import MapSidebar from './MapSidebar'
import MapContent from './MapContent'
import MapPhone from './MapPhone'
// import { MapSidebar, MapContent, MapPhone } from './MapComponent'
// import MapDashbard from './MapDashbard'
import './map.css'
const Map = () => {
  const [mapData, setMapData] = useState([])
  const { getBackData } = useContextValue()

  useEffect(() => {
    getBackData('http://localhost:3005/map', setMapData)
  }, [])

  return (
    <>
      <MapDashbard>
        <MapSidebar mapData={mapData} />
        <MapContent mapData={mapData} />
        <MapPhone mapData={mapData} />
      </MapDashbard>
    </>
  )
}

export default Map
