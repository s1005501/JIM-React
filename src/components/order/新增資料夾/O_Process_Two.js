import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import { ORDER } from '../../../components/config/api_config'
import axios from 'axios'
// import "./O_Process_Two.css";

const Discount = [
  {
    discountSid: 1,
    discountName: '30折價券',
    discountPrice: 30,
  },
]
const Order = {
  orderSid: 1,
  checkPrice: 1800,
  totalCount: null,
}

const OrderTwo = () => {
  const [discountData, setDiscountData] = useState([])

  // 配合普通版的下拉式
  // const [discountValue, setDiscountValue] = useState(0);

  // 抓kevin資料庫
  const discountGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/discount/1')

    console.log('response:', response.data)
    setDiscountData(response.data)
  }

  useEffect(() => {
    discountGetData()
  }, [])

  const handleChange = (value) => {
    // console.log(value);
  }

  return (
    <div>
      <div className="O_Process_Two_Sort">
        <h4 className="O_Process_Two_line">填寫資料</h4>
        <div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">姓名</h6>
            <input />
          </div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">手機號碼</h6>
            <input />
          </div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">地址</h6>
            <input />
          </div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">電子郵件</h6>
            <input />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center">付款方式</div>

          <Space wrap>
            <Select
              defaultValue="---請選擇---"
              style={{ width: 170 }}
              size={'large'}
              onChange={handleChange}
              options={[{ value: 'Line Pay', label: 'Line Pay' }]}
            />
          </Space>
        </div>

        {/* 總金額 */}
        <div className="mt-3">
          {discountData.map((v, i) => {
            return (
              <span key={i}>
                <h5 className="text-center text-white text-decoration-line-through">
                  總金額 : ${v.checkPrice}
                </h5>
                <h5 className="text-center text-white">
                  總金額 : ${v.checkPrice}
                </h5>
              </span>
            )
          })}
        </div>

        {/* 優惠券 */}
        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center">優惠券</div>

          {discountData.map((v, i) => {
            return (
              <Space key={i}>
                <Select
                  defaultValue="---請選擇---"
                  style={{ width: 170 }}
                  size={'large'}
                  onChange={handleChange}
                  options={[{ value: v.discountName, label: v.discountName }]}
                />
              </Space>
            )
          })}

          {/* 普通下拉式選單 */}
          {/* <select
            value={discountValue}
            onChange={(e) => {
              setDiscountValue(e.target.value);
            }}
          >
            <option value="">---請選擇優惠券---</option>
            {Discount.map((v, i) => {
              return (
                <option key={i} value={v.discountSid}>
                  {v.discountName}
                </option>
              );
            })}
          </select> */}
        </div>

        {/* 總金額 */}
        <div className="mt-3">
          {discountData.map((v, i) => {
            return (
              <h5 key={i} className="text-danger text-center">
                最後金額 : ${v.checkPrice - v.discountPrice}
              </h5>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default OrderTwo
