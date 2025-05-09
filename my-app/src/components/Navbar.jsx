import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDebounce from '@hooks/useDebounce'
import { useUser } from '../context/userContext'
import { useSupabaseAuth } from '../supabase'

export default function Navbar() {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isMypageOpen, setIsMypageOpen] = useState(false)
  const navigate = useNavigate()

  // 검색 시 디바운스 적용
  const debouncedValue = useDebounce(inputValue, 1000)
  useEffect(() => {
    if (debouncedValue) {
      navigate(`/search?query=${debouncedValue}`)
    }
  }, [debouncedValue])

  // 로그인 정보
  const { user, setUser } = useUser()

  // 로그아웃
  const { logout } = useSupabaseAuth()
  const handleLogout = async () => {
    await logout()
    setUser(null)
    navigate('/')
  }

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
              {user ? (
                // 로그인 상태일 때
                <div className='flex justify-end items-center relative'>
                  <img
                    src={
                      user.user_metadata?.avatar_url ||
                      'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png'
                    }
                    alt='avatar'
                    className='size-8 rounded-full border border-white cursor-pointer'
                    onClick={() => setIsMypageOpen((prev) => !prev)}
                  />
                  <div
                    className={`${
                      isMypageOpen
                        ? 'flex flex-col absolute whitespace-nowrap top-[2rem] right-[-1rem] z-50 bg-black px-3 py-2 rounded-b-lg'
                        : 'hidden'
                    } `}
                  >
                    <ul>
                      <li className='border-b-[1px] pb-1'> 관심목록</li>
                      <li className='pt-1'>
                        <Link to={'/main'}>
                          <button
                            className='hover:text-gray-500 transition-all'
                            onClick={handleLogout}
                          >
                            로그아웃
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                // 로그인 상태가 아닐 때
                <>
                  <Link to={'/login'}>
                    <button className=' hover:text-gray-500 transition-all'>로그인</button>
                  </Link>
                  <Link to={'/signup'}>
                    <button className='hover:text-gray-500 transition-all'>회원가입</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
