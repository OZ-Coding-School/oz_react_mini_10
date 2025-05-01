
import movieListData from '../data/movieListData.json'
import React, { useState } from "react";
import MovieCard from './MovieCard';
import { Link } from "react-router-dom";





function Home() {

    const [movies,setMovies] = useState(movieListData.results)
  
    return (
      <>
    
          <main>
                
                  <div className="moviecard">
                  {movies.map((movie,id)=>(
                    <Link to ={`/details/${movie.id}`}>
                      <MovieCard
                      key={id}
                      title = {movie.title}
                      poster = {movie.poster_path}
                      rating = {movie.vote_average}
                      />
                    </Link>
                  ))}
                </div>
             
          </main>
        
     </>
    )
  }
  
  export default Home
  