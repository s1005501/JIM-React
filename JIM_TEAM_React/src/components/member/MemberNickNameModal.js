import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { ACCOUNT } from './../../config/api_config'
import Swal from 'sweetalert2'

function MemberNickNameModal({
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
      memberNickName: false,
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

  const updateProfileNickName = async (data) => {
    axios.defaults.withCredentials = true

    const response = await axios.post(
      ACCOUNT + '/update/nickname/' + memberAuthState.membersid,
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
        title: '會員暱稱改成功!',
        text: `會員暱稱改成功`,
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
          <Modal.Title>會員暱稱更改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>會員舊暱稱：{profileData.memNickName}</p>
            <form onSubmit={handleSubmit(updateProfileNickName)}>
              <div>
                <label htmlFor="mProfileNickName">會員新暱稱：</label>
                <input
                  type="text"
                  placeholder="請填寫暱稱"
                  className={`${errors.mProfileNickName && 'm-inputInvalid'}`}
                  {...register('mProfileNickName', {
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
                {errors.mProfileNickName ? (
                  <p>{errors?.mProfileNickName.message}</p>
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

export default MemberNickNameModal
