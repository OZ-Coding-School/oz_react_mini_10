import React from "react";
import { useSearchOrPopularVideos } from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

const MovieList = () => {
  const { keyword } = useParams();

  const {
    isLoading,
    isError,
    data: movies,
    error,
  } = useSearchOrPopularVideos(keyword);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
        <p>오류가 발생했습니다: {error?.message || "알 수 없는 오류"}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center p-10 text-gray-600">
        {keyword
          ? `'${keyword}'에 대한 검색 결과가 없습니다.`
          : "영화 정보가 없습니다."}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {keyword && (
        <h2 className="text-xl font-bold p-4">{keyword} 검색 결과</h2>
      )}
      <MovieCard data={movies} />
    </div>
  );
};

export default MovieList;
