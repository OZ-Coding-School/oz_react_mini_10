import movieListData from '../movieListData.json';
import { useState } from 'react';

export default function MovieDetail() {
    const [movie] = useState(movieListData.results[0]);
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10 flex flex-col md:flex-row gap-8">
        <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
            <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">Rating:</span> {movie.vote_average}
            </p>
            <p className="text-gray-800 mt-4 leading-relaxed">{movie.overview}</p>
        </div>
        </div>
    );
}
