import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='p-6 text-center'>
      <h2 className='text-3xl pb-6'>잘못된 경로입니다.</h2>
      <button className='px-3 py-2 bg-black text-white rounded-md hover:bg-[#666] transition-all'>
        <Link to='/'>홈으로 돌아가기</Link>
      </button>
    </div>
  )
}
