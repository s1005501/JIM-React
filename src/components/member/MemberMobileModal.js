import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { ACCOUNT } from './../../config/api_config'
import Swal from 'sweetalert2'

function MemberMobileModal({
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
      memberMobile: false,
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

  const updateProfileMobile = async (data) => {
    axios.defaults.withCredentials = true

    const response = await axios.post(
      ACCOUNT + '/update/mobile/' + memberAuthState.membersid,
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
        title: '手機號碼修改成功!',
        text: `手機號碼修改成功`,
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
          <Modal.Title>會員手機號碼更改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>會員舊手機號碼：{profileData.memMobile}</p>
            <form onSubmit={handleSubmit(updateProfileMobile)}>
              <div>
                <label htmlFor="mProfileMobile">會員新手機號碼：</label>
                <input
                  type="text"
                  placeholder="請填寫手機號碼"
                  className={`${errors.mProfileMobile && 'm-inputInvalid'}`}
                  {...register('mProfileMobile', {
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
                {errors.mProfileMobile ? (
                  <p>{errors?.mProfileMobile.message}</p>
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

export default MemberMobileModal
