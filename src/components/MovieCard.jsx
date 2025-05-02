
import { useNavigate } from "react-router-dom"
import styles from "./MovieCard.module.css"
function MovieCard ({data}) {
    const imgURL = "https://image.tmdb.org/t/p/w400"
    const Nav = useNavigate() 
    return(
<>
<div className={styles.CardListBox}>
    {data.results.map((a,i)=>{

        return(
        <div className={styles.Card} key={i} onClick={()=>{Nav('/detail')}}>
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