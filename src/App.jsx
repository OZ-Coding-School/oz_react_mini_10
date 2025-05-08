import "./App.css";
import MovieCard from "./components/MovieCard";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import { radomPages } from "./functions/RandomPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "./RTK/thunk";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movie.page);
  const location = useLocation();
  const [isImageLoading, setisImageLoading] = useState(true);
  const [swiperPages, setSwiperPages] = useState(null);

  useEffect(() => {
    dispatch(fetchMovieData(page));
  }, []);

  const handleLoad = async (page) => {
    dispatch(fetchMovieData(page + 1));
  };

  useEffect(() => {
    setSwiperPages(radomPages(1));
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout handleLoad={handleLoad} page={page} />}>
          <Route
            path="/"
            element={
              <MovieCard
                swiperPages={swiperPages}
                isImageLoading={isImageLoading}
                setisImageLoading={setisImageLoading}
              />
            }
          />
          <Route path={"/detail/:id"} element={<MovieDetail />} />
          <Route
            path={"/search"}
            element={
              <Search
                swiperPages={swiperPages}
                isImageLoading={isImageLoading}
                setisImageLoading={setisImageLoading}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname === "/" && (
        <>
          <button className="more-button" onClick={() => handleLoad(page)}>
            더보기
          </button>
          <button
            className="top-button"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            {" "}
            TOP
          </button>
        </>
      )}
    </>
  );
}

export default App;
