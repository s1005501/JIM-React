import { useState } from 'react'
import MemberRegister from './MemberRegister'
import MemberLogin from './MemberLogin'
import { useParams, useSearchParams } from 'react-router-dom'
import { ACCOUNTVERIFIED } from './../../config/api_config'
import axios from 'axios'

function MemberLoginRegister() {
  const [memberLoginOrNot, setmemberLoginOrNot] = useSearchParams()

  const [loginOrRegister, setLoginOrRegister] = useState('會員登入')

  // ! 會員透過驗證信點擊回來即作判斷並寫入資料庫
  let { action } = useParams()
  console.log(useParams())
  const memberVerifiedFunction = async () => {
    const response = await axios.get(`${ACCOUNTVERIFIED}/${action}`)
    console.log(response)
  }
  if (action) {
    memberVerifiedFunction()
  }
  return (
    <>
      <main className=" m-memberLoginMain">
        <div className="d-flex m-firstSection">
          <button
            className={
              loginOrRegister === '會員登入'
                ? 'm-loginChange btn'
                : 'm-loginChange btn m-loginOrSignUp m-loginBorderRadius'
            }
            onClick={(e) => {
              e.preventDefault()
              setLoginOrRegister(e.target.innerText)
            }}
          >
            會員登入
          </button>
          <button
            className={
              loginOrRegister === '會員登入'
                ? 'm-signInChange btn m-loginOrSignUp  m-signInBorderRadius'
                : 'm-signInChange btn '
            }
            onClick={(e) => {
              e.preventDefault()
              setLoginOrRegister(e.target.innerText)
            }}
          >
            加入會員
          </button>
        </div>
        {loginOrRegister === '會員登入' ? (
          <MemberLogin memberLoginOrNot={memberLoginOrNot} />
        ) : (
          <MemberRegister setLoginOrRegister={setLoginOrRegister} />
        )}
      </main>
    </>
  )
}

export default MemberLoginRegister
