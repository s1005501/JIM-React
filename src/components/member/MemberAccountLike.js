import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import { ACCOUNT } from '../../config/api_config'
import axios from 'axios'
import Swal from 'sweetalert2'

function MemberAccountLike() {
  const navigate = useNavigate()

  const { getLikeData, memberAuthState } = useContext(MemberAuthContext)

  const [likeData, setLikeData] = useState([])

  useEffect(() => {
    getLikeData(ACCOUNT, setLikeData)
  }, [])

  // console.log(memberAuthState)
  // 會員刪除收藏func
  const memberLikeDelete = async (collectSid) => {
    if (memberAuthState.authorized) {
      axios.defaults.withCredentials = true
      const response = await axios.delete(
        ACCOUNT + '/like/delete/' + collectSid,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
          },
        }
      )
      console.log(response.data)
      Swal.fire({
        title: '評論刪除成功!',
        text: `評論刪除成功`,
        icon: 'success',
        confirmButtonText: '確認',
      })

      getLikeData(ACCOUNT, setLikeData)
    }
  }
  return (
    <>
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
            <div className="col m-likeMainContext">
              <h1>收藏</h1>
              <table>
                <thead>
                  <tr>
                    <th>取消收藏</th>
                    <th>縣市</th>
                    <th>遊戲名稱</th>
                    <th>工作室</th>
                    <th>前往預約</th>
                  </tr>
                </thead>
                <tbody>
                  {likeData.map((v, i) => {
                    return (
                      <tr key={v.collectSid}>
                        <td>
                          <a href="#/">
                            <FaTrashAlt
                              className="m-dislikeIcon"
                              onClick={() => {
                                memberLikeDelete(v.collectSid)
                              }}
                            />
                          </a>
                        </td>
                        <td>{v.storeCity}</td>
                        <td>{v.gamesName}</td>
                        <td>{v.storeName}</td>
                        <td>
                          <a href="#/">
                            <FaRegBookmark className="m-bookingIcon" />
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

export default MemberAccountLike
