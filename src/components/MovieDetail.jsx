import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';


function MovieDetail() {

    let [fade, setFade] = useState('fade-start');
    const { movie_id } = useParams();
    const movieData = 'https://api.themoviedb.org/3/movie/popular?language=ko'
    const [movies, setMovies] = useState(null);
    const [movieDetail, setMovieDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            const dataRes = await axios.get(movieData, options);
            const detailRes = await axios.get(movieDetailLink, options);
            const filtered = dataRes.data.results.filter(movie => !movie.adult);

            setMovies(filtered);
            setMovieDetail(detailRes.data);
            setIsLoading(false);

        }
        catch {
            alert('응 못받아옴 ㅅㄱ');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMovieDetail();
    }, [movie_id]);

    useEffect(() => {
        if (!isLoading) {
            setFade('fade-end');
        }
    }, [isLoading]);


    if (isLoading) {
        return <Loading />;
    }

    const posterUrl = `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`
    const backdropUrl = `https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`;


    return (
        <>
            <div className={`relative ${fade}`}>
                <div
                    style={{
                        imageRendering: 'smooth',
                        backgroundSize: 'cover',
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${backdropUrl})`,
                    }}
                    className="w-full sm:h-full md:h-full xl:h-screen bg-cover bg-center absolute"
                >
                </div>
                <section className="xl:flex relative justify-center pt-[9rem] sm:block w-full sm:mx-auto">
                    <div className="w-[250px] h-[350px] mx-auto  sm:mb-[50px] xl:ml-[300px]">
                        <img
                            className="w-[250px] rounded shadow-xl select-none "
                            src={`${posterUrl}`}
                            alt={movieDetail.title}
                        />
                    </div>

                    <div className="xl:w-[40%] sm:w-[60%] text-white space-y-4 sm:mx-auto xl:mr-[400px]">
                        <div className="flex items-center space-x-4 sm:block">
                            <h2 className="text-2xl font-bold">{movieDetail.title}</h2>
                            <p>평점: {movieDetail.vote_average}</p>
                        </div>

                        <div>
                            <p>{movieDetail.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="inline-block py-1 px-4 mr-2 mb-2 border-2 border-white text-white rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}</p>
                        </div>

                        <p className="leading-relaxed">{movieDetail.overview}</p>
                    </div>
                </section>

                <h2 className='w-full text-[1.5rem] font-bold  text-white text-center absolute'>인기영화</h2>

                <div className="mt-[5rem] max-w-[1500px] mx-auto">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        spaceBetween={40}
                        slidesPerView={7}
                        autoplay={{ delay: 3000 }}
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
                            slidesPerView: 7,
                        },
                    }}
                    >
                        {movies.map((el) => (
                            <SwiperSlide key={el.id}>
                                <Link to={`/detail/${el.id}`}>
                                    <div className="w-full aspect-[2/3] object-cover text-white rounded select-none">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                                            alt={el.title}
                                            className='w-full h-full'
                                        />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default MovieDetail