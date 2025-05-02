import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, title, posterPath, rating }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <Link to={`/movie/${id}`} className='block w-full p-2'>
            <img className='w-full h-[400px] object-cover pb-[10px] rounded-t-[10px]' src={`${baseUrl}${posterPath}`} alt={title} />
            <h3 className='font-semibold'>{title}</h3>
            <div className='flex text-xs'>
                <p className='text-yellow-500 pr-[5px]'>★</p>
                <p> {rating.toFixed(1)}</p>
            </div>
        </Link>
    );
};

export default MovieCard;