import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Suspense, lazy, useEffect, useContext } from 'react';
import Loading from './components/Loading';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useSupabaseAuth } from './supabase';
import { AuthContext } from './context/AuthContext';


const MovieCard = lazy(() => import('./components/MovieCard'));
const MovieDetail = lazy(() => import('./components/MovieDetail'));


function App() {
  const { getUserInfo } = useSupabaseAuth();
  const { setUser, setIsLoggedIn } = useContext(AuthContext); // Context에서 로그인 상태 업데이트 함수 가져오기

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoFromStorage = await getUserInfo();

      if (userInfoFromStorage) {
        setUser(userInfoFromStorage);
        setIsLoggedIn(true); // LocalStorage에 정보가 있으면 로그인 상태 true로 설정
      }
      // LocalStorage에 정보가 없으면 로그인 상태는 초기값 false 유지
    };

    fetchUserInfo();
  }, [getUserInfo, setUser, setIsLoggedIn]); // 의존성 배열에 setIsLoggedIn 추가


  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieCard />} />
          <Route path="/detail/:movie_id" element={<MovieDetail />} />
          <Route path="*" element={<div className='text-center mt-72 font-bold text-3xl'>404 없는 페이지임.</div>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;