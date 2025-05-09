import { findByMovieId } from "@api/findByMovieId";
import Genres from "@components/ui/detail/Genres";
import { BASE_URL, LARGE_BASE_URL } from "@constants/baseUrl";
import { useFetch } from "@hooks/useFetch";
import { useMemo } from "react";
import { useParams } from "react-router";

const MovieDetail = () => {
  const params = useParams();

  const options = useMemo(
    () => ({
      options: { movieId: params.id },
      query: findByMovieId,
    }),
    [params.id],
  );

  const { data, error, isLoading } = useFetch(options);

  const { backdrop_path, genres, overview, poster_path, title, vote_average } =
    data ?? {};

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <div className="flex w-full max-w-[1280px] items-end justify-center">
      <div
        className="absolute top-0 left-0 z-0 h-180 w-full bg-cover"
        style={{ backgroundImage: `url(${LARGE_BASE_URL}${backdrop_path})` }}
      ></div>
      <div className="z-10 flex flex-wrap justify-center gap-4 px-4 py-18 text-white">
        <img
          alt="poster"
          className="h-[450px] w-[300px] rounded-2xl shadow-md"
          src={`${BASE_URL}${poster_path}`}
        />
        <div className="flex max-w-[500px] flex-col gap-4 rounded-xl bg-black p-8">
          <div className="text-4xl font-bold">{title}</div>
          <div>평점 : {vote_average}</div>
          <Genres genres={genres} />
          <div>{overview}</div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
