import { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Header from './pages/Header';
import './index.css';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQuery !== queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = debouncedSearch.trim()
        ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearch}&language=ko-KR&page=1`
        : `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;

      try {
        const res = await fetch(endpoint, {
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

        if (debouncedSearch.trim()) {
          setSearchParams({ query: debouncedSearch.trim() }, { replace: true });
        } else {
          setSearchParams({}, { replace: true });
        }
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchMovies();
  }, [debouncedSearch, setSearchParams]);

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-100 min-h-screen">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average}
                  />
                ))
              ) : (
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              )}
            </div>
          }
        />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App;