import { createContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import { checkToken } from '../../ContextDashbard'

const ThemeContext = createContext({})
export default ThemeContext

export const ThemeContextProvider = ({ children }) => {
  const [gameSid, setGameSid] = useState(0)
  // // const navigate = useNavigate()
  // // if (!checkToken('memberAuth')?.membersid) {
  // //   navigate('/')
  // }
  return (
    <ThemeContext.Provider value={{ gameSid, setGameSid }}>
      <Outlet />
    </ThemeContext.Provider>
  )
}
