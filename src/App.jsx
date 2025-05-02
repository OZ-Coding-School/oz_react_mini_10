import "./App.css";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";

function App() {
  const [movieData, setMovieData] = useState(movieListData.results);

  const API = import.meta.env.VITE_API_TOKEN;

  // 함수 : API 데이터 fetch
  const fetchData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=ko",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setMovieData(res.results);
      })
      .catch((err) => console.error(err));
  };
  // 렌더링 후 1번만 영화 데이터 불러오기
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MovieCard movieData={movieData} />} />
          <Route path={"/detail/:id"} element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
