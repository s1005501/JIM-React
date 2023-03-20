import { useContext, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ThemeContext from './ThemeContext'
import moment from 'moment/moment'
// import "./CommentinnerPage.css";
import { BsArrowReturnLeft } from 'react-icons/bs'
import {
  AiTwotoneStar,
  AiOutlineStar,
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from 'react-icons/ai'
import { ImUsers } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { FiMapPin } from 'react-icons/fi'

const usersid = localStorage.getItem('usersid2')
console.log(usersid)

function CommentinnerPage() {
  const { gameName, setGameName } = useContext(ThemeContext)
  const [gamedetail, setGamedetail] = useState([])
  const [avrage, setAvrage] = useState([])
  const [ratescore, setRatescore] = useState(0)
  const [commentuser, setCommentuser] = useState([])
  const [replycomment, setReplycomment] = useState([])
  const [randomgame, setRandomgame] = useState([])
  const [myliked, setMyliked] = useState([])
  const [btnstate, setBtnstate] = useState(false)
  const [textareavalue, setTextareavalue] = useState('')
  const [replyinputvalue, setReplyinputvalue] = useState('')
  const [picname, setPicname] = useState('')
  const [belowcomment, setBelowcomment] = useState([])
  const [reader, setRender] = useState(false)
  const [totalliked, setTotalliked] = useState([])
  let { mygamesName } = useParams()
  const navigate = useNavigate()

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

  const getlikedata = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_liked/${usersid}/${mygamesName}`
    )
    setMyliked(r.data)
  }
  const getbelowcomment = async () => {
    const r = await axios.get(
      `http://localhost:3005/api_comment/${usersid}/${mygamesName}`
    )
    const result = r.data
    const newresult = result.map((v, i) => {
      return { ...v, toggle: false }
    })

    setBelowcomment(newresult)
  }

  // const gettotalliked = async () => {
  //   const r = await axios.get(`http://localhost:3005/totalliked`);

  //   setTotalliked(r.data);
  // };

  useEffect(() => {
    getrandomdata()
    getgamedetail()
    getavrage()
    getcommentuser()
    getlikedata()
    getbelowcomment()
  }, [mygamesName])
  useEffect(() => {
    getreplydata()
    getbelowcomment()
    // gettotalliked();
  }, [reader])

  //   {const likedtotal=myliked.reduce((acc,v)=>{return acc+v.liked})
  // console.log(likedtotal)}

  return (
    <>
      <div className="">
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
                <Link to="/comment">
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
                    <>
                      <div className="gamedetail" key={i}>
                        <div className="img2">
                          <img
                            className="image"
                            src={'../Images/gamesImages/' + v.gamesImages}
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
                          value={textareavalue}
                          onChange={(e) => {
                            setTextareavalue(e.target.value)
                          }}
                        ></textarea>
                      </div>
                      <div className="inputbtns">
                        {picname ? (
                          <img
                            className="replypics"
                            src={'../images/commentlocalImages/' + picname}
                            alt=""
                          />
                        ) : null}
                        <div className="pics">
                          <button className="picbtn">
                            圖片
                            <input
                              type="file"
                              className="hiddenpicbtn"
                              onChange={(e) => {
                                setPicname(e.target.files[0].name)
                              }}
                            />
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="submit"
                            onClick={async (e) => {
                              e.preventDefault()

                              const a = await axios.post(
                                'http://localhost:3005/insertcomment',
                                {
                                  usersid: usersid,
                                  gamessid: v.gamesSid,
                                  rate: ratescore,
                                  pics: picname || 'null',
                                  comment: textareavalue,
                                }
                              )
                              console.log(a)
                              setRatescore(0)
                              setTextareavalue('')
                              setPicname('')
                              console.log(123)
                              setRender(!reader)
                              // window.location.reload();
                            }}
                          >
                            提交
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })}
              </>

              <div className="commentandgames">
                <div className="commentandreplyfiled">
                  <div className="commentandreply">
                    {belowcomment.map((v, i) => {
                      return (
                        <>
                          <div className="userinfo">
                            <div className="usericon">
                              <img
                                className="usericonimg"
                                src={
                                  '../Images/commentlocalImages/' +
                                  v.memHeadshot
                                }
                                alt=""
                              />
                            </div>
                            <div className="usercommentdetail">
                              <p style={{ margin: '0' }}>{v.memNickName}</p>
                              <p className="datetime" style={{ margin: '0' }}>
                                {moment(v.create_at).format('YYYY-MM-DD')}
                              </p>
                              <div className="ratestar">
                                {[...Array(5)].map((value, index) => {
                                  if (index + 1 <= v.rate) {
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
                          <div className="commenttext">
                            {v.comment}
                            {v.pics === 'null' ? null : (
                              <img
                                className="replypics"
                                src={'../images/commentlocalImages/' + v.pics}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="reply">
                            <p className="apartline">
                              ---------------------------
                            </p>
                            <p className="apartline-mobile">------------</p>
                            <button
                              className="css1"
                              onClick={() => {
                                const newcommentuser = belowcomment.map(
                                  (v2) => {
                                    if (v2.sid === v.sid) {
                                      return { ...v2, toggle: !v.toggle }
                                    } else {
                                      return { ...v2 }
                                    }
                                  }
                                )
                                setBelowcomment(newcommentuser)
                              }}
                            >
                              回覆
                            </button>
                            {v.filter ? (
                              v.filter.liked ? (
                                <>
                                  <div
                                    className="liked"
                                    onClick={(e) => {
                                      e.preventDefault()

                                      axios.delete(
                                        `http://localhost:3005/insertdelete/${v.sid}/${usersid}`
                                      )

                                      setRender(!reader)
                                    }}
                                  >
                                    <AiFillLike />
                                    {v.total ? v.total.totallike : 0}
                                    {/* {console.log(totalliked)} */}
                                    {/* {console.log(totalliked)} */}
                                    {/* {totalliked===null?(null):(<p>{totalliked[0].totallike}</p>)} */}
                                  </div>
                                  <div
                                    className="disliked"
                                    onClick={(e) => {
                                      e.preventDefault()

                                      axios.put(
                                        `http://localhost:3005/update/${v.sid}/${usersid}`
                                      )
                                      setRender(!reader)
                                    }}
                                  >
                                    <AiOutlineDislike />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="liked"
                                    onClick={(e) => {
                                      e.preventDefault()

                                      axios.put(
                                        `http://localhost:3005/update2/${v.sid}/${usersid}`
                                      )
                                      setRender(!reader)
                                    }}
                                  >
                                    <AiOutlineLike />
                                    {v.total ? v.total.totallike : 0}
                                  </div>

                                  <div
                                    className="disliked"
                                    onClick={(e) => {
                                      e.preventDefault()

                                      axios.delete(
                                        `http://localhost:3005/insertdelete/${v.sid}/${usersid}`
                                      )
                                      setRender(!reader)
                                    }}
                                  >
                                    <AiFillDislike />
                                  </div>
                                </>
                              )
                            ) : (
                              <>
                                <div
                                  className="liked"
                                  onClick={(e) => {
                                    e.preventDefault()

                                    axios.post(
                                      'http://localhost:3005/insertliked',
                                      {
                                        usersid: usersid,
                                        commentsid: v.sid,
                                        likedgamesid: v.games_id,
                                        liked: 1,
                                      }
                                    )
                                    setRender(!reader)
                                  }}
                                >
                                  <AiOutlineLike />
                                  {v.total ? v.total.totallike : 0}
                                </div>
                                <div
                                  className="disliked"
                                  onClick={(e) => {
                                    e.preventDefault()

                                    axios.post(
                                      'http://localhost:3005/insertliked',
                                      {
                                        usersid: usersid,
                                        commentsid: v.sid,
                                        likedgamesid: v.games_id,
                                        liked: 0,
                                      }
                                    )
                                    setRender(!reader)
                                  }}
                                >
                                  <AiOutlineDislike />
                                </div>
                              </>
                            )}
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
                                  value={replyinputvalue}
                                  onChange={(e) => {
                                    setReplyinputvalue(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="inputbtns">
                                {picname ? (
                                  <img
                                    className="replypics"
                                    src={'../images/' + picname}
                                    alt=""
                                  />
                                ) : null}
                                <div className="pics">
                                  <button className="picbtn">
                                    圖片
                                    <input
                                      type="file"
                                      onChange={(e) => {
                                        setPicname(e.target.files[0].name)
                                      }}
                                      className="hiddenpicbtn"
                                    />
                                  </button>
                                </div>

                                <div>
                                  <button
                                    type="submit"
                                    className="submit"
                                    onClick={(e) => {
                                      e.preventDefault()

                                      axios.post(
                                        'http://localhost:3005/insertreplycomment',
                                        {
                                          usersid: usersid,
                                          commentsid: v.sid,
                                          repliedpics: picname || 'null',
                                          repliedcomment: replyinputvalue,
                                        }
                                      )
                                      setReplyinputvalue('')
                                      setPicname('')
                                      setRender(!reader)
                                    }}
                                  >
                                    提交
                                  </button>
                                </div>
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
                                    {v3.replied_pics === 'null' ||
                                    null ? null : (
                                      <img
                                        className="replypics"
                                        src={
                                          '../images/commentlocalImages/' +
                                          v3.replied_pics
                                        }
                                        alt=""
                                      />
                                    )}
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
                        <div className="recommandtitle" key={i}>
                          其他遊戲推介
                        </div>
                        <div className="gamesdetail">
                          <Link
                            to={'/comment/' + v.gamesSid}
                            className="commentmain_link"
                          >
                            <div className="images">
                              <img
                                className="commentimg"
                                src={'../Images/gamesImages/' + v.gamesImages}
                                alt=""
                              />
                            </div>

                            <p
                              className="recommandgamename"
                              style={{ color: 'black' }}
                            >
                              {v.gamesName}
                            </p>
                          </Link>
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
