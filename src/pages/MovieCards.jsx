import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from 'react-router-dom';

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.results.filter(movie => !movie.adult);
        setMovies(filtered);
      })
      .catch(err => console.error("영화 데이터를 불러오지 못했습니다:", err));
  }, []);

  return (
    <div
      className="movie-list"
      style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
    >
      {movies.map((movie, i) => (
        <Link
          key={movie.id}
          to={`/details/${movie.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MovieCard movieList={movie} />
        </Link>
      ))}
    </div>
  );
};

export default MovieCards;
