import { useNavigate } from "react-router-dom"
import data from "../data/movieDetailData.json"
import styles from "./MovieDetail.module.css"
function MovieDetail () {
const posterURL = 'https://image.tmdb.org/t/p/w500'

    return(
    <div className={styles.container}>
    <div className={styles.detailBox}>
        <img src={`${posterURL}${data.backdrop_path}`} className={styles.detailImg}/>
        <div className={styles.text}>
            <div className={styles.namepoint}>
                <h3 className={styles.name}>{data.title}</h3>
                <p className={styles.point}>평점 : {data.vote_average}</p>
            </div>
            <div className={styles.tag}> 장르 : {data.genres.map((a,i)=>{
                return <p className={styles.tagtext}>{a.name}</p>
            })}</div>
            <div className={styles.movietext}>{data.overview}</div>
        </div>

    </div>
    </div>
)

}
export default MovieDetail