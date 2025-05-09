import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id } = useParams(); // 라우터에서 전달된 영화 ID
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error("영화 상세 정보를 가져오지 못했습니다:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movieDetail) {
    return <div>로딩 중...</div>;
  }

  const { backdrop_path, poster_path, title, vote_average, genres, overview } = movieDetail;

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}`}
        alt={title}
        style={{ width: "300px" }}
      />
      <div>
        <h2>{title}</h2>
        <p>⭐ {vote_average}</p>
        <div>
          {genres?.map((genre, id) => (
            <span key={id} style={{ marginRight: "0.5rem" }}>{genre.name}</span>
          ))}
        </div>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
