import './App.css'
import MovieCard from './components/MovieCard'
import { Route, Routes } from 'react-router-dom'
import MovieDetail from './components/MovieDetail'
import Layout from './components/Layout'


function App() {

  return (
    <>
      <Layout />
      
      <Routes>
        <Route path="/" element={<MovieCard />} />
        <Route path="/detail/:id" element={<MovieDetail/>} />
      </Routes>

    </>
  )
}

export default App
