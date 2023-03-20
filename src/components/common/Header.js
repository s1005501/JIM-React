import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  AiFillEnvironment,
  AiOutlineComment,
  AiOutlinePoweroff,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'
import { checkToken, useContextValue } from '../../ContextDashbard'
import Swal from 'sweetalert2'
function Header() {
  const { render, setRender, getBackData } = useContextValue()
  const navigate = useNavigate()
  const [memberClick, setMemberClick] = useState(false)

  const [menuClick, setMenuClick] = useState(false)
  const [menuBtn, setMenuBtn] = useState(true)

  const [signinData, setSigninData] = useState([])
  const handleToggleMenu = () => {
    setMemberClick(!memberClick)
  }

  const handleToggleBtn = () => {
    setMenuBtn(!menuBtn)
    setMenuClick(!menuClick)
  }

  useEffect(() => {
    if (!!checkToken('memberAuth')?.memberToken) {
      getBackData(
        `http://localhost:3005/signin/signinData/member?sid=${
          checkToken('memberAuth')?.membersid
        }`,
        setSigninData
      )
    } else if (!!checkToken('token')?.token) {
      getBackData(
        `http://localhost:3005/signin/signinData/store?sid=${
          checkToken('token')?.sid
        }`,
        setSigninData
      )
    }
  }, [render])
  useEffect(() => {
    window.addEventListener(
      'click',
      (e) => {
        if (e.target.innerHTML !== 'MENU') setMenuClick(false)
        if (e.target.className !== 'memberImg') setMemberClick(false)
      },
      false
    )
  }, [])
  return (
    <>
      <header className="headerId">
        {/* <!-- 電腦版 --> */}
        <nav>
          <div className="memberMain">
            <ul className={memberClick ? 'member_click' : 'member_none'}>
              <div className={memberClick ? 'memberOnon' : 'memberOffoff'}>
                {!!checkToken('memberAuth')?.memberToken ? (
                  <li className="memberLi">
                    <NavLink to="/member">
                      <AiOutlineUser /> 會員
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {!!checkToken('token')?.token ? (
                  <li className="memberLi">
                    <NavLink to="/store">
                      <AiOutlineUser /> 工作室
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}

                {!!checkToken('memberAuth')?.memberToken ||
                !!checkToken('token')?.token ? (
                  <li
                    className="memberLi"
                    onClick={() => {
                      localStorage.removeItem('token')
                      localStorage.removeItem('memberAuth')
                      Swal.fire({
                        title: '成功登出!',
                        text: `成功登出`,
                        icon: 'success',
                        confirmButtonText: '確認',
                      })
                      navigate('/')
                    }}
                  >
                    <AiOutlinePoweroff /> 登出
                  </li>
                ) : (
                  <li className="memberLi" style={{ paddingTop: '45px' }}>
                    <NavLink to="/signin">
                      <AiOutlinePoweroff /> 登入
                    </NavLink>
                  </li>
                )}
              </div>
            </ul>
            <span className="memberBtn" onClick={handleToggleMenu}>
              {!!checkToken('memberAuth')?.memberToken ||
              !!checkToken('token')?.token ? (
                !!checkToken('memberAuth')?.memHeadshot ? (
                  <img
                    className="memberImg"
                    src={`/Images/uploads/${signinData[0]?.memHeadshot}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="memberImg"
                    src={
                      signinData[0]?.storeLogo.length > 20
                        ? `/Images/uploads/${signinData[0]?.storeLogo}`
                        : `/Images/storeimages/${signinData[0]?.storeLogo}`
                    }
                    alt=""
                  />
                )
              ) : (
                <img className="memberImg" src={'/Images/member.png'} alt="" />
              )}
              {/* <img className="memberImg" src={'/Images/member.png'} alt="" /> */}
            </span>
          </div>
          {/* <img
                    className="memberImg"
                    src={`Images/uploads/${
                      checkToken('memberAuth')?.memHeadshot
                    }`}
                    alt=""
                  /> */}
          <div className="menuMain">
            <ul className={menuClick ? 'menu_click' : 'menu_none'}>
              <div className={menuClick ? 'menuOnon' : 'menuOffoff'}>
                <li className="menu_link">
                  <NavLink to="/games">
                    <AiOutlineShoppingCart /> 遊戲
                  </NavLink>
                </li>
                {/* <li className="menu_link">
                  <NavLink to="/store">
                    <AiOutlineShop /> 店家
                  </NavLink>
                </li> */}
                <li className="menu_link">
                  <NavLink to="/map">
                    <AiFillEnvironment /> 地圖
                  </NavLink>
                </li>
                <li className="menu_link">
                  <NavLink to="/comment">
                    <AiOutlineComment /> 討論
                  </NavLink>
                </li>
                {/* <li className="menu_link">
                  <NavLink to="/order">
                    <AiOutlineComment /> 訂單(暫)
                  </NavLink>
                </li> */}
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
