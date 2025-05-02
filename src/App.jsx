import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movieListData from '../public/data/movieListData.json';
import './App.css';
import MovieCard from './components/MovieCard';

function App() {
  const [movieList, setMovieList] = useState(movieListData);


  return (
    <ul class="max-w-[1300px] mx-auto flex flex-wrap justify-center "> 
      {movieList.results.map((el) => {
        return <MovieCard key={el.id} movieData={el} />
      })}
    </ul>
  );
};



export default App;
