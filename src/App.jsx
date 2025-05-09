import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // useSearchParams 임포트
import { fetchPopularMovies, searchMovies } from './api/tmdb'; // API 함수 임포트
import MovieCard from './component/MovieCard';
import './App.css';

function App() { // HomePage 역할을 하는 컴포넌트
  // URL의 search parameters에서 'search' 값을 읽어옵니다.
  const [searchParams] = useSearchParams();
  // URL에서 읽은 검색어 상태
  const currentSearchQuery = searchParams.get('search') || ''; // 'search' 파라미터가 없으면 빈 문자열

  // 초기 인기 영화 목록 상태 (검색어가 없을 때 표시)
  const [popularMovies, setPopularMovies] = useState([]);
  // 검색 결과 영화 목록 상태 (검색어가 있을 때 표시)
  const [searchResults, setSearchResults] = useState([]);

  // 로딩, 오류 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 현재 검색어(currentSearchQuery)가 변경될 때마다 이펙트 실행
  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          setError(null);

          try {
              let movies = [];
              if (currentSearchQuery) {
                  // 검색어가 있으면 검색 API 호출
                  movies = await searchMovies(currentSearchQuery);
                  setPopularMovies([]); // 검색 결과가 있을 때는 인기 영화 목록 초기화 (선택 사항)
              } else {
                  // 검색어가 없으면 인기 영화 API 호출
                  movies = await fetchPopularMovies();
                  setSearchResults([]); // 인기 영화를 가져올 때는 검색 결과 초기화 (선택 사항)
              }

              // 성인 영화 필터링
              const filteredMovies = movies.filter(movie => movie.adult === false);

              if (currentSearchQuery) {
                  setSearchResults(filteredMovies);
              } else {
                  setPopularMovies(filteredMovies);
              }

          } catch (err) {
              console.error("데이터 불러오기 실패:", err);
              setError(currentSearchQuery ? `'${currentSearchQuery}' 검색 결과를 불러오는데 실패했습니다.` : '인기 영화를 불러오는데 실패했습니다.');
              if (currentSearchQuery) {
                  setSearchResults([]);
              } else {
                   setPopularMovies([]);
              }

          } finally {
              setLoading(false);
          }
      };

      fetchData();

  }, [currentSearchQuery]); // currentSearchQuery가 변경될 때마다 fetchData 실행

  // 화면에 표시할 영화 목록 결정 (검색 결과가 있으면 검색 결과, 없으면 인기 영화)
  const moviesToDisplay = currentSearchQuery ? searchResults : popularMovies;


  return (
    // Layout 컴포넌트의 main 태그 내부에 렌더링되므로 별도의 컨테이너나 패딩 불필요
    <div className="container mx-auto px-[16px]"> {/* Layout의 paddingTop과 중복될 수 있으니 조정 필요 */}
      {/* 제목 표시 */}
      <h1 className="text-3xl font-bold text-left mb-[16px] pt-[40px] pl-[10px]">
          {currentSearchQuery ? `'${currentSearchQuery}' 검색 결과` : '인기 영화'}
      </h1>

      {/* 로딩, 오류, 결과 없음 상태 메시지 표시 */}
      {loading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && moviesToDisplay.length === 0 && currentSearchQuery && (
           <p>'${currentSearchQuery}'에 대한 검색 결과가 없습니다.</p>
      )}
       {/* 검색어가 없을 때 인기 영화 로드 실패 메시지 */}
       {!loading && !error && moviesToDisplay.length === 0 && !currentSearchQuery && (
            <p>인기 영화 목록을 불러오는데 실패했거나 결과가 없습니다.</p>
       )}


      {/* 영화 목록 표시 */}
      {!loading && !error && moviesToDisplay.length > 0 && (
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px]">
              {moviesToDisplay.map(movie => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  posterPath={movie.poster_path}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  // 추가적인 prop이 있다면 전달
                />
              ))}
            </div>
      )}
    </div>
  );
}

export default App; // 또는 HomePage로 사용한다면 export default HomePage;