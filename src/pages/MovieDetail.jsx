import { baseUrl, largeBaseUrl } from "@constants/baseUrl";
import initialMovieDetailData from "@data/movieDetailData.json";
import { useState } from "react";

const MovieDetail = () => {
  const [movieDetailData] = useState(initialMovieDetailData);
  const { backdrop_path, genres, overview, poster_path, title, vote_average } =
    movieDetailData ?? {};

  return (
    <div
      className="relative flex h-180 w-full items-end justify-center bg-cover pb-2"
      style={{ backgroundImage: `url(${largeBaseUrl}${backdrop_path})` }}
    >
      <div className="absolute top-0 left-0 z-10 h-180 w-full bg-gradient-to-t from-black"></div>
      <div className="z-20 flex max-w-7xl gap-12 p-8">
        <img
          alt="poster"
          className="h-[450px] w-[300px] rounded-2xl shadow-md"
          src={`${baseUrl}${poster_path}`}
        />
        <div className="flex h-[450px] flex-col gap-6 text-white">
          <div className="flex flex-col gap-4 rounded-xl p-4 shadow-md backdrop-blur-2xl">
            <div className="flex flex-col">
              <div className="text-4xl font-bold">{title}</div>
              <div>평점 : {vote_average}</div>
            </div>
            <div className="flex gap-4">
              {genres.map(({ id, name }) => (
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
