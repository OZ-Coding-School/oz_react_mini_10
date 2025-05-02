import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "./Skeleton";

export default function MovieDetail() {
  const params = useParams();
  // console.log(params.id);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API = import.meta.env.VITE_API_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API}`,
    },
  };
  const fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?language=ko`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  {
    if (isLoading) return <Skeleton />;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <img
          className="w-full md:w-[600px] rounded-xl shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          alt={data.title}
        />
        <div className="flex flex-col gap-4 border border-gray-300 p-6 rounded-xl shadow-md bg-white w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              {data.title}
            </h1>
            <div className="text-xl text-gray-600 mt-2 md:mt-0">
              평점 : {data.vote_average}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            장르: {data.genres?.map((el) => el.name).join(", ")}
          </div>
          <div className="text-base text-gray-700 leading-relaxed">
            {data.overview}
          </div>
        </div>
      </div>
    </>
  );
}
