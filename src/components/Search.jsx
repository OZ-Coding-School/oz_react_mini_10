import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SwiperMovieCard from "./SwiperMovieCard";
import { useSelector } from "react-redux";

export default function Search({
  swiperPages,
  isImageLoading,
  setisImageLoading,
}) {
  const API = import.meta.env.VITE_API_TOKEN;

  const [filteredData, setFilteredData] = useState([]);

  const [searchParms] = useSearchParams();
  const params = searchParms.get("movie");

  useEffect(() => {
    // debounce
    const debounceTimeer = setTimeout(() => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API}`,
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=ko&page=1`,
        options
      )
        .then((res) => res.json())
        .then((res) => setFilteredData(res.results))
        .catch((err) => console.error(err));

      // const newfilteredData = movieData.filter((el) => el.title.match(reg));
      // setFilteredData(newfilteredData);
    }, 1000);
    return () => clearTimeout(debounceTimeer);
  }, [params]);

  return (
    <>
      {swiperPages?.map((swiperPage) => (
        <SwiperMovieCard key={swiperPage} swiperPage={swiperPage} />
      ))}
      <ul className="flex justify-center flex-wrap gap-10 p-6 bg-gray-50">
        {filteredData.map((filterMovie) => (
          <li
            key={filterMovie.id}
            className="w-[300px]  bg-white rounded-2xl shadow-lg "
          >
            <Link to={`detail/${filterMovie.id}`} className="flex flex-col">
              {isImageLoading ? <Spiner></Spiner> : null}
              <img
                onLoad={() => setisImageLoading(false)}
                className="rounded-2xl w-full aspect-[2/3] object-cover"
                src={`https://image.tmdb.org/t/p/w500${filterMovie.poster_path}`}
                alt={filterMovie.title}
                style={{ display: isImageLoading ? "none" : " block" }}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {filterMovie.title}
                </h3>
                <p className="text-s text-gray-600">
                  ⭐ 평점: {filterMovie.vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
