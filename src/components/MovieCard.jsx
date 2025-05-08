
import { useNavigate } from "react-router-dom"
import styles from "./MovieCard.module.css"
import { useEffect, useState } from "react"
function MovieCard ({data}) {
    const imgURL = "https://image.tmdb.org/t/p/w400"
    const Nav = useNavigate() 
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        const fetchMovies = async ()=>{
            setLoading(true)

            try{
                const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR', {
                    headers: {
                      accept: 'application/json',
                      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, 
                    },
                  });
                  const data = await res.json()
                  const filterMovies = data.results.filter(Movies=>Movies.adult === false)
                  setMovies(filterMovies)
            } catch(error){
                console.error('데이터를 가져오는중 에러 발생함', error)
             } finally{setLoading(false)}
            
        }
        fetchMovies()
    },[])
    if (loading) return <div>로딩 중...</div>;
    return(
<>
<div className={styles.CardListBox}>
    {movies.map((a,i)=>{

        return(
        <div className={styles.Card} key={i} onClick={() => Nav(`/detail/${a.id}`)}>
            <img src={`${imgURL}${a.poster_path}`}className={styles.CardImg}/>
            <div className={styles.CardSubData}>
                <h3 className={styles.CardName}>{a.title}</h3> 
                <p className={styles.CardPoint}> 평점 : {a.vote_average}</p>
            </div>
        </div>
        )
    })}
</div>
</>
    )
}
export default MovieCard