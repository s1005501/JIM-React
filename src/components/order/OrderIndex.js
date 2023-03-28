import React from 'react'
import { Outlet } from 'react-router-dom'
const OrderIndex = () => {
  return (
    <div className="stores">
      <Outlet />
    </div>
  )
}

export default OrderIndex
