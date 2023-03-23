import React from 'react'

function Background({ children }) {
  return (
    <>
      <div className="d-flex flex-column text-center position-relative m-bearBgs">
        {/* <div className="m-bearBg"></div> */}
        {/* <div className="m-blackBg"></div> */}
        {children}
      </div>
    </>
  )
}

export default Background
