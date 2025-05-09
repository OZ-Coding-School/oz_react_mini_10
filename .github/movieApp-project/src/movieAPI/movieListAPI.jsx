export const movieListData =  async () => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
    }
  };
  
    try{
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    const data = await res.json()
      return data.results.filter(movie => !movie.adult)
    } catch(err){
        console.error(err)
        return [];
    }
  }