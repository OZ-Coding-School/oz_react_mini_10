import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function MovieDetail() {
    const {id} = useParams()
    const [movies,setMovies] = useState(null)

    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDVlYjcyMzNmYmQ1ZDQyMWU1ZGZkODkxMzZjZDIxMiIsIm5iZiI6MTc0NjI1MjE4OS44MzksInN1YiI6IjY4MTViMTlkMGM3ODNiODVmZTkwN2YwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KqsWPPvivWInRUx-3jc9ptyzddgYaKciT7aDe2U7HvI'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMovies(data)
            })
            .catch(err => console.error(err));
    },[id])

        if (!movies) return <div>Loading...</div>;

    return(
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt="movie poster" />
            <h1 className='text-[pink]'>{movies.title}</h1>
            <h3>{movies.vote_average}</h3>
            {movies.genres.map((genre)=>{
                return <li key={genre.id}>{genre.name}</li>
            
            })}
            <h3>{movies.overview}</h3>
        </div>
    )
}

export default MovieDetail;