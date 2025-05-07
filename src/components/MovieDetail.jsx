//movieDetailData.json을 이용해서 상세페이지 레이아웃 구성
//포함될 것 : backdrop_path, title, vote_average, genres, overview

//URL 에 있는 id parameter를 가져온다. /~~~~~/***  이렇게 생기면 ***을 가져옴
import { useParams } from "react-router-dom";

//useState는 요구사항, useEffect는 component가 화면에 나타날때 실행될 것
import { useEffect, useState } from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";

//상세페이지를 보여줄 component
export default function MovieDetail() {
  //위에서 가져온 useParams에서 id 값을 가져옴.
  const { id } = useParams();

  //데이터는 API 에서 가져와서 집어 넣어줄 것이기 떄문에 초기값은 null로 설정
  const [movie, setMovie] = useState(null);

  //component가 처음 나타나면 코드실행, 위치 중요
  useEffect(() => {
    const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]); // id 바뀔 때마다 새로 fetch
  // 🔥 null일 땐 로딩 메시지로 대체
  if (!movie) {
    return <div>로딩중...</div>;
  }
  const { backdrop_path, title, vote_average, genres, overview } = movie;

  return (
    <div className="movie-detail">
      <img src={baseUrl + backdrop_path} alt={title} />
      <div className="movie-view">
        <div className="movie-header">
          <h1>{title}</h1>
          <p>평점: {vote_average}</p>
        </div>
        <p className="movie-genres">장르: {genres.map((genre) => genre.name).join(",")}</p>
        <p className="movie-overview">{overview}</p>
      </div>
    </div>
  );
}
