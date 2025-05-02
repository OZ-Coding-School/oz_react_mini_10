import { useState } from 'react';
import movieListData from '../movieListData.json';
import MovieCard from './MovieCard';

export default function ListPage() {
    const [movies] = useState(movieListData.results);



    return (
        <div className="p-8 bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
            />
            ))}
        </div>
        </div>
    );
}
