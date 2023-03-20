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
import { now } from 'moment'

const CalendarDate = () => {
  // const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate() // 點選傳到訂單流程頁面

  const [value, setValue] = useState(new Date())

  const [selectedTime, setSelectedTime] = useState('') //使用在時間段選取

  // 抓kevin資料庫  這遊戲資料是要傳到add去計算人數、金額
  const [calendarInfo, setCalendarInfo] = useState([])

  const GameOrderGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/gamesinfo/24')

    console.log('response:', response.data)
    setCalendarInfo(response.data)
  }

  useEffect(() => {
    GameOrderGetData()
  }, [])

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
    date: '',
    time: '',
    people: '',
    price: '',
  })
  console.log(calendarOrder)
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

  const OrderProcessClick = () => {
    navigate('/orderp')
  }

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
            console.log(dateFormat)
            setCalendarOrder({ ...calendarOrder, date: dateFormat })
          }} // 綁定到日曆上
          minDate={new Date()}
          locale={'en'}
          value={value}
          className="mx-auto bg-transparent rounded-3 w-75"
          // tileDisabled
        />
      </div>

      {/* 時間段button */}
      {buttonData.map((item) => (
        <Button
          key={item.key}
          // onClick={() => handleTimeClick(item.time)}
          onClick={(time) => {
            // let timeFormat = time
            console.log(item.time)
            setCalendarOrder({ ...calendarOrder, time: item.time })
          }}
          className={`px-4 col-2 O_Reserve_Calendar_DateBtn ${
            item.selectable ? '' : 'disabled'
          } ${item.disabled ? 'O_Reserve_Calendar_BtnDisabled' : ''} ${
            selectedTime === item.key ? 'O_Reserve_Calendar_BtnActive' : ''
          }`}
          disabled={!item.selectable || item.disabled}
        >
          {item.time}
        </Button>
      ))}

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
