import React, { useState } from 'react'
import { set } from 'react-hook-form'
import '../../style/FisrtPage/firstPage.css'
import { motion } from 'framer-motion'
import Modal2 from './Modal2'
import Movement from './Movement'
import { useOutletContext } from 'react-router-dom'

function Game({ sum, setSum, gameOver, setGameOver }) {
  const [isOpen, setIsOpen] = useState(false)
  const [boxTrigger, setBoxTrigger] = useState(1)
  return (
    <>
      <Movement
        setIsOpen={setIsOpen}
        setBoxTrigger={setBoxTrigger}
        gameOver={gameOver}
      />
      <div className="canvas" style={{ color: 'white', fontSize: '25px' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        >
          Launch modal{sum}
        </motion.button>
        {isOpen && (
          <Modal2
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            boxTrigger={boxTrigger}
            sum={sum}
            setSum={setSum}
            setIsOpen={setIsOpen}
            setGameOver={setGameOver}
          />
        )}
      </div>
    </>
  )
}

export default Game
