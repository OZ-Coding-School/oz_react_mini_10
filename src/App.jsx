import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from './api/tmdb';
import MovieCard from './component/MovieCard';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {

      try {
        const popularMovies = await fetchPopularMovies();
        const filteredMovies = popularMovies.filter(movie => movie.adult === false);

        setMovies(filteredMovies);

        } catch (err) {
          console.log(err);
          setMovies([]);
        }
    };

    getMovies();
  }, []);

  return (
    <div className="container mx-auto px-[16px] py-[32px]">
      <h1 className="text-2xl font-bold text-left mb-[16px] pl-[10px]">인기 영화</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px]">

        {movies.length > 0 &&
          movies.map(movie => (
            <MovieCard
              key={movie.id} 
              movieId={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;