import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { FaPhoneAlt, FaLocationArrow, FaRegCalendarAlt } from 'react-icons/fa'
import 'leaflet/dist/leaflet.css'

import { useContextValue } from './MapDashbard'
import { customIcon, nowIcon } from './MapIcons'
const MapContent = ({ mapData }) => {
  const { nowcenter, RecenterAutomatically, setSearchKeyword, moveClient } =
    useContextValue()

  return (
    <MapContainer center={nowcenter} zoom="19">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
      // Group style
      // chunkedLoading
      // iconCreateFunction={markerClusterGroupIcon}
      >
        <Marker
          position={[25.03387410019818, 121.54339144016454]}
          icon={nowIcon}
        >
          <Popup>
            <div>
              <p>現在的位置</p>
            </div>
          </Popup>
        </Marker>
        {mapData.map((v, i) => {
          return (
            <Marker
              position={[+v.storelat, +v.storelon]}
              icon={customIcon}
              key={i}
            >
              <Popup>
                <div>
                  <div className="position-relative map-card">
                    <div className="position-absolute top-0 start-0 translate-middle">
                      <img
                        src={`${
                          v.storeLogo.length < 20
                            ? `Images/storeimages/${v.storeLogo}`
                            : `${v.storeLogo}`
                        }`}
                        alt=""
                      />
                    </div>
                    <h5 style={{ marginLeft: '30px' }}>{v.storeName}</h5>
                    <p>
                      <FaPhoneAlt className="map-icon" />
                      {v.storeMobile}
                    </p>
                    <p>
                      <FaLocationArrow className="map-icon" />
                      {v.storeAddress}
                    </p>
                    <p>
                      <FaRegCalendarAlt className="map-icon" />
                      營業時間：{v.storeTime}
                      {v.storeRest ? `,休息日：${v.storeRest}` : ''}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setSearchKeyword(v.storeName)
                        moveClient(+v.storelat, +v.storelon)
                      }}
                    >
                      了解更多
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MarkerClusterGroup>
      <RecenterAutomatically zoom={13} />
    </MapContainer>
  )
}

export default MapContent
