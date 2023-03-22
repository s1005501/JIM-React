import { useState, useContext, useEffect } from 'react'
import { ACCOUNT } from '../../config/api_config'
import MemberAuthContext from './MemberAuthContext'
import MemberAccountAside from './MemberAccountAside'

function MemberAccountDiscount() {
  const [discountData, setDiscountData] = useState([])
  const { getDiscountData, memberAuthState } = useContext(MemberAuthContext)
  const [discountRandInput, setDiscountRandInput] = useState('')

  useEffect(() => {
    getDiscountData(ACCOUNT, setDiscountData)
  }, [])
  console.log(discountRandInput)
  return (
    <>
      <main className="m-memberAccountMain">
        <MemberAccountAside />
        <div className="container">
          <div className="row">
            <div className="m-memberAccountDiv">
              <h1>會員中心</h1>
            </div>
            <div className="col m-discountMainContext">
              <h1>會員折價券</h1>
              <div className="m-discountForm">
                <from>
                  <input
                    type="text"
                    placeholder="請輸入折價券代碼"
                    name="discountRand"
                    onChange={(e) => {
                      setDiscountRandInput(e.target.value)
                    }}
                  />
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault()
                      // 有值才發ajax
                      if (discountRandInput !== '') {
                        console.log('aaa')
                        // 成功刷頁面+跳alert
                      }
                    }}
                  >
                    新增
                  </button>
                </from>
              </div>
              <div className="m-discountImg">
                <h2>已擁有折價券</h2>

                <div className="m-discountImgDiv">
                  {discountData.map((v, i) => {
                    return (
                      <div>
                        <img
                          src="/Images/uploads/coupon_empty.png"
                          alt=""
                          className=""
                        />
                        <p className="m-discountText">{v.discountName}</p>
                        <p className="m-discountPrice">{v.discountPrice}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberAccountDiscount
