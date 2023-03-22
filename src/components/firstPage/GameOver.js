import React, { useMemo, useRef, useState } from 'react'
import '../../style/FisrtPage/gameover.css'
import { useEffect } from 'react'
import axios from 'axios'
import resultData from './data/result.json'

function GameOver({ sum }) {
  const dataNum = useRef(0)
  // useEffect(() => {
  //   ;(async () => {
  //     const discountRand = Math.random().toString(36).substring(7).toUpperCase().slice(0, 5)
  //     const r = await axios.get(
  //       `http://localhost:3005/firstpage/gameover/${discountRand}`
  //     )
  //     console.log(discountRand)
  //   })()
  // }, [])

  if (sum <= 4) {
    // str = '麻瓜'
    dataNum.current = 0
  }
  if (sum > 4 && sum <= 8) {
    // str = '氣氛製造者'
    dataNum.current = 1
  }
  if (sum > 8 && sum <= 12) {
    // str = '勇者'
    dataNum.current = 2
  }
  if (sum > 12) {
    // str = '智者'
    dataNum.current = 3
  }
  const currentNum = useMemo(() => {
    return resultData[dataNum.current]
  }, [])
  
  console.log(currentNum.img1_id1)
  return (
    <>
      <div className="box">
        <div style={{ color: 'white' }}>
          總分:{sum}{' '}
          {'' +
            Math.random().toString(36).substring(7).toUpperCase().slice(0, 5)}
          <br />
          <img src={`/images/gamesImages/${currentNum.img1_id1}`}/>
        </div>
      </div>
    </>
  )
}

export default GameOver
