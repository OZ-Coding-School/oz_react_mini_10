import { useNavigate } from "react-router-dom";

const MovieCard = ({movieData}) => {
  const baseURL = "https://image.tmdb.org/t/p/w400";
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/details');
  };

  return (
    <div class="mx-[20px] my-[20px] cursor-pointer" onClick={handleClick}>
      <div class="rounded-[6px] overflow-hidden">
        <img class="h-[330px]" src={baseURL + movieData.poster_path} alt="영화 포스터" /> 
      </div>
      <div class="mt-[10px]">
        <div class="text-center font-semibold">
          <h4>{movieData.title}</h4>
        </div>
        <div class="text-[15px] text-center">
          <p>{movieData.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;