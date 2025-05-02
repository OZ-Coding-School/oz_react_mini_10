    import React from 'react';
    import { Link } from 'react-router-dom';

    export default function MovieCard({ title, poster_path, vote_average, id }) {
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img
            src={`${baseUrl}${poster_path}`}
            alt={title}
            className="w-full h-72 object-cover"
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">⭐ {vote_average.toFixed(1)}</p>
            </div>
                    <Link to={`/movie/1`}>
                <button
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm transition-all"
                >
                    상세보기
                </button>
                </Link>
        </div>
        </div>
    );
    }
