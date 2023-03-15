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
import { MemberAuthContextProvider } from './components/member/MemberAuthContext'
import MemberAccountProfile from './components/member/MemberAccountProfile'
import MemberMenuList from './components/member/MemberMenuList'
import OrderReserve from './components/order/OrderReserve'
import OrderProcess from './components/order/OrderProcess'
import { ThemeContextProvider } from './components/commentpages/ThemeContext'
import CommentMain from './components/commentpages/CommentMain'
import CommentinnerPage from './components/commentpages/CommentinnerPage'
import SigninIndex from './components/Signin/SigninIndex'
import Signin from './components/Signin/Signin'
import SigninTarget from './components/Signin/SigninTarget'
import Index from './components/firstPage/Index'

function App() {
  return (
    <BrowserRouter>
      <ContextDashbard>
        <Header />
        <Firstplate>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<GamesMainPage />} />
            <Route path="/signin" element={<SigninIndex />}>
              <Route index element={<Signin />}></Route>
              <Route path=":target" element={<SigninTarget />}></Route>
            </Route>
            <Route path="/store" element={<StoreIndex />}>
              <Route index element={<Store />}></Route>
              <Route path=":action" element={<StoreMenuList />}></Route>
            </Route>
            <Route path="/map" element={<Map />} />
            <Route path="/member" element={<MemberAuthContextProvider />}>
              <Route index element={<MemberAccountProfile />}></Route>
              <Route path=":action" element={<MemberMenuList />}></Route>
            </Route>
            <Route path="/order" element={<OrderProcess />} />
            <Route path="/comment" element={<ThemeContextProvider />}>
              <Route index element={<CommentMain />}></Route>
            </Route>
          </Routes>
        </Firstplate>
        <Footer />
      </ContextDashbard>
    </BrowserRouter>
  )
}

export default App
