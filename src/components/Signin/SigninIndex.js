import React from 'react'
import { Outlet } from 'react-router-dom'
// import LogoHorizontal from '../../components/LogoHorizontal/LogoHorizontal'
import './signin.css'
const SigninIndex = () => {
  return (
    <div>
      {/* <LogoHorizontal /> */}
      <Outlet />
    </div>
  )
}

export default SigninIndex
