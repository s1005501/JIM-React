import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { ACCOUNT } from './../../config/api_config'
import Swal from 'sweetalert2'
function MemberNameModal({
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
      memberName: false,
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

  const updateProfileName = async (data) => {
    axios.defaults.withCredentials = true

    const response = await axios.post(
      ACCOUNT + '/update/name/' + memberAuthState.membersid,
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
        title: '姓名修改成功!',
        text: `姓名修改成功`,
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
          <Modal.Title>會員姓名更改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>會員舊姓名：{profileData.memName}</p>
            <form onSubmit={handleSubmit(updateProfileName)}>
              <div>
                <label htmlFor="mProfileName">會員新姓名：</label>
                <input
                  type="text"
                  placeholder="請填寫真實姓名"
                  className={`${errors.mProfileName && 'm-inputInvalid'}`}
                  {...register('mProfileName', {
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
                {errors.mProfileName ? (
                  <p>{errors?.mProfileName.message}</p>
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

export default MemberNameModal
