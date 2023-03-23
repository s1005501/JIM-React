import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { ACCOUNT } from './../../config/api_config'
import Swal from 'sweetalert2'
function MemberEmailModal({
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
      memberEmail: false,
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

  const updateProfileEmail = async (data) => {
    axios.defaults.withCredentials = true

    const response = await axios.post(
      ACCOUNT + '/update/email/' + memberAuthState.membersid,
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
        title: '信箱修改成功!',
        text: `信箱修改成功`,
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
          <Modal.Title>會員信箱更改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>會員舊信箱：{profileData.memEmail}</p>
            <form onSubmit={handleSubmit(updateProfileEmail)}>
              <div>
                <label htmlFor="mProfileEmail">會員新信箱：</label>
                <input
                  type="text"
                  placeholder="請填寫Email"
                  className={`${errors.mProfileEmail && 'm-inputInvalid'}`}
                  {...register('mProfileEmail', {
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
                {errors.mProfileEmail ? (
                  <p>{errors?.mProfileEmail.message}</p>
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

export default MemberEmailModal
