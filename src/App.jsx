import './App.css'
import { useState } from 'react'
import MovieCard from './components/MovieCard'
import movieListData from './data/movieListData.json'
import MovieDetail from './components/MovieDetail'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'



function MovieList() {
  const [movies] = useState(movieListData.results);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#2d3748] to-[#1e293b] text-white px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
        {movies.map((el) => (
          <MovieCard
            key={el.id}
            poster_path={el.poster_path}
            title={el.title}
            vote_average={el.vote_average}
          />
        ))}
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#2d3748] to-[#1e293b] text-white">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MovieList />} />
          <Route path="/details" element={<MovieDetail />} />
        </Route>
      </Routes>
    </div>
  );
}



export default App