import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hook/useDebounce';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const api = import.meta.env.VITE_TMDB_ACCESS_TOKEN
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${api}`,
          }
        };

        const url = debouncedSearchTerm
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(debouncedSearchTerm)}&language=ko-KR`
          : 'https://api.themoviedb.org/3/movie/popular?language=ko-KR';

        const response = await fetch(url, options);
        const data = await response.json();
        const filteredMovies = data.results.filter(movie => !movie.adult);
        setMovies(filteredMovies);
      } catch (error) {
        console.error('API 호출 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <div style={styles.container}>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
          />
        ))
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
};

export default Home;

