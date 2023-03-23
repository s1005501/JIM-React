import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import { ACCOUNT } from '../../config/api_config'
import axios from 'axios'
import Swal from 'sweetalert2'
import MemberAccountAside from './MemberAccountAside'
import { Link } from 'react-router-dom'

function MemberAccountLike() {
  const navigate = useNavigate()

  const { getLikeData, memberAuthState } = useContext(MemberAuthContext)

  const [likeData, setLikeData] = useState([])

  useEffect(() => {
    getLikeData(ACCOUNT, setLikeData)
  }, [])

  console.log(likeData)
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
        <MemberAccountAside />
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
                    console.log(v)
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
                          <Link to={`/order/${v.gamesSid}`}>
                            <FaRegBookmark className="m-bookingIcon" />
                          </Link>
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
