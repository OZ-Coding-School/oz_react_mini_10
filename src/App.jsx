import './App.css'
import MovieCard from './components/MovieCard'
import { Route, Routes } from 'react-router-dom'
import MovieDetail from './components/MovieDetail'
import Layout from './components/Layout'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieCard />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
          <Route path="*" element={<div className='text-center mt-72 font-bold text-3xl'>404 없는 페이지임.</div>}></Route>
        </Route>
      </Routes>
    </>
    
  )
}

export default App
