import React, { useState, useEffect, useRef } from 'react'
import {
  Link,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom'
import { Button, message, Steps, theme, Modal } from 'antd'
import { ORDER } from '../../components/config/api_config'
import axios from 'axios'
import Swal from 'sweetalert2'
import OrderProcessOne from './O_Process/O_Process_One'
import OrderProcessTwo from './O_Process/O_Process_Two'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useContextValue } from '../../ContextDashbard'

// const Order = {
//   orderSid: 1,
//   orderNumber: 1677779977,
//   orderDate: '2023-3-15',
//   orderTime: '11:00',
//   checkQuantity: 3,
//   checkPrice: 1800,
// }

function OrderProcess() {
  console.log(useContextValue)
  const { getBackData } = useContextValue()
  // -------------------------------------
  const memberAuth = JSON.parse(localStorage.getItem('memberAuth')) //抓會員編號

  const [level, setLevel] = useState([])

  useEffect(() => {
    console.log('9999999999999999999999999999999999999999999999999999999')
    getBackData(
      `http://localhost:3005/order/ordermemLevel/${memberAuth.membersid}`,
      // `http://localhost:3005/order/ordermemLevel/2`,
      setLevel
    )
  }, [])
  let n = 0
  switch (parseInt(level[0]?.memLevel)) {
    case 1: {
      n = 0.9
      break
    }
    case 2: {
      n = 0.8
      break
    }
    case 3: {
      n = 0.7
      break
    }
  }
  console.log(n, 41)
  const navigate = useNavigate() //回預約頁

  const orderInfoLocalStorage = JSON.parse(localStorage.getItem('orderInfo'))

  // 步驟4訂單資料呈現
  const [orderData, setOrderData] = useState([])
  const [orderResult, setOrderResult] = useSearchParams() //抓取按line後成立的訂單編號
  console.log(orderResult.get('orderId'))
  // const [lineOrderSid, setLineOrderSid] = useState('')
  // console.log(lineOrderSid, 99999999999999999999999999)
  const lineOrderSid = useRef('')
  // 抓kevin資料庫
  const orderGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(
      ORDER + `/orderProcess/${orderResult.get('orderId')}`
    )
    console.log('response:', response.data)
    setOrderData(response.data)
  }
  useEffect(() => {
    orderGetData()
  }, [lineOrderSid.current])

  const steps = [
    {
      title: '訂單清單',
      content: (
        <div>
          <OrderProcessOne />
        </div>
      ),
    },
    {
      title: '填寫資料',
      content: (
        <div>
          <OrderProcessTwo />
        </div>
      ),
    },
    {
      title: '付款資訊',
      content: (
        <div>
          <div className="O_Process_Three_Sort">
          <h3 className="text-center">
              總金額 : {orderInfoLocalStorage.price} 尚未付款
            </h3>
            {console.log(orderInfoLocalStorage)}
            <Button
              type="light"
              onClick={async () => {
                const {
                  sid,
                  member,
                  people,
                  price,
                  gamesName,
                  time,
                  date,
                  orderUsername,
                  orderPhone,
                  orderEmail,
                  orderDiscount,
                } = orderInfoLocalStorage
                const orderId = parseInt(new Date().getTime() / 1000)
                const neworderId = orderId.toString()
                console.log(orderId, 555)
                lineOrderSid.current = neworderId
                console.log(sid, member, people, price, gamesName, time, date)
                const r = await axios.post(
                  `http://localhost:3005/linepay/createOrder/${orderId}?sid=${1}&member=${member}&gamesid=${sid}&people=${people}&cash=${price}&prod=${gamesName}&time=${time}&date=${date}&name=${orderUsername}&tel=${orderPhone}&email=${orderEmail}&discount=${orderDiscount}`
                )
                console.log(r.data)
                if (!!r.data.linePayUrl) {
                  window.location.href = r.data.linePayUrl
                }
              }}
            >
              Line Pay 付款
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: '完成訂單',
      content: (
        <div>
          <div className="O_Process_Four_Sort">
            {orderData.map((v, i) => {
              return (
                <div key={i}>
                  <h3>預約編號 :{v.orderSid}</h3>
                  <p>付款方式 : Line Pay</p>
                  <p>預約日期 : {v.orderDate}</p>
                  <p>預約時間 : {v.orderTime}</p>
                  <p>預約人數 : {v.checkQuantity}</p>
                  <p>訂單總額 : ${v.checkPrice}</p>
                </div>
              )
            })}

            <div>
              <Button
                className="O_Process_Four_HomeBtn"
                onClick={() => {
                  navigate('/firstPage')
                }}
              >
                回首頁
              </Button>
              <Button
                className="O_Process_Four_MemberBtn"
                onClick={() => {
                  navigate('/member/order')
                }}
              >
                查看我的預約訂單
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ]

  // -----------------------------------------

  const { token } = theme.useToken()
    // 流程下面的框框內容及CSS
    const contentStyle = {
      // lineHeight: "260px",
      // height:"600px",
      textAlign: 'center',
      color: token.colorTextTertiary,
      backgroundColor: token.colorFillAlter,
      // borderRadius: token.borderRadiusLG,
      // border: `1px dashed ${token.colorBorder}`,
    }
  // ------------------------------------如要修改步驟條內容，要找上面steps的內容修改---------------
  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  // ----------下一頁上一頁的部分
  const [current, setCurrent] = useState(0)
  console.log(current)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const [search, setSearch] = useSearchParams()
  useEffect(() => {
    console.log(search?.get('order'))
    if (!!search?.get('orderId')) {
      setCurrent(3)
    }
  }, [])

  // -------------步驟2的button---------

  // 有使用過優惠券，要在資料庫改掉便已使用-----還在改中
  // const memberAuth = JSON.parse(localStorage.getItem('memberAuth')) //抓會員編號

  // const [uDiscount, setUDiscount] = useState('')
  // // 抓kevin資料庫
  // const discountData = async () => {
  //   axios.defaults.withCredentials = true
  //   const response = await axios.get(ORDER + `/discount/${memberAuth}`)

  //   console.log('response:', response.data)
  //   setUDiscount(response.data)
  // }
  // useEffect(() => {
  //   discountData()
  // }, [])

  // console.log(orderInfoLocalStorage.orderDiscount)

  // const postData = ()=>{
  //   if (uDiscount.discountID === orderInfoLocalStorage.orderDiscount

  //     )
  // }

  const OrderPaymentClick = () => {
    Swal.fire({
      title: '成功!',
      text: `資料確認，請付款`,
      icon: 'success',
      confirmButtonText: '確認',
    })
    next()
  }

  return (
    <>
      <div className="bodyContainer">
        <div className="leftContainer">
          <Link to="/firstPage">
            <div className="leftContainer02">
              <div className="leftContainer0202"></div>
            </div>
          </Link>
        </div>

        {/* 步驟條title部分，如要修改要往上面找Steps */}
        <div className="mainContainer O_Process_Cont">
          <div className="steps">
            <Steps
              current={current}
              percent={60} // 標題的藍色框框進度條
              labelPlacement="vertical"
              items={items}
              className="mb-5"
            />

            {/* 步驟條內容部分，如要修改要往上面找Steps，css修改找contentStyle */}
            <div style={contentStyle} className="mt-2">
              {steps[current].content}
            </div>

            {/* button部分，下一步及上一步按鈕，步驟4因為要把btn放在內容裡，所以下列只有1~3的， */}
            <div className="O_Process_button">
              {current === 0 && (
                <Button
                  className="O_Process_PrevBtn"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  回預約
                </Button>
              )}

              {current >= 1 && current < 3 && (
                <Button
                  className="O_Process_PrevBtn"
                  onClick={() => {
                    if (current === 0) return
                    prev()
                  }}
                >
                  回上一步
                </Button>
              )}

              {current === steps.length - 4 && (
                <Button
                  className="O_Process_NextBtn"
                  onClick={async () => {
                    const data = JSON.parse(localStorage.getItem('orderInfo'))
                    const num = parseInt(data.price) * n
                    const newData = { ...data, price: num }
                    console.log(newData)
                    localStorage.setItem('orderInfo', JSON.stringify(newData))
                    next()
                  }}
                  // onClick={() => next(setNewLocalS())} //下一頁並傳資料至Local
                >
                  填寫資料
                </Button>
              )}

              {current === steps.length - 3 && (
                 <Button
                 className="O_Process_NextBtn"
                 onClick={OrderPaymentClick}
               >
                  確認資料
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderProcess
