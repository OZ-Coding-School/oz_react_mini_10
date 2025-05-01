import { Link } from 'react-router-dom';

function MovieCard({ id, title, poster_path, vote_average }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link to={`/details/${id}`}>
      <div className="w-48 bg-white rounded-lg shadow-md overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-[320px] object-cover" />
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{title}</h3>
          <p className="text-xs text-gray-600">평점: {vote_average}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;