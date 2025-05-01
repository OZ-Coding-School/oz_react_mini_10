import './App.css'
import movieListData from './moviedata/movieListData.json';
import { useState } from 'react';
import MovieCard from './component/moviecard';

function App() {
  const [movies, setMovie] = useState(movieListData.results)
  

  return (
    <>
      <nav>

      </nav>

      <main>
      <div className="flex flex-wrap gap-8 w-full h-full">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
          />
        ))}
      </div>
      </main>
    </>
  )
}

export default App
