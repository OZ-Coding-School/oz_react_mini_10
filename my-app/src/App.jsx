import './app.css'
import Main from '@pages/Main'
import { Routes, Route } from 'react-router-dom'
import { MovieDetail } from '@components/MovieDetail'
import Layout from '@components/Layout'
import ErrorPage from '@components/ErrorPage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Main />}></Route>
          <Route path='/detail' element={<MovieDetail />}></Route>
          {/* <Route path='/detail/:id' element={<MovieDetail />}></Route> */}
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
