import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  AiFillEnvironment,
  AiOutlineComment,
  AiOutlinePoweroff,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'

function Header() {
  const [memberClick, setMemberClick] = useState(false)

  const [menuClick, setMenuClick] = useState(false)
  const [menuBtn, setMenuBtn] = useState(true)

  const handleToggleMenu = () => {
    setMemberClick(!memberClick)
  }

  const handleToggleBtn = () => {
    setMenuBtn(!menuBtn)
    setMenuClick(!menuClick)
  }

  return (
    <>
      <header className="headerId">
        {/* <!-- 電腦版 --> */}
        <nav>
          <div className="memberMain">
            <ul className={memberClick ? 'member_click' : 'member_none'}>
              <div className={memberClick ? 'memberOnon' : 'memberOffoff'}>
                <li className="memberLi">
                  <NavLink to="/member">
                    <AiOutlineUser /> 會員
                  </NavLink>
                </li>
                <li className="memberLi">
                  <NavLink to="/">
                    <AiOutlinePoweroff /> 登出
                  </NavLink>
                </li>
              </div>
            </ul>
            <span className="memberBtn" onClick={handleToggleMenu}>
              <img className="memberImg" src="/Images/member.png" alt="" />
            </span>
          </div>

          <div className="menuMain">
            <ul className={menuClick ? 'menu_click' : 'menu_none'}>
              <div className={menuClick ? 'menuOnon' : 'menuOffoff'}>
                <li className="menu_link">
                  <NavLink to="/games">
                    <AiOutlineShoppingCart /> 遊戲
                  </NavLink>
                </li>
                <li className="menu_link">
                  <NavLink to="/store">
                    <AiOutlineShop /> 店家
                  </NavLink>
                </li>
                <li className="menu_link">
                  <NavLink to="/map">
                    <AiFillEnvironment /> 地圖
                  </NavLink>
                </li>
                <li className="menu_link">
                  <NavLink to="/">
                    <AiOutlineComment /> 討論
                  </NavLink>
                </li>
              </div>
            </ul>
            <span
              className={menuBtn ? 'menu' : 'menu_active'}
              onClick={handleToggleBtn}
              style={{ cursor: 'pointer' }}
            >
              MENU
            </span>
          </div>
        </nav>
      </header>

      {/* 電腦版手機板 */}
      <div className="headBannerMain">
        <div className="headBannerBlank">
          <Link to="/">
            <div className="headBanner"></div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
