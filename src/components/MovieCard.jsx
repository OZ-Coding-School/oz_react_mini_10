import React from "react";
import { useNavigate } from "react-router-dom"; 

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ id,title, posterPath, voteAverage }) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    console.log('Navigating to:', `/detail/${id}`);
    navigate(`/detail/${id}`); 
  };

  return (
    <div style={styles.card} onClick={handleClick} role="button">
      <img
        src={`${IMAGE_BASE_URL}${posterPath}`}
        alt={title}
        style={styles.image}
      />
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.rating}>⭐ {voteAverage}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    cursor: "pointer", 
  },
  image: {
    width: "100%",
    display: "block",
  },
  title: {
    fontSize: "1rem",
    margin: "10px",
  },
  rating: {
    fontSize: "0.9rem",
    color: "#888",
    margin: "0 10px 10px 10px",
  },
};

export default MovieCard;


