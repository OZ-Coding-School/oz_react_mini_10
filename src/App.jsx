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
      {/*/는 홈페이지에 아무것도 경로가 없을 때*/}
        <Route path="/" element={<MovieCard />} />
        <Route path="/detail/:movieId" element={<MovieDetail />} />
      </Route>
    </Routes>

    </>
  )
}

export default App
