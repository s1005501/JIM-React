import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Button, message, Steps, theme, Modal } from 'antd'
import { ORDER } from '../../components/config/api_config'
import axios from 'axios'
import OrderProcessOne from './O_Process/O_Process_One'
import OrderProcessTwo from './O_Process/O_Process_Two'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

// const Order = {
//   orderSid: 1,
//   orderNumber: 1677779977,
//   orderDate: '2023-3-15',
//   orderTime: '11:00',
//   checkQuantity: 3,
//   checkPrice: 1800,
// }

function OrderProcess() {
  const navigate = useNavigate() //回預約頁
  const [orderData, setOrderData] = useState([])

  // 抓kevin資料庫
  const orderGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/orderProcess/5')

    console.log('response:', response.data)
    setOrderData(response.data)
  }
  // console.log(orderData)

  useEffect(() => {
    orderGetData()
  }, [])

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
            <h3 className="text-center">總金額 : 1,650 尚未付款</h3>
            <Button type="light" onClick={() => next()}>
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
                  <h3>預約編號 :{v.orderNumber}</h3>
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
                  navigate('/')
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

  const [current, setCurrent] = useState(0)
  console.log(current)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  // 流程下面的框框內容及CSS
  const contentStyle = {
    // lineHeight: "260px",
    // height:"600px",
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    marginTop: 50,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
  }

  // -------------------------------------------下列是整個畫面內容，有用套件，步驟條內容整個寫在Steps裡，如要修改步驟條內容，要找上面steps的內容修改

  return (
    <>
      <div className="bodyContainer">
        <div className="leftContainer">
          <Link to="/">
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
            />

            {/* 步驟條內容部分，如要修改要往上面找Steps，css修改找contentStyle */}
            <div style={contentStyle}>{steps[current].content}</div>

            {/* button部分，下一步及上一步按鈕，步驟4因為要把btn放在內容裡，所以下列只有1~3的， */}
            <div className="O_Process_button">
              {current === 0 && (
                <Button
                  className="O_Process_PrevBtn"
                  onClick={() => {
                    navigate('/order')
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
                  onClick={() => next()}
                  // onClick={() => next(setNewLocalS())} //下一頁並傳資料至Local
                >
                  填寫資料
                </Button>
              )}

              {current === steps.length - 3 && (
                <Button className="O_Process_NextBtn" onClick={() => next()}>
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
