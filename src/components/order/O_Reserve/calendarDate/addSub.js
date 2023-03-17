import React, { useState, useEffect } from 'react'
import { ORDER } from '../../../config/api_config'
import axios from 'axios'
// import { BsDashCircle } from "react-icons/bs";

const Product = () => {
  const [quantity, setQuantity] = useState(2)

  const product = {
    gamesPeopleMin: 2,
    gamesPeopleMax: 7,
    gamesPrice: 600, // 價格
  }

  // 抓kevin資料庫  資料還沒弄好  待處理
  const [gameSumData, setGameSumData] = useState([])

  const GameSumGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/gamesinfo/1')

    console.log('response:', response.data)
    setGameSumData(response.data)
  }

  useEffect(() => {
    GameSumGetData()
  }, [])
  // -------------------------------------

  const increment = () => {
    if (quantity < gameSumData[0].gamesPeopleMax) setQuantity(quantity + 1) // 可以想成 quantity = quantity + 1
    console.log(gameSumData.gamesPeopleMax)
  }
  const decrement = () => {
    if (quantity > gameSumData[0].gamesPeopleMin) {
      setQuantity(quantity - 1) // quantity = quantity - 1
    }
  }

  return (
    <div className="O_Calendar_addSub_calculate">
      <h5>選擇數量</h5>

      <div className="d-flex justify-content-between O_Calendar_addSub_TextP">
        <p>人數</p>
        <div className="d-flex">
          {gameSumData.map((v, i) => {
            return <p key={i}>${v.gamesPrice}/每人</p>
          })}
          <button onClick={decrement} className="O_Calendar_addSub_sub">
            -
          </button>

          {/* 總金額 */}
          <p>{quantity}</p>

          <button onClick={increment} className="O_Calendar_addSub_add">
            +
          </button>
        </div>
      </div>

      <hr />

      {gameSumData.map((v, i) => {
        return (
          <div key={i} className="d-flex justify-content-between">
            <p>總金額</p>
            <p>TWD {v.gamesPrice * quantity}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Product
