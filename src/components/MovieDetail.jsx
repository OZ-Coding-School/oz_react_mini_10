//movieDetailData.json을 이용해서 상세페이지 레이아웃 구성
//포함될 것 : backdrop_path, title, vote_average, genres, overview

//App.jsx에서 건네받지 않음. 직접 데이터 공수해와야함
import movieDetailData from "../assets/movieDetailData.json";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  //props를 받아오는것과 직접 import 한거의 차이
  const { backdrop_path, title, vote_average, genres, overview } = movieDetailData;

  return (
    <div className="movie-detail">
      <img src={baseUrl + backdrop_path} alt={title} />
      <div className="movie-view">
        <div className="movie-header">
          <h1>{title}</h1>
          <p>평점: {vote_average}</p>
        </div>
        <p className="movie-genres">장르: {genres.map((genre) => genre.name).join(",")}</p>
        <p classNmae="movie-overview">{overview}</p>
      </div>
    </div>
  );
}
