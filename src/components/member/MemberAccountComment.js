import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FaRegCommentDots } from 'react-icons/fa'
import MemberAuthContext from './MemberAuthContext'
import { ACCOUNT } from '../../config/api_config'
import moment from 'moment'

function MemberAccountComment() {
  const navigate = useNavigate()

  const { getCommentData } = useContext(MemberAuthContext)

  const [commentData, setCommentData] = useState([])
  useEffect(() => {
    getCommentData(ACCOUNT, setCommentData)
  }, [])
  return (
    <>
      {/* <div className="m-bearBg"></div>
      <div className="m-blackBg"></div> */}
      <main className="m-memberAccountMain">
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
        </aside>
        <div className="container">
          <div className="row">
            <div className="m-memberAccountDiv">
              <h1>會員中心</h1>
            </div>
            <div className="col m-commentMainContext">
              <h1>評論紀錄</h1>
              <table>
                <thead>
                  <tr>
                    <th>評論日期</th>
                    <th>遊戲名稱</th>
                    <th>評論內容</th>
                    <th>前往評論</th>
                  </tr>
                </thead>
                <tbody>
                  {commentData.map((v, i) => {
                    return (
                      <tr key={v.sid}>
                        <td>{moment(v.create_at).format('YYYY-MM-DD')}</td>
                        <td>{v.gamesName}</td>
                        <td>{v.comment} </td>
                        <td>
                          <a href="#/">
                            <FaRegCommentDots className="m-commentIcon" />
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberAccountComment
