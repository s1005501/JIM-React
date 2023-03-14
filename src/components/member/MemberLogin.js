import { useContext, useState } from 'react'
import { ACCOUNTLOGIN } from '../../config/api_config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'

function MemberLogin() {
  const [memberLoginInput, setMemberLoginInput] = useState({
    account: '',
    password: '',
  })

  const navigate = useNavigate()

  const { setMemberAuthState } = useContext(MemberAuthContext)
  const sendMemberLoginData = async () => {
    axios.defaults.withCredentials = true
    await axios.post(ACCOUNTLOGIN, memberLoginInput).then((response) => {
      if (response.data.success) {
        const { memAccount, membersid, memberToken } = response.data

        localStorage.setItem(
          'memberAuth',
          JSON.stringify({
            memAccount,
            membersid,
            memberToken,
          })
        )

        setMemberAuthState({
          authorized: true,
          membersid: membersid,
          memAccount: memAccount,
          memberToken: memberToken,
        })

        alert('登入成功')

        navigate('/')
      } else {
        alert('帳號或密碼錯誤')
      }
    })
  }

  return (
    <>
      <div className="m-loginSecondSection">
        <div className="m-mainText">
          <h1>會員登入</h1>
          <h4>LOGIN IN</h4>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMemberLoginData()
            }}
          >
            <div>
              <label htmlFor="account"></label>
              <input
                type="text"
                placeholder="帳號 ACCOUNT"
                name="account"
                className="m-accountInput"
                onChange={(e) => {
                  setMemberLoginInput((prev) => ({
                    ...memberLoginInput,
                    account: e.target.value,
                  }))
                }}
              />
              <label htmlFor="password"></label>
              <input
                type="text"
                placeholder="密碼 PASSWORD"
                name="password"
                className="m-passwordInput"
                onChange={(e) => {
                  setMemberLoginInput((prev) => ({
                    ...memberLoginInput,
                    password: e.target.value,
                  }))
                }}
              />
            </div>
            <div className="d-flex justify-content-between m-formSecondSection">
              <input
                type="text"
                placeholder="驗證碼 CAPTCHA"
                className="m-captcha"
              />
              <div className="m-verifyCode">
                <h5>4694</h5>
                <p>不區分大小寫</p>
              </div>
            </div>
            <div>
              <button className="btn m-signIn">登入 SIGN IN</button>
              <p className="m-signInP">忘記密碼? FORGET PASSWORD</p>
            </div>
            <button className="btn m-googleSignIn d-flex justify-content-center">
              <img src={'/Images/google-login.png'} alt="" />
              GOOGLE 登入
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default MemberLogin
