import { useEffect, useState, useContext } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../supabase';
import { ThemeContext } from './ThemeContext';

const AuthUI = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState('');

  // Fetch popular movie backdrop for background
  useEffect(() => {
    const fetchBgImage = async () => {
      try {
        console.log('Fetching background image, TMDB API Key:', import.meta.env.VITE_TMDB_API_KEY);
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'ko-KR',
            },
          }
        );
        console.log('Background image response:', response.data);
        const poster = response.data.results[0]?.backdrop_path;
        setBgImage(poster ? `https://image.tmdb.org/t/p/w1280${poster}` : '');
      } catch (error) {
        console.error('Background image error:', error.response?.data || error.message);
        setBgImage('https://image.tmdb.org/t/p/w1280/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'); // Fallback image
      }
    };
    fetchBgImage();
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-cover bg-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'} ${bgImage && `bg-[url('${bgImage}')]`} backdrop-blur-md animate-fadeIn`}
      onClick={handleBackgroundClick}
    >
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
        <Link
          to="/"
          className={`text-4xl font-bold text-center block mb-6 ${theme === 'dark' ? 'text-red-600' : 'text-red-700'} transition-colors duration-300 hover:text-red-500`}
        >
          NETFLIX
        </Link>
        <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        </h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: theme === 'dark' ? '#dc2626' : '#b91c1c',
                  brandAccent: theme === 'dark' ? '#b91c1c' : '#991b1b',
                  inputBackground: theme === 'dark' ? '#1f2937' : '#f3f4f6',
                  inputText: theme === 'dark' ? '#ffffff' : '#1f2937',
                  buttonText: '#ffffff',
                  buttonBackground: theme === 'dark' ? '#dc2626' : '#b91c1c',
                },
                radii: {
                  borderRadiusButton: '0.5rem',
                  inputBorderRadius: '0.5rem',
                },
                space: {
                  buttonPadding: '0.75rem 1.5rem',
                  inputPadding: '0.75rem',
                },
              },
            },
          }}
          providers={['google', 'kakao']}
          localization={{
            variables: {
              sign_in: {
                email_label: '이메일',
                password_label: '비밀번호',
                button_label: '로그인',
                social_provider_text: '{{provider}}로 로그인',
                link_text: '이미 계정이 있으신가요? 로그인',
              },
              sign_up: {
                email_label: '이메일',
                password_label: '비밀번호',
                button_label: '회원가입',
                social_provider_text: '{{provider}}로 회원가입',
                link_text: '계정이 없으신가요? 회원가입',
                email_input_placeholder: '이메일을 입력하세요',
                password_input_placeholder: '비밀번호를 입력하세요',
                loading_button_label: '회원가입 중...',
              },
              forgotten_password: {
                email_label: '이메일',
                button_label: '비밀번호 재설정',
                link_text: '비밀번호를 잊으셨나요?',
                email_input_placeholder: '이메일을 입력하세요',
                loading_button_label: '재설정 링크 보내는 중...',
              },
              magic_link: {
                email_input_label: '이메일',
                email_input_placeholder: '이메일을 입력하세요',
                button_label: '매직 링크 보내기',
                link_text: '비밀번호 없이 로그인',
                loading_button_label: '매직 링크 보내는 중...',
              },
              update_password: {
                password_label: '새 비밀번호',
                password_input_placeholder: '새 비밀번호를 입력하세요',
                button_label: '비밀번호 업데이트',
                loading_button_label: '비밀번호 업데이트 중...',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AuthUI;