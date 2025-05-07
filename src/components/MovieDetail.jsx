import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/movieDetailData.json");
        if (!response.ok) {
          throw new Error("영화 상세 데이터를 불러오는데 실패했습니다");
        }

        const data = await response.json();

        // 데이터 형식에 따라 영화 찾기
        if (Array.isArray(data)) {
          const foundMovie = data.find((m) => m.id === parseInt(id));
          setMovie(foundMovie || null);
        } else if (data.results && Array.isArray(data.results)) {
          const foundMovie = data.results.find((m) => m.id === parseInt(id));
          setMovie(foundMovie || null);
        } else {
          setMovie(data);
        }
      } catch (err) {
        console.error("영화 상세 정보 로딩 오류:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const goBack = () => navigate("/");

  if (loading) return <div className="text-center p-4">로딩 중...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">오류: {error}</div>;
  if (!movie)
    return <div className="text-center p-4">영화를 찾을 수 없습니다</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        뒤로가기
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {movie.backdrop_path && (
          <div
            className="w-full h-64 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          />
        )}

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 포스터 이미지 */}
            {movie.poster_path && (
              <div className="w-full md:w-1/3 lg:w-1/4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-md w-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x750?text=이미지+없음";
                  }}
                />
              </div>
            )}

            {/* 영화 정보 */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

              {/* 평점 */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-xl mr-2">★</span>
                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
              </div>

              {/* 장르 */}
              <div className="mb-4">
                <h2 className="font-semibold mb-2">장르</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres &&
                    movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">줄거리</h2>
                <p className="text-gray-700">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
