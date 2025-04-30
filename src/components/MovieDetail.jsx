import MovieDetailData from '../data/movieDetailData.json'

function MovieDetail() {
    return (
        <section className="w-[1200px] h-[700px] flex flex-row gap-[50px] mx-auto mt-[50px]">
            <div className='w-[50%] h-[500px]  border '>
                <img className='w-full h-full'
                    src={`https://image.tmdb.org/t/p/w500/${MovieDetailData.backdrop_path}`} alt={MovieDetailData.title} />
            </div>
            <div className='w-[50%] '>
                <div className='flex border h-[50px] items-center justify-around'>
                    <h2 className="text-2xl font-bold ">{MovieDetailData.title}</h2>
                    <p className="mt-2 text-gray-600">평점: {MovieDetailData.vote_average}</p>
                </div>
                <div className='border h-[50px] items-center flex justify-center'>
                    장르: {MovieDetailData.genres.map(genre => genre.name).join(', ')}
                </div>
                <p className="border h-[400px]">{MovieDetailData.overview}</p>
            </div>
        </section>
    );
}

export default MovieDetail