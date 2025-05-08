import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { TOKEN } from "../data/const";

export default function MovieList() {
    const [movies, setMovies] = useState([]); // 상태로 영화 목록을 관리
  
    useEffect(() => {
  
      // TMdb API 호출
      fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}`, // API 토큰을 Authorization 헤더에 포함
        },
      })
        .then((res) => res.json()) // JSON으로 응답받기
        .then((data) => {
          // 성인 콘텐츠를 제외한 영화만 필터링
          const filteredMovies = data.results.filter((movie) => !movie.adult);
          setMovies(filteredMovies); // 필터링된 영화 목록 상태에 저장
        })
        .catch((err) => {
          console.error('Error fetching data:', err); // 오류 처리
        });
    }, []); // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행
  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      );
  }