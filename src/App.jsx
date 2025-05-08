import './App.css';
import MovieCard from './components/MovieCard';
import useFetch from './hooks/useFetch';


function App() {
  const popularMovieURL = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
  const {data, loading, error} = useFetch(popularMovieURL);

  if (loading) return <p>로딩 중</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!data) return null; 

  const filteredMovies = data.results.filter((movie) => movie.adult === false);

  return (
    <ul className="max-w-[1300px] mx-auto flex flex-wrap justify-center "> 
      {filteredMovies.map((el) => {
        return <MovieCard key={el.id} movieData={el} movieID={el.id}/>
      })}
    </ul>
  );
};



export default App;
