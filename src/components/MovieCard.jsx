import { useNavigate } from "react-router-dom";

export default function MovieCard({ poster_path, title, vote_average }) {
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  return (
    <div className="w-full sm:w-[250px] lg:w-[220px] h-[350px] bg-black text-white shadow-xl rounded-lg overflow-hidden relative cursor-pointer">
      <img 
        src={baseURL + poster_path} 
        alt={title} 
        className="w-full h-[80%] object-cover border-b-4 border-yellow-500"
        onClick={() => navigate('/details')}
      />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold neon-text">{title}</h2>
        <p className="text-sm text-gray-300">⭐ {vote_average}</p>
      </div>
    </div>
  );
}
