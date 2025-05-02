import { Link } from 'react-router-dom';
import MovieListData from '../data/movieListData.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';


function MovieCard() {
    return (
        <>
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                spaceBetween={20}
                slidesPerView={4}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation
            >
                {MovieListData.results.map((el) => (
                    <SwiperSlide key={el.id}>
                        <div className=" text-white rounded overflow-hidden mt-[50px]">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${el.backdrop_path}`}
                                alt={el.title}
                                className="w-full h-full bg-no-repeat object-cover"
                            />
                            <h3 className="bg-black p-2 mb-[40px] text-center">{el.title}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <h2 className='text-[1.5rem] text-center font-bold pt-[50px]'>인기순</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-[50px] place-items-center">
                {MovieListData.results.map(el => (
                    <Link to={`/detail/${el.id}`} key={el.id}>
                        <div className='w-[275px] h-[400px] border rounded-t-[10px] bg-white'>
                            <img
                                className='w-full h-[325px] rounded-t-[10px] border'
                                src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                                alt=""
                            />
                            <h1 className='text-[1.1rem] font-bold px-[10px]'>{el.title}</h1>
                            <p className='px-[10px]'>평점: {el.vote_average}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </>
    );
}


export default MovieCard

