import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const ThemeContext = createContext({})
export default ThemeContext

export const ThemeContextProvider = ({ children }) => {
  const [gameName, setGameName] = useState('等一個人盜墓')

  return (
    <ThemeContext.Provider value={{ gameName, setGameName }}>
      <Outlet />
    </ThemeContext.Provider>
  )
}
