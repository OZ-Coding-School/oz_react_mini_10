import { Routes, Route } from 'react-router-dom';
import movieListData from './data/movieListData.json';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Header from './pages/Header'; 
import './index.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-100 min-h-screen">
            {movieListData.results.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            ))}
          </div>
        } />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App;