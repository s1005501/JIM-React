import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import '../../style/FisrtPage/modal.css'
import question from './question.json'

//animation state
const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visable: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 100, //漸弱屬性
      stiffness: 500, //彈性
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

function Modal2({ onClose, boxTrigger, sum, setSum, setGameOver }) {
  console.log(sum, setSum, '寫值')
  return (
    <>
      {[question[boxTrigger]].map((v, i) => {
        console.log(boxTrigger,3)
        return (
          <React.Fragment key={v.id}>
            <Backdrop onClick={onClose}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal ctx"
                variants={dropIn}
                initial="hidden"
                animate="visable"
                exit="exit"
              >
                <button className="btn cross" onClick={onClose}>
                  X
                </button>
                <div className="modal_ctx">
                  <div className="question">Question: {v.question}</div>
                  <div className="d-flex flex-column">
                    <div className="d-flex flex-row option">
                      <input
                        type="radio"
                        name="option1"
                        value="1"
                        onClick={(e) => {
                          setTimeout(() => {
                            onClose()
                            if(boxTrigger ==3){

                              setGameOver(true)
                            }
                          }, 300)
                          setSum(sum + parseInt(e.target.value))
                        }}
                      />
                      <div className="mx-3">{v.option1}</div>
                    </div>

                    <div className="d-flex flex-row option">
                      <input
                        type="radio"
                        name="option1"
                        value="2"
                        onClick={(e) => {
                          setTimeout(() => {
                            onClose()
                            if(boxTrigger ==3){

                              setGameOver(true)
                            }
                          }, 300)
                          setSum(sum + parseInt(e.target.value))
                        }}
                      />
                      <div className="mx-3">{v.option2}</div>
                    </div>

                    <div className="d-flex flex-row option">
                      <input
                        type="radio"
                        name="option1"
                        value="3"
                        onClick={(e) => {
                          setTimeout(() => {
                            onClose()
                            if(boxTrigger ==3){

                              setGameOver(true)
                            }
                          }, 300)
                          setSum(sum + parseInt(e.target.value))
                        }}
                      />
                      <div className="mx-3">{v.option3}</div>
                    </div>

                    <div className="d-flex flex-row option">
                      <input
                        type="radio"
                        name="option1"
                        value="4"
                        onClick={(e) => {
                          setTimeout(() => {
                            onClose()
                            if(boxTrigger ==3){

                              setGameOver(true)
                            }
                          }, 300)
                          setSum(sum + parseInt(e.target.value))
                        }}
                      />
                      <div className="mx-3">{v.option4}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Backdrop>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Modal2
