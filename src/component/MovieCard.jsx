import { useNavigate } from "react-router-dom";
import {popular} from "../api/popular"
import { useEffect, useState } from "react";

export const MovieCard = ({}) => {
    const navigate = useNavigate();
    popular();
    const [movieData, setMovie] = useState([]); //useSTate 실제로 렌더링 되는 돔과 가상돔을 비교하기 위해서 사용함.
    useEffect(() => {
        //steMovie는 상태를 변경하는 함수!
        //.then 사용은 비동기 함수를 동기 함수 처럼 사용 할 때 사용함
        //.thendms popular함수의 반환값을 가지고 수행한다.
        //.then의 res는 popular함수의 반환값이 저장 되어있다.
        //  () => {}는 화살표 함수로, then에 전달되어 수행된다.
        let data = popular().then(res => setMovie(res))
    }, []);
    
    return( 
        <>
        <ul className="flex flex-wrap flex-row justify-center gap-5">
            {movieData.map((movie, index) =>(
                <div key={index} className="flex-col border border-[Coral] p-2 w-60"  onClick={() => navigate(`/detail/${movie.id}`)}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <p>{movie.title}</p>
                    <hr />
                    <p>평점 : {movie.vote_average}</p>
                    <hr />
                </div>
            ))}
        </ul>
        </>
    )
}

