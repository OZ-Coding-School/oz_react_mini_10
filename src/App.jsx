import "./App.css";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import NavBar from "./components/NavBar";

function App() {
  const movieData = movieListData.results;
  return (
    <>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<MovieCard movieData={movieData} />} />
          <Route path={"/detail"} element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
