import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = ({ movie }) => {
  return (
    <div style={styles.container}>
      <img
        src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        style={styles.image}
      />
      <h1>{movie.title}</h1>
      <p>⭐ {movie.vote_average}</p>
      <div style={styles.genres}>
        {movie.genres.map((genre) => (
          <span key={genre.id} style={styles.genre}>
            {genre.name}
          </span>
        ))}
      </div>
      <p style={styles.overview}>{movie.overview}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  genres: {
    margin: "10px 0",
  },
  genre: {
    display: "inline-block",
    background: "#eee",
    padding: "5px 10px",
    borderRadius: "20px",
    margin: "0 5px",
  },
  overview: {
    marginTop: "20px",
    lineHeight: "1.5",
  },
};

export default MovieDetail;

