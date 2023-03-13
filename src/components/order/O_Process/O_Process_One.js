import React from 'react'
// import "./O_Process_One.css";

const OrderInfo = {
  sid: 1,
  name: '同學會',
  store: '智慧獵人工作室',
  address: '台北市中山區明水路581巷15號B1',
  orderdate: '2023-02-02',
  gametime: '60',
  people: 3,
  amount: 1800,
}

const OrderOne = () => {
  return (
    <div style={{}}>
      <div className="O_Process_One_Sort">
        <div className="O_Process_One_Margin">
          <h5>{OrderInfo.name}</h5>
          <p>工作室:{OrderInfo.store}</p>
          <p>地址:{OrderInfo.address}</p>
          <p>預約日期:{OrderInfo.orderdate}</p>
          <p>遊玩時間:{OrderInfo.gametime}分鐘</p>
          <p>遊玩人數:{OrderInfo.people}人</p>
          <p className="O_Process_One_Sum">總金額:{OrderInfo.amount}</p>
        </div>
        <div>
          <img
            src="./Images/orders/Game1.png"
            alt=""
            className="O_Process_One_GameImg"
          />
        </div>
      </div>
    </div>
  )
}
export default OrderOne
