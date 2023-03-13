import React from "react";
import { Select, Space } from "antd";
// import "./O_Process_Two.css";

const Discount = {
  sid: 1,
  name: "30折價券",
  discount: 30,
};

const Count = {
  sid: 1,
  amount: 1800,
  totalCount: null,
};

const OrderTwo = () => {

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <div className="O_Process_Two_Sort">
        <h4 className="O_Process_Two_line">填寫資料</h4>
        <div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">姓名</h6>
            <input />
          </div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">手機號碼</h6>
            <input />
          </div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">地址</h6>
            <input />
          </div>
          <div className="d-flex justify-content-center">
            <h6 className="col-2">電子郵件</h6>
            <input />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center">付款方式</div>

          <Space wrap>
            <Select
              defaultValue="---請選擇---"
              style={{ width: 170}}
              size={"large"}
              onChange={handleChange}
              options={[
                { value: "Line Pay", label: "Line Pay" },
              ]}
            />
          </Space>

          {/* <div className="dropdown ">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ---請選擇---
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <div className="text-center">
                Line Pay
              </div>
            </ul>
          </div> */}
        </div>

        {/* 總金額 */}
        <div className="mt-3">
          <h5 className="text-center text-white text-decoration-line-through">
            總金額 : ${Count.amount}
          </h5>
        </div>

        {/* 優惠券 */}
        <div className="d-flex justify-content-center">
          <div className="text-white col-2 my-auto text-center">優惠券</div>

          <div className="dropdown ">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ---請選擇---
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <div className="text-center">{Discount.name}</div>
            </ul>
          </div>
        </div>

        {/* 總金額 */}
        <div className="mt-3">
          <h5 className="text-danger text-center">
            最後金額 : ${Count.amount - Discount.discount}
          </h5>
        </div>
      </div>
    </div>
  );
};
export default OrderTwo;
