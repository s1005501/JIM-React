import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleRight } from 'react-icons/fa'
function MemberAccountAside() {
  const navigate = useNavigate()
  return (
    <>
      <aside className="memberAside">
        <div
          className="m-asideItem"
          onClick={() => {
            navigate('/member/order')
          }}
        >
          <p>訂單紀錄</p>
          <FaArrowCircleRight className="m-rightArrowIcon" />
        </div>
        <div
          className="m-asideItem"
          onClick={() => {
            navigate('/member/comment')
          }}
        >
          <p>評論紀錄</p>
          <FaArrowCircleRight className="m-rightArrowIcon" />
        </div>
        <div
          className="m-asideItem"
          onClick={() => {
            navigate('/member/like')
          }}
        >
          <p>收藏</p>
          <FaArrowCircleRight className="m-rightArrowIcon" />
        </div>
        <div
          className="m-asideItem"
          onClick={() => {
            navigate('/member')
          }}
        >
          <p>個人資料</p>
          <FaArrowCircleRight className="m-rightArrowIcon" />
        </div>
        <div
          className="m-asideItem"
          onClick={() => {
            navigate('/member/level')
          }}
        >
          <p>會員等級</p>
          <FaArrowCircleRight className="m-rightArrowIcon" />
        </div>
        <div
          className="m-asideItem"
          onClick={() => {
            navigate('/member/discount')
          }}
        >
          <p>會員折價券</p>
          <FaArrowCircleRight className="m-rightArrowIcon" />
        </div>
      </aside>
    </>
  )
}

export default MemberAccountAside
