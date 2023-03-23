import React, { createContext, useContext, useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'

const Context = createContext(null)
const MapDashbard = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [nowcenter, setNowcenter] = useState([
    25.03387410019818, 121.54339144016454,
  ])

  const RecenterAutomatically = () => {
    const map = useMap()
    useEffect(() => {
      map.setView(nowcenter, 19)
    }, [nowcenter])
    return null
  }

  const moveClient = (lat, lon) => {
    setNowcenter([lat, lon])
  }
  // Group style
  // const markerClusterGroupIcon = (v) => {
  //   return new divIcon({
  //     html: `<div className="cluster-icon">${v.getChildCount()}</div>`,
  //     className: 'custom-marker-cluster',
  //     iconSize: point(33, 33, true),
  //   })
  // }

  return (
    <Context.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        nowcenter,
        setNowcenter,
        RecenterAutomatically,
        moveClient,
      }}
    >
      <div className="d-flex position-relative minh storeAndMap index-map">
        {children}
      </div>
    </Context.Provider>
  )
}

export default MapDashbard

export const useContextValue = () => useContext(Context)
