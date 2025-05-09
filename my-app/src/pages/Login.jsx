import { Link, useNavigate } from 'react-router-dom'
import Button from '@common/Button'
import LabelInputError from '@components/LabelInputError'
import { useState } from 'react'
import { useSupabaseAuth } from '../supabase/auth/index'
import { useUser } from '../context/userContext'

export default function Login() {
  // 로그인 데이터, 에러
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({ email: '', password: '' })
  const { login, getUserInfo, loginWithGoogle, loginWithKakao } = useSupabaseAuth()
  // contextAPI
  const { setUser } = useUser()

  const navigate = useNavigate()

  // 입력값이 바뀔 때마다 setFormData에 저장
  const handleChange = (e) => {
    const { name, value } = e.target
    setloginData({ ...loginData, [name]: value })
  }

  // 일반 로그인
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { error: loginError } = await login({
        email: loginData.email,
        password: loginData.password,
      })
      if (loginError) {
        // 로그인 실패
        setError({ ...error, password: '이메일 또는 비밀번호가 올바르지 않습니다.' })
      } else {
        // 로그인 성공
        const userInfo = await getUserInfo()
        if (userInfo?.user) {
          setUser(userInfo.user)
        }
        navigate('/')
      }
    } catch (err) {
      console.error(err.message)
      setError({ ...error, password: '로그인 도중 문제가 발생했습니다.' })
    }
  }

  // 구글 로그인
  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle('http://localhost:5173')
    } catch (error) {
      console.log(error)
    }
  }

  // 카카오 로그인
  const handleLoginKakao = async () => {
    try {
      await loginWithKakao('http://localhost:5173')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='min-h-screen bg-gray-100 py-8 px-4'>
        <div className='max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-center mb-6'></div>
          <h1 className='text-3xl font-bold text-center mb-6'>로그인</h1>
          <form onSubmit={handleSubmit}>
            <LabelInputError
              label={'이메일'}
              id={'email'}
              name={'email'}
              value={loginData.email}
              error={error.email}
              onChange={handleChange}
            />
            <LabelInputError
              label={'비밀번호'}
              id={'password'}
              name={'password'}
              type='password'
              value={loginData.password}
              error={error.password}
              onChange={handleChange}
            />
            <Button type={'submit'}>로그인</Button>
            <div className='flex flex-col space-y-2 py-2 sm:flex-row sm:space-y-0 sm:space-x-2'>
              <Button
                onClick={handleLoginGoogle}
                bgColor='bg-red-500'
                hoverBgColor='hover:bg-red-700'
              >
                Google 로그인
              </Button>
              <Button
                onClick={handleLoginKakao}
                bgColor='bg-yellow-400'
                color='text-black'
                hoverBgColor='hover:bg-yellow-500'
              >
                Kakao 로그인
              </Button>
            </div>
            <p className='text-gray-600 text-center p-4'>
              오즈 무비가 처음이신가요?
              <Link to={'/signup'}>
                <span className='hover:underline transition-none underline-offset-4 font-bold ml-2 whitespace-nowrap'>
                  간편 가입
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
