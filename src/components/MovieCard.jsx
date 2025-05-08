import { useNavigate } from "react-router-dom";

const MovieCard = ({movieData, movieID}) => {
  const baseURL = "https://image.tmdb.org/t/p/w400";
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/details/${movieID}`);
  };

  return (
    <div className="mx-[20px] my-[20px] cursor-pointer" onClick={handleClick}>
      <div className="rounded-[6px] overflow-hidden">
        <img className="w-[306px]" src={baseURL + movieData.poster_path} alt="영화 포스터" /> 
      </div>
      <div className="mt-[10px]">
        <div className="text-center font-semibold">
          <h4>{movieData.title}</h4>
        </div>
        <div className="text-[15px] text-center">
          <p>{movieData.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;