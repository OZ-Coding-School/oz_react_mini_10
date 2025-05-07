// css 적용
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // ✅ useState, useEffect import 필요!

import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results.filter((movie) => movie.adult === false);
        setMovies(filtered);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
