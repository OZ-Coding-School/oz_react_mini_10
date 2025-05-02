import React from 'react'

export function MovieCardSkeleton() {
  return (
    <div className='w-[200px] animate-pulse space-y-2'>
      <div className='h-[150px] bg-gray-300 rounded-lg'></div>
      <div className='w-1/2 h-4 bg-gray-300 rounded'></div>
      <div className='w-1/2 h-4 bg-gray-300 rounded'></div>
    </div>
  )
}

export function MovieDetailSkeleton() {
  return (
    <>
      <div className='md:p-10 h-full'>
        <div className='flex flex-col h-full md:flex-row md:rounded-lg md:mx-auto max-w-[1200px] md:gray-border'>
          <div className='w-full h-[350px] bg-gray-300 md:rounded-l-lg object-cover md:w-1/2' />
          <div className='w-full flex flex-col p-6 gap-3 md:w-1/2  md:py-6'>
            <div className='h-10 bg-gray-300'></div>
            <div className='w-1/4 h-5 bg-gray-300'></div>
            <div className='w-1/2 h-6 bg-gray-300'></div>
            <div className='min-h-[100px] bg-gray-300 md:flex-grow'></div>
          </div>
        </div>
      </div>
    </>
  )
}
