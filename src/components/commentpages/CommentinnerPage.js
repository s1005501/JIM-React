import React, { useContext, useState, useEffect, Fragment, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ReactEmojiEditor } from 'react-emotor'
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

import { BsArrowReturnRight } from 'react-icons/bs'
import { ImUsers } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { FiMapPin } from 'react-icons/fi'
import Swal from 'sweetalert2'
import { swalAlert } from '../store/StoreComponent'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

function CommentinnerPage() {
  const user = JSON.parse(localStorage.getItem('memberAuth'))
  const usersid = user?.membersid
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
  const [picname2, setPicname2] = useState('')
  const [belowcomment, setBelowcomment] = useState([])
  const [reader, setRender] = useState(false)
  const [totalliked, setTotalliked] = useState([])
  // const [hidecomment,setHidecomment]=useState(true)

  let { mygamesName } = useParams()
  const navigate = useNavigate()
  const emotor = useRef()

  // 组件内容改变回调函数
  function contentOnChange(content) {
    setTextareavalue(content)
  }

  // 清空组件内容
  function myClean() {
    console.log('clean')
    emotor.current.clean()
  }

  // 组件获取焦点
  function myFocus() {
    console.log('onFocus')
    emotor.current.onFocus()
  }

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
      return { ...v, toggle: false, hidecomment: true }
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
    // getavrage()
    getcommentuser()
    getlikedata()
    // getbelowcomment()
  }, [mygamesName])
  useEffect(() => {
    getavrage()
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
                    <span>返回搜索頁</span>
                  </div>
                </Link>
              </div>

              <>
                {gamedetail.map((v, i) => {
                  return (
                    <Fragment key={i}>
                      <div className="gamedetail">
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
                                    <div key={index}>
                                      <AiTwotoneStar />
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div key={index}>
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
                            <div className="person">
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

                      <div className="type">
                        <div className="score d-flex">
                          <div
                            style={{
                              color: 'white',
                              width: '50%',
                              fontSize: '23px',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'end',
                              textAlign: 'end',
                              alignItems: 'center',
                            }}
                          >
                            遊戲評分
                          </div>
                          <span className="rate mx-auto">
                            {[...Array(5)].map((v, i) => {
                              if (i + 1 <= ratescore) {
                                return (
                                  <span
                                    style={{ cursor: 'pointer' }}
                                    key={i}
                                    onClick={() => {
                                      setRatescore(i + 1)
                                    }}
                                  >
                                    <AiTwotoneStar />
                                  </span>
                                )
                              } else {
                                return (
                                  <span
                                    style={{ cursor: 'pointer' }}
                                    key={i}
                                    onClick={() => {
                                      setRatescore(i + 1)
                                    }}
                                  >
                                    <AiOutlineStar />
                                  </span>
                                )
                              }
                            })}
                          </span>
                        </div>
                        <div className="inputAndBtn">
                          <div className="input2">
                            <ReactEmojiEditor
                              ref={emotor}
                              className="emojiinput"
                              id="myEmotor"
                              placeholder="請寫下想說的話..."
                              onChange={(content) => contentOnChange(content)}
                            />
                          </div>
                          <div className="inputbtns">
                            <div className="picAndBtn">
                              {picname ? (
                                <img
                                  className="replypics"
                                  src={'../images/uploads/' + picname}
                                  alt=""
                                />
                              ) : null}
                              <div className="pics">
                                <button className="picbtn">
                                  圖片
                                  <input
                                    type="file"
                                    className="hiddenpicbtn"
                                    onChange={async (e) => {
                                      console.log(e.target.files[0])
                                      const fd = new FormData()
                                      fd.append('photos', e.target.files[0])
                                      const r = await axios.post(
                                        'http://localhost:3005/post/',
                                        fd
                                      )
                                      console.log(r.data[0].filename)
                                      setPicname(r.data[0].filename)
                                    }}
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="sub">
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
                                  setRatescore(0)
                                  setTextareavalue('')
                                  myClean()
                                  setPicname('')
                                  setRender(!reader)
                                  // window.location.reload();
                                }}
                              >
                                提交
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )
                })}
              </>

              <div className="commentandgames">
                <div className="commentandreplyfiled">
                  <div className="commentandreply">
                    {belowcomment.map((v, i) => {
                      // console.log(belowcomment)
                      return (
                        <div className="mydiv" key={i}>
                          {/* ( <> <div className="userinfo">
                            <div className="usericon">
                              <img
                                className="usericonimg"
                                src={
                                  v.memHeadshot.length > 20
                                    ? '../Images/uploads/' + v.memHeadshot
                                    : '../Images/commentlocalImages/' +
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
                                      <div key={index}>
                                        <AiTwotoneStar />
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div key={index}>
                                        <AiOutlineStar />
                                      </div>
                                    )
                                  }
                                })}
                              </div>
                            </div>
                          </div>  <div className="commenttext">
                            <BsArrowReturnRight /> &nbsp;&nbsp;
                            {v.comment}
                            {v.pics === 'null' ? null : (
                              <img
                                className="replypics"
                                src={
                                  v.pics.length > 20
                                    ? '../Images/uploads/' + v.pics
                                    : '../Images/commentlocalImages/' + v.pics
                                }
                                alt=""
                              />
                            )}
                          </div></>):(<div style={{disply:'flex',textAlign:'center',color:'white',fontSize:'20px'}}>已隱藏該評論</div>)} */}
                          {v.filter ? (
                            v.filter.liked ? (
                              <>
                                <div className="userinfo">
                                  <div className="usericon">
                                    <img
                                      className="usericonimg"
                                      src={
                                        v.memHeadshot.length > 20
                                          ? '../Images/uploads/' + v.memHeadshot
                                          : '../Images/commentlocalImages/' +
                                            v.memHeadshot
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="usercommentdetail">
                                    <p style={{ margin: '0' }}>
                                      {v.memNickName}
                                    </p>
                                    <p
                                      className="datetime"
                                      style={{ margin: '0' }}
                                    >
                                      {moment(v.create_at).format('YYYY-MM-DD')}
                                    </p>
                                    <div className="ratestar">
                                      {[...Array(5)].map((value, index) => {
                                        if (index + 1 <= v.rate) {
                                          return (
                                            <div key={index}>
                                              <AiTwotoneStar />
                                            </div>
                                          )
                                        } else {
                                          return (
                                            <div key={index}>
                                              <AiOutlineStar />
                                            </div>
                                          )
                                        }
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="commenttext">
                                  <BsArrowReturnRight /> &nbsp;&nbsp;
                                  {v.comment}
                                  {v.pics === 'null' ? null : (
                                    <img
                                      className="replypics"
                                      src={
                                        v.pics.length > 20
                                          ? '../Images/uploads/' + v.pics
                                          : '../Images/commentlocalImages/' +
                                            v.pics
                                      }
                                      alt=""
                                    />
                                  )}
                                </div>{' '}
                              </>
                            ) : (
                              <div
                                style={{
                                  disply: 'flex',
                                  textAlign: 'center',
                                  color: 'white',
                                  fontSize: '20px',
                                }}
                              >
                                已隱藏該評論
                              </div>
                            )
                          ) : (
                            <>
                              <div className="userinfo">
                                <div className="usericon">
                                  <img
                                    className="usericonimg"
                                    src={
                                      v.memHeadshot.length > 20
                                        ? '../Images/uploads/' + v.memHeadshot
                                        : '../Images/commentlocalImages/' +
                                          v.memHeadshot
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="usercommentdetail">
                                  <p style={{ margin: '0' }}>{v.memNickName}</p>
                                  <p
                                    className="datetime"
                                    style={{ margin: '0' }}
                                  >
                                    {moment(v.create_at).format('YYYY-MM-DD')}
                                  </p>
                                  <div className="ratestar">
                                    {[...Array(5)].map((value, index) => {
                                      if (index + 1 <= v.rate) {
                                        return (
                                          <div key={index}>
                                            <AiTwotoneStar />
                                          </div>
                                        )
                                      } else {
                                        return (
                                          <div key={index}>
                                            <AiOutlineStar />
                                          </div>
                                        )
                                      }
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="commenttext">
                                <BsArrowReturnRight /> &nbsp;&nbsp;
                                {v.comment}
                                {v.pics === 'null' ? null : (
                                  <img
                                    className="replypics"
                                    src={
                                      v.pics.length > 20
                                        ? '../Images/uploads/' + v.pics
                                        : '../Images/commentlocalImages/' +
                                          v.pics
                                    }
                                    alt=""
                                  />
                                )}
                              </div>{' '}
                            </>
                          )}
                          {/* <div className="userinfo">
                            <div className="usericon">
                              <img
                                className="usericonimg"
                                src={
                                  v.memHeadshot.length > 20
                                    ? '../Images/uploads/' + v.memHeadshot
                                    : '../Images/commentlocalImages/' +
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
                                      <div key={index}>
                                        <AiTwotoneStar />
                                      </div>
                                    )
                                  } else {
                                    return (
                                      <div key={index}>
                                        <AiOutlineStar />
                                      </div>
                                    )
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="commenttext">
                            <BsArrowReturnRight /> &nbsp;&nbsp;
                            {v.comment}
                            {v.pics === 'null' ? null : (
                              <img
                                className="replypics"
                                src={
                                  v.pics.length > 20
                                    ? '../Images/uploads/' + v.pics
                                    : '../Images/commentlocalImages/' + v.pics
                                }
                                alt=""
                              />
                            )}
                          </div> */}
                          <div className="myBtnssss">
                            <div className="reply">
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
                              {v.commentuser_id === usersid ? (
                                <button
                                  className="css1"
                                  style={{ marginLeft: '10px' }}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    // confirmAlert({
                                    //   message: `是否刪除?`,
                                    //   buttons: [
                                    //     {
                                    //       label: '是',
                                    //       onClick: async () => {
                                    //         await axios.delete(
                                    //           `http://localhost:3005/commentdelete/${v.sid}`
                                    //         )

                                    //         setRender(!reader)
                                    //       },
                                    //     },
                                    //     {
                                    //       label: '否',
                                    //       onClick: () =>
                                    //         swalAlert(
                                    //           '已取消刪除',
                                    //           '已取消刪除',
                                    //           'success',
                                    //           '確認'
                                    //         ),
                                    //     },
                                    //   ],
                                    // })
                                    Swal.fire({
                                      title: `是否刪除此評論`,
                                      showDenyButton: true,
                                      showCancelButton: false,
                                      confirmButtonText: '是',
                                      denyButtonText: `否`,
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        try {
                                          const r = await axios.delete(
                                            `http://localhost:3005/commentdelete/${v.sid}`
                                          )
                                          console.log(r)
                                          setRender(!reader)
                                          swalAlert(
                                            '刪除成功',
                                            '刪除成功',
                                            'success',
                                            '確認'
                                          )
                                          if (!!r.data.affectedRows) {
                                            // navigate('/store')
                                          }
                                        } catch (error) {}
                                      } else if (result.isDenied) {
                                        swalAlert(
                                          '已取消刪除',
                                          '已取消刪除',
                                          'success',
                                          '確認'
                                        )
                                      }
                                    })
                                  }}
                                >
                                  刪除
                                </button>
                              ) : null}
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
                                        // setHidecomment(false)
                                        // setBelowcomment(newincomment)
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
                                        // setHidecomment(true)
                                        // setBelowcomment(newincomment)
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

                                      // setBelowcomment(newincomment)

                                      axios.post(
                                        'http://localhost:3005/insertliked',
                                        {
                                          usersid: usersid,
                                          commentsid: v.sid,
                                          likedgamesid: v.games_id,
                                          liked: 0,
                                        }
                                      )
                                      // setHidecomment(false)

                                      setRender(!reader)
                                    }}
                                  >
                                    <AiOutlineDislike />
                                  </div>
                                </>
                              )}
                              <p className="apartline"></p>
                              <p className="apartline-mobile"></p>
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
                                  {picname2 ? (
                                    <img
                                      className="replypics2"
                                      src={'../images/uploads/' + picname2}
                                      alt=""
                                    />
                                  ) : null}
                                  <div style={{ display: 'flex' }}>
                                    <div className="pics">
                                      <button
                                        className="picbtn"
                                        style={{ margin: '0' }}
                                      >
                                        圖片
                                        <input
                                          type="file"
                                          onChange={async (e) => {
                                            console.log(e.target.files[0])
                                            const fd = new FormData()
                                            fd.append(
                                              'photos',
                                              e.target.files[0]
                                            )
                                            const r = await axios.post(
                                              'http://localhost:3005/post/',
                                              fd
                                            )
                                            // console.log(r.data[0].filename)
                                            setPicname2(r.data[0].filename)
                                          }}
                                          className="hiddenpicbtn"
                                        />
                                      </button>
                                    </div>

                                    <div>
                                      <button
                                        type="submit"
                                        className="submit"
                                        style={{ margin: '0' }}
                                        onClick={(e) => {
                                          e.preventDefault()

                                          axios.post(
                                            'http://localhost:3005/insertreplycomment',
                                            {
                                              usersid: usersid,
                                              commentsid: v.sid,
                                              repliedpics: picname2 || 'null',
                                              repliedcomment: replyinputvalue,
                                            }
                                          )
                                          setReplyinputvalue('')
                                          setPicname2('')
                                          setRender(!reader)
                                        }}
                                      >
                                        提交
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {replycomment.map((v3, i3) => {
                              if (v3.comment_id === v.sid) {
                                return (
                                  <Fragment key={i3}>
                                    {' '}
                                    <div className="myReply">
                                      <div className="replyid">
                                        <p
                                          className="usernamereply"
                                          style={{ color: 'white' }}
                                        >
                                          {v3.memNickName}
                                        </p>
                                        回覆
                                        <p
                                          className="usernamereply"
                                          style={{ color: 'white' }}
                                        >
                                          {v.memNickName}
                                        </p>
                                      </div>
                                      <div className="replytext">
                                        {v3.replied_comment}
                                        {v3.replied_pics === 'null' ||
                                        null ? null : (
                                          <img
                                            className="replypics2"
                                            src={
                                              v3.replied_pics.length > 20
                                                ? '../Images/uploads/' +
                                                  v3.replied_pics
                                                : '../Images/commentlocalImages/' +
                                                  v3.replied_pics
                                            }
                                            alt=""
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </Fragment>
                                )
                              }
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="gamerecommend">
                  <div
                    style={{
                      color: 'white',
                      fontSize: '23px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    更多遊戲推薦
                  </div>
                  {randomgame.map((v, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="recommandtitle"></div>
                        <div className="gamesdetail">
                          <Link
                            to={'/comment/' + v.gamesSid}
                            className="commentmain_link"
                            onClick={() => {
                              setRender(!reader)
                              document.documentElement.scrollTop = 0
                            }}
                          >
                            <div className="images">
                              <img
                                className="commentimg"
                                src={'../Images/gamesImages/' + v.gamesImages}
                                alt=""
                              />
                            </div>

                            <p className="imgname" style={{ color: 'black' }}>
                              {v.gamesName}
                            </p>
                          </Link>
                        </div>
                      </Fragment>
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
