import { baseUrl } from "@constants/baseUrl";
import { cn } from "@utils/cn";
import { useState } from "react";
import { Link } from "react-router";

const MovieCard = ({ className, id, poster_path, title, vote_average }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link to={`/details/${id}`}>
      <div
        className={cn(
          "card-size relative flex flex-col justify-between rounded-xl duration-100 hover:scale-102 hover:shadow-md",
          className,
        )}
        onMouseLeave={() => setIsHover(false)}
        onMouseMove={() => setIsHover(true)}
      >
        <img
          alt={title}
          className={cn(
            "card-size absolute z-10 rounded-xl grayscale-100 duration-200",
            {
              "grayscale-0": isHover,
            },
          )}
          src={`${baseUrl}${poster_path}`}
        />
        <div
          className={cn(
            "relative z-20 hidden h-full flex-col justify-end text-white duration-200",
            {
              flex: isHover,
            },
          )}
        >
          <div className="rounded-xl bg-[rgba(0,0,0,0.4)] p-4 backdrop-blur-2xl">
            <div className="text-lg font-bold">{title}</div>
            <div className="text-sm">평점 : {vote_average}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
