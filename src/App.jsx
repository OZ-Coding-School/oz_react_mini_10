// css 적용
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // ✅ useState, useEffect import 필요!
import { useSearchParams } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";

function App() {
  const [movies, setMovies] = useState([]);
  const [serachParams] = useSearchParams();
  const query = serachParams.get("query");

  useEffect(() => {
    const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    const url = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}`
      : "https://api.themoviedb.org/3/movie/popular";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results.filter((movie) => !movie.adult);
        setMovies(filtered);
      });
  }, [query]);
  return (
    <Routes>
      <Route path="/" element={<Layout setMovies={setMovies} movies={movies} />}>
        <Route
          index
          element={
            <div className="movie-container">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
            </div>
          }
        />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
