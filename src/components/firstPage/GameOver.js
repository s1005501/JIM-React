import React, { useMemo, useRef, useState } from 'react'
import '../../style/FisrtPage/gameover.css'
import { useEffect } from 'react'
import axios from 'axios'
import resultData from './data/result.json'
import Box_spinning from './Box_spinning'
import { useNavigate } from 'react-router-dom'

function GameOver({ sum }) {
  const navigate = useNavigate()
  const dataNum = useRef(0)
  useEffect(() => {
    ;(async () => {
      const discountRand = Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase()
        .slice(0, 5)
      const r = await axios.get(
        `http://localhost:3005/firstpage/gameover/${discountRand}`
      )
      console.log(discountRand)
    })()
  }, [])
  if (sum <= 4) {
    dataNum.current = 0
  }
  if (sum > 4 && sum <= 8) {
    dataNum.current = 1
  }
  if (sum > 8 && sum <= 12) {
    dataNum.current = 2
  }
  if (sum > 12) {
    dataNum.current = 3
  }
  const currentNum = useMemo(() => {
    return resultData[dataNum.current]
  }, [])

  // console.log(currentNum.img1_id1)
  return (
    <>
      <div className="box ">
        <div style={{ color: 'white' }}>
          {/* 總分:{sum}
          Math.random().toString(36).substring(7).toUpperCase().slice(0, 5){' '} */}
          <br />
          {/* <img src={`/images/gamesImages/${currentNum.img1_id1}`} alt="" /> */}
        </div>
        <div id="top_ctx" className="mx-auto">
          <div className="gameover_title">我的測驗結果:</div>
          <div className="gameover_name">{currentNum.name}</div>
          <Box_spinning />
          <div className="gameover_content">{currentNum.content}</div>
        </div>

        <div className="bottom_div mx-auto">
          <div className="gameover_subtitle mx-auto mt-5">你可能會適合...</div>

          <div id="bottom_recommand" className="mx-auto">
            <div className="recommand_cards">
              <div
                id="card1"
                className="card "
                style={{ marginLeft: '30px', cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/order/${currentNum.img1}`)
                }}
              >
                <div className="card_content">
                  <img
                    className="box_img"
                    src={`/images/gamesImages/${currentNum.img1_id1}`}
                    alt=""
                  ></img>
                </div>
                <div className="mx-auto my-auto">{currentNum.img1}</div>
              </div>
              <div
                id="card2"
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/order/${currentNum.img2}`)
                }}
              >
                <div className="card_content">
                  <img
                    className="box_img"
                    src={`/images/gamesImages/${currentNum.img2_id2}`}
                    alt=""
                  ></img>
                </div>
                <div className="mx-auto my-auto">{currentNum.img2}</div>
              </div>

              <div
                id="card3"
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/order/${currentNum.img3}`)
                }}
              >
                <div className="card_content">
                  <img
                    className="box_img"
                    src={`/images/gamesImages/${currentNum.img3_id3}`}
                    alt=""
                  ></img>
                </div>
                <div className="mx-auto my-auto">{currentNum.img3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameOver
