import MovieCard from "../components/MovieCard";
import movieList from "../data/movieListData.json";
import MovieDetail from "../data/movieDetailData.json";
import { Link } from 'react-router-dom';

const MovieCards = () => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    
    <div
      className="movie-list"
      style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
    > 
    {movieList.results.map((movie, i) => (
        <Link to={`/details`} style={{ textDecoration: "none", color: "inherit" }}>
    <MovieCard key ={i} movieList={movie}/>
  </Link>
        
))}
    </div>
    
  );
};

export default MovieCards;