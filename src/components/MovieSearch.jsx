import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { TOKEN } from "../data/const";

export default function MovieSearch () {
    const [searchParams] = useSearchParams()
    const debounceParam = searchParams.get('query')
    const [movies, setMovies] = useState([]); 
      
        useEffect(() => {
      
          fetch(`https://api.themoviedb.org/3/search/movie?query=${debounceParam}&language=ko`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${TOKEN}`, 
            },
          })
            .then((res) => res.json()) 
            .then((data) => {
              const filteredMovies = data.results.filter((movie) => !movie.adult);
              setMovies(filteredMovies); 
            })
            .catch((err) => {
              console.error('Error fetching data:', err); 
            });
        }, [debounceParam]); 
         
        return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            );
}