import { useMemo } from 'react'
import {
  FaHome,
  FaAngleDoubleDown,
  FaPhoneAlt,
  FaLocationArrow,
  FaRegCalendarAlt,
  FaTrophy,
  FaFeatherAlt,
  FaDollarSign,
  FaStar,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useContextValue } from './MapDashbard'

const MapSidebarBody = ({ mapData }) => {
  const { searchKeyword, moveClient } = useContextValue()
  const searchData = useMemo(() => {
    return [...mapData].filter((v, i) => {
      return (
        v.storeName.includes(searchKeyword) ||
        v.storeCity.includes(searchKeyword)
      )
    })
  }, [searchKeyword, mapData])
  return (
    <div>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {[...searchData].map((v, i) => {
          return (
            <div className="accordion-item" key={v.storeSid}>
              <h2
                className="accordion-header game-title"
                id={`flush-heading${v.storeSid}`}
              >
                <img
                  src={`${
                    v.storeLogo.length < 20
                      ? `Images/storeimages/${v.storeLogo}`
                      : `${v.storeLogo}`
                  }`}
                  alt=""
                />
                <button
                  className="map-basic-style accordion-button collapsed d-block"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${i}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${i}`}
                  onClick={() => {
                    moveClient(+v.storelat, +v.storelon)
                  }}
                >
                  <p>
                    <FaHome className="map-icon" />
                    <span>{v.storeName}</span>
                    <FaAngleDoubleDown style={{ float: 'right' }} />
                  </p>
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
                </button>
              </h2>
              <div
                id={`flush-collapse${i}`}
                className="accordion-collapse collapse "
                aria-labelledby={`flush-heading${i}`}
                data-bs-parent="#accordionFlushExample"
              >
                {[...v.game].map((k, i) => {
                  return (
                    <div className="accordion-body d-flex game-body" key={i}>
                      <div className="left me-3">
                        <img
                          src={`Images/gamesImages/${k.gamesImages}`}
                          alt=""
                        />
                      </div>
                      <div className="right">
                        <p>
                          <FaTrophy className="map-icon" />
                          {k.gamesName}
                        </p>
                        <p>
                          <FaFeatherAlt className="map-icon" />
                          {k.feature01} {k.feature02}
                        </p>
                        <p>
                          <FaDollarSign className="map-icon" />
                          {k.gamesPrice}
                          <FaStar
                            className="map-icon"
                            style={{ marginLeft: '10px' }}
                          />
                          {k?.commentAvg
                            ? `${parseInt(k.commentAvg * 10) / 10}`
                            : '暫無評價'}
                          {k?.commentSum ? `(${k.commentSum})` : ''}
                        </p>
                        <Link
                          to={`/order/${k.gamesSid}`}
                          className="btn btn-outline-secondary"
                        >
                          立刻前往
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MapSidebarBody
