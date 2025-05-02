//MovieCard 컴포넌트를 통해 영화를 렌더링한다.
//MovieCard 컴포넌트에는 포스터, 제목, 평점 정보가 있어야한다.
//이미지 기본 url = https://image.tmdb.org/t/p/w500

import { useNavigate } from "react-router-dom";
//movieListData.json에는 포스터 전체 주소가 없기때문에 밑에서 쓸수가 없음
//그래서 이미지주소를 불러오기 위해서 baseUrl을 선언해줌
const baseUrl = "https://image.tmdb.org/t/p/w500";

//직접렌더링하는게 아니고 App.jsx에서 받아서 렌더링 하기때문에
//import movieListData.json 필요없음 , 단순 props 로 전달받을뿐
export default function MovieCard({ poster_path, title, vote_average }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card" onClick={() => navigate("/details")}>
      {/* 속성값에 자바스크립트 넣어주려면 중괄호, {baseUrl + {poster_path}} 이렇게는 안씀 에러남 */}
      {/* {poster_path} 이걸 또 하나의 객체로 인식함 에러. */}
      {/* alt= {title} 이건 접근성때문에 써줄뿐 안써도 무방 */}
      <img src={baseUrl + poster_path} alt={title} />
      <h3>{title}</h3>
      <p>평점: {vote_average}</p>
    </div>
  );
}

//위에꺼랑 똑같음//
// function MovieCard({poster_path,title, vote_average }) {
//     return (
// <div className="movie-card">
// <img src= {baseUrl + poster_path} alt = {title} />
// <h3>{title}</h3>
// <p>평점: {vote_average}</p>
// </div>
// );
// }

// export default MovieCard;
