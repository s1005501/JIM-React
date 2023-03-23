import { NavLink, useParams } from 'react-router-dom'
import './MenuStoreVertical.css'
const MenuHorizontal = () => {
  const { action } = useParams()
  return (
    <div className="Menu-horizontal">
      <ul className="list-unstyled text-center d-flex flex-column flex-lg-row flex-xxl-column justify-content-evenly text-nowrap horizontal">
        <li>
          <NavLink to="/store" className={!action ? 'clicked' : ''}>
            訂單紀錄
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/store/gamelist"
            className={action == 'gamelist' ? 'clicked' : ''}
          >
            遊戲管理
          </NavLink>
        </li>
        <li>
          <NavLink to="/store/add" className={action == 'add' ? 'clicked' : ''}>
            新增遊戲
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/store/information"
            className={action == 'information' ? 'clicked' : ''}
          >
            工作室資料
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default MenuHorizontal
