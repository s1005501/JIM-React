import React, { useState, useEffect } from 'react'
// import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Rate } from 'antd'
import { ORDER } from '../../../components/config/api_config'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import moment from 'moment'
// import moment from 'moment';

const GameComment = {
  memNickName: '豆花30塊',
  memHeadshot: 'Ahri.png',
  rate: 2,
  comment: '解謎謎題與整體情境有趣好玩，充分動腦且增進親子同樂的好選擇。',
  creat_at: '2023年1月8日',
}

const Comment = () => {
  // 抓kevin資料庫
  const [reserveComment, setReserveComment] = useState([])

  const commentGetData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(ORDER + '/orderComment/1')

    console.log('response:', response.data)
    setReserveComment(response.data)
  }

  useEffect(() => {
    commentGetData()
  }, [])

  return (
    <div className="O_Reserve_Comment">
      <h3>評論</h3>

      {reserveComment.map((v, i) => {
        return (
          <div className="mt-3" key={i}>
            <div className="d-flex border-bottom">
              <div>
                {/* 大頭照 */}
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar src={`Images/orders/${v.memHeadshot}`} size={60} />
                    {/* 下列是大頭照icon的 */}
                    {/* <Avatar size={60} icon={<UserOutlined />} /> */}
                  </Space>
                </Space>
              </div>

              <div className=" w-100">
                <h5 className=" text-start">
                  {/* 玩家稱號 */}
                  {v.memNickName}
                </h5>

                <div className="d-flex justify-content-between">
                  {/* 星數 */}
                  <Rate
                    style={{ color: 'red' }}
                    disabled
                    defaultValue={v.rate}
                  />

                  {/* 評論日期 */}
                  <p className="my-auto">
                    {moment(v.create_at).format('YYYY-MM-DD')}
                  </p>
                </div>

                {/* 內容 */}
                <p className=" text-start">{v.comment}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Comment
