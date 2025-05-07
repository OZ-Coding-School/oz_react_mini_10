import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        });

        if (!res.ok) {
          console.error('API 요청 실패:', res.status, res.statusText);
          return;
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <p className="text-center mt-20 text-gray-500">영화를 찾을 수 없습니다.</p>;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`;
  const genreNames = movie.genres?.map(g => g.name).join(', ');

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-screen-lg mx-auto bg-white">
      <img src={imageUrl} alt={movie.title} className="w-full md:w-1/3 rounded-lg object-cover" />
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{movie.title}</h1>
        <p className="text-blue-600 font-semibold">⭐ 평점: {movie.vote_average}</p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">장르:</span> {genreNames || '장르 정보 없음'}
        </p>
        <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetail;