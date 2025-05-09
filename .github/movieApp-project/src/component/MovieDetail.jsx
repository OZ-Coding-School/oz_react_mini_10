import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchMovieDetail from '../movieAPI/movieDetailAPI';

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
    //useEffect로 렌더링 이후에 api를 요청, [id]가 있으니 id가 업데이트 될 때마다 실행
    //async가 있으면 항상 프로미스를 반환하는 함수가 됨. awati는 요청이 끝날 때까지 기다렸다가 값을 저장.
    //가져온 데이터는 setMovie(data)를 통해 상태에 저장.
    if (!movie) return <div>로딩 중...</div>

    return(
      <div className="flex justify-center items-center bg-gray-50">
        <div className="flex md:flex-row gap-8 p-8 max-w-5xl bg-white shadow-xl rounded-lg">
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