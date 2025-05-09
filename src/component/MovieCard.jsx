import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ThemeContext } from './ThemeContext';

// 커스텀 CSS 추가
const styles = `
  .swiper-container-custom {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
`;

const MovieCard = () => {
  const { theme } = useContext(ThemeContext);
  const [popularMovies, setPopularMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);

  // Fetch movies by category
  useEffect(() => {
    const fetchMovies = async (setter, genreId = null) => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
            },
            params: {
              language: 'ko-KR',
              with_genres: genreId,
            },
          }
        );
        setter(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Popular movies (no genre filter)
    fetchMovies(setPopularMovies);
    // Horror movies (Genre ID 27: Horror)
    fetchMovies(setHorrorMovies, 27);
    // Anime (Genre ID 16: Animation)
    fetchMovies(setAnimeMovies, 16);
  }, []);

  const renderMovieSlider = (movies, title) => (
    <div className="container mx-auto px-2 py-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        slidesPerGroup={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 7,
            slidesPerGroup: 7,
          },
        }}
        navigation
        className="w-full swiper-container-custom"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Link>
              <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-black bg-opacity-70 text-white' : 'bg-white bg-opacity-70 text-gray-800'}`}>
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
        {/* Banner Section */}
        <div className="relative mb-12">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {popularMovies.slice(0, 5).map((movie) => (
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

        {/* Popular Movies Section */}
        {renderMovieSlider(popularMovies, '지금 뜨는 영화')}
        {/* Horror Movies Section */}
        {renderMovieSlider(horrorMovies, '긴장감 넘치는 영화')}
        {/* Anime Section */}
        {renderMovieSlider(animeMovies, '아이와 함께 보기 좋은')}
      </div>
    </>
  );
};

export default MovieCard;