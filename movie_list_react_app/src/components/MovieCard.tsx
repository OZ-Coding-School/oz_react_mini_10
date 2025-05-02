import { Link } from 'react-router-dom';

export default function MovieCard({ id, title, poster, rating }: {
    id: number;
    title: string;
    poster: string;
    rating: number;
}) {
    return (
        <Link to={`/details/${id}`}>
            <div className="bg-blue-50 shadow-md rounded-lg overflow-hidden hover:scale-105 transition">
                <div className="flex justify-center items-center h-96 bg-white">
                    <img
                        src={poster}
                        alt={title}
                        className="max-h-[90%] object-contain"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-gray-700 font-bold">⭐ {rating.toFixed(1)}</p>
                </div>
            </div>
        </Link>
    );
}