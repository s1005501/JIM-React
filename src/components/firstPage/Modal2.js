import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import '../../style/FisrtPage/modal.css'
import question from './data/question.json'

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
  console.log(sum, '寫值',30)
  return (
    <>
      {[question[boxTrigger]].map((v, i) => {
        console.log(boxTrigger, 3)
        return (
          <React.Fragment key={v.id}>
            <Backdrop onClick={onClose}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal ctx modal2"
                variants={dropIn}
                initial="hidden"
                animate="visable"
                exit="exit"
              >
                <div className="modal_ctx flex-column">
                  <div className="question">
                    Question: {v.question}
                  </div>
                  <div className="d-flex flex-column">
                    <div
                      className="d-flex flex-row option"
                      onClick={(e) => {
                        setTimeout(() => {
                          onClose()
                          if (boxTrigger == 3) {
                            setGameOver(true)
                          }
                        }, 300)
                        setSum(sum + 1)
                      }}
                    >
                      <label
                        style={{ cursor: 'pointer', marginLeft: '30px' }}
                        htmlFor={i}
                      >
                        {v.option1}
                      </label>
                      <input
                        id={i}
                        type="radio"
                        style={{ opacity: 0 }}
                        name="option1"
                       
                      />
                    </div>
                    <div
                      className="d-flex flex-row option"
                      onClick={(e) => {
                        setTimeout(() => {
                          onClose()
                          if (boxTrigger == 3) {
                            setGameOver(true)
                          }
                        }, 300)
                        setSum(sum + 2)
                      }}
                    >
                      <label
                        style={{ cursor: 'pointer', marginLeft: '30px' }}
                        htmlFor={i}
                      >
                        {v.option2}
                      </label>
                      <input
                        id={i}
                        type="radio"
                        style={{ opacity: 0 }}
                        name="option1"
                       
                      />
                    </div>
                    <div
                      className="d-flex flex-row option"
                      onClick={(e) => {
                        setTimeout(() => {
                          onClose()
                          if (boxTrigger == 3) {
                            setGameOver(true)
                          }
                        }, 300)
                        setSum(sum + 3)
                      }}
                    >
                      <label
                        style={{ cursor: 'pointer', marginLeft: '30px' }}
                        htmlFor={i}
                      >
                        {v.option3}
                      </label>
                      <input
                        id={i}
                        type="radio"
                        style={{ opacity: 0 }}
                        name="option1"
                       
                      />
                    </div>{' '}
                    <div
                      className="d-flex flex-row option"
                      onClick={(e) => {
                        setTimeout(() => {
                          onClose()
                          if (boxTrigger == 3) {
                            setGameOver(true)
                          }
                        }, 300)
                        setSum(sum + 4)
                      }}
                    >
                      <label
                        style={{ cursor: 'pointer', marginLeft: '30px' }}
                        htmlFor={i}
                      >
                        {v.option4}
                      </label>
                      <input
                        id={i}
                        type="radio"
                        style={{ opacity: 0 }}
                        name="option1"
                       
                      />
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
