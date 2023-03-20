import React, { useMemo } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { FaCheckSquare, FaRegWindowClose } from 'react-icons/fa'
import BloodSvg, { UnfillBlood } from '../../svg/BloodSvg'
import { checkToken } from '../../ContextDashbard'
import { Select, Input } from './StoreComponent'

const StoreAdd = () => {
  const { sid } = checkToken('token')
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,

    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })
  const navigate = useNavigate()
  // const watchForm = useWatch({
  //   control,
  // })
  // useEffect(() => {
  //   console.log('state', watch())
  //   console.log('errors', errors)
  // }, [watchForm])
  const submit = async (data) => {
    if (errors !== []) {
      const r = await axios.post('http://localhost:3005/store/putgame', data)
      if (r.data.affectedRows) {
        alert('新增成功')
        navigate('/store')
      }
    }
  }
  const [imgUrl, setImgUrl] = useState()

  const typeSelect = useRef([
    { value: 1, name: '偵探推理' },
    { value: 2, name: '機關重重' },
    { value: 3, name: '劇情厲害' },
    { value: 4, name: '場景逼真' },
    { value: 5, name: '互動操作' },
    { value: 6, name: '謎題邏輯' },
    { value: 7, name: '輕鬆歡樂' },
    { value: 8, name: '恐怖驚悚' },
    { value: 9, name: '緊張刺激' },
    { value: 10, name: '勾心鬥角' },
    { value: 11, name: '團隊合作' },
    { value: 12, name: '親子同遊' },
    { value: 13, name: '玩法特別' },
    { value: 14, name: '角色扮演' },
  ])
  const filterTypeSelect = useMemo(() => {
    if (!!getValues().feature01) {
      return typeSelect.current.filter((v, i) => {
        return v.value !== +getValues().feature01
      })
    }
  }, [watch().feature01])
  const [num, setNum] = useState(0)
  const otherSelect = useRef([
    { value: 1, name: '密室逃脫' },
    { value: 2, name: '劇本殺' },
    { value: 3, name: '時境解謎' },
  ])
  const [colse, setColse] = useState(-1)
  return (
    <div className="store-add-body text-center py-5">
      <div>
        <p>新增遊戲</p>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <input type="text" name="sid" value={sid} {...register('sid')} hidden />
        <div className="my-3">
          <div>
            <label htmlFor={'Logo'} className="form-label">
              {'Logo'}
            </label>
            <div className="my-3 mt-sm-0 ">
              {!!imgUrl?.length ? (
                <img
                  className="store-add-img"
                  src={
                    imgUrl?.length > 20
                      ? `/Images/uploads/${imgUrl}`
                      : `/Images/storeimages/${imgUrl}`
                  }
                  alt=""
                />
              ) : (
                <div className="store-add-img" alt="" />
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <div>
                <input
                  id={'Logo'}
                  type={'file'}
                  className={`form-control ${errors['Logo'] && 'is-invalid'}`}
                  name={'Logo'}
                  {...register('Logo', {
                    required: {
                      value: true,
                      message: '請上傳Logo圖片',
                    },
                    validate: {
                      checkUrl: async (v) => {
                        const formData = new FormData()
                        formData.append('photos', v[0])
                        if (!!v[0].name) {
                          const r = await axios.post(
                            'http://localhost:3005/post',
                            formData
                          )
                          if (!!r.data.length) {
                            // const fileLoad = (e) => {
                            //   setImgUrl(e.target.result)
                            // }
                            // const file = v[0]
                            // const fileReader = new FileReader()
                            // fileReader.addEventListener('load', fileLoad)
                            // fileReader.readAsDataURL(file)
                            setImgUrl(r.data[0].filename)
                            setValue('LogoImg', r.data[0].filename)
                          }
                        }
                      },
                    },
                  })}
                />
                {errors['Logo'] && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {errors['Logo']?.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'name'}
            idText={'遊戲名稱'}
            type={'text'}
            rules={{
              required: {
                value: true,
                message: '遊戲名稱為必填',
              },
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="remark" className="form-label">
            遊戲簡介
          </label>
          <textarea
            id="remark"
            rows="5"
            className={`form-control ${errors['remark'] && 'is-invalid'}`}
            {...register('remark', {
              required: {
                value: true,
                message: '請輸入遊戲簡介',
              },
            })}
          />
          {errors['remark'] && (
            <div id="validationServer03Feedback" className="invalid-feedback">
              {errors['remark']?.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <div className="form-check pe-3 d-flex flex-column">
            <div className="mb-3">
              <label className="form-label">難度</label>
            </div>
            <div className="diff">
              {[...Array(5)].map((v, i) => {
                return (
                  <React.Fragment key={i}>
                    <input
                      type="radio"
                      name="difficulty"
                      className={`form-check-input ${
                        errors['difficulty'] && 'is-invalid'
                      }`}
                      {...register('difficulty')}
                      id={i}
                      value={i + 1}
                      defaultChecked={i == 0 ? true : false}
                    />
                    <label
                      style={{ cursor: 'pointer' }}
                      className="form-check-label px-1 px-sm-3"
                      htmlFor={i}
                      onClick={() => {
                        setNum(i)
                      }}
                    >
                      {num >= i ? <BloodSvg /> : <UnfillBlood />}
                    </label>
                    {errors['difficulty'] && (
                      <div className="invalid-feedback">
                        {errors['difficulty']?.message}
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-evenly">
          <div className="w-50">
            <Select
              register={register}
              errors={errors}
              id={'feature01'}
              idText={'特色'}
              disabled={false}
              rules={{
                required: {
                  value: true,
                  message: '請選擇特色1',
                },
              }}
            >
              <option value="">請選擇特色</option>
              {typeSelect.current.map((v, i) => {
                return (
                  <option key={v.value} value={v.value}>
                    {v.name}
                  </option>
                )
              })}
            </Select>
          </div>
          <div className="w-50">
            <Select
              register={register}
              errors={errors}
              id={'feature02'}
              idText={'特色2'}
              disabled={!getValues().feature01}
              rules={{
                required: {
                  value: true,
                  message: '請選擇特色2',
                },
              }}
            >
              <option value="">請選擇特色</option>
              {filterTypeSelect?.map((v, i) => {
                return (
                  <option key={v.value} value={v.value}>
                    {v.name}
                  </option>
                )
              })}
            </Select>
          </div>
        </div>
        <div className="mb-3">
          <Select
            register={register}
            errors={errors}
            id={'other'}
            idText={'遊玩方式'}
            disabled={false}
            rules={{
              required: {
                value: true,
                message: '請選擇遊玩方式',
              },
            }}
          >
            <option value="">請選擇遊玩方式</option>
            {otherSelect.current.map((v, i) => {
              return (
                <option key={v.value} value={v.value}>
                  {v.name}
                </option>
              )
            })}
          </Select>
        </div>
        <div className="mb-3 d-flex justify-content-evenly">
          <div className="w-50">
            <Select
              register={register}
              errors={errors}
              id={'min'}
              idText={'最少人數'}
              disabled={false}
              rules={{
                required: {
                  value: true,
                  message: '請選擇最少人數',
                },
              }}
            >
              <option value="">請選擇最少人數</option>
              {[...Array(12)].map((v, i) => {
                return (
                  <React.Fragment key={i}>
                    <option value={i + 1}>{i + 1}人</option>
                  </React.Fragment>
                )
              })}
            </Select>
          </div>
          <div className="w-50">
            <Select
              register={register}
              errors={errors}
              id={'max'}
              idText={'最多人數'}
              disabled={!getValues().min}
              rules={{
                required: {
                  value: true,
                  message: '請選擇最多人數',
                },
              }}
            >
              <option value="">請選擇最多人數</option>
              {[...Array(12)].map((v, i) => {
                if (i < 11 && watch().min > i) return
                return (
                  <React.Fragment key={i}>
                    <option value={i + 1}>{i + 1}人</option>
                  </React.Fragment>
                )
              })}
            </Select>
          </div>
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'price'}
            idText={'單人價格'}
            type={'text'}
            rules={{
              required: {
                value: true,
                message: '價格為必填',
              },
              pattern: {
                value: /^[0-9]+(.[0-9]+)?$/,
                message: '請輸入正確格式',
              },
            }}
          />
        </div>
        <div className="mb-3">
          <Select
            register={register}
            errors={errors}
            id={'time'}
            idText={'遊戲時間(分)'}
            rules={{
              required: {
                value: true,
                message: '請選擇遊戲時間',
              },
            }}
          >
            <option value="">請選擇遊戲時間</option>
            {[...Array(4)].map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <option value={i + 1}>{(i + 1) * 30}分</option>
                </React.Fragment>
              )
            })}
          </Select>
        </div>
        <div className="mb-3">
          <div className="form-check pe-3 d-flex flex-column">
            <div className="mb-3">
              <label className="form-label">是否上架</label>
            </div>
            <div className="diff">
              <input
                type="radio"
                name="put"
                className={`form-check-input ${errors['put'] && 'is-invalid'}`}
                {...register('put', {
                  required: {
                    value: true,
                    message: '請選擇是否上架',
                  },
                })}
                id="close"
                value="0"
              />
              <label
                className="form-check-label px-3"
                htmlFor={'close'}
                onClick={() => {
                  setColse(0)
                }}
              >
                <FaRegWindowClose
                  fill={colse == 0 ? 'red' : '#FFFFFF'}
                  style={{ cursor: 'pointer' }}
                />
              </label>
              {errors['put'] && (
                <div className="invalid-feedback">{errors['put']?.message}</div>
              )}
              <input
                type="radio"
                name="put"
                className={`form-check-input ${errors['put'] && 'is-invalid'}`}
                {...register('put')}
                id="open"
                value="1"
              />
              <label
                className="form-check-label px-3"
                htmlFor={'open'}
                onClick={() => {
                  setColse(1)
                }}
              >
                <FaCheckSquare
                  fill={colse == 1 ? 'red' : '#FFFFFF'}
                  style={{ cursor: 'pointer' }}
                />
              </label>
              {errors['put'] && (
                <div className="invalid-feedback">{errors['put']?.message}</div>
              )}
            </div>
          </div>
        </div>

        <button className="w-75 btn btn-danger">新增遊戲</button>
      </form>
    </div>
  )
}
export default StoreAdd
