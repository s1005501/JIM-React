import React, { useState } from 'react'
// import { BsDashCircle } from "react-icons/bs";

const Product = () => {
  const [quantity, setQuantity] = useState(2)

  const product = {
    peoplemin: 2,
    peoplemax: 7,
    price: 600, // 價格
  }

  const increment = () => {
    if (quantity < product.peoplemax) setQuantity(quantity + 1) // 可以想成 quantity = quantity + 1
  }
  const decrement = () => {
    if (quantity > product.peoplemin) {
      setQuantity(quantity - 1) // quantity = quantity - 1
    }
  }

  return (
    <div className="O_Calendar_addSub_calculate">
      <h5>選擇數量</h5>

      <div className="d-flex justify-content-between O_Calendar_addSub_TextP">
        <p>人數</p>
        <div className="d-flex">
          <p>${product.price}/每人</p>

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

      <div className="d-flex justify-content-between">
        <p>總金額</p>
        <p>TWD {product.price * quantity}</p>
      </div>
    </div>
  )
}

export default Product
