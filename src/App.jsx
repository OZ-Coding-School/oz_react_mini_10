import Layout from '@components/common/Layout';
import Login from '@pages/Login';
import Main from '@pages/Main';
import MovieDetail from '@pages/MovieDetail';
import NotFound from '@pages/NotFound';
import Search from '@pages/Search';
import Signup from '@pages/Signup';
import { setUser } from '@store/slice/userSlice';
import { useSupabaseAuth } from '@supabaseJS/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const { getUserInfo } = useSupabaseAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo();
      if (data?.user) {
        dispatch(setUser(data));
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/details/:id" element={<MovieDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
