import { useContext, useState, useEffect } from 'react'
import {
  ACCOUNTLOGIN,
  ACCOUNTGOOGLELOGIN,
  ACCOUNT,
} from '../../config/api_config'
import googleIcon from '../../svg/google-login.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MemberAuthContext from './MemberAuthContext'
import Swal from 'sweetalert2'
import { googleAuth, googleProvider } from './../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { async } from '@firebase/util'

function MemberLogin({ memberLoginOrNot }) {
  const [memberLoginInput, setMemberLoginInput] = useState({
    account: '',
    password: '',
    memCaptcha: '',
  })

  const navigate = useNavigate()

  const { setMemberAuthState, memberAuthState } = useContext(MemberAuthContext)
  // 一般登入
  const sendMemberLoginData = async () => {
    axios.defaults.withCredentials = true

    await axios.post(ACCOUNTLOGIN, memberLoginInput).then((response) => {
      // 登入成功
      if (response.data.success) {
        console.log(response.data)
        const { memAccount, membersid, memberToken, memVerified, memHeadshot } =
          response.data

        // 驗證信成功
        if (memVerified === '1') {
          localStorage.setItem(
            'memberAuth',
            JSON.stringify({
              memAccount,
              membersid,
              memberToken,
              memHeadshot,
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

          navigate('/member/profile')
        } else {
          Swal.fire({
            title: 'Error!',
            text: '煩請您先前往信箱進行驗證',
            icon: 'error',
            confirmButtonText: '確認',
          })
        }
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
  }
  // google登入測試func
  const memberGoogleLogin = async () => {
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
      const { memAccount, membersid, memberToken, memVerified } = response.data

      // 驗證成功
      if (memVerified === '1') {
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

        navigate('/member')
      } else {
        Swal.fire({
          title: 'Error!',
          text: '煩請您先前往信箱進行驗證',
          icon: 'error',
          confirmButtonText: '確認',
        })
      }
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
  }
  // 驗證碼Captcha
  const [captcha, setCaptcha] = useState('')
  const memberCaptcha = async (setCaptcha) => {
    const response = await axios.get(ACCOUNT + '/captcha')
    setCaptcha(response.data)
  }

  useEffect(() => {
    memberCaptcha(setCaptcha)
  }, [])

  function createMarkup(captcha) {
    return { __html: `${captcha}` }
  }

  function MyComponent(captcha) {
    return <svg dangerouslySetInnerHTML={createMarkup(captcha)} />
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
                value={memberLoginInput.account}
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
                value={memberLoginInput.password}
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
                value={memberLoginInput.memCaptcha}
                onChange={(e) => {
                  setMemberLoginInput((prev) => ({
                    ...memberLoginInput,
                    memCaptcha: e.target.value,
                  }))
                }}
              />
              <div className="m-verifyCode">
                {MyComponent(captcha)}
                <p
                  onClick={() => {
                    memberCaptcha(setCaptcha)
                  }}
                >
                  刷新驗證碼
                </p>
              </div>
            </div>
            <div>
              <button className="btn m-signIn">登入 SIGN IN</button>
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
