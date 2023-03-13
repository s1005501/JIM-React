import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import "./CommentMain.css";
import Header from '../common/Header'
import Footer from '../common/Footer'
import { BiSearch } from 'react-icons/bi'
import ThemeContext from './ThemeContext'
import axios from 'axios'
import './../../style/commentstyle/CommentMain.css'

function CommentMain() {
  const navigate = useNavigate()
  const [inputvalue, setInputvalue] = useState('')
  const { gameName, setGameName } = useContext(ThemeContext)
  const [displaygames, setDisplaygames] = useState([])
  const [news, setNews] = useState([])

  // const getgamesdata = async () => {
  //   const r = await axios.get('http://localhost:3005/api_displaygames')
  //   // console.log(r.data)
  //   setDisplaygames(r.data)
  // }
  // const getnewsdata = async () => {
  //   const r = await axios.get('http://localhost:3005/api_news')
  //   // console.log(r.data)
  //   setNews(r.data)
  // }
  // useEffect(() => {
  //   getgamesdata()
  //   getnewsdata()
  // }, [])
  // useEffect(() => {
  //   setGameName(inputvalue)
  // }, [inputvalue])

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
          <div className="searchbar">
            <p className="searchbar_p">讓我加入</p>
            <div className="searchkeywords">
              <div className="searchinput">
                <input
                  type="text"
                  value={inputvalue}
                  onChange={(e) => {
                    setInputvalue(e.target.value)
                  }}
                />
                <div className="searchicon">
                  <Link to={'/comment-detail/' + gameName}>
                    <BiSearch />
                  </Link>
                </div>
              </div>
            </div>
            <p className="searchbar_p">的討論吧!</p>
          </div>

          <div className="hotspotgames">
            <div className="hotspotgamestitle">熱門遊戲討論</div>
            <div className="keywordssqure">
              {news.map((v, i) => {
                if (i < 5) {
                  return (
                    <div className="gameskeywords">
                      <Link
                        to={'/comment-detail/' + v.gamesName}
                        className="keywords_p"
                        key={i}
                      >
                        <div className="gameskeywords_p">#{v.gamesName}</div>
                      </Link>
                    </div>
                  )
                }
              })}
            </div>
            <div className="hotspotgamesfield">
              <div className="hotspotgamesqure">
                {displaygames.map((v, i) => {
                  if (i < 2) {
                    return (
                      <div className="gamesdetail" key={i}>
                        <Link
                          to={'/comment-detail/' + v.gamesName}
                          className="commentmain_link"
                        >
                          <div className="images">
                            <img
                              src={
                                '../Images/commentImages/gamesImages/' +
                                v.gamesLogo
                              }
                              alt=""
                            />
                          </div>

                          <p
                            className="imgname"
                            style={{ color: '#d01b1b', fontWeight: 'bolder' }}
                          >
                            {v.gamesName}
                          </p>
                        </Link>
                      </div>
                    )
                  }
                  console.log(displaygames)
                  console.log(v.gameName)
                })}
              </div>
              <div className="hotspotgamesqure">
                {displaygames.map((v, i) => {
                  if (i > 1 && i < 4) {
                    return (
                      <div className="gamesdetail" key={i}>
                        <Link
                          to={'/comment-detail/' + v.gamesName}
                          className="commentmain_link"
                        >
                          <div className="images">
                            <img
                              src={
                                '../Images/commentImages/gamesImages/' +
                                v.gamesLogo
                              }
                              alt=""
                            />
                          </div>

                          <p
                            className="imgname"
                            style={{ color: '#d01b1b', fontWeight: 'bolder' }}
                          >
                            {v.gamesName}
                          </p>
                        </Link>
                      </div>
                    )
                  }
                  console.log(displaygames)
                  console.log(v.gameName)
                })}
              </div>
              <div className="news">
                <div className="newscomment">
                  <div className="newscommenttitle">最新留言</div>
                  {news.map((v, i) => {
                    if (i < 5) {
                      return (
                        <div className="newscommentdetail" key={i}>
                          <div className="mentionuser">
                            <p
                              className="mentionusername"
                              style={{ color: '#d01b1b' }}
                            >
                              {v.memNickName}
                            </p>
                            <p
                              className="p1"
                              style={{ color: 'rgba(255,255,255,0.6)' }}
                            >
                              發表留言:
                            </p>
                          </div>
                          <div className="newscommentcontent">{v.comment}</div>
                        </div>
                      )
                    }
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

export default CommentMain
