import React from 'react'
import { Outlet } from 'react-router-dom'
// import LogoHorizontal from '../../components/LogoHorizontal/LogoHorizontal'
import MenuStoreVertical from './MenuStoreVertical'
import './store.css'
const StoreIndex = () => {
  return (
    <>
      {/* <LogoHorizontal /> */}
      {/* <p className="m-mainLogo">JOINME</p> */}
      <div className="d-flex flex-column flex-xxl-row justify-content-center  justify-content-xxl-start align-items-xxl-start align-items-center minh storeAndMap">
        <MenuStoreVertical />
        <div className="store d-flex flex-column align-items-center">
          <p className="store-title">工作室管理</p>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default StoreIndex
