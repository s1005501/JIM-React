import { useState, useContext, createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Background from '../common/Background'

const MemberAuthContext = createContext({})
export default MemberAuthContext

export const MemberAuthContextProvider = ({ children }) => {
  const navigate = useNavigate()

  // todo 我自己的寫法每次執行都要重抓localStorage
  // // 在登入前就會以null形態存在
  // const str = localStorage.getItem('memberAuth')
  // const memberAuth = JSON.parse(str)
  // // console.log("13",memberAuth)

  // todo 換換看老師的
  const unAuth = {
    authorized: false,
    membersid: '',
    memAccount: '',
    memberToken: '',
  }
  let initAuth = { ...unAuth }
  const str = localStorage.getItem('memberAuth')
  try {
    if (str) {
      const memberLocalStorage = JSON.parse(str)
      if (
        memberLocalStorage.memberToken &&
        memberLocalStorage.memAccount &&
        memberLocalStorage.membersid
      ) {
        initAuth = {
          authorized: true,
          membersid: memberLocalStorage.membersid,
          memAccount: memberLocalStorage.memAccount,
          memberToken: memberLocalStorage.memberToken,
        }
      }
    }
  } catch (ex) {}

  const [memberAuthState, setMemberAuthState] = useState(initAuth)

  console.log(memberAuthState)

  // 傳給profile render的func
  const getProfileData = async (url, setState) => {
    // 加這兩行是因為跳頁時，瀏覽器不知道localStorage已經改變了，所以我們強制讓他重新去抓資料
    // let mAuth = memberAuth
    // if (!mAuth) {
    //   mAuth = JSON.parse(localStorage.getItem('memberAuth'))
    // }

    if (memberAuthState.authorized) {
      axios.defaults.withCredentials = true
      const response = await axios.get(
        url + '/profile/' + memberAuthState.membersid,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
          },
        }
      )
      // console.log('19', response.data.row)
      setState(response.data.row)
    }
  }

  // 傳給order render的func
  const getOrderData = async (url, setState) => {
    // let mAuth = memberAuth
    // if (!mAuth) {
    //   mAuth = JSON.parse(localStorage.getItem('memberAuth'))
    // }

    if (memberAuthState.authorized) {
      axios.defaults.withCredentials = true

      const response = await axios.get(
        url + '/order/' + memberAuthState.membersid,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
          },
        }
      )
      // console.log(response.data)
      setState(response.data.row)
    }
  }

  // 傳給like render的func
  const getLikeData = async (url, setState) => {
    // let mAuth = memberAuth
    // if (!mAuth) {
    //   mAuth = JSON.parse(localStorage.getItem('memberAuth'))
    // }

    if (memberAuthState.authorized) {
      axios.defaults.withCredentials = true

      const response = await axios.get(
        url + '/like/' + memberAuthState.membersid,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
          },
        }
      )
      // console.log(response.data)
      setState(response.data.row)
    }
  }

  // 傳給comment render的func
  const getCommentData = async (url, setState) => {
    // let mAuth = memberAuth
    // if (!mAuth) {
    //   mAuth = JSON.parse(localStorage.getItem('memberAuth'))
    // }

    if (memberAuthState.authorized) {
      axios.defaults.withCredentials = true

      const response = await axios.get(
        url + '/comment/' + memberAuthState.membersid,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
          },
        }
      )
      // console.log(response.data)
      setState(response.data.row)
    }
  }

  // 傳給level render的func
  const getLevelData = async (url, setState) => {
    // let mAuth = memberAuth
    // if (!mAuth) {
    //   mAuth = JSON.parse(localStorage.getItem('memberAuth'))
    // }

    if (memberAuthState.authorized) {
      axios.defaults.withCredentials = true

      const response = await axios.get(
        url + '/level/' + memberAuthState.membersid,
        {
          headers: {
            Authorization: 'Bearer ' + memberAuthState.memberToken,
          },
        }
      )
      // console.log(response.data)
      setState(response.data.row)
    }
  }

  // 會員登出
  const memberLogout = () => {
    localStorage.removeItem('memberAuth')
    alert('會員已登出，感謝您的使用')
    navigate('/memberLogin')
  }
  const a = 50
  return (
    <MemberAuthContext.Provider
      value={{
        getProfileData,
        getOrderData,
        getLikeData,
        getCommentData,
        getLevelData,
        memberLogout,
        memberAuthState,
        setMemberAuthState,
        a,
      }}
    >
      <div className="">
        <Background>
          <p className="m-mainLogo">JOINME</p>
          <Outlet />
        </Background>
      </div>
    </MemberAuthContext.Provider>
  )
}
