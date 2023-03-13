import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, message, Steps, theme, Modal } from "antd";
import OrderProcessOne from "./O_Process/O_Process_One";
import OrderProcessTwo from "./O_Process/O_Process_Two";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


function OrderProcess() {

  const steps = [
    {
      title: "訂單清單",
      content: (
        <div>
          <OrderProcessOne />
        </div>
      ),
    },
    {
      title: "填寫資料",
      content: (
        <div>
          <OrderProcessTwo />
        </div>
      ),
    },
    {
      title: "付款資訊",
      content: (
        <div>
            <div className="O_Process_Three_Sort">
              <h5 className="text-center">總金額 : 1,650 尚未付款</h5>
              <Button type="primary" style={{fontSize:"16px"}} onClick={() => next()}>
                Line Pay 付款
              </Button>
          </div>
        </div>
      ),
    },
    {
      title: "完成訂單",
      content: (
          <div>
            <div className="orderFour_Sort">
              <div>
                <h5>預約編號 : 22298787</h5>
                <p>付款方式 : Line Pay</p>
                <p>預約日期 : 2023-02-11</p>
                <p>預約時間 : 14:00</p>
                <p>預約人數 : 3人</p>
                <p>訂單總額 : $1,800</p>
              </div>
              <div>
                <Button
                  type="primary"
                  style={{
                  backgroundColor:"transparent",
                  borderColor:"white",
                  marginRight:"100px",
                  fontSize:"16px"
                  }}
                  onClick={() => prev()}
                >
                  回首頁
                </Button>
                <Button
                  type="primary"
                  style={{backgroundColor:"red",fontSize:"16px"}}
                  onClick={() => message.success("Processing complete!")}
                >
                  查看我的預約訂單
                </Button>
              </div>
            </div>
        </div>
      ),
    },
  ];

  // -----------------------------------------

  const { token } = theme.useToken();

  const [current, setCurrent] = useState(0);
  console.log(current);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));


  // 流程下面的框框範圍
  const contentStyle = {
    // lineHeight: "260px",
    // height:"600px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    marginTop: 16,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
  };

  // -------------------------------------------

  return (
    <>
      <div className="bodyContainer">
        <div className="leftContainer">
          <Link to="/">
            <div className="leftContainer02">
              <div className="leftContainer0202"></div>
            </div>
          </Link>
        </div>

        {/* 高設固定，不然會有空白；加marginRight讓內容置中 */}
        <div
          className="mainContainer"
          style={{ minHeight: "650px", marginRight: "200px" }}
        >
          <div className="steps O_Process_frame">
            <Steps
              current={current}
              percent={60}
              labelPlacement="vertical"
              items={items}
            />

            <div style={contentStyle}>{steps[current].content}</div>

            <div className="O_Process_button">
              {current >= 0 && current <3  && (
                <Button
                  style={{ margin: "0 8px",fontSize:"16px"}}
                  onClick={() => {
                    if (current === 0) return;
                    prev();
                  }}
                >
                  回上一步
                </Button>
              )}

              {current === steps.length - 4 && (
                <Button style={{fontSize:"16px"}} onClick={() => next()}>
                  填寫資料
                </Button>
              )}

              {current === steps.length - 3 && (
                <Button style={{fontSize:"16px"}} onClick={() => next()}>
                  確認資料
                </Button>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderProcess;
