import React, { useEffect, useState } from 'react';
import MovieDetail from "../components/MovieDetail"; 
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const api = import.meta.env.VITE_TMDB_ACCESS_TOKEN
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  console.log('id:', id);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api}`
        }
      };

      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options);
      
      if (response.ok) {
        const data = await response.json();
        setMovie(data); 
      } else {
        console.error('에러');
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <p>상세정보가 없습니다.</p>; 
  }

  return (
    <div>
      <MovieDetail movie={movie} />
    </div>
  );
};

export default DetailPage;



