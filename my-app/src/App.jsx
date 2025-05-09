import './app.css'
import Main from '@pages/Main'
import { Routes, Route } from 'react-router-dom'
import { MovieDetail } from '@pages/MovieDetail'
import Layout from '@components/Layout'
import ErrorPage from '@components/ErrorPage'
import Search from '@pages/Search'
import Login from '@pages/Login'
import Signup from './pages/Signup'
import { useSupabaseAuth } from './supabase'
import { useEffect } from 'react'

function App() {
  const { getUserInfo } = useSupabaseAuth()
  useEffect(() => {
    getUserInfo()
  })

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Main />}></Route>
          <Route path='/detail/:id' element={<MovieDetail />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
