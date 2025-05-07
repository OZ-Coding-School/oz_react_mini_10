import { Link, useSearchParams } from 'react-router-dom'
import useFetch from '@hooks/useFetch'
import MovieCard from '@components/MovieCard'
import { MovieCardSkeleton } from '@components/SkeletonUI'
import useDebounce from '@hooks/useDebounce'

export default function Search() {
  const [searchParams] = useSearchParams()
  const param = searchParams.get('query')
  const debounceParam = useDebounce(param, 1000)

  const { data, loading } = useFetch({
    url: `https://api.themoviedb.org/3/search/movie?query=${debounceParam}&language=ko`,
  })

  // 디바운스되기 전에 로딩 UI가 불러오도록 하는 플래그
  const isDebounce = debounceParam !== param

  // 성인 영화를 제외하고 가져오도록 필터링
  const movie = data?.results?.filter((el) => !el.adult) || []

  // 검색 결과
  return (
    <div className='max-w-[1200px] mx-auto px-4 pt-6'>
      <div className='w-full h-full'>
        {loading || isDebounce ? (
          // 로딩중
          <p className='text-center'>검색 결과를 불러오는 중...</p>
        ) : // 결과가 있을 경우
        movie && movie.length > 0 ? (
          <>
            <h2 className='text-2xl mb-4'>
              "<b>{debounceParam}</b>" 검색 결과
            </h2>
            <p>{movie.length}개의 영화가 검색되었습니다.</p>
            <div className='list-container'>
              {movie.map((el) => (
                <Link key={el.id} to={`/detail/${el.id}`}>
                  <MovieCard movie={el} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          // 결과가 없을 경우
          <>
            <h2 className='text-2xl mb-4'>
              "<b>{debounceParam}</b>" 검색 결과
            </h2>
            <p className='text-center mt-10'>검색 결과가 없습니다.</p>
          </>
        )}
      </div>
    </div>
  )
}
