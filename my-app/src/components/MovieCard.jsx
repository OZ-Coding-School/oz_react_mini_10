import React from 'react'

export default function MovieCard({ movie }) {
  return (
    <div className='gray-border rounded-lg flex flex-col justify-center'>
      <img
        className=' h-[150px] object-cover mb-1 mx-auto  rounded-t-lg'
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
      />
      <div className='py-3 px-2'>
        <div>{movie.title}</div>
        <div className='text-sm text-[gray]'>{movie.vote_average}점</div>
      </div>
    </div>
  )
}
