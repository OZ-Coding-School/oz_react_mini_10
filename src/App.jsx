import "./App.css";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";

function App() {
  const movieData = movieListData.results;
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MovieCard movieData={movieData} />} />
          <Route path={"/detail"} element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
