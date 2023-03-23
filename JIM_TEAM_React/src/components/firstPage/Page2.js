import React from 'react'
import '../../style/FisrtPage/firstPage.css'
import { BsCheckCircleFill } from 'react-icons/bs'
import { BsFillXCircleFill } from 'react-icons/bs'

function Page2() {
  return (
    <>
      <div className="P2_body d-flex">
        <div id="P2_left">
          <div className="d-flex flex-column">
            <div className="gameName">購票須知</div>
            <ul className="my-3 P2_gameContent">
              <li className="my-2">
                密室內場景較為黑暗，建議孕婦、幽閉恐懼症者，請勿參與密室逃脫體驗
              </li>
              <li className="my-2">
                館內通常無法飲食，若有攜帶食物需放入置物櫃
              </li>
              <li className="my-2">
                遊戲過程隨身物品會放置於置物櫃，可避免攜帶貴重物品入館，以免遺失
              </li>
            </ul>
            <div className="sub-title">費用包含/不包含</div>
            <div className="P2_gameContent d-flex flex-row align-items-center my-3 ">
              <div className="col">
                <BsCheckCircleFill className="mx-2" color="#D01B1B" />
                門票
              </div>
              <div className="col">
                <BsCheckCircleFill className="mx-2" color="#D01B1B" />
                導覽解說
              </div>
              <div className="col">
                <BsFillXCircleFill className="mx-2" color="gray" />
                未提及消費
              </div>
            </div>
            <div className="notice">
              <div className="sub-title my-3">注意事項</div>
              <ul className="P2_gameContent">
                <li className="my-2">
                  因交通、天氣等不可抗力因素所引起的時間延誤，造成部份行程景點取消時，請您主動聯絡客服，我們將會為您辦理部份退款。
                </li>
                <li className="my-2">
                  不建議患有下列疾病或其他不宜受到過度刺激的旅客參加此項目
                </li>
                <li className="my-2">心臟病、高血壓、氣喘、癲癇、懷孕婦女</li>
                <li className="my-2">
                  請務必於 10 分鐘前抵達指定地點，為避免耽誤之後行程，逾時不候。
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="P2_right">
          <div>
            <img
              id="P2_right_img"
              src="/Images/first_page/197_2.jpg"
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page2
