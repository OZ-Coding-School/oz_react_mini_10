    import React from "react";
    import { Link } from "react-router-dom";

    const MovieCard = ({ title, posterPath, voteAverage, id }) => {
        return (
            <Link to={`/details/${id}`}>
                <div className="flex flex-col w-[200px] h-auto overflow-hidden border-solid border-2 border-gray-300">
                    <img className="w-full h-[300px] object-cover"
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                    />
                    <div className="p-2">
                    <h2 className="text-base font-semibold truncate">{title}</h2>
                    <p className="text-sm text-gray-600">평점: {voteAverage !== undefined ? voteAverage.toFixed(1) : 'N/A'}</p>
                    </div>
                </div>
            </Link>    
        );
    };

    export default MovieCard;