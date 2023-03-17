import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import { FaArrowCircleRight } from 'react-icons/fa'
import { ACCOUNT } from '../../config/api_config'
import moment from 'moment'

function MemberAccountOrder() {
  const { getOrderData } = useContext(MemberAuthContext)

  const navigate = useNavigate()
  const [orderData, setOrderData] = useState([])
  useEffect(() => {
    getOrderData(ACCOUNT, setOrderData)
  }, [])
  return (
    <>
      {/* <div className="m-bearBg"></div>
      <div className="m-blackBg"></div> */}
      <main className="m-memberAccountMain ">
        <aside className="memberAside">
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/order')
            }}
          >
            <p>訂單紀錄</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/comment')
            }}
          >
            <p>評論紀錄</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/like')
            }}
          >
            <p>收藏</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member')
            }}
          >
            <p>個人資料</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/level')
            }}
          >
            <p>會員等級</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
        </aside>
        <div className="container">
          <div className="row">
            <div className="m-memberAccountDiv">
              <h1>會員中心</h1>
            </div>
            <div className="col m-orderMainContext">
              <h1>訂單紀錄</h1>
              <table>
                <thead>
                  <tr>
                    <th>訂單日期</th>
                    <th>訂單編號</th>
                    <th>訂單狀態</th>
                    <th>預約日期</th>
                    <th>張數</th>
                    <th>總金額</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((v, i) => {
                    return (
                      <tr key={v.orderSid}>
                        <td>{moment(v.create_at).format('YYYY-MM-DD')}</td>
                        <td>{v.orderNumber}</td>
                        <td>{v.orderState}</td>
                        <td>{v.orderDate}</td>
                        <td>{v.checkQuantity}</td>
                        <td>{v.checkPrice}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberAccountOrder
