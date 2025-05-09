import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { ThemeContext } from './ThemeContext';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/auth');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-4">환영합니다, {user.email}!</h1>
      <button
        onClick={handleSignOut}
        className={`py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-700 hover:bg-red-800'} text-white`}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Dashboard;