import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDebounce from '@hooks/useDebounce'

export default function Navbar() {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const debouncedValue = useDebounce(inputValue, 1000)

  useEffect(() => {
    if (debouncedValue) {
      navigate(`/search?query=${debouncedValue}`)
    }
  }, [debouncedValue])

  // const inputRef = useRef(null)
  // const handleSearch = () => {
  //   const keyword = inputRef.current.value
  //   navigate(`/search?query=${keyword}`)
  // }

  // const handleEnter = (e) => {
  //   if (e.key === 'Enter') handleSearch()
  // }

  return (
    <>
      <header className='w-full bg-black text-white'>
        <div
          className={`flex justify-between mx-auto w-full max-w-[1200px] py-3 ${
            isOpen ? 'flex-col items-start' : ''
          } sm:flex-row sm:items-center`}
        >
          <Link to={'/'}>
            <h2 className='font-extrabold text-3xl px-4'>OZ MOVIE</h2>
          </Link>
          <input
            className='text-3xl sm:hidden cursor-pointer absolute right-3 top-2'
            type='button'
            value='☰'
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <div className={`${isOpen ? 'mobile-toggleMenu' : 'hidden'} sm:flex sm:items-center`}>
            <div className='flex w-full sm:w-fit sm:mx-6 border-b-[1px] text-white '>
              <input
                type='text'
                placeholder='영화 제목을 검색해보세요.'
                className='flex-1 focus:outline-none px-4 py-1 bg-transparent sm:rounded-md'
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className='text-3xl cursor-pointer px-4 py-1'>⌕</span>
            </div>
            <div className='space-x-5 p-4 text-right sm:mr-4 sm:p-0'>
              <Link to={'/login'}>
                <button className=' hover:text-gray-500 transition-all'>로그인</button>
              </Link>
              <Link to={'/join'}>
                <button className='hover:text-gray-500 transition-all'>회원가입</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
