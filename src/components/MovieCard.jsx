import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';


function MovieCard() {

    const API = import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN
    const movieData = 'https://api.themoviedb.org/3/movie/popular?language=ko'
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API}`
        }
    };


    const getMovies = async () => {
        try {
            const res = await axios.get(movieData, options);
            const filtered = res.data.results.filter(movie => !movie.adult);
            setMovies(filtered);
            setIsLoading(false);
        } catch {
            alert('응 못받아옴 ㅅㄱ');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    if (isLoading) {
        return <Loading />
    }


    return (
        <>
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                spaceBetween={50}
                slidesPerView={5}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation
            >
                {movies.map((el) => (
                    <SwiperSlide key={el.id}>
                        <Link to={`/detail/${el.id}`} key={el.id}>

                            <div className=" text-white rounded  mt-[100px] select-none">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                                    alt={el.title}
                                    className="w-[500px] h-[500px]"
                                />
                                <h3 className="w-full detail-box p-2 mb-[40px] text-center">{el.title}</h3>
                            </div>
                        </Link>

                    </SwiperSlide>

                ))}

            </Swiper>

            <h2 className='text-[1.5rem] text-center font-bold pt-[50px] text-white'>인기순</h2>
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-[50px] place-items-center">
                {movies.map(el => (
                    <Link to={`/detail/${el.id}`} key={el.id}>
                        <div className='card select-none'>
                            <div className="wrapper">
                                <img
                                    className='cover-image'
                                    src={`https://image.tmdb.org/t/p/w500/${el.backdrop_path}`}
                                    alt=""
                                />
                            </div>

                            <img className='hover-image'
                                src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                                alt="" />
                        </div>
                        <div className="w-[400px] detail-box text-center shadow-md p-5 text-[#c6d4df]">
                            <h1 className='text-[1.1rem] font-bold '>{el.title}</h1>
                            <p>평점: {el.vote_average}</p>
                        </div>


                    </Link>
                ))}
            </section>
        </>
    );
}


export default MovieCard

