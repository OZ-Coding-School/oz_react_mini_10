import { useNavigate, useParams } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import { useEffect, useState } from "react";

function MovieDetail() {
  const posterURL = "https://image.tmdb.org/t/p/w500";
  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [id]);

  if (loading) {
    return <div>로딩 중입니다...</div>;
  }

  return (
    <div className={styles.container}>
      {movies && (
        <div className={styles.detailBox}>
          <img
            src={`${posterURL}${movies.poster_path}`}
            className={styles.detailImg}
            alt={movies.title}
          />
          <div className={styles.text}>
            <div className={styles.namepoint}>
              <h3 className={styles.name}>{movies.title}</h3>
              <p className={styles.point}>평점 : {movies.vote_average}</p>
            </div>
            <div className={styles.movietext}>{movies.overview}</div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default MovieDetail;
