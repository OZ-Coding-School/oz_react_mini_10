
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import movieDetail from "../data/movieDetailData.json";

const MovieDetail = () => {
  const {backdrop_path, poster_path, title, vote_average, genres, overview } = movieDetail;

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}`}
        alt={movieDetail.title}
        style={{ width: "300px" }}
      />
      <div>
        <h2>{MovieDetail.title}</h2>
        <p>⭐ {movieDetail.vote_average}</p>
        <div>
          {genres.map((genres, id) => (
            <span key={id} style={{ marginRight: "0.5rem" }}>{genres.name}</span>
          ))}
        </div>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
