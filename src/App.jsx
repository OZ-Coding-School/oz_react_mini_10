import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Header from './pages/Header'; 
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        });

        if (!res.ok) {
          console.error('API 요청 실패:', res.status, res.statusText);
          return;
        }

        const data = await res.json();

        if (!data.results) {
          console.error('API 응답에 results가 없습니다:', data);
          return;
        }

        const safeMovies = data.results.filter((movie) => movie.adult === false);
        setMovies(safeMovies);
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-100 min-h-screen">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            ))}
          </div>
        } />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App;