import React from 'react'
import '../../style/FisrtPage/gameover.css'

function GameOver({ sum }) {
  let str = ''
  if (sum === 12) {
    str = '初心者壞份子'
  }
  if (sum > 4 && sum <= 8) {
    str = '中等壞份子'
  }
  if (sum > 8 && sum <= 12) {
    str = '你這個壞份子'
  }
  if (sum > 12) {
    str = '極品壞份子'
  }
  return (
    <>
      {/* <div className="box">
        <div style={{ color: 'white' }}>
          總分:{sum}
          <br />
          {str}
        </div>
      </div> */}

      <div id="loading_ani">
        <div class="boxes">
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <a
          class="dribbble"
          href="https://dribbble.com/shots/5533600-Loading-boxes"
          target="_blank"
        >
          <img
            src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
            alt=""
          />
        </a>
      </div>
    </>
  )
}

export default GameOver
