import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          params: {
            api_key: 'd7af90757976df4593ed5c6e53168372',
            language: 'ko-KR',
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">인기 영화</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-zinc-900 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-xs px-2 py-1 rounded">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>

            
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>            
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold truncate mb-2">{movie.title}</h3>
              <div className="flex justify-center mt-2">
                <Link
                  to={`/movie/${movie.id}`}
                  className="inline-block px-4 py-2 bg-red-600 text-sm rounded hover:bg-red-700 transition-colors"
                >
                  상세정보 보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
