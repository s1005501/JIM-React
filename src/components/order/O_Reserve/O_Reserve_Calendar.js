import React, { useState } from "react";
import { Button } from "antd";
import AddSub from "./calendarDate/addSub";
import Calendar from "react-calendar";
// import Gamedate from "./calendar/gamedate";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-calendar/dist/Calendar.css';
import { now } from "moment";

const CalendarDate = () => {
  // const [quantity, setQuantity] = useState(0);

  const [value, onChange] = useState(new Date());


  const buttonData = [
    {
      key: "1",
      time: "10:00",
    },
    {
      key: "2",
      time: "11:00",
    },
    {
      key: "3",
      time: "12:00",
    },
    {
      key: "4",
      time: "13:00",
    },
    {
      key: "5",
      time: "14:00",
    },
    {
      key: "6",
      time: "15:00",
    },
    {
      key: "7",
      time: "16:00",
    },
    {
      key: "8",
      time: "17:00",
    },
    {
      key: "9",
      time: "18:00",
    },
    {
      key: "10",
      time: "19:00",
    },
    {
      key: "11",
      time: "20:00",
    },
    {
      key: "12",
      time: "21:00",
    },
  ];

  const buttonTimeClick = () => {
    console.log("123");
  };

  return (
    <div>

      <h3>時段預約</h3>

      {/* 日曆 */}
      {/* <Gamedate /> */}
      <div>
        <Calendar onChange={onChange} minDate={new Date()} locale={"en-EN"} value={value} className="mx-auto bg-transparent rounded-3 w-75"/>
      </div>
      
      {/* 時間段button */}
      {buttonData.map((item, v) => (
        
        <Button
          key={v}
          onClick={buttonTimeClick}
          className="px-4 col-2 O_Reserve_Calendar_DateBtn" 
        >
          {item.time}
        </Button>
      ))}


      {/* 金額計算 */}
      <AddSub />


      {/* 預約button */}
      <button className="O_Reserve_Calendar_ReserveBtn">預約</button>

    </div>
  );
};

export default CalendarDate;
