import { Link } from "react-router-dom";

export default function MovieCard({ movieData }) {
  return (
    <ul className="flex justify-center flex-wrap gap-10 p-6 bg-gray-50">
      {movieData.map((el) => (
        <li key={el.id} className="w-[300px]  bg-white rounded-2xl shadow-lg ">
          <Link to={`detail`} className="flex flex-col">
            <img
              className="rounded-2xl w-full aspect-[2/3] object-cover"
              src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
              alt={el.title}
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {el.title}
              </h3>
              <p className="text-s text-gray-600">
                ⭐ 평점: {el.vote_average.toFixed(1)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
