import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { checkToken, useContextValue } from '../../ContextDashbard'
import StoreOrder from './StoreOrder'
const Store = () => {
  const { sid } = checkToken('token')
  const { getBackData } = useContextValue()
  const [render, setRender] = useState(true)
  const [storeOrderList, setStoreOrderList] = useState([])
  useEffect(() => {
    getBackData(
      `  http://localhost:3005/store/getStoreOrderData/${sid}`,
      setStoreOrderList
    )
  }, [render])
  const storeSwitch = async (orderSid, state) => {
    // let str = !!state ? 0 : 1
    try {
      const r = await axios.put(
        `http://localhost:3005/store/storeOredrSwitch/${orderSid}?state=${state}`
      )
      setRender(!render)
    } catch (error) {}
  }
  const [state, setState] = useState(2)
  const [keyWord, setKeyWord] = useState('')
  const filterStateData = useMemo(() => {
    return storeOrderList
      .filter((v, i) => {
        if (state == 3) return v
        return v.orderState == state
      })
      .filter((v, i) => {
        return v.orderSid.toString().indexOf(keyWord) !== -1
      })
  }, [storeOrderList, state, keyWord])

  return (
    <>
      <div className="store-list-body text-center py-5 px-5">
        <p className="store-subtitle">訂單紀錄</p>
        <div className="my-3 float-end">
          <div>
            <label htmlFor="search">訂單編號：</label>
            <input
              className="me-3 mb-3"
              type="text"
              name=""
              id="search"
              onChange={(e) => {
                setKeyWord(e.target.value)
              }}
            />
          </div>
          <div>
            <label
              htmlFor="3"
              className={`${state == 3 ? 'store-search-target' : ''} px-2 mx-3`}
              style={{ cursor: 'pointer' }}
            >
              全部顯示
            </label>
            <input
              className="store-search"
              type="radio"
              name="state"
              id="3"
              value={3}
              defaultChecked={true}
              onClick={(e) => {
                setState(e.target.value)
              }}
            />
            <label
              htmlFor="0"
              className={`${state == 0 ? 'store-search-target' : ''} px-2 mx-3`}
              style={{ cursor: 'pointer' }}
            >
              未完成
            </label>
            <input
              className="store-search"
              type="radio"
              name="state"
              id="0"
              value={0}
              onClick={(e) => {
                setState(e.target.value)
              }}
            />
            <label
              htmlFor="1"
              className={`${state == 1 ? 'store-search-target' : ''} px-2 mx-3`}
              style={{ cursor: 'pointer' }}
            >
              已完成
            </label>
            <input
              className="store-search"
              type="radio"
              name="state"
              id="1"
              value={1}
              onClick={(e) => {
                setState(e.target.value)
              }}
            />

            <label
              htmlFor="2"
              className={`${state == 2 ? 'store-search-target' : ''} px-2 mx-3`}
              style={{ cursor: 'pointer' }}
            >
              訂單取消
            </label>
            <input
              className="store-search"
              type="radio"
              name="state"
              id="2"
              value={2}
              onClick={(e) => {
                setState(e.target.value)
              }}
            />
          </div>
        </div>

        <table className="table mt-3 store-table text-nowrap">
          <thead>
            <tr>
              <th>日期</th>
              <th className="phonehidden">訂單編號</th>
              <th className="phonehidden">遊戲名稱</th>
              <th>訂單狀態</th>
              <th className="phonehidden">訂購人</th>
              <th>詳細資料</th>
            </tr>
          </thead>
          <tbody>
            {filterStateData.map((v, i) => {
              return (
                <tr key={v.orderSid}>
                  <td>{v.orderDate}</td>
                  <td className="phonehidden">{v.orderSid}</td>
                  <td className="phonehidden">{v.gamesName}</td>
                  <td>
                    {/* <div className="form-check form-switch pb-1 d-flex justify-content-center">
                      <input
                        style={{ cursor: 'pointer' }}
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        onChange={() => {
                          storeSwitch(v.orderSid, v.orderState)
                        }}
                        checked={v.orderState == 1 ? true : false}
                      />
                    </div> */}
                    <select
                      name="state"
                      id=""
                      value={v.orderState}
                      onChange={(e) => {
                        console.log(e.target.value)
                        storeSwitch(v.orderSid, e.target.value)
                      }}
                    >
                      <option value="0">未完成</option>
                      <option value="1">已完成</option>
                      <option value="2">訂單取消</option>
                    </select>
                  </td>
                  <td className="phonehidden">{v.orderUsername}</td>
                  <td>
                    <StoreOrder orderSid={v.orderSid} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Store
