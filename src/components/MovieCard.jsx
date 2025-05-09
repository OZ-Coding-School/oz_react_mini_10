import { Link, useSearchParams } from 'react-router-dom';
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
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API}`
        }
    };


    const getMovies = async () => {
        try {
            const movieData = query
                ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko`
                : `https://api.themoviedb.org/3/movie/popular?language=ko`;

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

    }, [query]);

    if (isLoading) {
        return <Loading />
    }


    return (
        <>
            {!query && (
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    spaceBetween={50}
                    slidesPerView={1} // 기본값 (모바일 기준)
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 5,
                        },
                    }}
                >
                    {movies.map((el) => (
                        <SwiperSlide key={el.id}>
                            <Link to={`/detail/${el.id}`}>
                                <div className="text-white rounded mt-[100px] select-none">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                                        alt={el.title}
                                        className="xl:w-full xl:h-[500px] md:h-[500px]"
                                    />
                                    <h3 className="w-full detail-box p-4 mb-[40px] text-center md:text-[0.9rem] xl:text-[1rem]">{el.title}</h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {movies.length === 0 && query && (
                <div className="text-white text-xl font-bold text-center pt-[300px]">
                    검색결과가 없습니다.
                </div>
            )}

            {!query ? <h2 className='text-[1.5rem] text-center font-bold pt-[50px] text-white'>인기순</h2> : null}
            <section className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 ${!query ? 'mt-[50px]' : 'mt-[100px]'
                } place-items-center`}>
                {movies.map(el => (
                    <Link to={`/detail/${el.id}`} key={el.id} >
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
                        <div className="sm:w-[400px] xl:w-[400px]  detail-box text-center shadow-md p-5 text-[#c6d4df]">
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

