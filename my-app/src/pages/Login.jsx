export default function Login() {
  return (
    <>
      <div className='min-h-screen bg-gray-100 py-8 px-4'>
        <div className='max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6'>
          <div className='flex justify-center mb-6'></div>
          <h1 className='text-3xl font-bold text-center mb-6'>로그인</h1>
          <form className='space-y-4'>
            <input
              name='email'
              type='email'
              placeholder='이메일'
              className='w-full border p-2 rounded'
            />
            <input
              name='password'
              type='password'
              placeholder='비밀번호'
              className='w-full border p-2 rounded'
            />
            <button
              type='submit'
              className='w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-600 transition'
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
