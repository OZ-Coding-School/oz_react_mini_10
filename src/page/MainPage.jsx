import React from 'react';
import MovieCard from '../component/MovieCard';
import movieList from '../data/movieListData.json';

const MainPage = () => {
  return (
    <>
      <main className="grid grid-cols-1 pt-[80px] px-4 md:px-20">
        <p className="text-[30px] font-bold w-full text-left">상영작</p>
        <div className="col-span-1 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {Array.isArray(movieList?.results) && movieList.results.map((movie) => (
            <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
            />
            ))}
        </div>
      </main>
    </>
  );
};

export default MainPage;