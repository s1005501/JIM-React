import '../src/style/template.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Firstplate from './components/common/Firstplate'
import Footer from './components/common/Footer'

//games
import GamesMainPage from './components/games/GamesMainPage'
import GamesFilters from './components/games/GamesFilters'
import ContextDashbard from './ContextDashbard'

import StoreIndex from './components/store/StoreIndex'
import Store from './components/store/Store'
import StoreMenuList from './components/store/StoreMenuList'
import Map from './components/map/Map'
import { MemberAuthContextProvider } from './contexts/MemberAuthContext'
import MemberAccountProfile from './components/member/MemberAccountProfile'
import MemberMenuList from './components/member/MemberMenuList'

function App() {
  return (
    <BrowserRouter>
      <ContextDashbard>
        <Header />
        <Firstplate>
          <Routes>
            <Route path="/games" element={<GamesMainPage />} />
            <Route path="/store" element={<StoreIndex />}>
              <Route index element={<Store />}></Route>
              <Route path=":action" element={<StoreMenuList />}></Route>
            </Route>
            <Route path="/member" element={<MemberAuthContextProvider />}>
              <Route index element={<MemberAccountProfile />}></Route>
              <Route path=":action" element={<MemberMenuList />}></Route>
            </Route>
            <Route path="/map" element={<Map />} />
          </Routes>
        </Firstplate>
        <Footer />
      </ContextDashbard>
    </BrowserRouter>
  )
}

export default App
