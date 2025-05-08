import React from 'react'

export default function MovieCard({ movie }) {
  return (
    <div className='gray-border rounded-lg flex flex-col justify-center'>
      <div className='relative aspect-[2/3] overflow-hidden rounded-t-lg group'>
        {movie.poster_path ? (
          <img
            className='w-full h-full object-cover group-hover:brightness-50 transition'
            alt={`${movie.title} 포스터 이미지`}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ) : (
          <div className='w-full h-full text-center bg-white flex items-center justify-center group-hover:brightness-50 transition'>
            No Image
          </div>
        )}
        <button className='opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" text-white px-3 py-1 rounded-md border-white border-[1px] group-hover:opacity-90 transition'>
          상세 보기
        </button>
      </div>
      <div className='p-3'>
        <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>{movie.title}</div>
        <div className='text-sm text-[gray]'>⭐️ {movie.vote_average}점</div>
      </div>
    </div>
  )
}
