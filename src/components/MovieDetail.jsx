import { useState } from 'react';
import movieDetailData from '../../public/data/movieDetailData.json'
const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(movieDetailData);
  const baseURL = "https://image.tmdb.org/t/p/w400";

  return (
    <div class=" flex my-[20px] gap-[20px] w-[1000px] m-auto">
      <div class="w-[50%]">
        <img class="h-[600px]" src={baseURL + movieDetail.poster_path} alt="" />
      </div>
      <div class="flex flex-col w-[50%] gap-[20px] ">
        <div class=" flex g-[10px]">
          <h4 class=" w-[70%]">{movieDetail.title}</h4>
          <p class=" w-[30%]">{movieDetail.vote_average}</p>
        </div>
        <div class="">
          {movieDetail.genres.map((el) => <span class="p-[4px] mr-[10px] bg-gray-100 rounded-[4px]">{el.name}</span>)}
        </div>
        <div class="">
          <p>{movieDetail.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;