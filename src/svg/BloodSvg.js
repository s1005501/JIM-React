import React from 'react'
import fillBlood from './fillBlood.svg'
import unfillBlood from './unfillBlood.svg'
import './BloodSvg.css'

const BloodSvg = () => {
  return (
    <>
      <img className="fillBlood" src={fillBlood} alt="" />
    </>
  )
}

export default BloodSvg

export const UnfillBlood = () => {
  return (
    <>
      <img className="unfillBlood" src={unfillBlood} alt="" />
    </>
  )
}
