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
      <div className="box">
        <div style={{ color: 'white' }}>
          總分:{sum}
          <br />
          {str}
        </div>
      </div>
    </>
  )
}

export default GameOver
