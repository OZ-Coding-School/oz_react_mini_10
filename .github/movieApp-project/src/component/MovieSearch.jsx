import { useSearchParams } from "react-router-dom"
import { useDebounce } from "../hook/debounce";
import { useEffect, useState } from "react";
import MovieCard from "./moviecard";
import { movieSearchAPI } from '../movieAPI/movieSearchAPI';

const MovieSearch = () => {
    const [searchParams] = useSearchParams();
    // useSearchParams로 querystring 형태로 url 값을 가져올 거임.
    const query = searchParams.get('query') || '';
    // search 
    const debouncedQuery = useDebounce(query, 500)
    const [results, setResults] = useState([])
    useEffect(() => {
        const fetchResults = async () => {
            const data = await movieSearchAPI(debouncedQuery)
            setResults(data)
        }
        if (debouncedQuery) fetchResults();
    },[debouncedQuery])

    return (
        <div className="flex justify-center items-center flex-wrap gap-8 w-full h-full">
         {results.length > 0 ? (
          results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    )
}


export default MovieSearch