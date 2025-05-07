import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import {useEffect, useState} from "react";

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
import {fetchMovies} from "../Data/MovieData.ts";
import {Link} from "react-router-dom";
import {LoadingPage} from "../Loading/LoadingPage.tsx";


type Movie = {
    id: number;
    title: string;
    poster: string;
    rating: number;
};

export default function MovieSliderPage() {
    const [movieSlider, setMovieSlider] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies()
            .then(setMovieSlider)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <LoadingPage message="영화 슬라이드를 불러오는 중..."/>;
    }

    return (
        <>

            <div className="w-screen h-screen bg-white  text-black flex flex-col overflow-auto">
                <h1 className="text-3xl font-bold text-center py-6">🎞 영화 슬라이드</h1>

                <div className="flex-1 flex items-center">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={40}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={false}
                        className="w-full h-full flex-1"
                    >
                        {movieSlider.map((movie) => (
                            <SwiperSlide key={movie.id} className="h-full flex justify-center items-center px-4">
                                <div className="flex flex-col justify-center items-center text-center">
                                    <Link to={`/details/${movie.id}`}>
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="max-w-[90vw] max-h-[70vh] object-contain rounded-lg shadow-lg"
                                    />
                                    </Link>
                                    <div className="p-4">
                                        <h3 className="text-2xl font-semibold mb-2">{movie.title}</h3>
                                        <p className="text-yellow-500 text-lg font-bold">⭐ {movie.rating}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}