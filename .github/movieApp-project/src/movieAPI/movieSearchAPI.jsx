export const movieSearch = async (query) => {
if (!query) return []

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
    }
  };
  
  try{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&query=${encodeURIComponent(query)}&language=ko-KR&page=1`, options)
    const data = await res.json()
    return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};