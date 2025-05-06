import { findByMovieId } from "@api/findByMovieId";
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
    <div
      className="relative flex h-180 w-full items-end justify-center bg-cover pb-2"
      style={{ backgroundImage: `url(${LARGE_BASE_URL}${backdrop_path})` }}
    >
      <div className="absolute top-0 left-0 z-10 h-180 w-full bg-gradient-to-t from-black"></div>
      <div className="z-20 flex max-w-7xl gap-12 p-8">
        <img
          alt="poster"
          className="h-[450px] w-[300px] rounded-2xl shadow-md"
          src={`${BASE_URL}${poster_path}`}
        />
        <div className="flex h-[450px] flex-col gap-6 text-white">
          <div className="flex flex-col gap-4 rounded-xl p-4 shadow-md backdrop-blur-2xl">
            <div className="flex flex-col">
              <div className="text-4xl font-bold">{title}</div>
              <div>평점 : {vote_average}</div>
            </div>
            <div className="flex gap-4">
              {genres?.map(({ id, name }) => (
                <span
                  className="rounded-2xl border-2 border-gray-100 p-2 text-sm"
                  key={id}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 shadow-md backdrop-blur-2xl">
            {overview}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
