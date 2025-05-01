<!-- PR 제목 예시:
[missionX] X단계 미션 구현 - 000/0팀
-->

## 구현 사항
- movieListData.json을 이용해 메인 페이지(App.jsx)에서 영화 목록을 카드 형태로 보여줌
- MovieCard.jsx를 만들어 각 영화의 포스터, 제목, 평점을 렌더링
- react-router-dom을 설정하여 영화 클릭 시 상세 페이지로 이동되도록 구현
- movieDetailData.json을 가져와 상세 페이지(MovieDetail.jsx)에 포스터, 제목, 평점, 장르, 줄거리 출력
- TailwindCSS로 전체 레이아웃 및 반응형 UI 적용
- Layout 컴포넌트와 NavBar 컴포넌트를 만들어 상단 고정 네비게이션 구성

## 어려웠던 점
- 더미 데이터를 import해서 상태로 관리해야 하는 부분이 처음에 헷갈렸음
- poster_path와 backdrop_path가 없을 때 대체 이미지 처리 고민
- map(), join() 같은 배열 메서드가 헷갈려서 공식문서를 보면서 적용
- 라우터에서 useParams()로 id를 받아서 동적으로 페이지를 띄우는 흐름을 이해하는 데 시간이 걸림
- Git에서 브랜치와 push 관련 오류가 나서 터미널 명령어를 찾아가며 해결

## 구현 이미지
- 
