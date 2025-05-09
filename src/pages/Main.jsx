import { findByMovieTitle } from "@api/findByMovieTitle";
import { getPopularMovies } from "@api/getPopularMovies";
import MovieCardsContainer from "@components/MovieCardsContainer";
import { useFetch } from "@hooks/useFetch";
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Main() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQuery = searchParams.get("query");

  useEffect(() => {
    if (searchParams.has("query") && !urlQuery) {
      navigate("/");
    }
  }, [navigate, searchParams, urlQuery]);

  const searchOptions = useMemo(
    () => ({
      options: { query: urlQuery },
      query: findByMovieTitle,
    }),
    [urlQuery],
  );

  const {
    data: searchResults,
    error: searchError,
    isLoading: searchIsLoading,
  } = useFetch(searchOptions);

  const {
    data: popularMovies,
    error: popularError,
    isLoading: popularIsLoading,
  } = useFetch({
    query: getPopularMovies,
  });

  const { data, error, isLoading } = urlQuery
    ? { data: searchResults, error: searchError, isLoading: searchIsLoading }
    : { data: popularMovies, error: popularError, isLoading: popularIsLoading };

  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다</div>;
  }

  const allAgesMovieList = data?.results.filter((movie) => !movie.adult);

  return (
    <div className="flex flex-col gap-8 lg:max-w-5xl xl:max-w-7xl">
      <div>
        <h2 className="h2 relative left-1">
          {urlQuery ? "검색 결과" : "인기 영화"}
        </h2>
        {data?.results && (
          <MovieCardsContainer movieListData={allAgesMovieList} />
        )}
      </div>
    </div>
  );
}

export default Main;
