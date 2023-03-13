import { useState, useContext, useEffect } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { ACCOUNT } from '../../config/api_config'
import MemberAuthContext from './MemberAuthContext'
import { useNavigate } from 'react-router-dom'

function MemberAccountLevel() {
  const [levelData, setLevelData] = useState({})
  const { getLevelData, memberAuthState } = useContext(MemberAuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    getLevelData(ACCOUNT, setLevelData)
  }, [])

  return (
    <>
      {/* <div className="m-bearBg"></div>
      <div className="m-blackBg"></div> */}
      <main className="m-memberAccountMain">
        <aside className="memberAside">
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/order')
            }}
          >
            <p>訂單紀錄</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/comment')
            }}
          >
            <p>評論紀錄</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/like')
            }}
          >
            <p>收藏</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member')
            }}
          >
            <p>個人資料</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
          <div
            className="m-asideItem"
            onClick={() => {
              navigate('/member/level')
            }}
          >
            <p>會員等級</p>
            <FaArrowCircleRight className="m-rightArrowIcon" />
          </div>
        </aside>
        <div className="container">
          <div className="row">
            <div className="m-memberAccountDiv">
              <h1>會員中心</h1>
            </div>
            <div className="col m-levelMainContext">
              <h1>會員等級</h1>
              <div className="d-flex justify-content-center m-levelMainContextOutDiv">
                <img
                  src={`/Images/uploads/${levelData.memHeadshot}`}
                  alt=""
                  className="m-memberAccountCardLevelImg"
                />
                <div className="d-flex flex-column justify-content-center text-start m-levelMainText">
                  <p className="m-cardLevel">{levelData.memCardLevel}</p>
                  <div className="d-flex flex-column m-levelInfo">
                    <p>
                      累計消費金額<span>{levelData.memSumPrice}元</span>
                    </p>
                    {levelData.difference < 0 ? (
                      <p>恭喜您已升到最高等級會員</p>
                    ) : (
                      <p>
                        尚差多少金額可升級<span>{levelData.difference}元</span>
                      </p>
                    )}
                    {/* //! 要改成甚麼資訊哩 */}
                    <p>消費滿5000元可升級金卡會員</p>
                  </div>
                </div>
              </div>
              <div className="m-levelLevelUpInfo">
                <p className="m-levelLevelUpInfoTitle">會員權益說明</p>
                <p className="m-levelLevelUpInfoContext">
                  <br />
                  【免費申辦，效期無限】 <br />
                  於本網站完成註冊會員後，即可成為銅卡會員
                  <br />
                  銅卡會員消費累計無效期限制，消費累計滿$500(含)元即可升等為銀卡會員
                  <br />
                  <br />
                  【好禮優惠，聰明消費】 <br />
                  銅卡會員於本網站預約密室逃脫遊戲即享每筆訂單9折優惠
                  <br />
                  <br />
                  【生日禮讚，專屬祝福】
                  <br />
                  生日獲贈$50優惠券乙張，不限訂單金額均可抵用。(於前月25號依匯券當日卡別發放相應優惠券至會員帳戶；生日當月成為銅卡會員，系統將自動於註冊當日匯入。)
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberAccountLevel
