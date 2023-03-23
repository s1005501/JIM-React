import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  AiFillEnvironment,
  AiOutlineComment,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiFillFacebook,
  AiOutlinePoweroff
  
} from 'react-icons/ai'
import {FaSignOutAlt}from'react-icons/fa'
import { BsLine } from 'react-icons/bs'
import { checkToken } from '../../ContextDashbard'
import Swal from 'sweetalert2'
function Footer() {
  const navigate = useNavigate()
  return (
    <>
      <footer className="footerId bg-black">
        <div className="container g-0">
          <div className="row text-center g-0 flex-sm-row flex-column ">
            <div className="col">
              <h5 className="mb-3">認識平台</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" title="關於平台">
                    關於平台
                  </Link>
                </li>
                <li>
                  <Link to="/" title="使用者條款">
                    使用條款
                  </Link>
                </li>
                <li>
                  <Link to="/" title="常見問題與幫助">
                    相關問題
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5 className="mb-3">給玩家</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" title="合作夥伴">
                    合作夥伴
                  </Link>
                </li>
                <li>
                  <Link to="/" title="會員好禮">
                    會員好禮
                  </Link>
                </li>
                <li>
                  <Link to="/" title="兌換商品">
                    兌換商品
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5 className="mb-3">合作夥伴</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" title="註冊廠商">
                    註冊廠商
                  </Link>
                </li>
                <li>
                  <Link to="/" title="廠商登入">
                    廠商登入
                  </Link>
                </li>
                <li>
                  <Link to="/" title="同業合作">
                    同業合作
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>聯絡我們</h5>
              <span>
                <Link className="iconFooter" to="/">
                  <AiFillFacebook />
                </Link>
              </span>
              <span>
                <Link className="iconFooter" to="/">
                  <BsLine />
                </Link>
              </span>
            </div>
          </div>

          <div className="copyright">Copyright@2023JIM All Rights Reserve</div>
          <div className="blankDiv"></div>
        </div>
      </footer>

      {/* 手機版  */}
      <div className="footerNavbarId">
        <div className="footerNavbar">
          <ul className="footerNavbarUl">
            <li>
              <NavLink to="/games">
                <AiOutlineShoppingCart />
                <p>遊戲</p>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/member">
                <AiOutlineUser />
                <p>會員</p>
              </NavLink>
            </li> */}
            {!!checkToken('memberAuth')?.memberToken ? (
                  <li >
                    <NavLink to="/member">
                      <AiOutlineUser />   <p>會員</p>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {!!checkToken('token')?.token ? (
                  <li >
                    <NavLink to="/store">
                      <AiOutlineUser />   <p>工作室</p>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
            {/* <li>
              <NavLink to="/store">
                <AiOutlineShop />
                <p>店家</p>
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/map">
                <AiFillEnvironment />
                <p>地圖</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/comment">
                <AiOutlineComment />
                <p>討論</p>
              </NavLink>
            </li>
            {!!checkToken('memberAuth')?.memberToken ||
                !!checkToken('token')?.token ? (
                  <li
                    onClick={() => {
                      localStorage.removeItem('token')
                      localStorage.removeItem('memberAuth')
                      Swal.fire({
                        title: '成功登出!',
                        text: `成功登出`,
                        icon: 'success',
                        confirmButtonText: '確認',
                      })
                      navigate('/firstPage')
                    }}
                  >
                   <FaSignOutAlt /> <p>登出</p>
                  </li>
                ) : (
                  <li >
                    <NavLink to="/signin">
                      <AiOutlinePoweroff /> <p>登入</p>
                    </NavLink>
                  </li>
                )}
            {/* <li   onClick={() => {
                      localStorage.removeItem('token')
                      localStorage.removeItem('memberAuth')
                      Swal.fire({
                        title: '成功登出!',
                        text: `成功登出`,
                        icon: 'success',
                        confirmButtonText: '確認',
                      })
                      navigate('/firstPage')
                    }}>
              <NavLink to="/comment">
                <FaSignOutAlt />
                <p>登出</p>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer
