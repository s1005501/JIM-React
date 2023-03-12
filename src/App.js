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

function App() {
  return (
    <BrowserRouter>
      <ContextDashbard>
        <Header />
        <Firstplate>
          <Routes>
            <Route path="/gamesMainPage" element={<GamesMainPage />} />
            <Route path="/gamesFilters" element={<GamesFilters />} />
            <Route path="/store" element={<StoreIndex />}>
              <Route index element={<Store />}></Route>
              <Route path=":action" element={<StoreMenuList />}></Route>
            </Route>
            <Route path="/map" element={<Map />} />
          </Routes>
        </Firstplate>
      </ContextDashbard>
      <Footer />
    </BrowserRouter>
  )
}

export default App
