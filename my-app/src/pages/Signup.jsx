import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LabelInputError from '@components/LabelInputError'
import Button from '@common/Button'
import { useSupabaseAuth } from '../supabase/auth/index'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  })
  const [error, setError] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  })
  const { signUp } = useSupabaseAuth()

  // 입력값이 바뀔 때마다 setFormData에 저장
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = (data) => {
    const signUpError = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      signUpError.email = '올바른 이메일 형식을 입력해주세요.'
    }
    if (!/^[a-zA-Z0-9가-힣]{2,8}$/.test(data.name)) {
      signUpError.name = '이름은 2~8자 사이의 숫자, 영어, 한글을 사용해주세요.'
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(data.password)) {
      signUpError.password = '비밀번호는 영문자 + 숫자의 조합으로 8자 이상 입력해주세요.'
    }
    if (data.password !== data.passwordConfirm) {
      signUpError.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    }

    return signUpError
  }

  // 제출 버튼을 눌렀을 시
  const handleSubmit = async (e) => {
    e.preventDefault()

    const signUpError = validateForm(formData)
    setError(signUpError)

    if (Object.keys(signUpError).length === 0) {
      try {
        await signUp({
          email: formData.email,
          password: formData.password,
          userName: formData.name,
        })
        navigate('/login')
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <div className='flex justify-center mb-6'></div>
        <h1 className='text-3xl font-bold text-center mb-6'>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <LabelInputError
            label={'이메일'}
            id={'email'}
            name={'email'}
            type='email'
            value={formData.email}
            error={error.email}
            onChange={handleChange}
          />
          <LabelInputError
            label={'이름'}
            id={'name'}
            name={'name'}
            value={formData.name}
            error={error.name}
            onChange={handleChange}
          />
          <LabelInputError
            label={'비밀번호'}
            id={'password'}
            name={'password'}
            type='password'
            value={formData.password}
            error={error.password}
            onChange={handleChange}
          />
          <LabelInputError
            label={'비밀번호 확인'}
            id={'passwordConfirm'}
            name={'passwordConfirm'}
            type='password'
            value={formData.passwordConfirm}
            error={error.passwordConfirm}
            onChange={handleChange}
          />
          <Button type={'submit'}>회원가입</Button>
        </form>
      </div>
    </div>
  )
}
