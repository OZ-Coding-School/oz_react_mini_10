import React, { useEffect, useState } from 'react'

export default function ImageSlide({ movie }) {
  const [currentImg, setCurrentImg] = useState(0)

  const imgs = movie.map((el) => el.backdrop_path)
  const length = imgs.length

  // 버튼 클릭시 이전 / 다음 이미지를 보여줌
  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? length - 1 : currentImg - 1)
  }
  const nextSlide = () => {
    setCurrentImg(currentImg === length - 1 ? 0 : currentImg + 1)
  }

  // 3초마다 작동하는 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval) //
  }, [currentImg])

  // 이미지가 없을 때
  if (!Array.isArray(imgs) || imgs.length <= 0) {
    return null
  }

  return (
    <div className='relative overflow-hidden w-full mx-auto'>
      <div
        className='flex transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(-${currentImg * 100}%)` }}
      >
        {imgs.map((path) => (
          <img
            src={`https://image.tmdb.org/t/p/w780${path}`}
            alt='슬라이드 이미지'
            className='w-full flex-shrink-0 h-[360px] object-cover'
            key={path}
          />
        ))}
      </div>
      <button onClick={prevSlide} className='slide-btn left-3'>
        ‹
      </button>
      <button onClick={nextSlide} className='slide-btn right-3'>
        ›
      </button>
      <div className='flex justify-center gap-2 mt-2'>
        {imgs.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentImg ? 'bg-black' : 'bg-gray-300'}`}
          ></span>
        ))}
      </div>
    </div>
  )
}
