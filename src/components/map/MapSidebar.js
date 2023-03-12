import MapSidebarBody from './MapSidebarBody'
import MapSidebarTitle from './MapSidebarTitle'

const MapSidebar = ({ mapData }) => {
  return (
    <div className={'map-basic-style sidebar'}>
      <MapSidebarTitle />
      <MapSidebarBody mapData={mapData} />
    </div>
  )
}

export default MapSidebar
