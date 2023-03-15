import { useState } from 'react'
import MemberRegister from './MemberRegister'
import MemberLogin from './MemberLogin'
import { useParams, useSearchParams } from 'react-router-dom'

function MemberLoginRegister() {
  const [memberLoginOrNot, setmemberLoginOrNot] = useSearchParams()
  const [loginOrRegister, setLoginOrRegister] = useState('會員登入')

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
