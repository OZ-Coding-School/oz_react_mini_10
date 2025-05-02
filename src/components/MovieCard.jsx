import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Spiner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #5389c3;
  border-top: 5px solid #53c377;
  border-radius: 50%;
  animation: rotatespinner 1s infinite;
  animation-timing-function: linear;

  @keyframes rotatespinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function MovieCard({ movieData }) {
  const [isImageLoading, setisImageLoading] = useState(true);
  return (
    <ul className="flex justify-center flex-wrap gap-10 p-6 bg-gray-50">
      {movieData.map((movie) => (
        <li
          key={movie.id}
          className="w-[300px]  bg-white rounded-2xl shadow-lg "
        >
          <Link to={`detail/${movie.id}`} className="flex flex-col">
            {isImageLoading ? <Spiner></Spiner> : null}
            <img
              onLoad={() => setisImageLoading(false)}
              className="rounded-2xl w-full aspect-[2/3] object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ display: isImageLoading ? "none" : " block" }}
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {movie.title}
              </h3>
              <p className="text-s text-gray-600">
                ⭐ 평점: {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
