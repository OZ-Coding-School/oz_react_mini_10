import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ posterPath, title, voteAverage, movieId }) {
    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const imageUrl = `${IMG_BASE_URL}${posterPath}`;

    return (
        <Link to={`/movie/${movieId}`} className='block w-full p-2'>
            <img className='w-full h-[400px] object-fill pb-[10px] rounded-t-[5px]' src={imageUrl} alt={`${title} Poster`} />
            <h3 className='font-semibold text-base'>{title}</h3>
            <div className='flex text-sm'>
                <p className='text-yellow-500 pr-[5px]'>★</p>
                <p>{voteAverage.toFixed(1)}</p>
            </div>
        </Link>
    );
}

export default MovieCard;