import MovieDetailData from '../data/movieDetailData.json'


function MovieDetail() {
    const {poster_path, title, vote_average, genres, overview} = MovieDetailData


    return(
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie poster" />
            <h1 className='text-[pink]'>{title}</h1>
            <h3>{vote_average}</h3>
            {genres.map((genre)=>{
                return <li key={genre.id}>{genre.name}</li>
            
            })}
            <h3>{overview}</h3>
        </div>
    )
}

export default MovieDetail;