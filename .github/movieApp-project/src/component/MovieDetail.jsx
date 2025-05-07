import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchMovieDetail from '../moviedata/movieDetailData';

const MovieDetail = () => {
    const [movie, setMoive] = useState(null)
    const {id} = useParams()

    useEffect(() => {
      const getMovieDetail = async () => {
        const data = await fetchMovieDetail(id)
        setMoive(data);
      };
      getMovieDetail();
    },[id])

    if (!movie) return <div>로딩 중...</div>

    return(
      <div className='flex justify-center items-center max-w-200 max-h-200'>
        <div className="flex gap-8 p-8">
        {/* 왼쪽: 포스터 */}
        <div className="flex-shrink-0 w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      
        {/* 오른쪽: 영화 정보 */}
        <div className="flex flex-col justify-start w-2/3">      
          {/* 제목과 평점 */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <span className="text-lg font-semibold">
            ★ {movie.vote_average}
            </span>
          </div>
      
          {/* 장르 */}
          <div className="mb-4">
            <span className="text-gray-500">장르: </span>
            <span className="font-medium">
             {movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : '정보 없음'}
            </span>
          </div>
      
          {/* 줄거리 */}
          <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
    );
  };

  export default MovieDetail;