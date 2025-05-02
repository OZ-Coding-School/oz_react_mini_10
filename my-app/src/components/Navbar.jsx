import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <header className='w-full bg-black'>
        <div className='flex items-center justify-between mx-auto max-w-[1200px] px-4 py-3'>
          <Link to={'/'}>
            <h2 className='font-extrabold text-3xl text-white'>OZ MOVIE</h2>
          </Link>
          <input type='text' className='hidden sm:block focus:outline-none px-2 py-1 rounded-lg' />
          <div className='md:block text-white'>
            <button className='mr-4 hover:text-gray-500 transition-all'>로그인</button>
            <button className='hover:text-gray-500 transition-all'>회원가입</button>
          </div>
        </div>
      </header>
    </>
  )
}
