import { useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard.jsx'
import movieListData from './data/movieListData.json'
import NavBar from './components/NavBar.jsx'


function App() {
  const [movies,setMovies] = useState(movieListData.results)

  return (
    <>
    <Routes>
        <header>
          <NavBar/>
        </header>
        <main>
        
              <div className="moviecard">
              {movies.map((movie,id)=>(
                <MovieCard
                key={id}
                title = {movie.title}
                poster = {movie.poster_path}
                rating = {movie.vote_average}
                />
              ))}
            </div>
          
        </main>
      </Routes>
   </>
  )
}

export default App
