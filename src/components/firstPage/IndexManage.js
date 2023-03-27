import React, { useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Game from './Game'
import Page1 from './Page1'
import GameOver from './GameOver'
import Page2 from './Page2'

const IndexManage = () => {
  const { part } = useParams()
  const { sum, setSum } = useOutletContext()
  const [gameOver, setGameOver] = useState(false)
  const navigate = useNavigate()
  let currentPage = ''
  switch (part) {
    case 'firstPage':
      currentPage = (
        <>
          <Page1 />
          <Page2 />
        </>
      )
      break
    case 'gameover':
      currentPage = (
        <>
          <GameOver sum={sum} />
          {/* <Page1 sum={sum} /> */}
          {/* <Page2 /> */}
        </>
      )
      break
    case 'result':
      currentPage = (
        <>
          <GameOver sum={sum} />
          {/* <Page1 sum={sum} /> */}
          {/* <Page2 /> */}
        </>
      )
      break
    default:
      currentPage = (
        <Game
          sum={sum}
          setSum={setSum}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
      )
  }
  return <>{currentPage}</>
}

export default IndexManage
