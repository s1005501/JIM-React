import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const ThemeContext = createContext({})
export default ThemeContext

export const ThemeContextProvider = ({ children }) => {
  const [gameSid, setGameSid] = useState(0)

  return (
    <ThemeContext.Provider value={{ gameSid, setGameSid }}>
      <Outlet />
    </ThemeContext.Provider>
  )
}
