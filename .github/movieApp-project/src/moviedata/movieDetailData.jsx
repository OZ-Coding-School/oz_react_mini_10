const fetchMovieDetail = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
    }
  };

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("영화 상세정보 불러오기 실패:", err);
    return null;
  }
};

export default fetchMovieDetail;