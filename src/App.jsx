import './App.css'
import { MovieCard } from './component/MovieCard'
import { MovieDetail } from './component/MovieDetail'
import {Layout} from './component/Layout'
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MovieCard />} />
        <Route path="/detail" element={<MovieDetail />} />
      </Route>
    </Routes>

    </>
  )
}

export default App
