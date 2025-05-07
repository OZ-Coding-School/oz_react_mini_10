import { useState, useEffect } from 'react'
import MovieCard from '@components/MovieCard'
import { Link } from 'react-router-dom'
import { MovieCardSkeleton } from '@components/SkeletonUI'
import ImageSlide from '../components/ImageSlide'

export default function Main() {
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState([])
  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN

  useEffect(() => {
    const fetchMovieAPI = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=KR',
          options,
        )
        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.')
        }
        const data = await response.json()
        const filteredMovie = data.results.filter((el) => !el.adult)
        setMovie(filteredMovie)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieAPI()
  }, [API_TOKEN])

  return (
    <>
      <div className='w-full h-full'>
        <ImageSlide movie={movie} />
        <div className='list-container'>
          {loading
            ? Array.from({ length: 20 }).map((_, index) => <MovieCardSkeleton key={index} />)
            : movie.map((el) => (
                <Link key={el.id} to={`/detail/${el.id}`}>
                  <MovieCard movie={el} />
                </Link>
              ))}
        </div>
      </div>
    </>
  )
}
