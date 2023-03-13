import { useContext, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ThemeContext from './ThemeContext'
// import "./CommentinnerPage.css";
import './../../style/commentstyle/CommentinnerPage.css'

import { BsArrowReturnLeft } from 'react-icons/bs'
import {
  AiTwotoneStar,
  AiOutlineStar,
  AiFillLike,
  AiOutlineDislike,
} from 'react-icons/ai'
import { ImUsers } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { FiMapPin } from 'react-icons/fi'

function CommentinnerPage() {
  const { gameName, setGameName } = useContext(ThemeContext)
  const [gamedetail, setGamedetail] = useState([])
  const [avrage, setAvrage] = useState([])
  const [ratescore, setRatescore] = useState(0)
  const [commentuser, setCommentuser] = useState([])
  const [replycomment, setReplycomment] = useState([])
  const [randomgame, setRandomgame] = useState([])
  const [liked, setLiked] = useState(0)
  let { mygamesName } = useParams()
  const navigate = useNavigate()
  console.log(mygamesName)

  const getgamedetail = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_gamesdetail/${mygamesName}`
    )
    setGamedetail(r.data)
  }

  const getavrage = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_averagescore/${mygamesName}`
    )
    const result = r.data
    const score = Math.ceil(result[0].score)
    setAvrage(score)
  }

  const getcommentuser = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_comment/${mygamesName}`
    )

    const result = r.data
    const newresult = result.map((v, i) => {
      return { ...v, toggle: false }
    })

    setCommentuser(newresult)
  }
  const getreplydata = async () => {
    const r = await axios.get('http://localhost:3005/api_reply')

    setReplycomment(r.data)
  }
  const getrandomdata = async () => {
    const r = await axios.get('http://localhost:3005/api_random')
    setRandomgame(r.data)
  }
  // useEffect(() => {
  //   getreplydata()
  //   getrandomdata()
  // }, [])
  // useEffect(() => {
  //   getgamedetail()
  //   getavrage()
  //   getcommentuser()
  // }, [])
  {
    console.log(commentuser)
  }

  return (
    <>
      <Header />
      <div className="bodyContainer">
        <div className="leftContainer">
          <Link to="/">
            <div className="leftContainer02">
              <div className="leftContainer0202"></div>
            </div>
          </Link>
        </div>

        <div className="mainContainer">
          <div className="fullpage">
            <div className="pagecontent2">
              <div className="btns2">
                <Link to="/">
                  <div
                    className="return"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    <BsArrowReturnLeft />
                    返回搜索頁
                  </div>
                </Link>
              </div>

              <>
                {gamedetail.map((v, i) => {
                  return (
                    <div className="gamedetail" key={i}>
                      <div className="img2">
                        <img
                          className="image"
                          src={
                            '../Images/commentImages/gamesImages/' + v.gamesLogo
                          }
                          alt=""
                        />
                      </div>
                      <div className="gameinfo">
                        <div className="gametitle">
                          <p>{v.gamesName}</p>
                          <div className="averagerate">
                            {[...Array(5)].map((value, index) => {
                              if (index + 1 <= avrage) {
                                return (
                                  <div>
                                    <AiTwotoneStar />
                                  </div>
                                )
                              } else {
                                return (
                                  <div>
                                    <AiOutlineStar />
                                  </div>
                                )
                              }
                            })}

                            <div className="ratescore">遊戲分數</div>
                          </div>
                        </div>
                        <div className="tips">
                          <div className="person">
                            <div>遊玩人數</div>
                            <div className="info">
                              <p>
                                <ImUsers />
                                {v.gamesPeopleMin}-{v.gamesPeopleMax}人
                              </p>
                            </div>
                          </div>
                          <div className="time">
                            <div>時間</div>
                            <div className="info">
                              <p>
                                <BiTimeFive />
                                {v.Time}分
                              </p>
                            </div>
                          </div>
                          <div className="address">
                            <div>地址</div>
                            <div className="info">
                              <p className="addressp">
                                <FiMapPin /> {v.storeAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="gameintro">
                          <p>{v.gamesContent}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </>

              <div className="rate">
                {[...Array(5)].map((v, i) => {
                  if (i + 1 <= ratescore) {
                    return (
                      <div
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
                        onClick={() => {
                          setRatescore(i + 1)
                        }}
                      >
                        <AiOutlineStar />
                      </div>
                    )
                  }
                })}

                <div>遊戲評分</div>
              </div>
              <div className="input2">
                <textarea
                  className="commentinput"
                  defaultValue="請寫下你想說的話..."
                ></textarea>
              </div>
              <div className="inputbtns">
                <div className="pics">圖片</div>
                <div>提交</div>
              </div>

              <div className="commentandgames">
                <div className="commentandreplyfiled">
                  <div className="commentandreply">
                    {commentuser.map((v, i) => {
                      return (
                        <>
                          <div className="userinfo">
                            <div className="usericon">
                              <img
                                className="usericonimg"
                                src="../Images/3-FunLock 放樂工作室.jpg"
                                alt=""
                              />
                            </div>
                            <div className="usercommentdetail">
                              <p style={{ margin: '0' }}>{v.memNickName}</p>
                              <p className="datetime" style={{ margin: '0' }}>
                                2023-1-18
                              </p>
                              <div className="ratestar">
                                {[...Array(5)].map((value, index) => {
                                  if (index + 1 <= avrage) {
                                    return (
                                      <div>
                                        <AiTwotoneStar />
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div>
                                        <AiOutlineStar />
                                      </div>
                                    )
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="commenttext">{v.comment}</div>
                          <div className="reply">
                            <p className="apartline">
                              ---------------------------
                            </p>
                            <p className="apartline-mobile">------------</p>
                            <button
                              className="css1"
                              onClick={() => {
                                const newcommentuser = commentuser.map((v2) => {
                                  if (v2.sid === v.sid) {
                                    return { ...v2, toggle: !v.toggle }
                                  } else {
                                    return { ...v2 }
                                  }
                                })
                                setCommentuser(newcommentuser)
                              }}
                            >
                              回覆
                            </button>
                            <div className="liked">
                              <AiFillLike />
                              123
                            </div>
                            <div className="disliked">
                              <AiOutlineDislike />
                              12
                            </div>
                            <p className="apartline">
                              ---------------------------
                            </p>
                            <p className="apartline-mobile">------------</p>
                          </div>
                          {v.toggle ? (
                            <div className="replyinput">
                              <div className="input2">
                                <input
                                  className="callinput"
                                  placeholder="寫下你想說的話..."
                                />
                              </div>
                              <div className="inputbtns">
                                <div className="pics">圖片</div>
                                <div>提交</div>
                              </div>
                            </div>
                          ) : null}
                          {replycomment.map((v3, i3) => {
                            if (v3.comment_id === v.sid) {
                              return (
                                <>
                                  {' '}
                                  <div className="replyid" key={i3}>
                                    <p
                                      className="usernamereply"
                                      style={{ color: '#d01b1b' }}
                                    >
                                      {v3.memNickName}
                                    </p>
                                    回覆
                                    <p
                                      className="usernamereply"
                                      style={{ color: '#d01b1b' }}
                                    >
                                      {v.memNickName}
                                    </p>
                                  </div>
                                  <div className="replytext">
                                    {v3.replied_comment}
                                  </div>
                                </>
                              )
                            }
                          })}
                        </>
                      )
                    })}
                  </div>
                </div>
                <div className="gamerecommend">
                  {randomgame.map((v, i) => {
                    return (
                      <>
                        {' '}
                        <div className="recommandtitle" key={i}>
                          其他熱門討論推介
                        </div>
                        <div className="gamesdetail">
                          {/* <Link to={'/comment-detail/'+gameName} > */}
                          <div className="images">
                            <img
                              src={
                                '../Images/commentImages/gamesImages/' +
                                v.gamesLogo
                              }
                              alt=""
                            />
                          </div>

                          <p className="recommandgamename">{v.gamesName}</p>
                          {/* </Link> */}
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentinnerPage