import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Signin from './Signin'
import SigninMember from './SigninMember'
import SigninShop from './SigninShop'

const SigninTarget = () => {
  const { target } = useParams()

  let currentPage = ''
  switch (target) {
    case 'member':
      currentPage = <SigninMember />
      break
    case 'shop':
      currentPage = <SigninShop />
      break
    default: {
      currentPage = <Signin />
    }
  }
  return <>{currentPage}</>
}

export default SigninTarget
