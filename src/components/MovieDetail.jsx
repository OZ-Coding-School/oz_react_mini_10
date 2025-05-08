import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetailResult, getPostImageUrl } from "../hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data: movie } = useMovieDetailResult(id);

  const goBack = () => navigate("/");

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
        <p>영화 상세 정보를 불러오는데 실패했습니다.</p>
      </div>
    );

  if (!movie)
    return <div className="text-center p-4">영화를 찾을 수 없습니다</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        뒤로가기
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {movie.backdrop_path && (
          <div
            className="w-full h-64 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          />
        )}

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 포스터 이미지 */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                src={getPostImageUrl(movie.poster_path)}
                alt={movie.title}
                className="rounded-lg shadow-md w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x750?text=이미지+없음";
                }}
              />
            </div>

            {/* 영화 정보 */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

              {/* 평점 */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-xl mr-2">★</span>
                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                <span className="ml-2 text-gray-500">
                  ({movie.vote_count} 평가)
                </span>
              </div>

              {/* 개봉일, 런타임 */}
              <div className="mb-4 text-gray-600">
                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("ko-KR")
                    : "미정"}
                </span>
                {movie.runtime && (
                  <span>
                    {" "}
                    • {Math.floor(movie.runtime / 60)}시간 {movie.runtime % 60}
                    분
                  </span>
                )}
              </div>

              {/* 장르 */}
              <div className="mb-4">
                <h2 className="font-semibold mb-2">장르</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres &&
                    movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="font-semibold mb-2">줄거리</h2>
                <p className="text-gray-700">
                  {movie.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>

              {/* 출연진 정보 */}
              {movie.credits &&
                movie.credits.cast &&
                movie.credits.cast.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-semibold mb-2">주요 출연진</h2>
                    <div className="flex flex-wrap gap-4">
                      {movie.credits.cast.slice(0, 5).map((actor) => (
                        <div key={actor.id} className="text-center">
                          <img
                            src={
                              actor.profile_path
                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                : "https://via.placeholder.com/200x300?text=이미지+없음"
                            }
                            alt={actor.name}
                            className="w-16 h-16 object-cover rounded-full mx-auto mb-1"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/200x300?text=이미지+없음";
                            }}
                          />
                          <p className="text-sm font-medium">{actor.name}</p>
                          <p className="text-xs text-gray-500">
                            {actor.character}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
