import React, { useState, useEffect } from 'react'
import { ORDER } from '../../../config/api_config'
import axios from 'axios'
// import { BsDashCircle } from "react-icons/bs";

const Product = ({ calendarInfo, setCalendarOrder, calendarOrder }) => {
  // const product = {
  //   gamesPeopleMin: 2,
  //   gamesPeopleMax: 7,
  //   gamesPrice: 600, // 價格
  // }

  const [quantity, setQuantity] = useState(2) // 遊玩人數
  const increment = () => {
    if (quantity < calendarInfo[0].gamesPeopleMax) setQuantity(quantity + 1) // 可以想成 quantity = quantity + 1
    console.log(quantity)
  }
  const decrement = () => {
    if (quantity > calendarInfo[0].gamesPeopleMin) {
      setQuantity(quantity - 1) // quantity = quantity - 1
      console.log(quantity)
    }
  }
  // console.log('1')
  console.log(calendarOrder)
  useEffect(() => {
    try {
      if (calendarInfo[0].gamesPrice) {
        setCalendarOrder({
          ...calendarOrder,
          people: quantity,
          price: `${calendarInfo[0].gamesPrice * quantity}`,
        })
      }
      console.log(quantity)
    } catch (ex) {}
  }, [quantity])

  return (
    <div className="O_Calendar_addSub_calculate">
      <h5 className="my-2">選擇人數</h5>

      <div className="d-flex justify-content-between O_Calendar_addSub_TextP">
        <p>人數</p>
        <div className="d-flex">
          {calendarInfo.map((v, i) => {
            return <p key={i}>${v.gamesPrice}/每人</p>
          })}
          <button
            onClick={(e) => {
              decrement()
              console.log(quantity)
              // setCalendarOrder({
              //   ...calendarOrder,
              //   people: quantity,
              //   price: `${calendarInfo[0].gamesPrice * quantity}`,
              // })
            }}
            className="O_Calendar_addSub_sub"
          >
            -
          </button>

          {/* 遊玩人數 */}
          <p>{quantity}</p>

          <button
            onClick={(e) => {
              increment()
              // console.log(quantity)
              // setCalendarOrder({
              //   ...calendarOrder,
              //   people: quantity,
              //   price: `${calendarInfo[0].gamesPrice * quantity}`,
              // })
              // console.log('3')
            }}
            className="O_Calendar_addSub_add"
          >
            +
          </button>
        </div>
      </div>

      <hr />

      {calendarInfo.map((v, i) => {
        return (
          <div
            key={i}
            className="d-flex justify-content-between O_Calendar_addSub_PriceText"
          >
            <p>總金額</p>
            <p>TWD {v.gamesPrice * quantity}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Product
