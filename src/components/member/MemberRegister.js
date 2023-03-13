import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../style/JIM_Register.css'
import { ACCOUNTREGISTER } from '../../config/api_config'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'

function MemberRegister({ setLoginOrRegister }) {
  const navigate = useNavigate()

  const {
    register, // state
    handleSubmit,
    formState: { errors }, // 錯誤樣式資訊
    watch, // 監聽表單內容，是func
    control, // 給usewatch用的，讓他能夠知道要監聽哪一個表單
    clearError,
  } = useForm({
    // 預設值帶入要透過defaultValues:{}
    //   // 立即檢測
  })

  const watchForm = useWatch({
    control,
  })
  useEffect(() => {
    console.log(watchForm)
  }, [watchForm])

  const sendMemberRegisterData = async (data) => {
    axios.defaults.withCredentials = true
    await axios.put(ACCOUNTREGISTER, data).then((response) => {
      if (response.data.success) {
        alert('註冊成功')
        // todo 頁面刷新不會跑到最上面
        setLoginOrRegister('會員登入')
        // navigate('/memberLogin')
      }
    })
  }

  // setFocus('mAccount', { shouldSelect: true })

  // 錯誤樣式   formState: { errors }
  // console.log(' errors ', errors)

  // todo 表單自動填入無法手動輸入且無法判定有填入資料
  // const [fastInputValue, setFastInputValue] = useState({
  //   mAccountValue: '',
  //   mPasswordValue: '',
  //   mPasswordVerifyValue: '',
  //   mNameValue: '',
  //   mEmailValue: '',
  //   mMobileValue: '',
  //   mNicknameValue: '',
  //   mBirthValue: '',
  //   mIdentityValue: '',
  // })
  // const fastInput = () => {
  //   setFastInputValue({
  //     mAccountValue: 'kevin123',
  //     mPasswordValue: 'kevin123',
  //     mPasswordVerifyValue: 'kevin123',
  //     mNameValue: '甘先生',
  //     mEmailValue: 'kevin123@gmail.com',
  //     mMobileValue: '0987654321',
  //     mNicknameValue: 'kevin123',
  //     mBirthValue: '1993-04-15',
  //     mIdentityValue: 'F123456789',
  //   })
  // }
  return (
    <>
      <div className="m-registerSecondSection">
        <div className="m-mainText">
          <h1>會員註冊</h1>
          <h4
          // onClick={() => {
          //   fastInput()
          // }}
          >
            SIGN UP
          </h4>
        </div>
        <div>
          <form onSubmit={handleSubmit(sendMemberRegisterData)}>
            <div>
              <div className="m-registerAccount">
                <label htmlFor="mAccount">帳號：</label>
                <input
                  // value={fastInputValue.mAccountValue}
                  // onChange={(e) => {
                  //   setFastInputValue((old) => ({
                  //     ...old,
                  //     mAccountValue: e.target.value,
                  //   }))
                  // }}
                  type="text"
                  placeholder="請填寫帳號"
                  className={`m-registerAccountInput ${
                    errors.mAccount && 'm-inputInvalid'
                  }`}
                  {...register('mAccount', {
                    required: {
                      value: true,
                      message: '使用者名稱為必填',
                    },
                    minLength: {
                      value: 6,
                      message: '使用者名稱須大於6碼',
                    },
                    maxLength: {
                      value: 10,
                      message: '使用者名稱須小於10碼',
                    },
                  })}
                />

                {errors.mAccount ? <p>{errors?.mAccount?.message}</p> : ''}
              </div>

              <div className="m-registerPassword">
                <label htmlFor="mPassword">設定密碼：</label>
                <input
                  // value={fastInputValue.mPasswordValue}
                  type="text"
                  placeholder="請設定6-10位數英數字混和密碼"
                  className={`m-registerPasswordInput ${
                    errors.mPassword && 'm-inputInvalid'
                  }`}
                  {...register('mPassword', {
                    required: {
                      value: true,
                      message: '使用者密碼為必填',
                    },
                    minLength: {
                      value: 6,
                      message: '使用者密碼須大於6碼',
                    },
                    maxLength: {
                      value: 10,
                      message: '使用者密碼小於10碼',
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/,
                      message: '密碼格式不符',
                    },
                  })}
                />

                {errors.mPassword ? <p>{errors?.mPassword?.message}</p> : ''}
              </div>

              <div className="m-registerPasswordVerify">
                <label htmlFor="mPasswordVerify">密碼確認：</label>
                <input
                  // value={fastInputValue.mPasswordVerifyValue}
                  type="text"
                  placeholder="請再輸入一次密碼"
                  className={`m-registerPasswordVerifyInput  ${
                    errors.mPasswordVerify && 'm-inputInvalid'
                  }`}
                  {...register('mPasswordVerify', {
                    required: {
                      value: true,
                      message: '使用者密碼確認為必填',
                    },
                    // 自訂義的檢查
                    validate: {
                      message: (value) =>
                        value === watch('mPassword')
                          ? clearError
                          : '確認密碼需與使用者密碼相同',
                    },
                  })}
                />

                {errors.mPasswordVerify ? (
                  <p>{errors?.mPasswordVerify.message}</p>
                ) : (
                  ''
                )}
              </div>

              <div className="m-registerRealName">
                <label htmlFor="mName">姓名：</label>
                <input
                  // value={fastInputValue.mNameValue}
                  type="text"
                  placeholder="請填寫真實姓名"
                  className={`m-registerRealNameInput ${
                    errors.mName && 'm-inputInvalid'
                  }`}
                  {...register('mName', {
                    required: {
                      value: true,
                      message: '使用者姓名為必填',
                    },
                    minLength: {
                      value: 2,
                      message: '使用者姓名須大於2碼',
                    },
                    maxLength: {
                      value: 20,
                      message: '使用者姓名須小於20碼',
                    },
                  })}
                />

                {errors.mName ? <p>{errors?.mName?.message}</p> : ''}
              </div>

              <div className="m-registerEmail">
                <label htmlFor="mEmail">信箱：</label>
                <input
                  // value={fastInputValue.mEmailValue}
                  type="text"
                  placeholder="請填寫Email"
                  className={`m-registerEmailInput ${
                    errors.mEmail && 'm-inputInvalid'
                  }`}
                  {...register('mEmail', {
                    required: {
                      value: true,
                      message: '使用者Email為必填',
                    },
                    pattern: {
                      value:
                        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/,
                      message: 'Email格式不符',
                    },
                  })}
                />

                {errors.mEmail ? <p>{errors?.mEmail?.message}</p> : ''}
              </div>

              <div className="m-registerMobile">
                <label htmlFor="mMobile">手機：</label>
                <input
                  // value={fastInputValue.mMobileValue}
                  type="text"
                  placeholder="請填寫手機號碼"
                  className={`m-registerMobileInput ${
                    errors.mMobile && 'm-inputInvalid'
                  }`}
                  {...register('mMobile', {
                    required: {
                      value: true,
                      message: '使用者手機號碼為必填',
                    },
                    pattern: {
                      value: /^09\d{2}-?\d{3}-?\d{3}$/,
                      message: '手機號碼格式不符',
                    },
                  })}
                />

                {errors.mMobile ? <p>{errors?.mMobile?.message}</p> : ''}
              </div>

              <div className="m-registerNickName">
                <label htmlFor="mNickname">暱稱：</label>
                <input
                  // value={fastInputValue.mNicknameValue}
                  type="text"
                  placeholder="請填寫暱稱"
                  className={`m-registerNickNameInput ${
                    errors.mNickname && 'm-inputInvalid'
                  }`}
                  {...register('mNickname', {
                    required: {
                      value: true,
                      message: '使用者暱稱為必填',
                    },
                    minLength: {
                      value: 2,
                      message: '使用者暱稱須大於2碼',
                    },
                    maxLength: {
                      value: 10,
                      message: '使用者暱稱須小於10碼',
                    },
                  })}
                />

                {errors.mNickname ? <p>{errors?.mNickname?.message}</p> : ''}
              </div>

              <div>
                <label>性別：</label>
                <div
                  className={`m-registerGenderRadio ${
                    errors.mGender && 'm-inputInvalid'
                  }`}
                >
                  <div>
                    <input
                      type="radio"
                      value="男"
                      {...register('mGender', {
                        required: {
                          value: true,
                          message: '使用者性別為必填',
                        },
                      })}
                    />
                    <label htmlFor="mGender">男</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="女"
                      {...register('mGender', {
                        required: {
                          value: true,
                          message: '使用者性別為必填',
                        },
                      })}
                    />
                    <label htmlFor="mGender">女</label>
                  </div>
                  {errors.mGender ? <p>{errors?.mGender?.message}</p> : ''}
                </div>
              </div>

              <div className="m-registerBirth">
                <label htmlFor="mBirth">生日：</label>
                <input
                  // value={fastInputValue.mBirthValue}
                  type="date"
                  className={`m-registerBirthInput  ${
                    errors.mBirth && 'm-inputInvalid'
                  }`}
                  {...register('mBirth', {
                    required: {
                      value: true,
                      message: '使用者生日為必填',
                    },
                  })}
                />

                {errors.mBirth ? <p>{errors?.mBirth?.message}</p> : ''}
              </div>

              <div className="m-registerIdentity">
                <label htmlFor="mIdentity">身分證字號：</label>
                <input
                  // value={fastInputValue.mIdentityValue}
                  type="text"
                  placeholder="請填寫身分證字號"
                  className={`m-registerIdentityInput ${
                    errors.mIdentity && 'm-inputInvalid'
                  }`}
                  {...register('mIdentity', {
                    required: {
                      value: true,
                      message: '使用者身分證字號為必填',
                    },
                    pattern: {
                      value: /^[A-Za-z][1-2]\d{8}$/,
                      message: '身分證字號格式不符',
                    },
                  })}
                />

                {errors.mIdentity ? <p>{errors?.mIdentity?.message}</p> : ''}
              </div>
            </div>
            <div>
              <button className="m-registerSubmit">立即註冊</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default MemberRegister
