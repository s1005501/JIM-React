import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import { FaArrowCircleRight } from 'react-icons/fa'
import { ACCOUNT } from '../../config/api_config'
import moment from 'moment'
import MemberAccountAside from './MemberAccountAside'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import '../../style/member/JIM_Account_profile_modal.css'
import {
  AiTwotoneStar,
  AiOutlineStar,
  // AiFillLike,
  // AiOutlineLike,
  // AiFillDislike,
  // AiOutlineDislike,
} from 'react-icons/ai'

function MemberAccountOrder() {
  const user = JSON.parse(localStorage.getItem('memberAuth'))
  const usersid = user?.membersid
  // const { getOrderData } = useContext(MemberAuthContext)

  const navigate = useNavigate()
  // const [orderData, setOrderData] = useState([])
  const [orderdetail, setOrderdetail] = useState([])
  const [show, setShow] = useState(false)
  const [ratescore, setRatescore] = useState(0)
  const [modalinput, setModalinput] = useState('')
  const [insertordersid, setInsertordersid] = useState('')
  const [ordergameid, setOrdergameid] = useState('')
  const [render, setRender] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const getorder = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_orderdetail/${usersid}`
    )
    // console.log(r.data)
    setOrderdetail(r.data)
  }
  useEffect(() => {
    // getOrderData(ACCOUNT, setOrderData)
    getorder()
  }, [render])
  // console.log(orderdetail)
  return (
    <>
      <main className="m-memberAccountMain ">
        <MemberAccountAside />
        <div className="container">
          <div className="row">
            <div className="m-memberAccountDiv">
              <h1>會員中心</h1>
            </div>
            <div className="col m-orderMainContext">
              <h1>訂單紀錄</h1>
              <table>
                <thead>
                  <tr>
                    <th>訂單編號</th>
                    <th>訂單遊戲</th>
                    {/* <th>訂單狀態</th> */}
                    <th>預約日期</th>

                    <th>總金額</th>
                    <th>訂單評論</th>
                  </tr>
                </thead>
                <tbody>
                  {orderdetail.map((v, i) => {
                    return (
                      <tr key={v.orderSid}>
                        {/* <td>{moment(v.create_at).format('YYYY-MM-DD')}</td> */}
                        <td>{v.orderSid}</td>
                        <td
                          onClick={() => {
                            navigate(`/order/${v.gameSid}`)
                          }}
                        >
                          {v.gamesName}
                        </td>
                        {/* <td>{v.orderState}</td> */}
                        <td>{v.orderDate}</td>
                        <td>{v.checkPrice}</td>
                        <td>
                          {v.filter ? (
                            <button
                              className="already"
                              onClick={() => {
                                navigate('/member/comment')
                              }}
                            >
                              已評價
                            </button>
                          ) : (
                            <button
                              className="notyet"
                              onClick={() => {
                                setShow(true)
                                setInsertordersid(v.orderSid)
                                setOrdergameid(v.gameSid)
                              }}
                            >
                              未評價
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Modal
                show={show}
                onHide={handleClose}
                className="m-profileUpdate"
              >
                <Modal.Header closeButton>
                  <Modal.Title>訂單評論</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <p>訂單評分</p>
                    <form>
                      <div className="ordermodalrate">
                        <span>評星：</span>
                        <div
                          className="orderrate"
                          style={{ cursor: 'pointer' }}
                        >
                          {[...Array(5)].map((v, i) => {
                            if (i + 1 <= ratescore) {
                              return (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setRatescore(i + 1)
                                  }}
                                >
                                  <AiTwotoneStar />
                                </div>
                              )
                            } else {
                              return (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setRatescore(i + 1)
                                  }}
                                >
                                  <AiOutlineStar />
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="mProfileMobile">評價：</label>
                        <input
                          type="text"
                          placeholder="請填寫評價"
                          value={modalinput}
                          onChange={(e) => {
                            setModalinput(e.target.value)
                          }}
                        />
                      </div>
                      <div className="m-profileUpdateButtonDiv">
                        {/* <button
                          className="btn"
                          type="button"
                          onClick={handleClose}
                        >
                          取消
                        </button> */}
                        {/* {console.log(insertordersid)} */}
                        <button
                          className="btn"
                          onClick={(e) => {
                            e.preventDefault()

                            axios.post(
                              'http://localhost:3005/insertcommentorder',
                              {
                                order: insertordersid,
                                usersid: usersid,
                                ordergameid: ordergameid,
                                rate: ratescore,
                                comment: modalinput,
                              }
                            )
                            setModalinput('')
                            setRatescore(0)
                            setShow(false)
                            setRender(!render)
                          }}
                        >
                          確認並送出
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberAccountOrder
