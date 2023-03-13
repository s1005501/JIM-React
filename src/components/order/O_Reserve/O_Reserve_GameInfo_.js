import React, { useEffect, useState } from 'react'
import { Rate } from 'antd'
import { ORDER_DATA } from './../../../config/api_config'
import axios from 'axios'
import {
  FaTint,
  FaUserFriends,
  FaRegClock,
  FaMapMarked,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa'

// 預設假資料
const gameData = {
  gamesSid: 1,
  gamesName: '惠貞女子高校',
  gamesDifficulty: 4,
  gamesPeopleMin: 2,
  gamesPeopleMax: 6,
  Time: 60,
  storeAddress: '台北市中山區明水路581巷15號B1',
  gamesImages: './images/Game1.png',
  // bookmark: true,
  collectSid: 1,
  gamesContent:
    '我們生錯了時代  不是我們的錯   是這世界的錯！  不求同日生   但求同日死⋯  若有來生  希望能再次成為彼此的摯友….',
}

const GameInfo = () => {
  const [gameDataTest, setGameData] = useState([])

  // 抓kevin資料庫
  const gameGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER_DATA + '25')

    // console.log(response);
    console.log('response:', response.data)
    setGameData(response.data)
  }

  useEffect(() => {
    gameGetData()
  }, [])

  // --------------------------------------------------

  // 難度水滴數量顯示
  // const GameDifficulty = () => (
  //   <Rate
  //     character={<FaTint />}
  //     style={{ color: "red" ,fontSize:"24px"}}
  //     disabled
  //     defaultValue={gameDataTest.gamesDifficulty}
  //   />
  // );

  // 書籤狀態
  const [bookmarkstate, setBookmarkState] = useState(false)

  return (
    <div className="O_Reserve_GameInfo_Info">
      {gameDataTest.map((v, i) => {
        // console.log(v);
        return (
          <div key={v.gamesSid}>
            {/* 要想辦法補key */}
            <div className="O_Reserve_GameInfo_GameName">
              {/* 遊戲名 */}
              <h3 className="col-6 text-start">{v.gamesName}</h3>

              {/* 難度 */}
              <div className="O_Reserve_GameInfo_difficulty col-6">
                <h6>難度</h6>
                <div style={{ fontSize: '20px' }}>
                  {/* 難度水滴數量 */}
                  <Rate
                    character={<FaTint />}
                    style={{ color: 'red', fontSize: '24px' }}
                    disabled
                    defaultValue={v.gamesDifficulty}
                  />
                </div>
              </div>
            </div>

            <div className="O_Reserve_GameInfo_Gamesort">
              {/* 遊玩人數 */}
              <div className="O_Reserve_GameInfo_GamePelpel O_Reserve_GameInfo_LineWhite align-items-center">
                <h6>遊玩人數</h6>
                <div className="O_Reserve_GameInfo_Details">
                  <FaUserFriends />
                  <p style={{ margin: '0 5px' }}>
                    {v.gamesPeopleMin}-{v.gamesPeopleMax}
                  </p>
                </div>
              </div>

              {/* 時間 */}
              <div className="O_Reserve_GameInfo_Time O_Reserve_GameInfo_LineWhite">
                <h6>時間</h6>
                <div className="O_Reserve_GameInfo_Details">
                  <FaRegClock />
                  <p style={{ margin: '0 5px' }}>{v.Time}</p>
                </div>
              </div>

              {/* 地址 */}
              <div className="O_Reserve_GameInfo_Address O_Reserve_GameInfo_LineWhite">
                <h6>地址</h6>
                <div className="O_Reserve_GameInfo_Details align-items-start">
                  <FaMapMarked className=" mt-1" />
                  <p className="m-0 text-break">{v.storeAddress}</p>
                </div>
              </div>

              {/* 收藏 */}
              <div
                className="O_Reserve_GameInfo_Bookmark"
                onClick={() => {
                  setBookmarkState(!bookmarkstate)
                  console.log(gameData.bookmark)
                }}
              >
                <h6>收藏</h6>

                {bookmarkstate ? (
                  <div>
                    {/* <h6>取消收藏</h6> */}
                    <div
                      className="O_Reserve_GameInfo_Details "
                      style={{ justifyContent: 'center' }}
                    >
                      {<FaBookmark />}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* <h6>加入收藏</h6> */}
                    <div
                      className="O_Reserve_GameInfo_Details"
                      style={{ justifyContent: 'center' }}
                    >
                      {<FaRegBookmark />}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 遊戲介紹 */}
            <div className="O_Reserve_GameInfo_gameData">
              <p>{v.gamesContent}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default GameInfo
