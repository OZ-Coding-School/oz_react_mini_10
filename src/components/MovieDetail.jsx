import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
const MovieDetail = () => {
  const baseURL = "https://image.tmdb.org/t/p/w400";
  const {movieId} = useParams();
  const {data, loading, error} = useFetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`);
  
  if (loading) return <p>로딩 중</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <>
      {data && (
      <div className=" flex my-[20px] gap-[20px] w-[1000px] m-auto">
        <div className="w-[50%]">
          <img className="h-[600px]" src={baseURL + data.poster_path} alt="" />
        </div>
        <div className="flex flex-col w-[50%] gap-[20px] ">
          <div className=" flex g-[10px]">
            <h4 className=" w-[70%]">{data.title}</h4>
            <p className=" w-[30%]">{data.vote_average}</p>
          </div>
          <div className="">
            {data.genres.map((el) => {
              <span className="p-[4px] mr-[10px] bg-gray-100 rounded-[4px]" key={movieId}>{el.name}</span>
            })}
          </div>
          <div className="">
            <p>{data.overview}</p>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default MovieDetail;