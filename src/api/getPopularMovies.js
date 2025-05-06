export const getPopularMovies = async (options) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    options,
  );

  if (!response.ok) {
    throw Error("오류가 발생했습니다.");
  }

  return response;
};
