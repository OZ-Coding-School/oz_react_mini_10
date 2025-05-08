import React from "react";
import { Link } from "react-router-dom";
import { getPostImageUrl } from "../hooks/useFetch";

const MovieCard = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-10 text-gray-600">영화 정보가 없습니다</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {data.map((movie) => (
        <Link
          to={`/details/${movie.id}`}
          key={movie.id}
          className="block cursor-pointer transition transform hover:scale-105"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative pb-[150%]">
              {/* 포스터 비율 유지 */}
              <img
                src={getPostImageUrl(movie.poster_path)}
                alt={movie.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x750?text=이미지+없음";
                }}
              />
              {/* 평점 배지 */}
              {movie.vote_average > 0 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-yellow-400 px-2 py-1 rounded-md text-sm font-semibold">
                  ★ {movie.vote_average?.toFixed(1)}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieCard;
