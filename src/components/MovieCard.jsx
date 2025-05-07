import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${movie.id}`)}
      className="cursor-pointer bg-[#1e293b] rounded-lg shadow-md p-4 hover:bg-[#334155] transition"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
      <p className="text-yellow-400">⭐ {movie.vote_average}</p>
    </div>
  );
}