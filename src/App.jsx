import { Routes, Route } from "react-router-dom";
import movieListData from "./movieListData.json";
import MovieCard from "./components/moviecard";
import DetailPage from "./pages/Detail";
import Layout from "./components/Layout";

const Home = () => {
  return (
    <div style={styles.container}>
      {movieListData.results.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
        />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <>
    <Layout />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<DetailPage />} />
    </Routes>
    </>

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

export default App;
