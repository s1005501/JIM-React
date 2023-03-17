import React from 'react'
import { Outlet } from 'react-router-dom'
// import LogoHorizontal from '../../components/LogoHorizontal/LogoHorizontal'
import './signin.css'
const SigninIndex = () => {
  return (
    <div className="singinAndMap">
      {/* <LogoHorizontal /> */}
      <p className="m-mainLogo">JOINME</p>
      <Outlet />
    </div>
  )
}

export default SigninIndex
