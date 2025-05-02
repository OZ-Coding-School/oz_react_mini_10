//css 적용
import "./App.css";
//Router 설정하고 해줘야할것
import { Routes, Route } from "react-router-dom";
//movieCard에서 안한 json 데이터파일가져오기
import movieListData from "./assets/movieListData.json";
//movieCard 컴포넌트 가져오기
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";

//Layout 을 만든 시점에서는 결국 layout 을 보여준다고해도 무방

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div className="movie-container">
              {/* movieListData.json파일 안에서 results를 가지고 map 함수를 돌릴 것 */}
              {/* map 함수자체가 배열의 길이만큼 반복이기떄문에 구현단계 5번은 map 쓰는걸로 충분함 */}
              {/* 굳이 for 나 length 안써도 됨 */}
              {movieListData.results.map((movie) => (
                // MovieCard는 /components 안의 MovieCard에서 export 한 컴포넌트 이름

                <MovieCard
                  key={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
            </div>
          }
        />
        <Route path="details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
