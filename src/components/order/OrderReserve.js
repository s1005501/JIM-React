import React, { useEffect, useState } from 'react'
import { ORDER } from '../../components/config/api_config'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { Tabs } from 'antd'
import GameInfo from './O_Reserve/O_Reserve_GameInfo_'
import CalendarDate from './O_Reserve/O_Reserve_Calendar'
import Comment from './O_Reserve/O_Reserve_Comment'
import axios from 'axios'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function OrderReserve() {
  const { sid } = useParams()
  const [gameData, setGameData] = useState([])
  console.log(useParams(), 9999999999999)

  // 抓kevin資料庫
  const gameGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + `/gamesinfo/${sid}`)

    // console.log(response);
    console.log('response:', response.data)
    setGameData(response.data)
  }

  useEffect(() => {
    gameGetData()
  }, [])

  // ----------------------------------
  const items = [
    {
      key: '1',
      label: `遊戲說明`,
      children: (
        <div>
          <div className="O_Reserve_Tabs_Date">
            <GameInfo sid={sid} />
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: `預約`,
      children: (
        <div>
          <div className="O_Reserve_Tabs_Date">
            <CalendarDate />
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: `評論`,
      children: (
        <div>
          <div className="O_Reserve_Tabs_Date">
            <Comment />
          </div>
        </div>
      ),
    },
  ]

  const onChange = (key) => {
    console.log(key)
  }

  // 按鈕切換
  const ReserveTabs = () => (
    <Tabs
      defaultActiveKey="1"
      tabBarGutter={100}
      centered
      items={items}
      onChange={onChange}
    />
  )

  // -------------------------------------
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

        <div className="mainContainer O_Reserve_Cont">
          {/* 遊戲宣傳圖 */}
          {gameData.map((v, i) => {
            console.log(v)
            return (
              <div key={v.gamesSid} className="O_Reserve_Container">
                <div className="col-xl-6 O_Reserve_ColImg">
                  <img
                    src={`/Images/orders/${v.gamesImages}`}
                    // src={`Images/orders/${v.gamesLogo}`}
                    alt=""
                    className="O_Reserve_GameImg"
                  />
                </div>

                {/* 說明/預約/評論切換*/}
                <div className="col-xl-5 O_Reserve_ColGame">
                  <ReserveTabs />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default OrderReserve
