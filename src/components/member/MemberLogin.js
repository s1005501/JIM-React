import { useContext, useState } from 'react'
import { ACCOUNTLOGIN, ACCOUNTGOOGLELOGIN } from '../../config/api_config'
import googleIcon from '../../svg/google-login.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import Swal from 'sweetalert2'
import { googleAuth, googleProvider } from './../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
function MemberLogin({ memberLoginOrNot }) {
  const [memberLoginInput, setMemberLoginInput] = useState({
    account: '',
    password: '',
  })

  const navigate = useNavigate()

  const { setMemberAuthState, memberAuthState } = useContext(MemberAuthContext)
  // 一般登入
  const sendMemberLoginData = async () => {
    if (memberLoginOrNot.get('mode') || memberAuthState.memberVerified) {
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
            memberVerified: true,
          })

          Swal.fire({
            title: 'Success!',
            text: `登入成功`,
            icon: 'success',
            confirmButtonText: '確認',
          })

          navigate('/memberAccount/profile')
        }

        // 登入失敗跳警示
        if (!response.data.success) {
          Swal.fire({
            title: 'Error!',
            text: `${response.data.error}`,
            icon: 'error',
            confirmButtonText: '確認',
          })
        }
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: '煩請您先前往信箱進行驗證',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
  }
  // google登入測試func
  const memberGoogleLogin = async () => {
    if (memberLoginOrNot.get('mode') || memberAuthState.memberVerified) {
      // 帶入兩個參數第一個是auth、第二個是provider
      const googleResult = await signInWithPopup(googleAuth, googleProvider)

      const googleForm = new FormData()

      // 把資料塞進剛建立的new FormData
      googleForm.append('googleEmail', `${googleResult.user.email}`)

      const response = await axios.post(ACCOUNTGOOGLELOGIN, googleForm, {
        headers: {
          // Content-Type要用application/json
          'Content-Type': 'application/json',
        },
      })
      console.log(response.data)
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
          memberVerified: true,
        })
        Swal.fire({
          title: 'Success!',
          text: `登入成功`,
          icon: 'success',
          confirmButtonText: '確認',
        })

        // navigate('/memberAccount/profile')
      }
      // 登入失敗跳警示
      if (!response.data.success) {
        Swal.fire({
          title: 'Error!',
          text: `${response.data.error}`,
          icon: 'error',
          confirmButtonText: '確認',
        })
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: '煩請您先前往信箱進行驗證',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
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
            <button
              className="btn m-googleSignIn d-flex justify-content-center"
              onClick={(e) => {
                e.preventDefault()
                memberGoogleLogin()
              }}
            >
              <img src={googleIcon} alt="" />
              GOOGLE 登入
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default MemberLogin
