import { getPopularMovies } from "@api/getPopularMovies";
import MovieCardsContainer from "@components/MovieCardsContainer";
import { useFetch } from "@hooks/useFetch";

function Main() {
  const { data, error, isLoading } = useFetch({
    query: getPopularMovies,
  });

  const allAgesMovieList = data?.results.filter((movie) => !movie.adult);

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl">
      <div>
        <h2 className="h2 relative left-1">영화 목록</h2>
        {!isLoading && data?.results && (
          <MovieCardsContainer movieListData={allAgesMovieList} />
        )}
      </div>
    </div>
  );
}

export default Main;
