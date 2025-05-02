import React from 'react'
import movieListData from '@assets/data/movieListData.json'
import MovieCard from '@components/MovieCard'
import { Link } from 'react-router-dom'
export default function Main() {
  return (
    <>
      <div className='w-full h-full '>
        <div className='list-container'>
          {movieListData.results.map((el) => (
            <Link key={el.id} to={`/detail`}>
              {/* <Link key={el.id} to={`/detail/${el.id}`}> */}
              <MovieCard movie={el} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
