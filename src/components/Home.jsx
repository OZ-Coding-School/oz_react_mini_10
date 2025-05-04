import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';
import { Link } from "react-router-dom";





function Home() {

    const [movies,setMovies] = useState([])

      useEffect(()=>{

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDVlYjcyMzNmYmQ1ZDQyMWU1ZGZkODkxMzZjZDIxMiIsIm5iZiI6MTc0NjI1MjE4OS44MzksInN1YiI6IjY4MTViMTlkMGM3ODNiODVmZTkwN2YwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KqsWPPvivWInRUx-3jc9ptyzddgYaKciT7aDe2U7HvI'
          }
        };
        
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setMovies(data.results)
          })
          .catch(err => console.error(err));


      },[])
      
    return (
      <>
     
          {<main>
                
                  <div className="flex flex-wrap ">
                  {movies.filter(movie => movie.adult === false)
                          .map((movie)=> {
                            return(
                              <Link to={`details/${movie.id}`}>
                              <MovieCard key={movie.id}
                                poster = {movie.poster_path}
                                title = {movie.title}
                                rating = {movie.vote_average}
                              
                              />
                            </Link>
                          )
                          })}
                </div>
             
          </main> }
        
     </>
    )
  }
  
  export default Home
  