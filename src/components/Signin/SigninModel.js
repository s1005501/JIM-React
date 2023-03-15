import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Swal from 'sweetalert2'

import { checkToken, useContextValue } from '../../ContextDashbard'
const swalAlert = (title, text, icon, button) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: button,
  })
}
const Input = ({
  register,
  errors,
  id,
  idText,
  type,
  rules,
  placeholder = '',
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {idText}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] && 'is-invalid'}`}
        name={id}
        {...register(id, rules)}
        placeholder={placeholder}
      />
      {errors[id] && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {errors[id]?.message}
        </div>
      )}
    </>
  )
}

const Select = ({ register, errors, id, idText, rules, children }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {idText}
      </label>
      <select
        id={id}
        {...register(id, rules)}
        className={`form-select ${errors[id] ? 'is-invalid' : ''}`}
      >
        {children}
      </select>
      {errors[id] && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {errors[id]?.message}
        </div>
      )}
    </>
  )
}
const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <>
      <div className="form-check pe-3">
        <input
          className={`form-check-input ${errors[name] && 'is-invalid'}`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        <label className="form-check-label" htmlFor={id}>
          {labelText}
        </label>
        {errors[name] && (
          <div className="invalid-feedback">{errors[name]?.message}</div>
        )}
      </div>
    </>
  )
}
const SigninRouter = ({ name, nameen, url }) => {
  return (
    <div className="py-5 signin-outcard">
      <Link to={`/signin/${url}`}>
        <div className="text-center signin-card">
          <p className="signin-card-ch">{name}</p>
          <p className="signin-card-en">{nameen}</p>
        </div>
        <div className="text-center">
          <p>由此前往：{name}註冊/登入</p>
          <p>{nameen} SIGN UP/ SIGN IN FROM HERE</p>
        </div>
      </Link>
    </div>
  )
}

const MemberRouter = ({ name, nameen, url }) => {
  return (
    <div className="py-5 signin-outcard">
      <Link to={`/member/in`}>
        <div className="text-center signin-card">
          <p className="signin-card-ch">{name}</p>
          <p className="signin-card-en">{nameen}</p>
        </div>
        <div className="text-center">
          <p>由此前往：{name}註冊/登入</p>
          <p>{nameen} SIGN UP/ SIGN IN FROM HERE</p>
        </div>
      </Link>
    </div>
  )
}
const SigninChange = ({ name, chceked, setChceked }) => {
  return (
    <div className="d-flex text-center justify-content-center signin-router">
      <div
        className="w-100"
        style={{
          background: chceked ? '#7f7f7f' : '',
          borderRadius: '20px 0 0 0',
        }}
      >
        <div
          className="signin-router-right"
          onClick={() => {
            setChceked(true)
          }}
        >
          <p className="">{name}登入</p>
        </div>
      </div>
      <div
        className="w-100"
        style={{
          background: chceked ? '' : '#7f7f7f',
          borderRadius: '0 20px 0 0',
        }}
      >
        <div
          className="signin-router-left"
          onClick={() => {
            setChceked(false)
          }}
        >
          <p className="">{name}註冊</p>
        </div>
      </div>
    </div>
  )
}

const SigninStortIn = ({ name }) => {
  const { setRender, render } = useContextValue()
  const navigate = useNavigate()
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
  // const watchForm = useWatch({
  //   control,
  // })
  // useEffect(() => {
  //   console.log('state', watch())
  //   console.log('errors', errors)
  // }, [watchForm])
  const submit = async (data) => {
    if (errors !== []) {
      const r = await axios.post('http://localhost:3005/signin/store', data)
      if (!!r.data.error) {
        swalAlert(r.data.error, r.data.error, 'error', '確認')
      }
      if (r.data.code === 200) {
        swalAlert('成功登入', '成功登入', 'success', '確認')

        // Swal.fire({
        //   title: '成功登入',
        //   text: `成功登入`,
        //   icon: 'success',
        //   confirmButtonText: '確認',
        // })
        localStorage.setItem('token', JSON.stringify(r.data))
        setRender(!render)
        navigate('/')
      }
    }
  }
  const [eyeIcon, setEyeIcon] = useState(true)
  return (
    <div className="d-flex flex-column align-items-center signin-router-body text-center py-5">
      <div>
        <p>{name}登入</p>
        <span>SIGN IN</span>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-3">
          <input
            type="text"
            className={`signin-router-botton form-control ${
              errors['account'] && 'is-invalid'
            }`}
            placeholder="請輸入帳號"
            {...register('account', {
              required: {
                value: true,
                message: '請輸入帳號',
              },
            })}
          />
          {errors['account'] && (
            <div id="validationServer03Feedback" className="invalid-feedback">
              {errors['account']?.message}
            </div>
          )}
        </div>
        <div>
          <div className="position-relative">
            <input
              type={eyeIcon ? 'password' : 'text'}
              className={`signin-router-botton form-control ${
                errors['password'] && 'is-invalid'
              }`}
              placeholder="請輸入密碼"
              {...register('password', {
                required: {
                  value: true,
                  message: '請輸入密碼',
                },
              })}
            />
            {errors['password'] && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors['password']?.message}
              </div>
            )}
            <div
              className="position-absolute"
              style={{
                right: '50px',
                top: '0px',
                color: 'red',
                cursor: 'pointer',
                fontSize: '40px',
              }}
              onClick={() => {
                setEyeIcon(!eyeIcon)
              }}
            >
              {eyeIcon ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>

        <button className="w-75 m-registerSubmit mt-3">SIGN IN</button>
      </form>
    </div>
  )
}

const SigninMemberIn = ({ name }) => {
  const { setRender, render } = useContextValue()
  const navigate = useNavigate()
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
  // const watchForm = useWatch({
  //   control,
  // })
  // useEffect(() => {
  //   console.log('state', watch())
  //   console.log('errors', errors)
  // }, [watchForm])
  const submit = async (data) => {
    if (errors !== []) {
      const r = await axios.post('http://localhost:3005/signin/member', data)
      if (!!r.data.error) {
        alert(r.data.error)
      }
      if (r.data.code === 200) {
        localStorage.setItem('token', JSON.stringify(r.data))
        setRender(!render)
        alert('登入成功')
        navigate('/')
      }
    }
  }
  const [eyeIcon, setEyeIcon] = useState(true)
  return (
    <div className="d-flex flex-column align-items-center signin-router-body text-center py-5">
      <div>
        <p>{name}登入</p>
        <span>SIGN IN</span>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-3">
          <input
            type="text"
            className={`signin-router-botton form-control ${
              errors['account'] && 'is-invalid'
            }`}
            placeholder="請輸入帳號"
            {...register('account', {
              required: {
                value: true,
                message: '請輸入帳號',
              },
            })}
          />
          {errors['account'] && (
            <div id="validationServer03Feedback" className="invalid-feedback">
              {errors['account']?.message}
            </div>
          )}
        </div>
        <div>
          <div className="position-relative">
            <input
              type={eyeIcon ? 'password' : 'text'}
              className={`signin-router-botton form-control ${
                errors['password'] && 'is-invalid'
              }`}
              placeholder="請輸入密碼"
              {...register('password', {
                required: {
                  value: true,
                  message: '請輸入密碼',
                },
              })}
            />
            {errors['password'] && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors['password']?.message}
              </div>
            )}
            <div
              className="position-absolute"
              style={{
                right: '50px',
                top: '0px',
                color: 'red',
                cursor: 'pointer',
                fontSize: '40px',
              }}
              onClick={() => {
                setEyeIcon(!eyeIcon)
              }}
            >
              {eyeIcon ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>

        <button className="w-75 signin-botton">SIGN IN</button>
      </form>
    </div>
  )
}

const SigninStoreRegister = ({ name }) => {
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
        'http://localhost:3005/signin/setmemberinfo/store',
        data
      )
      if (r.data.affectedRows) {
        alert('新增成功')
        navigate('/')
      }
    }
  }
  const [imgUrl, setImgUrl] = useState()
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
  const StoreRegisterList = [
    {
      id: 'account',
      idText: '工作室帳號',
      type: 'text',
      placeholder: '請輸入至少8字元',
      rules: {
        required: {
          value: true,
          message: '工作室帳號為必填',
        },
        minLength: {
          value: 8,
          message: '帳號至少8個字元',
        },
        validate: {
          checkUrl: async (v) => {
            const regex = new RegExp('^[a-zA-Z0-9 ]+$')
            if (!regex.test(v)) return '請輸入正確格式'
            if (parseInt(v.length) >= 8) {
              const r = await axios.get(
                `http://localhost:3005/signin/storeformcheck/account/?search=${v}`
              )
              if (!!r.data[0]) {
                return '此帳號已被使用請選擇其他帳號'
              }
            }
          },
        },
      },
    },
    {
      id: 'password',
    },
    {
      id: 'store',
      idText: '工作室名稱',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '工作室名稱為必填',
        },
        validate: {
          checkUrl: async (v) => {
            const regex = new RegExp(
              "[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
            )
            if (!!regex.test(v)) return '請輸入正確格式'
            if (parseInt(v.length) >= 0) {
              const r = await axios.get(
                `http://localhost:3005/signin/storeformcheck/store/?search=${v}`
              )
              if (!!r.data[0]) {
                return '此工作室名稱已被使用請選擇其他名稱'
              }
            }
          },
        },
      },
    },
    {
      id: 'mobile',
      idText: '工作室電話',
      type: 'tel',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '工作室電話為必填',
        },
        pattern: {
          value: /(\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4})/,
          message: '請填寫正確電話格式',
        },
      },
    },
    {
      id: 'leader',
      idText: '負責人名字',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '負責人名字為必填',
        },
      },
    },
    {
      id: 'identity',
      idText: '身分證',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '身分證為必填',
        },
        pattern: {
          value: /^[A-Za-z][12]\d{8}$/,
          message: '請填寫正確身分證格式',
        },
        validate: {
          checkUrl: async (v) => {
            const regex = new RegExp('^[A-Za-z][12]d{8}$')
            if (!!regex.test(v)) return '請填寫正確身分證格式'
            if (!regex.test(v)) {
              const r = await axios.get(
                `http://localhost:3005/signin/storeformcheck/identity/?search=${v}`
              )
              if (!!r.data[0]) {
                return '此身分證已被使用'
              }
            }
          },
        },
      },
    },
    {
      id: 'email',
      idText: 'Email',
      type: 'email',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: 'Email 為必填',
        },
        pattern: {
          value:
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          message: '請輸入正確的Email格式',
        },
      },
    },
    {
      id: 'time',
      idText: '營業時間',
      type: 'text',
      placeholder: 'ex：10:00-21:00',
      rules: {
        required: {
          value: true,
          message: '營業時間為必填',
        },
        pattern: {
          value: /^\d{2}:\d{2}-\d{2}:\d{2}$/,
          message: '請輸入正確的營業時間格式',
        },
      },
    },
    {
      id: 'website',
      idText: '官網',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '官網為必填',
        },
        pattern: {
          value:
            /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
          message: '請輸入有效網址',
        },
      },
    },
  ]
  return (
    <div className="signin-router-body text-center py-5">
      <div>
        <p>{name}註冊</p>
        <span>SIGN UP</span>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="d-flex flex-column align-items-center"
      >
        <div className="my-3 d-sm-flex flex-column justify-content-center align-items-center">
          <div className="mt-3 w-75 h-50">
            <img
              src={imgUrl}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
          <div>
            <label htmlFor={'Logo'} className="form-label">
              {'Logo'}
            </label>
            <input
              id={'Logo'}
              type={'file'}
              className={`form-control  ${errors['Logo'] && 'is-invalid'}`}
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
                        const fileLoad = (e) => {
                          setImgUrl(e.target.result)
                        }
                        const file = v[0]
                        const fileReader = new FileReader()
                        fileReader.addEventListener('load', fileLoad)
                        fileReader.readAsDataURL(file)
                        setValue('LogoImg', r.data[0].filename)
                      }
                    }
                  },
                },
              })}
            />
            {errors['Logo'] && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors['Logo']?.message}
              </div>
            )}
          </div>
        </div>
        {StoreRegisterList.map((v, i) => {
          return v.id !== 'password' ? (
            <div className="mb-3 w-75" key={v.id}>
              <Input
                register={register}
                errors={errors}
                id={v.id}
                idText={v.idText}
                type={v.type}
                placeholder={v.placeholder}
                rules={v.rules}
              />
            </div>
          ) : (
            <div className="mb-3 w-75" key={v.id}>
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
          )
        })}
        <div className="mb-3 d-flex justify-content-evenly w-75">
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
        <div className="mb-3 w-75">
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

        <button className="w-75 m-registerSubmit">SIGN UP</button>
      </form>
    </div>
  )
}

const SigninMemberRegister = ({ name }) => {
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
        'http://localhost:3005/signin/setmemberinfo/member',
        data
      )
      if (r.data.affectedRows) {
        alert('新增成功')
        navigate('/')
      }
    }
  }
  const [imgUrl, setImgUrl] = useState()
  const [eyeIcon, setEyeIcon] = useState(true)
  const StoreRegisterList = [
    {
      id: 'account',
      idText: '會員帳號',
      type: 'text',
      placeholder: '請輸入至少8字元',
      rules: {
        required: {
          value: true,
          message: '會員帳號為必填',
        },
        minLength: {
          value: 8,
          message: '帳號至少8個字元',
        },
        validate: {
          checkUrl: async (v) => {
            const regex = new RegExp('^[a-zA-Z0-9 ]+$')
            if (!regex.test(v)) return '請輸入正確格式'
            if (parseInt(v.length) >= 8) {
              const r = await axios.get(
                `http://localhost:3005/signin/memberformcheck/account/?search=${v}`
              )
              if (!!r.data[0]) {
                return '此帳號已被使用請選擇其他帳號'
              }
            }
          },
        },
      },
    },
    {
      id: 'password',
    },
    {
      id: 'user',
      idText: '使用者名字',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '使用者名字為必填',
        },
      },
    },
    {
      id: 'nick',
      idText: '英文名字',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '英文名字為必填',
        },
      },
    },
    {
      id: 'identity',
      idText: '身分證',
      type: 'text',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '身分證為必填',
        },
        pattern: {
          value: /^[A-Za-z][12]\d{8}$/,
          message: '請填寫正確身分證格式',
        },
        validate: {
          checkUrl: async (v) => {
            const regex = new RegExp('^[A-Za-z][12]d{8}$')
            if (!!regex.test(v)) return '請填寫正確身分證格式'
            if (!regex.test(v)) {
              const r = await axios.get(
                `http://localhost:3005/signin/memberformcheck/identity/?search=${v}`
              )
              if (!!r.data[0]) {
                return '此身分證已被使用'
              }
            }
          },
        },
      },
    },
    {
      id: 'phone',
      idText: '會員手機',
      type: 'tel',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: '會員手機為必填',
        },
        pattern: {
          value: /^09\d{8}$/,
          message: '請填寫正確手機格式',
        },
      },
    },
    {
      id: 'email',
      idText: 'Email',
      type: 'email',
      placeholder: '',
      rules: {
        required: {
          value: true,
          message: 'Email 為必填',
        },
        pattern: {
          value:
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          message: '請輸入正確的Email格式',
        },
      },
    },
  ]
  return (
    <div className="signin-router-body text-center py-5">
      <div>
        <p>{name}註冊</p>
        <span>SIGN UP</span>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="d-flex flex-column align-items-center"
      >
        <div className="my-3 d-sm-flex flex-column justify-content-center align-items-center">
          <div className="mt-3 w-75 h-50">
            <img
              src={imgUrl}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
          <div>
            <label htmlFor={'Logo'} className="form-label">
              {'Logo'}
            </label>
            <input
              id={'Logo'}
              type={'file'}
              className={`form-control  ${errors['Logo'] && 'is-invalid'}`}
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
                        const fileLoad = (e) => {
                          setImgUrl(e.target.result)
                        }
                        const file = v[0]
                        const fileReader = new FileReader()
                        fileReader.addEventListener('load', fileLoad)
                        fileReader.readAsDataURL(file)
                        setValue('LogoImg', r.data[0].filename)
                      }
                    }
                  },
                },
              })}
            />
            {errors['Logo'] && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors['Logo']?.message}
              </div>
            )}
          </div>
        </div>
        {StoreRegisterList.map((v, i) => {
          return v.id !== 'password' ? (
            <div className="mb-3 w-75" key={v.id}>
              <Input
                register={register}
                errors={errors}
                id={v.id}
                idText={v.idText}
                type={v.type}
                placeholder={v.placeholder}
                rules={v.rules}
              />
            </div>
          ) : (
            <div className="mb-3 w-75" key={v.id}>
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
          )
        })}
        <div className="mb-5 d-flex justify-content-evenly align-items-center w-75">
          <div className="d-sm-flex">
            <div className="form-label pe-3">性別</div>
            <CheckboxRadio
              type="radio"
              name="gender"
              id="male"
              value={'男'}
              register={register}
              errors={errors}
              rules={{
                required: {
                  value: true,
                },
              }}
              labelText="男"
            ></CheckboxRadio>
            <CheckboxRadio
              type="radio"
              name="gender"
              id="female"
              value={'女'}
              register={register}
              errors={errors}
              rules={{
                required: {
                  value: true,
                },
              }}
              labelText="女"
            ></CheckboxRadio>
          </div>
          <div className="w-50">
            <Input
              register={register}
              errors={errors}
              id={'birther'}
              idText={'生日'}
              type={'text'}
              placeholder={'ex：1999-01-01'}
              rules={{
                required: {
                  value: true,
                  message: '生日為必填',
                },
                pattern: {
                  value: /^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/,
                  message: '請填寫正確生日格式',
                },
              }}
            />
          </div>
        </div>
        <button className="w-75 signin-botton">SIGN UP</button>
      </form>
    </div>
  )
}

export {
  SigninRouter,
  SigninChange,
  SigninStortIn,
  SigninMemberIn,
  SigninStoreRegister,
  SigninMemberRegister,
  MemberRouter,
}
