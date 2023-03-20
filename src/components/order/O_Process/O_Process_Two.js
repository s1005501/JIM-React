import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import { useForm } from 'react-hook-form'
import { ORDER } from './../../config/api_config'
import axios from 'axios'
// import "./O_Process_Two.css";

// const Discount = [
//   {
//     discountSid: 1,
//     discountName: '30折價券',
//     discountPrice: 30,
//   },
// ]
// const Order = {
//   orderSid: 1,
//   checkPrice: 1800,
//   orderUsername: 'Lee',
//   orderPhone: '0911111111',
//   orderEmail: 'aaa@gmail.com',
//   totalCount: null,
// }

const OrderTwo = () => {
  const [orderData, setOrderData] = useState([])

  // 配合普通版的下拉式
  const [discountValue, setDiscountValue] = useState(0)

  // 抓kevin資料庫訂單用 (暫時，要改成localstorage)orderProcess
  const orderGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/orderProcess/3')

    console.log('response:', response.data)
    setOrderData(response.data)
  }

  useEffect(() => {
    orderGetData()
  }, [])

  const [discountData, setDiscountData] = useState([])

  // 抓kevin資料庫優惠券用:discount
  const discountGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/discount/2')

    console.log('response:', response.data)
    setDiscountData(response.data)
  }

  useEffect(() => {
    discountGetData()
  }, [])

  // 付款方式點選
  const handleChange = (value) => {
    // console.log(value)
  }

  const [discount, setDiscount] = useState(0) // keep track of selected discount

  // 優惠券點選
  const discountChange = (value) => {
    const selectedDiscount = discountData.find((d) => d.discountName === value)
    if (selectedDiscount) {
      const newDiscount = selectedDiscount.discountPrice
      setDiscount(newDiscount)
    } else {
      setDiscount(0) // reset discount if no coupon is selected
    }
  }

  return (
    <div>
      <div className="O_Process_Two_Sort">
        <h3 className="O_Process_Two_line">填寫資料</h3>
        <div>
          <div className="d-flex justify-content-center">
            {/* <h6 className="col-2">姓名</h6>
            <input /> */}

            {/* ------測試-------上列是原本的 --------*/}
            <label htmlFor="oName" className="col-2">
              姓名
            </label>
            <input type="text" className="O_Process_Two_NameInput" />
          </div>

          <div className="d-flex justify-content-center">
            <h5 className="col-2">手機號碼</h5>
            <input type="text" className="O_Process_Two_NameInput" />
          </div>
          <div className="d-flex justify-content-center">
            <h5 className="col-2">地址</h5>
            <input type="text" className="O_Process_Two_NameInput" />
          </div>
          <div className="d-flex justify-content-center">
            <h5 className="col-2">電子郵件</h5>
            <input type="text" className="O_Process_Two_NameInput" />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center O_Process_Two_text">
            付款方式
          </div>

          <Space wrap>
            <Select
              defaultValue="---請選擇---"
              style={{ width: 170 }}
              size={'large'}
              onChange={handleChange}
              options={[{ value: 'Line Pay', label: 'Line Pay' }]}
            />
          </Space>

          {/* 普通下拉式選單 未成功 */}
          {/* <select
            value={discountData}
            onChange={(e) => {
              setDiscountValue(e.target.value)
            }}
          >
            <option value="">---請選擇優惠券---</option>
            {discountData.map((v, i) => {
              return (
                <option key={i} value={v.discountSid}>
                  {v.discountName}
                </option>
              )
            })}
          </select> */}
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
            discountData.map((v, i) => {
              return (
                <Space key={i}>
                  <Select
                    defaultValue="---請選擇---"
                    style={{ width: 170 }}
                    size={'large'}
                    onChange={discountChange}
                    options={[
                      // { value: '不使用優惠券' }, //如果要有不選優惠券的話再開
                      { value: v.discountName, label: v.discountName },
                    ]}
                  />
                </Space>
              )
            })
          )}
        </div>

        {/* 總金額 */}
        {/* 有選擇優惠券才打折 */}
        <div className="mt-3">
          {orderData.length === 0 ? (
            <h5 className="text-danger text-center fs-3">
              總金額 : $ {orderData.checkPrice}
            </h5>
          ) : (
            orderData.map((v, i) => {
              const totalCount = v.checkPrice - discount
              return (
                <h5 key={i} className="text-danger text-center fs-3">
                  總金額 : ${totalCount}
                </h5>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
export default OrderTwo
