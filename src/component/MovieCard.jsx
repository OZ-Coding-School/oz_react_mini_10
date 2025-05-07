import data from "../../data/movieListData.json"
import { useNavigate } from "react-router-dom";

export const MovieCard = ({}) => {
    const navigate = useNavigate();
    return( 
        <>
        <ul className="flex flex-wrap flex-row justify-center gap-5" onClick={() => navigate("/detail")}>
            {data.results.map((movie, index) =>(
                <div key={index} className="flex-col border border-[Coral] p-2 w-60">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <p>{movie.title}</p>
                    <p>평점 : {movie.vote_average}</p>
                    <hr />
                </div>
            ))}
        </ul>
        </>
    )
}

