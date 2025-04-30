import React from "react"

function MovieCard({title, poster, rating}) {
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="movie poster" />
            <h2>{title}</h2>
            <p>평점: {rating}</p>
        </div>
    )
}

export default MovieCard;