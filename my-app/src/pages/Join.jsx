import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function JoinForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phonenum: '',
    email: '',
    password: '',
    birth: '',
    gender: 'female',
  })

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <div className='flex justify-center mb-6'></div>
        <h1 className='text-3xl font-bold text-center mb-6'>회원가입</h1>
        <form className='space-y-4'>
          <input
            name='name'
            value={formData.name}
            type='text'
            placeholder='이름'
            className='w-full border p-2 rounded'
          />
          <input
            name='phonenum'
            value={formData.phonenum}
            type='text'
            placeholder='전화번호'
            className='w-full border p-2 rounded'
          />
          <input
            name='email'
            value={formData.email}
            type='email'
            placeholder='이메일'
            className='w-full border p-2 rounded'
          />
          <input
            name='password'
            value={formData.password}
            type='password'
            placeholder='비밀번호'
            className='w-full border p-2 rounded'
          />
          <input
            name='birth'
            value={formData.birth}
            type='date'
            className='w-full border p-2 rounded'
          />

          <div>
            <div className='font-medium mb-1'>성별</div>
            <div className='flex gap-4'>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={formData.gender === 'female'}
                />{' '}
                여자
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={formData.gender === 'male'}
                />{' '}
                남자
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='secret'
                  checked={formData.gender === 'secret'}
                />{' '}
                해당없음
              </label>
            </div>
          </div>
          <button
            type='submit'
            className='w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-600 transition'
          >
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  )
}
