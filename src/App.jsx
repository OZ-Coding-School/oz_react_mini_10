import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { Suspense, lazy, useState } from 'react'
import Loading from './components/Loading';

const MovieCard = lazy(() => import('./components/MovieCard'));
const MovieDetail = lazy(() => import('./components/MovieDetail'));



function App() {

const [query, setQuery] = useState();


  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout query={query} setQuery={setQuery}/>}>
          <Route index element={<MovieCard/>} />
          <Route path="/detail/:movie_id" element={<MovieDetail setQuery={setQuery}/>} />
          <Route path="*" element={<div className='text-center mt-72 font-bold text-3xl'>404 없는 페이지임.</div>}></Route>
        </Route>
      </Routes>
    </Suspense>

  )
}

export default App
