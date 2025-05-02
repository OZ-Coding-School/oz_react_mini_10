import MovieCardsContainter from "@components/MovieCardsContainter";
import initialMovieListData from "@data/movieListData.json";
import { useState } from "react";

function Main() {
  const [movieListData] = useState(initialMovieListData.results);

  return (
    <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl">
      <div>
        <h2 className="h2 relative left-1">영화 목록</h2>
        <MovieCardsContainter movieListData={movieListData} />
      </div>
    </div>
  );
}

export default Main;
