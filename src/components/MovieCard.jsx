const MovieCard =  ({ movieList }) => {
  console.log(movieList)
  return (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      

      <img
        src={`https://image.tmdb.org/t/p/w500${movieList.poster_path}`}
        alt={movieList.title}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3>{movieList.title}</h3>
      <p><strong>평점:</strong> {movieList.vote_average}</p>
      <p><strong>개봉일:</strong> {movieList.release_date}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>{movieList.overview}</p>
    </div>
  );
};

export default MovieCard;
