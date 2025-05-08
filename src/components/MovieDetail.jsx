// components/MovieDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TOKEN } from '../data/const' 

export default function MovieDetail() {
  const { id } = useParams(); // URL에서 영화 id 가져오기
  const [movie, setMovie] = useState(null);

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full max-w-md mx-auto rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-yellow-400 mb-2">⭐ {movie.vote_average}</p>
      <p className="mb-2 text-sm text-gray-300">{movie.release_date}</p>
      <p>{movie.overview}</p>
      <p className="mt-2 text-sm text-gray-400">
        장르: {movie.genres.map((g) => g.name).join(", ")}
      </p>
    </div>
  );
}
