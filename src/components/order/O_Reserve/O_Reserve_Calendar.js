import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ORDER } from '../../../components/config/api_config'
import AddSub from './calendarDate/addSub'
import Calendar from 'react-calendar'
// import Gamedate from "./calendar/gamedate";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { now } from 'moment'
import { checkToken } from '../../../ContextDashbard'

const CalendarDate = ({ sid, gameData }) => {
  // const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate() // 點選傳到訂單流程頁面

  const [value, setValue] = useState(new Date())

  const [selectedTime, setSelectedTime] = useState('') //使用在時間段選取

  // 抓kevin資料庫  這遊戲資料是要傳到add去計算人數、金額
  const [calendarInfo, setCalendarInfo] = useState([])

  const GameOrderGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + `/gamesinfo/${sid}`)

    // console.log('response:', response.data)
    setCalendarInfo(response.data)
  }

  useEffect(() => {
    GameOrderGetData()
  }, [])

  // 抓kevin資料庫  這要抓玩家等級----------------------
  const [memLevel, setMemLevel] = useState([])
  const memberAuth = JSON.parse(localStorage.getItem('memberAuth')) //抓會員編號

  const MemLevelGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(
      ORDER + `/ordermemLevel/` + `${memberAuth.membersid}`
    )

    // console.log('response:', response.data)
    setMemLevel(response.data)
  }

  useEffect(() => {
    MemLevelGetData()
  }, [])
  // ---------------------------------------

  // 抓kevin資料庫  資料還沒弄好  處理日曆時間不可選取 未完成
  // const [orderDate, setOrderDate] = useState([])

  // const OrderGetData = async () => {
  //   axios.defaults.withCredentials = true
  //   const response = await axios.get(ORDER + '/orderDate/1')

  //   console.log('response:', response.data)
  //   setOrderDate(response.data)
  // }
  // useEffect(() => {
  //   OrderGetData()
  //   const selectedDate = localStorage.getItem('selectedDate')
  //   if (selectedDate) {
  //     setValue(new Date(JSON.parse(selectedDate)))
  //   }
  // }, [])

  const buttonData = [
    {
      key: '1',
      time: '10:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '2',
      time: '11:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '3',
      time: '12:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '4',
      time: '13:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '5',
      time: '14:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '6',
      time: '15:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '7',
      time: '16:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '8',
      time: '17:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '9',
      time: '18:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '10',
      time: '19:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '11',
      time: '20:00',
      selectable: true,
      disabled: false,
    },
    {
      key: '12',
      time: '21:00',
      selectable: true,
      disabled: false,
    },
  ]

  const [calendarOrder, setCalendarOrder] = useState({
    member: '', //會員編號
    memberLevel: '', //會員等級
    sid: '', //遊戲編號
    gamesName: '', //遊戲名
    price: '', //訂單總金額
    people: '', //訂單選取人數
    orderState: '', //訂單狀態
    time: '', //訂單時間
    date: '', //訂單日期
    orderUsername: '', //訂單填寫姓名
    orderPhone: '', // 訂單填寫電話
    orderAdress: '', // 訂單填寫地址
    orderEmail: '', // 訂單填寫信箱
    orderDiscountName: '', // 訂單使用優惠券
    orderDiscount: '', // 訂單使用優惠券編號
    gameTime: '', //遊戲時間
    gamesLogo: '', //遊戲圖片
    storeName: '', //商店名
    storeAddress: '', //商店地址
  })
  // console.log(calendarOrder)
  // -------------------

  // const selectTime = (index, time) => {
  //   //先查詢是否有已經選則的時間，有的話先取消原來的，再賦值新選中的
  //   let oldIndex
  //   //沒有時返回-1
  //   oldIndex = this.timeList.findIndex((item) => {
  //     return item.type === 'primary'
  //   })
  //   //有已經選中的值,取消
  //   if (oldIndex > -1) {
  //     this.timeList[oldIndex].type = ''
  //   }
  //   //根據索引和時間對選擇的時間修改樣式
  //   let obj = {}
  //   obj = this.timeList.find((item) => {
  //     return item.time === time
  //   })
  //   this.timeList[index].type = 'primary'
  // }
  // ---------------------

  // const handleDateChange = (date) => {
  //   console.log(c)

  //   // 儲存選取的日期到 localstorage
  //   // localStorage.setItem(
  //   //   'selectedDate',
  //   //   JSON.stringify(moment(date).format('YYYY-MM-DD'))
  //   // )
  // }
  // const handleTimeClick = (time) => {
  //   // 修改函式，接收選取的時間
  //   console.log(time)
  //   setSelectedTime(time) // 更新選取的時間
  //   localStorage.setItem('selectedtime', JSON.stringify(time))
  // }
  // console.log(gameData)
  useEffect(() => {
    setCalendarOrder({
      ...calendarOrder,
      gamesName: gameData[0].gamesName,
      gameTime: gameData[0].Time,
      gamesLogo: gameData[0].gamesImages,
      storeName: gameData[0].storeName,
      storeAddress: gameData[0].storeAddress,
      sid: gameData[0].gamesSid,
      member: checkToken('memberAuth')?.membersid,
      // memberLevel: memLevel[0].memLevel, //沒成功
    })
  }, [gameData])

  const OrderProcessClick = () => {
    if (!checkToken('memberAuth')?.memberToken) return alert('請登入會員')
    localStorage.setItem('orderInfo', JSON.stringify(calendarOrder))
    Swal.fire({
      title: '前往預約流程',
      text: '',
      icon: 'success',
      confirmButtonText: '確認',
    })
    navigate('/orderp')
  }
  // console.log(!checkToken('memberAuth').memberToken)
  return (
    <div>
      <h3>時段預約</h3>

      {/* 日曆 */}
      {/* <Gamedate /> */}
      <div>
        <Calendar
          onChange={setValue}
          // onClickDay={handleDateChange} // 綁定到日曆上
          onClickDay={(date) => {
            let dateFormat = moment(date).format('YYYY-MM-DD')
            // console.log(dateFormat)
            setCalendarOrder({ ...calendarOrder, date: dateFormat })
          }} // 綁定到日曆上
          minDate={new Date()}
          maxDate={moment().add(3, 'months').toDate()} //設置最大日期範圍為三個月後的日期
          locale={'en'}
          value={value}
          className="mx-auto bg-transparent rounded-3 w-75"
          // tileDisabled
        />
      </div>

      {/* 時間段button */}
      <div>
        {buttonData.map((item) => {
          const { key, time, selectable, disabled } = item
          return (
            <Button
              key={key}
              className="m-2 col-3 fs-6 h-auto O_Reserve_Calendar_DateBtn"
              onClick={() => {
                setSelectedTime(time)
                setCalendarOrder({
                  ...calendarOrder,
                  date: moment(value).format('YYYY-MM-DD'),
                  time: time,
                })
              }}
              type={selectedTime === time ? 'danger' : 'default'}
              disabled={disabled}
            >
              {time}
            </Button>
          )
        })}
      </div>

      {/* 金額計算 */}
      <AddSub
        calendarInfo={calendarInfo}
        setCalendarOrder={setCalendarOrder}
        calendarOrder={calendarOrder}
      />

      {/* 預約button */}
      <button
        className="O_Reserve_Calendar_ReserveBtn"
        onClick={OrderProcessClick}
      >
        預約
      </button>
    </div>
  )
}

export default CalendarDate
