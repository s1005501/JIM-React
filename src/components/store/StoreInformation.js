import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { useContextValue, checkToken } from '../../ContextDashbard'
import { Select, Input } from './StoreComponent'
const StoreInformation = () => {
  const { sid } = checkToken('token')
  const { getBackData, setRender, render } = useContextValue()
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
      const r = await axios.post(
        `http://localhost:3005/store/editStoreInfo/${sid}`,
        data
      )
      if (r.data.affectedRows) {
        setRender(!render)
        alert('更新成功')
        navigate('/store')
      }
    }
  }

  const [imgUrl, setImgUrl] = useState()
  const [storeInfo, setStoreInfo] = useState([])
  useEffect(() => {
    getBackData(`http://localhost:3005/store/storeInfo/${sid}`, setStoreInfo)
  }, [render])
  useEffect(() => {
    setImgUrl(storeInfo[0]?.storeLogo)
    setValue('Logo', storeInfo[0]?.storeLogo)
    setValue('account', storeInfo[0]?.storeAccount)
    setValue('password', storeInfo[0]?.storePassword)
    setValue('store', storeInfo[0]?.storeName)
    setValue('mobile', storeInfo[0]?.storeMobile)
    setValue('leader', storeInfo[0]?.storeLeader)
    setValue('phone', storeInfo[0]?.storeMobile)
    setValue('identity', storeInfo[0]?.storeLeaderId)
    setValue('county', storeInfo[0]?.storeCity)
    setValue('address', storeInfo[0]?.storeAddress)
    setValue('email', storeInfo[0]?.storeEmail)
    setValue('time', storeInfo[0]?.storeTime)
    setValue('website', storeInfo[0]?.storeWebsite)
    setValue('remark', storeInfo[0]?.storeNews)
  }, [storeInfo])
  const [eyeIcon, setEyeIcon] = useState(true)
  const [countyList, setCountyList] = useState([
    '基隆市',
    '台北市',
    '新北市',
    '桃園縣',
    '新竹市',
    '新竹縣',
    '苗栗縣',
    '台中市',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義市',
    '嘉義縣',
    '台南市',
    '高雄市',
    '屏東縣',
    '花蓮縣',
    '宜蘭縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
  ])
  return (
    <div className="store-add-body text-center py-5">
      <div>
        <p>工作室資料</p>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="my-3 d-flex flex-column justify-content-around align-items-center">
          <label htmlFor={'Logo'} className="form-label">
            {'工作室圖標'}
          </label>
          <div className="mb-3 mt-sm-0 store-add-img">
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
              ''
            )}
          </div>
          <div>
            <div>
              <input
                id={'Logo'}
                type={'file'}
                className={`form-control  ${errors['Logo'] && 'is-invalid'}`}
                name={'Logo'}
                {...register('Logo', {
                  required: {
                    value: false,
                    message: '請上傳Logo圖片',
                  },
                  validate: {
                    checkUrl: async (v) => {
                      const formData = new FormData()
                      formData.append('photos', v[0])
                      if (!!v[0]?.name) {
                        const r = await axios.post(
                          'http://localhost:3005/post',
                          formData
                        )
                        if (!!r.data.length) {
                          // const fileLoad = (e) => {
                          //   console.log(e.target.result)
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
        <div className="mb-3">
          <label htmlFor={'account'} className="form-label">
            {'工作室帳號'}
          </label>
          <input
            id={'account'}
            type={'text'}
            className={`form-control`}
            name={'account'}
            {...register('account')}
            disabled={true}
          />
        </div>
        <div className="mb-3">
          <div className="position-relative">
            <Input
              register={register}
              errors={errors}
              id={'password'}
              idText={'密碼'}
              placeholder={'請輸入至少8字元'}
              type={eyeIcon ? 'password' : 'text'}
              rules={{
                required: {
                  value: true,
                  message: '密碼為必填',
                },
                minLength: {
                  value: 8,
                  message: '密碼至少8個字元',
                },
                pattern: {
                  value: /^[a-zA-Z0-9 ]+$/,
                  message: '請填寫正確格式',
                },
              }}
            />
            <div
              className="position-absolute"
              style={{
                right: '30px',
                top: '40px',
                color: '#000000',
                cursor: 'pointer',
              }}
              onClick={() => {
                setEyeIcon(!eyeIcon)
              }}
            >
              {eyeIcon ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor={'store'} className="form-label">
            {'工作室名稱'}
          </label>
          <input
            id={'store'}
            type={'text'}
            className={`form-control`}
            name={'store'}
            {...register('store')}
            disabled={true}
          />
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'mobile'}
            idText={'工作室電話'}
            type={'tel'}
            rules={{
              required: {
                value: true,
                message: '工作室電話為必填',
              },
              pattern: {
                value: /(\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4})/,
                message: '請填寫正確電話格式',
              },
            }}
          />
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'leader'}
            idText={'負責人名字'}
            type={'text'}
            rules={{
              required: {
                value: true,
                message: '負責人名字為必填',
              },
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor={'identity'} className="form-label">
            {'身分證'}
          </label>
          <input
            id={'identity'}
            type={'text'}
            className={`form-control`}
            name={'identity'}
            {...register('identity')}
            disabled={true}
          />
        </div>
        <div className="mb-3 d-flex justify-content-evenly">
          <div className="w-50">
            <Select
              register={register}
              errors={errors}
              id={'county'}
              idText={'縣市'}
              disabled={false}
              rules={{
                required: {
                  value: true,
                  message: '請選擇縣市',
                },
              }}
            >
              <option value="">請選擇縣市</option>
              {countyList.map((v, i) => {
                return <option key={v}>{v}</option>
              })}
            </Select>
          </div>
          <div className="w-50">
            <Input
              register={register}
              errors={errors}
              id={'address'}
              idText={'地址'}
              type={'text'}
              rules={{
                required: {
                  value: true,
                  message: '地址為必填',
                },
              }}
            />
          </div>
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'email'}
            idText={'Email'}
            type={'email'}
            rules={{
              required: {
                value: true,
                message: 'Email 為必填',
              },
              pattern: {
                value:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: '請輸入正確的Email格式',
              },
            }}
          />
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'time'}
            idText={'營業時間'}
            type={'text'}
            placeholder={'ex：10:00-21:00'}
            rules={{
              required: {
                value: true,
                message: '營業時間為必填',
              },
              pattern: {
                value: /^\d{2}:\d{2}-\d{2}:\d{2}/,
                message: '請輸入正確的營業時間格式',
              },
            }}
          />
        </div>
        <div className="mb-3">
          <Input
            register={register}
            errors={errors}
            id={'website'}
            idText={'官網'}
            type={'text'}
            rules={{
              required: {
                value: true,
                message: '官網為必填',
              },
              pattern: {
                value:
                  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
                message: '請輸入有效網址',
              },
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="remark" className="form-label">
            資訊
          </label>
          <textarea
            id="remark"
            rows="5"
            className={`form-control ${errors['remark'] && 'is-invalid'}`}
            {...register('remark', {
              required: {
                value: true,
                message: '請輸入工作室資訊',
              },
            })}
          />
          {errors['remark'] && (
            <div id="validationServer03Feedback" className="invalid-feedback">
              {errors['remark']?.message}
            </div>
          )}
        </div>

        <button
          className="w-75 btn m-registerSubmit"
          style={{ color: '#FFFFFF' }}
        >
          修改資料
        </button>
      </form>
    </div>
  )
}
export default StoreInformation
