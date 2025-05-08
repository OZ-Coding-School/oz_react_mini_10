import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ThemeContext } from './ThemeContext';

const MovieCard = () => {
  const { theme } = useContext(ThemeContext);
  const [movies, setMovies] = useState([]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        },
          params: {
            // api_key: 'd7af90757976df4593ed5c6e53168372',
            language: 'ko-KR',
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
      
      <div className="relative mb-12">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          loop
          className="w-full"
        >
          {movies.slice(0, 5).map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <div className="relative w-full h-[70vh] overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className={`absolute bottom-0 left-0 p-8 w-full ${theme === 'dark' ? 'bg-gradient-to-t from-black to-transparent' : 'bg-gradient-to-t from-gray-200 to-transparent'}`}>
                    <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-lg mb-4 line-clamp-3">{movie.overview}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</span>
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        | {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8">지금 뜨는 영화</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Link>
              <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-black  bg-opacity-70 text-white' : 'bg-white bg-opacity-70 text-gray-800'}`}>
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;