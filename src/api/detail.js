export function detail(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    const options = {//옵션
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };
//url 요청하기 주소, options 요청에 대한 설정값
return fetch(url, options) // 데이터 빌려줘줘
    //요청주소에 받아온 데이터들 우리가 사용할 수 있는 데이터로 바꿔줌줌
  .then(res => res.json()) //json 데이터가 대서 
  .catch(err => console.error(err));
}


//filter는 배열을 순회하면서 요소 중 조건에 맞는 요소만 찾아 새로운 배열로 반환.