import { useParams } from 'react-router-dom'
import { MovieDetailSkeleton } from '@components/SkeletonUI'
import useFetch from '@hooks/useFetch'

export function MovieDetail() {
  const params = useParams()
  const movieId = params.id
  const { data: movieData, loading } = useFetch({
    url: `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
  })

  if (loading || !movieData) {
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
