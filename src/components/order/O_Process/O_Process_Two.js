import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import { useForm } from 'react-hook-form'
import { ORDER } from './../../config/api_config'
import axios from 'axios'
// import "./O_Process_Two.css";

// 先設假資料:等級優惠使用
const Level = {
  memberLevel_1: '銅卡會員，9折優惠',
  memberLevel_2: '銀卡會員，8折優惠',
  memberLevel_3: '金卡會員，7折優惠',
}

const OrderTwo = () => {
  // ---------------------------------------

  const [render, setRender] = useState(false)
  const [formData, setFormData] = useState({
    member: '', //會員編號
    memberLevel: '', //會員等級
    sid: '', //遊戲編號
    gamesName: '', //遊戲名
    price: '', //訂單總金額
    people: '', //訂單選取人數
    orderState: '', //訂單狀態
    time: '', //訂單時間
    date: '', //訂單日期
    orderUsername: '', //訂單填寫姓名
    orderPhone: '', // 訂單填寫電話
    orderAdress: '', // 訂單填寫地址
    orderEmail: '', // 訂單填寫信箱
    orderDiscountName: '', // 訂單使用優惠券
    orderDiscount: '', // 訂單使用優惠券編號
    gameTime: '', //遊戲時間
    gamesLogo: '', //遊戲圖片
    storeName: '', //商店名
    storeAddress: '', //商店地址
  })

  const [discountData, setDiscountData] = useState([]) //優惠券資料庫

  const memberAuth = JSON.parse(localStorage.getItem('memberAuth')) //抓會員編號
  // 抓kevin資料庫優惠券用:discount
  const discountGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(
      ORDER + '/discount/' + `${memberAuth.membersid}`
    )

    // console.log('response:', response.data)
    setDiscountData(response.data)
  }

  useEffect(() => {
    discountGetData()
  }, [])

  // 付款方式點選
  const handlePaymentChange = (value) => {
    // setFormData((prevData) => ({ ...prevData, oPayment: value }))
  }

  const [discount, setDiscount] = useState(0) // 追蹤選定的折扣

  // 會出現bug，點選優惠券再點回不使用價格不回復並且前一頁也會變成打折後的價格
  // 優惠券點選
  const discountChange = (value) => {
    const selectDiscount = discountData.find((d) => d.discountName === value)

    if (selectDiscount) {
      const newDiscount = selectDiscount.discountPrice
      const newPrice = formData.price - newDiscount
      setDiscount(newDiscount)
      setFormData((formData) => ({
        ...formData,
        orderDiscountName: selectDiscount.discountName,
        orderDiscount: selectDiscount.discountID,
        price: newPrice,
      }))
    } else {
      setDiscount(0) // 如果未選擇優惠券，則重置折扣
      setFormData((formData) => ({
        ...formData,
        orderDiscountName: '',
        orderDiscount: '',
      }))
    }
  }

  // 輸入框輸入
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  const orderInfo = JSON.parse(localStorage.getItem('orderInfo'))
  // console.log(formData)
  useEffect(() => {
    setFormData({
      ...formData,
      date: orderInfo.date,
      gameTime: orderInfo.gameTime,
      gamesLogo: orderInfo.gamesLogo,
      gamesName: orderInfo.gamesName,
      member: orderInfo.member,
      people: orderInfo.people,
      price: orderInfo.price,
      sid: orderInfo.sid,
      storeAddress: orderInfo.storeAddress,
      storeName: orderInfo.storeName,
      time: orderInfo.time,
    })
  }, [])

  // const [autoFillData, setAutoFillData] = useState({
  //   orderUsername: '張三',
  //   orderPhone: '0912345678',
  //   orderEmail: 'example@gmail.com',
  // })

  // const handleAutoFill = () => {
  //   setFormData({
  //     orderUsername: autoFillData.orderUsername,
  //     orderPhone: autoFillData.orderPhone,
  //     orderEmail: autoFillData.orderEmail,
  //   })
  // }

  useEffect(() => {
    // 每當formData變更時，更新localStorage
    localStorage.setItem('orderInfo', JSON.stringify(formData))
  }, [formData])

  return (
    <div>
      <div className="O_Process_Two_Sort">
        <h3 className="O_Process_Two_line">填寫資料</h3>
        <form>
          <div>
            <div className="d-flex justify-content-center">
              <label htmlFor="orderUsername" className="col-2">
                姓名
              </label>
              <input
                type="text"
                placeholder="請填寫姓名"
                className={`O_Process_Two_NameInput`}
                name="orderUsername"
                value={formData.orderUsername}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <h5 className="col-2">手機號碼</h5>
              <input
                type="text"
                placeholder="請填寫手機號碼"
                className="O_Process_Two_NameInput"
                name="orderPhone"
                value={formData.orderPhone}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <h5 className="col-2">電子郵件</h5>
              <input
                type="email"
                placeholder="請填寫Email"
                className="O_Process_Two_NameInput"
                name="orderEmail"
                value={formData.orderEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>

        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center O_Process_Two_text">
            付款方式
          </div>

          <Select
            defaultValue="---請選擇---"
            style={{ width: 170 }}
            size={'large'}
            onChange={handlePaymentChange}
          >
            <Select.Option value="Line Pay" className="text-center fs-6">
              Line Pay
            </Select.Option>
          </Select>
        </div>

        {/* 優惠券 */}
        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center O_Process_Two_text">
            優惠券
          </div>

          {/* 判斷是否有優惠券 */}
          {discountData.length === 0 ? (
            <Space>
              <Select
                defaultValue="---請選擇---"
                style={{ width: 170 }}
                size={'large'}
                onChange={discountChange}
                options={[{ value: '沒有優惠券', label: '沒有優惠券' }]}
              />
            </Space>
          ) : (
            <Select
              defaultValue="---請選擇---"
              style={{ width: 170 }}
              size={'large'}
              onChange={discountChange}
            >
              <Select.Option value="" className="text-center fs-6">
                不使用優惠券
              </Select.Option>
              {discountData.map((v, i) => {
                return (
                  <Select.Option
                    key={i}
                    className="text-center fs-6"
                    value={v.discountName}
                  >
                    {v.discountName}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </div>

        {/* 總金額 */}
        {/* 有選擇優惠券才打折，但這邊金額是抓資料庫的，所以要改 */}
        <div className="mt-3">
          <h5 className="text-danger text-center fs-3">
            總金額 : $ {formData.price}
          </h5>
          <p className="O_Process_Two_Level">
            {Level.memberLevel_1}
            {/* 放假資料，需判定等級 */}
          </p>
        </div>
      </div>
    </div>
  )
}
export default OrderTwo
