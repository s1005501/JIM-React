import React, { useState } from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import Game from './Game'
import Backdrop from './Backdrop'
import { Outlet, useParams } from 'react-router-dom'

const Index = () => {
  const [sum, setSum] = useState(0)
  return (
    <>
      <Outlet context={{ sum, setSum }} />
      {/* {currentPage} */}
      {/* <Game /> */}
      {/* <Page1 /> */}
      {/* <Page2 /> */}
    </>
  )
}

export default Index
