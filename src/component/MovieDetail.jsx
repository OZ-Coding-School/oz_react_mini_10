import detail from "../../data/movieDetailData.json"

export const MovieDetail = () => {
    return (
        <>
        <ul>
            {
                <li className="flex h-100">
                    <img className="border border-[Coral] w-[400px] p-[2px]" src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} />
                    <div className="mx-8 my-6 space-y-4">
                        <div className="flex justify-center text-[25px] text-right gap-4">
                            <p className="font-black font-serif">{detail.title}</p>
                            <p className="font-black italic">평점 : {detail.vote_average}</p>
                        </div>
                            <p className="flex justify-center">{detail.genres.map((genres) =>(genres.name)).join(". ")}</p>
                            <hr />
                            <p className="flex justify-center text-lg text-justify">영화 줄거리 : {detail.overview}</p>
                    </div>
                </li>
            }
        </ul>
        </>
    )
}