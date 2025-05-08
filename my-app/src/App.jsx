import './app.css'
import Main from '@pages/Main'
import { Routes, Route } from 'react-router-dom'
import { MovieDetail } from '@pages/MovieDetail'
import Layout from '@components/Layout'
import ErrorPage from '@components/ErrorPage'
import Search from '@pages/Search'
import Login from '@pages/Login'
import Join from '@pages/Join'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Main />}></Route>
          <Route path='/detail/:id' element={<MovieDetail />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
