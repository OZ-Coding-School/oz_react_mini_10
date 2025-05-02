import React from 'react'
import movieDetailData from '@assets/data/movieDetailData.json'

export function MovieDetail() {
  // const params = useParams()
  // const movieData = movieDetailData.find((el) => el.id === Number(params.id))
  // const genres = movieData.genres.map((el) => el.name)
  const genres = movieDetailData.genres.map((el) => el.name)

  return (
    <div className='md:p-5'>
      <div className='flex flex-col md:flex-row md:rounded-lg md:mx-auto max-w-[1200px]'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetailData.backdrop_path}`}
          className='w-full md:rounded-l-lg object-cover md:w-[50%]'
        />
        <div className='flex flex-col p-6 gap-3 md:p-4'>
          <div className='flex items-end'>
            <div className='text-4xl mr-3'>{movieDetailData.title}</div>
            <div className='text-gray-400'>{movieDetailData.vote_average}점</div>
          </div>
          <div className='border-b-2 pt-2 pb-7'>장르 : {genres.join(', ')}</div>
          <div className='pt-3'>{movieDetailData.overview}</div>
        </div>
      </div>
    </div>
  )
}
