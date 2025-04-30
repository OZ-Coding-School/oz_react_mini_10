import React from 'react'

export default function ErrorPage() {
  return (
    <div className='error-container'>
      <h2>잘못된 경로입니다.</h2>
      <Link to='/'>홈으로 돌아가기</Link>
    </div>
  )
}
