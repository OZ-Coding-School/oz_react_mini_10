import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

//debounce 커스텀 훅 먼저 생성 : 행동이 멈춘 뒤. 3초 타이머가 끝나면, 그 값이 최종값 

function useDebounce(value,delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)


    useEffect(()=> {
       const handler =  setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
       return() => {
         clearTimeout(handler);
       }
    },[value,delay]);

    return debouncedValue;

}


function SearchInput() {
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebounce(inputValue,3000)

    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDVlYjcyMzNmYmQ1ZDQyMWU1ZGZkODkxMzZjZDIxMiIsIm5iZiI6MTc0NjI1MjE4OS44MzksInN1YiI6IjY4MTViMTlkMGM3ODNiODVmZTkwN2YwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KqsWPPvivWInRUx-3jc9ptyzddgYaKciT7aDe2U7HvI'
        }
      };

  

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setSearchData([]);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `https://api.themoviedb.org/3/search/movie?language=ko-KO&include_adult=false&query=${debouncedValue}`,
          options
        );
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await result.json();
        const nonAdultMovies = data.results.filter((movie) => !movie.adult);
        setSearchData(nonAdultMovies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedValue]);

    console.log(searchData)
    return(
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4 bg-red-100">

            <input type="text" placeholder="영화 제목을 입력하세요." value={inputValue} onChange={(e)=> setInputValue(e.target.value)}  />
            {searchData.map((movie) => (
               <MovieCard key={movie.id}
               poster = {movie.poster_path}
               title = {movie.title}
               rating = {movie.vote_average}
             
             />
            ))}
        </div>
    )
    
}

export default SearchInput;
