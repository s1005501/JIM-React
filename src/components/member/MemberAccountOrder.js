import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import { FaArrowCircleRight } from 'react-icons/fa'
import { ACCOUNT } from '../../config/api_config'
import moment from 'moment'
import MemberAccountAside from './MemberAccountAside'

function MemberAccountOrder() {
  const { getOrderData } = useContext(MemberAuthContext)

  const navigate = useNavigate()
  const [orderData, setOrderData] = useState([])
  useEffect(() => {
    getOrderData(ACCOUNT, setOrderData)
  }, [])
  return (
    <>
      <main className="m-memberAccountMain ">
    
        <MemberAccountAside />
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
                        <td>{v.orderSid}</td>
                        <td>
                          {v.orderState == 0
                            ? '未完成'
                            : v.orderState == 1
                            ? '已完成'
                            : '訂單取消'}
                        </td>
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
