import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { detail } from "../api/detail";



export const MovieDetail = () => {
    const [movieDetail, setDetail] = useState([])

    const {movieId} = useParams()
    //useParams는 주소창에 있는 값 가져오기
    //주소창에 있는 값은 router에서 :변수명 으로 설정정
    
    //useEffect는 렌더링이 될 때마다 특정 작업을 실행할 수 있도록 해줌줌
    useEffect(() => {
        let data = detail(movieId).then(res => setDetail(res))
    }, [movieId])

    return (
        <>
        <ul>
            {
                <li className="flex h-100">
                    <img className="border border-[Coral] w-[400px] p-[2px]" src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} />
                    <div className="mx-8 my-6 space-y-4">
                        <div className="flex justify-center text-[25px] text-right gap-4">
                            <p className="font-black font-serif">{movieDetail.title}</p>
                            <p className="font-black italic">평점 : {movieDetail.vote_average}</p>
                        </div>
                            <p className="flex justify-center">{movieDetail.genres?.map((genres) =>(genres.name)).join(". ")}</p>
                            <hr />
                            <p className="flex justify-center text-lg text-justify">영화 줄거리 : {movieDetail.overview}</p>
                    </div>
                </li>
            }
        </ul>
        </>
    )
}   
