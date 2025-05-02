import "./App.css";
import MovieCard from "./components/MovieCard";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import MovieLoad from "./api";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();

  console.log(location);

  // 함수 : API 데이터 fetch
  const handleLoad = async (page) => {
    const data = await MovieLoad(page);
    if (page <= 500) {
      setMovieData([...movieData, ...data.results]);
    }
    setPage((prev) => prev + 1);
  };

  // 렌더링 후 1번만 영화 데이터 불러오기

  useEffect(() => {
    handleLoad(page);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout handleLoad={handleLoad} page={page} />}>
          <Route path="/" element={<MovieCard movieData={movieData} />} />
          <Route path={"/detail/:id"} element={<MovieDetail />} />
        </Route>
      </Routes>
      {location.pathname === "/" && (
        <button className="more-button " onClick={() => handleLoad(page)}>
          더보기
        </button>
      )}
    </>
  );
}

export default App;
