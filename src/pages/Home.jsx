import React, { useEffect, useState } from 'react';
import MovieCard from "../components/moviecard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTgxOTY4NGMwNjg2OWUxNWRjZGYzODAyZTk4Mjk5MyIsIm5iZiI6MTc0NjE3Njg4MS4yOTIsInN1YiI6IjY4MTQ4YjcxODFhODY2ZjQwMDkwN2JmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bGh-RqqFIgbVC038WSm695IQ8zXNw_0UHU2i7eaxSKk'
        }
      };

      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR', options);
      
      if (response.ok) {
        const data = await response.json();
        const filteredMovies = data.results.filter(movie => !movie.adult);
        setMovies(filteredMovies); 
      } else {
        console.error('에러');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={styles.container}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
          />
        ))
      ) : (
        <div>영화가 없습니다.</div>
      )}
    </div>
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

export default Home;

