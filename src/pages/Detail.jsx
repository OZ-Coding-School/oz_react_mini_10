import React, { useState, useEffect } from "react";
import MovieDetail from "../components/MovieDetail";
import movieDetailData from "../movieDetailData.json";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setMovie(movieDetailData);
  }, []);

  return (
    <div>
      {movie ? <MovieDetail movie={movie} /> : <p>Loading...</p>}
    </div>
  );
};

export default DetailPage;
