import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonUi from './DetailSkeleton.jsx';


function MovieDetail() {

    const { movie_id } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const movieDetailLink = `https://api.themoviedb.org/3/movie/${movie_id}?language=ko`;
    const API = import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN;



    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API}`
        }
    };

    const getMovieDetail = async () => {
        try {
            const res = await axios.get(movieDetailLink, options);
            setMovieDetail(res.data);
        }
        catch {
            alert('응 못받아옴 ㅅㄱ');
        }
    }

    useEffect(() => {
        getMovieDetail();
    }, [movie_id]);

    
    if (!movieDetail) {
        return <SkeletonUi />;
    }


    return (
        <section className="w-[1200px] h-[700px] flex flex-row gap-[50px] mx-auto mt-[50px]">
            <div className='bg-white w-[50%] h-[500px]  border '>
                <img className='w-full h-full'
                    src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`} alt={movieDetail.title} />
            </div>
            <div className='w-[50%] '>
                <div className='flex border h-[50px] items-center justify-around bg-white'>
                    <h2 className="text-2xl font-bold ">{movieDetail.title}</h2>
                    <p className="mt-2 text-gray-600">평점: {movieDetail.vote_average}</p>
                </div>
                <div className='border bg-white h-[50px] items-center flex justify-center'>
                    장르: {movieDetail.genres.map(genre => genre.name).join(', ')}
                </div>
                <p className="border h-[400px] bg-white">{movieDetail.overview}</p>
            </div>
        </section>
    );
}

export default MovieDetail