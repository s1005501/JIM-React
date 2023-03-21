import React from 'react'
import { motion } from 'framer-motion'
import '../../style/FisrtPage/modal.css'

function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
