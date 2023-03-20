import React, { useEffect, useState } from 'react'
import { ORDER } from './../../config/api_config'
import axios from 'axios'
// import "./O_Process_One.css";

const OrderInfo = {
  sid: 1,
  gamesName: '同學會',
  storeName: '智慧獵人工作室',
  storeAddress: '台北市中山區明水路581巷15號B1',
  orderDate: '2023-02-02',
  Time: '60',
  checkQuantity: 3,
  checkPrice: 1800,
  gamesImages: '1.jpg',
}

const OrderOne = () => {
  const [orderData, setOrderData] = useState([])

  // 抓kevin資料庫
  const orderGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/orderProcess/4')

    console.log('response:', response.data)
    setOrderData(response.data)
  }

  useEffect(() => {
    orderGetData()
  }, [])
  return (
    <div>
      {orderData.map((v, i) => {
        return (
          <div key={i} className="O_Process_One_Sort">
            <div className="O_Process_One_Margin">
              <h4>{v.gamesName}</h4>
              <p>工作室:{v.storeName}</p>
              <p>地址:{v.storeAddress}</p>
              <p>預約日期:{v.orderDate}</p>
              <p>遊玩時間:{v.Time}分鐘</p>
              <p>遊玩人數:{v.checkQuantity}人</p>
              <p className="O_Process_One_Sum">總金額:{v.checkPrice}</p>
            </div>
            <div style={{ width: '300px' }}>
              <img
                // src={`/Images/orders/${v.gamesImages}`}
                src={`/Images/orders/${v.gamesLogo}`}
                alt=""
                className="O_Process_One_GameImg"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default OrderOne
