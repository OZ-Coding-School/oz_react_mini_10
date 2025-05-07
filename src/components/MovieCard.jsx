import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>영화 정보가 없습니다</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x750?text=이미지+없음";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieCard;
