import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { ACCOUNT } from './../../config/api_config'
import Swal from 'sweetalert2'
function MemberPasswordModal({
  profileUpdate,
  setProfileUpdate,
  memberAuthState,
  profileData,
  setProfileData,
  getProfileData,
}) {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    setProfileUpdate({
      ...profileUpdate,
      memberPassword: false,
    })
  }

  const {
    register, // state
    handleSubmit,
    formState: { errors }, // 錯誤樣式資訊
    watch, // 監聽表單內容，是func
    control, // 給usewatch用的，讓他能夠知道要監聽哪一個表單
    clearError,
  } = useForm({})

  const watchForm = useWatch({
    control,
  })

  useEffect(() => {
    console.log(watchForm)
  }, [watchForm])

  const updateProfilePassword = async (data) => {
    axios.defaults.withCredentials = true

    const response = await axios.post(
      ACCOUNT + '/update/password/' + memberAuthState.membersid,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + memberAuthState.memberToken,
        },
      }
    )
    if (response.data.success) {
      console.log(response.data)

      Swal.fire({
        title: '密碼修改成功!',
        text: `密碼修改成功`,
        icon: 'success',
        confirmButtonText: '確認',
      })
      getProfileData(ACCOUNT, setProfileData)
      handleClose()
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className="m-profileUpdate">
        <Modal.Header closeButton>
          <Modal.Title>會員密碼更改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>會員舊密碼：{profileData.memPassword}</p>
            <form onSubmit={handleSubmit(updateProfilePassword)}>
              <div>
                <label htmlFor="mProfilePassword">會員新密碼：</label>
                <input
                  type="text"
                  placeholder="請設定6-10位數英數字混和密碼"
                  className={`${errors.mProfilePassword && 'm-inputInvalid'}`}
                  {...register('mProfilePassword', {
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
                {errors.mProfilePassword ? (
                  <p>{errors?.mProfilePassword.message}</p>
                ) : (
                  ''
                )}
              </div>
              <div>
                <label htmlFor="mProfilePasswordVerify">新密碼確認：</label>
                <input
                  type="text"
                  placeholder="請再輸入一次密碼"
                  className={`${
                    errors.mProfilePasswordVerify && 'm-inputInvalid'
                  }`}
                  {...register('mProfilePasswordVerify', {
                    required: {
                      value: true,
                      message: '使用者密碼確認為必填',
                    },
                    // 自訂義的檢查
                    validate: {
                      message: (value) =>
                        value === watch('mProfilePassword')
                          ? clearError
                          : '確認密碼需與使用者密碼相同',
                    },
                  })}
                />

                {errors.mProfilePasswordVerify ? (
                  <p>{errors?.mProfilePasswordVerify.message}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="m-profileUpdateButtonDiv">
                <button className="btn" type="button" onClick={handleClose}>
                  取消
                </button>
                <button className="btn" type="submit">
                  確認並送出
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default MemberPasswordModal
