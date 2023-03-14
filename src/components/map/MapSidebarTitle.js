import moment from 'moment/moment'

import { useContextValue } from './MapDashbard'

const MapSidebarTitle = () => {
  const { searchKeyword, setSearchKeyword } = useContextValue()
  return (
    <div>
      <h3 className="p-2 ">{moment().format('dddd')}</h3>
      <h3>{moment().format('YYYY-MM-DD')}</h3>

      <div className="searchBar">
        <input
          type="text"
          className="search"
          placeholder="搜尋地區、店名"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default MapSidebarTitle
