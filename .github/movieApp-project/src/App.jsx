import './App.css'
import { movieListData } from './moviedata/movieListData';
import { useState } from 'react';
import MovieCard from './component/moviecard';
import { useEffect } from 'react';

function App() {
  const [movies, setMovie] = useState([])

  useEffect(()=>{
    const fetchMovies = async () => {
      const data = await movieListData();
      setMovie(data);
    }
    fetchMovies();
  },[])

  return (
    <>
      <nav>

      </nav>

      <main>
      <div className="flex justify-center items-center flex-wrap gap-8 w-full h-full">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
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
