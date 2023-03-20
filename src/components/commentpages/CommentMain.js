import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
// import "./CommentMain.css";
import Header from '../common/Header'
import Footer from '../common/Footer'
import { BiSearch } from 'react-icons/bi'
import ThemeContext from './ThemeContext'
import axios from 'axios'

localStorage.setItem('usersid', '5')
localStorage.setItem('usersid2', '15')

function CommentMain() {
  const navigate = useNavigate()
  const [inputvalue, setInputvalue] = useState('')
  const { gameSid, setGameSid } = useContext(ThemeContext)
  const [displaygames, setDisplaygames] = useState([])
  const [news, setNews] = useState([])
  const [keyname, setKeyname] = useState([])
  // const [searchkey,setSearchkey]=useState()

  //  useEffect(()=>{
  //   (async()=>{
  //     const r = await axios.get(`http://localhost:3005/try?${param.toString()}`)
  //     console.log(r.data)
  //   })()
  //  },[param])

  const getgamesdata = async () => {
    const r = await axios.get('http://localhost:3005/api_displaygames')
    // console.log(r.data)
    setDisplaygames(r.data)
  }
  const getnewsdata = async () => {
    const r = await axios.get('http://localhost:3005/api_news')
    // console.log(r.data)
    setNews(r.data)
  }

  const getkeyname = async () => {
    const r = await axios.get('http://localhost:3005/api_random')
    // console.log(r.data)
    setKeyname(r.data)
  }

  const searchkeyword = async () => {
    console.log(inputvalue)
    const r = await axios.get(`http://localhost:3005/try/${inputvalue}`)
    console.log(r.data)
    // // console.log(r.data)
    // if(!r.data.length) return
    // // if(!r.data.length){return }

    navigate(`/comment/${r.data[0].gamesSid}`)
  }
  useEffect(() => {
    getgamesdata()
    getnewsdata()
    getkeyname()
  }, [])
  // useEffect(()=>{
  //   (async()=>{
  //     const r = await axios.get(`http://localhost:3005/try/等一個人盜墓`);
  //     console.log(r.data,555)

  //   })()
  // },[inputvalue])

  return (
    <>
      <div className="" style={{ minHeight: '85vh' }}>
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

                <div
                  className="searchicon"
                  onClick={() => {
                    searchkeyword()
                  }}
                >
                  <BiSearch />
                </div>
              </div>
            </div>
            <p className="searchbar_p">的討論吧!</p>
          </div>

          <div className="hotspotgames">
            <div className="hotspotgamestitle">遊戲推介</div>
            <div className="keywordssqure">
              {keyname.map((v, i) => {
                if (i < 5) {
                  return (
                    <div className="gameskeywords">
                      <Link
                        to={'/comment/' + v.gamesSid}
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
                            className="imgname"
                            style={{ color: '#d01b1b', fontWeight: 'bolder' }}
                          >
                            {v.gamesName}
                          </p>
                        </Link>
                      </div>
                    )
                  }
                })}
              </div>
              <div className="hotspotgamesqure">
                {displaygames.map((v, i) => {
                  if (i > 1 && i < 4) {
                    return (
                      <div className="gamesdetail" key={i}>
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
                            className="imgname"
                            style={{ color: '#d01b1b', fontWeight: 'bolder' }}
                          >
                            {v.gamesName}
                          </p>
                        </Link>
                      </div>
                    )
                  }
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
