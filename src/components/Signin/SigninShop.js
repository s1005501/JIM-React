import React, { useState } from 'react'
import { SigninChange, SigninStortIn, SigninStoreRegister } from './SigninModel'

const SigninShop = () => {
  const [chceked, setChceked] = useState(true)
  return (
    <div className="d-flex justify-content-center">
      <div className="signin-router-outbody">
        <SigninChange name="工作室" chceked={chceked} setChceked={setChceked} />
        {chceked ? (
          <SigninStortIn name="工作室" />
        ) : (
          <SigninStoreRegister name="工作室" />
        )}
      </div>
    </div>
  )
}

export default SigninShop
