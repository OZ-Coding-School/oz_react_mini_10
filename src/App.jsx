import data from "./data/movieListData.json"
import './App.css'
import MovieCard from "./components/MovieCard"
import MovieDetail from "./components/MovieDetail"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"

function App() {


  return (
    <>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieCard data={data} />} />
          <Route path="Detail" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
