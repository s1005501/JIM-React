import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FaRegCommentDots } from 'react-icons/fa'
import MemberAuthContext from './MemberAuthContext'
import { ACCOUNT } from '../../config/api_config'
import moment from 'moment'
import MemberAccountAside from './MemberAccountAside'
import axios from 'axios'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

function MemberAccountComment() {
  const navigate = useNavigate()

  // const { getCommentData } = useContext(MemberAuthContext)
  const user = JSON.parse(localStorage.getItem('memberAuth'))
  const usersid = user?.membersid
  // const [commentData, setCommentData] = useState([])
  const [ordercomment, setOrdercomment] = useState([])
  const [commentData, setCommentData] = useState([])
  const getordercomment = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_ordercomment/${usersid}`
    )
    // console.log(r.data)
    setOrdercomment(r.data)
  }
  useEffect(() => {
    // getCommentData(ACCOUNT, setCommentData)
    getordercomment()
  }, [])
  return (
    <>
      <main className="m-memberAccountMain">
        <MemberAccountAside />
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
                    <th>訂單編號</th>
                    <th>遊戲名稱</th>
                    <th>評論分數</th>
                    <th>評論內容</th>
                  </tr>
                </thead>
                <tbody>
                  {ordercomment.map((v, i) => {
                    return (
                      <tr key={v.order_sid}>
                        <td>{v.order_sid}</td>
                        <td
                          onClick={() => {
                            navigate(`/comment/${v.game_id}`)
                          }}
                        >
                          {v.gamesName}
                        </td>
                        <td className="ordercommentrate">
                          {[...Array(5)].map((value, index) => {
                            if (index + 1 <= v.rate) {
                              return (
                                <React.Fragment key={index}>
                                  <div>
                                    <AiTwotoneStar />
                                  </div>
                                </React.Fragment>
                              )
                            } else {
                              return (
                                <React.Fragment key={index}>
                                  <div>
                                    <AiOutlineStar />
                                  </div>
                                </React.Fragment>
                              )
                            }
                          })}
                        </td>
                        <td>{v.comment} </td>
                        {/* <td>
                        <a href="#/">
                          <FaRegCommentDots className="m-commentIcon" />
                        </a>
                      </td> */}
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
