import { useState, useContext, useEffect } from 'react'
import { ACCOUNT } from '../../config/api_config'
import MemberAuthContext from './MemberAuthContext'
import MemberAccountAside from './MemberAccountAside'
import axios from 'axios'
import { useContextValue, checkToken } from '../../ContextDashbard'
import Swal from 'sweetalert2'
function MemberAccountDiscount() {
  const [discountData, setDiscountData] = useState([])
  const { getDiscountData, memberAuthState } = useContext(MemberAuthContext)
  const [discountNum, setDiscountNum] = useState('')
  const [discountRandInput, setDiscountRandInput] = useState('')
  const { membersid } = checkToken('memberAuth')

  const insertRand = async (membersid, discountRandInput) => {
    const r = await axios.get(
      `http://localhost:3005/member/setdiscount/${membersid}?discount=${discountRandInput}`
    )
    console.log(3)
    console.log(r.data)
    if (r?.data.length > 1) {
      Swal.fire({
        title: '折價券新增成功!',
        text: `折價券新增成功`,
        icon: 'success',
        confirmButtonText: '確認',
      })
      getDiscountData(ACCOUNT, setDiscountData)
    }
  }

  useEffect(() => {
    console.log(1)
    getDiscountData(ACCOUNT, setDiscountData)
  }, [discountRandInput])

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
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    insertRand(membersid, discountRandInput)
                  }}
                >
                  <input
                    type="text"
                    placeholder="請輸入折價券代碼"
                    name="discountRand"
                    value={discountNum}
                    onChange={(e) => {
                      setDiscountNum(e.target.value)
                    }}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      setDiscountRandInput(discountNum)
                    }}
                  >
                    新增
                  </button>
                </form>
              </div>
              <div className="m-discountImg">
                <h2>已擁有折價券</h2>

                <div className="m-discountImgDiv">
                  {discountData.map((v, i) => {
                    return (
                      <div key={v.discountSid}>
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
