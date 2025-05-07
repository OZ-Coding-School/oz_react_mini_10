import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MovieDetailSkeleton } from './SkeletonUI'

export function MovieDetail() {
  const params = useParams()
  const movieId = params.id
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [movieData, setMovieData] = useState(null)

  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN
  useEffect(() => {
    const fetchMovieDetail = async (id) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko`,
          options,
        )
        if (!response.ok) {
          navigate('/error')
        }
        const data = await response.json()
        setMovieData(data)
      } catch (error) {
        console.error('영화 상세 정보를 불러오지 못했습니다:', error)
        navigate('/error')
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      fetchMovieDetail(movieId)
    }
  }, [movieId, API_TOKEN])

  if (!movieData && loading) {
    return <MovieDetailSkeleton />
  }

  return (
    <>
      <div className='md:p-10 h-full'>
        <div className='flex flex-col h-full bg-white md:flex-row md:space-x-6 md:rounded-lg md:mx-auto max-w-[1200px] md:gray-border md:detail-card'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
            className='w-full md:rounded-l-lg object-cover md:w-[50%]'
          />
          <div className='flex flex-col p-6 gap-3 md:px-4 md:py-6'>
            <div className='text-4xl'>{movieData.title}</div>
            <div className='text-gray-400 whitespace-nowrap'>{movieData.vote_average}점</div>
            <div className='border-b-2 pt-2 pb-7'>
              <b>장르</b> | {movieData.genres.map((el) => el.name).join(', ')}
            </div>
            <div className='pt-3'>{movieData.overview}</div>
          </div>
        </div>
      </div>
    </>
  )
}
