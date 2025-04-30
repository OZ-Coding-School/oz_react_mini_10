import { useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard.jsx'
import movieListData from './data/movieListData.json'


function App() {
  const [movies,setMovies] = useState(movieListData.results)

  return (
    <div class="moviecard">
    {movies.map((movie,id)=>(
      <MovieCard
      key={id}
      title = {movie.title}
      poster = {movie.poster_path}
      rating = {movie.vote_average}
      
      />
    ))}
   </div>
  )
}

export default App
