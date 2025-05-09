import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from './ThemeContext';
import { supabase } from '../supabase';

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [showTrending, setShowTrending] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Check user authentication status
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Scroll handling for hide/show navbar and close dropdowns
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setShowTrending(false); // Close search dropdown
        setIsProfileOpen(false); // Close profile dropdown
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Fetch trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        console.log('Fetching trending movies, TMDB Read Token:', import.meta.env.VITE_TMDB_READ_TOKEN);
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/week',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
            },
            params: {
              language: 'ko-KR',
            },
          }
        );
        console.log('Trending movies response:', response.data);
        setTrendingMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Trending movies error:', error.response?.data || error.message);
        setTrendingMovies([]);
      }
    };
    fetchTrendingMovies();
  }, []);

  // Search handling
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        console.log('Searching for:', searchQuery);
        console.log('TMDB Read Token:', import.meta.env.VITE_TMDB_READ_TOKEN);
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
            },
            params: {
              language: 'ko-KR',
              query: searchQuery,
            },
          }
        );
        console.log('Search response:', response.data);
        setSearchResults(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error.response?.data || error.message);
        setSearchResults([]);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Handle trending movie click
  const handleTrendingClick = (movieTitle) => {
    setSearchQuery(movieTitle);
    setShowTrending(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
    setIsProfileOpen(false);
  };

  return (
    <nav
      className={`py-3 sm:py-5 shadow-lg fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${theme === 'dark' ? 'bg-gradient-to-b from-black to-transparent text-white' : 'bg-gradient-to-b from-white to-gray-100 text-black'}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <div className="text-2xl sm:text-4xl font-bold tracking-tight cursor-pointer">
          <Link
            to="/"
            className={`${
              theme === 'dark' ? 'text-red-600 hover:text-red-500' : 'text-red-700 hover:text-red-600'
            } transition-colors duration-300`}
          >
            NETFLIX
          </Link>
        </div>

        <div className="w-1/2 sm:w-2/3 md:w-1/3 flex items-center justify-center relative">
          <input
            type="text"
            placeholder="영화 검색"
            className={`w-full py-2 px-4 sm:py-2.5 sm:px-5 rounded-md transition-all duration-300 text-sm sm:text-base ${
              theme === 'dark'
                ? 'text-gray-800 bg-gray-100 focus:ring-red-500 placeholder-gray-500'
                : 'text-gray-800 bg-gray-200 focus:ring-red-600 placeholder-gray-600'
            } focus:outline-none focus:ring-2 focus:bg-white`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowTrending(true)}
            onBlur={() => setTimeout(() => setShowTrending(false), 200)}
          />
          {isVisible && (searchResults.length > 0 || (showTrending && searchQuery.trim() === '')) && (
            <div
              className={`absolute top-full mt-2 w-full rounded-md shadow-lg max-h-80 sm:max-h-96 overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              {showTrending && searchQuery.trim() === '' ? (
                <div>
                  <div
                    className={`px-3 sm:px-4 py-2 font-semibold border-b ${
                      theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-800'
                    } text-sm sm:text-base`}
                  >
                    현재 인기 검색어
                  </div>
                  {trendingMovies.map((movie, index) => (
                    <div
                      key={movie.id}
                      onClick={() => handleTrendingClick(movie.title)}
                      className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors duration-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-300 text-gray-800'
                      } flex items-center text-sm sm:text-base`}
                    >
                      <span className="font-bold mr-2">{index + 1}.</span>
                      <span>{movie.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={`/movie/${result.id}`}
                    className={`block px-3 sm:px-4 py-2 sm:py-3 transition-colors duration-200 ${
                      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'
                    }`}
                    onClick={() => setSearchQuery('')}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img
                        src={
                          result.poster_path
                            ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                            : 'https://via.placeholder.com/46x69?text=No+Image'
                        }
                        alt={result.title}
                        className="w-10 sm:w-12 h-15 sm:h-18 object-cover rounded"
                      />
                      <div>
                        <h3
                          className={`text-xs sm:text-sm font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {result.title}
                        </h3>
                        <p
                          className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          영화 | {new Date(result.release_date).getFullYear() || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 sm:space-x-5">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <UserIcon
                className={`w-5 sm:w-6 h-5 sm:h-6 ${theme === 'dark' ? 'text-red-600' : 'text-red-700'}`}
              />
            </button>
            {isVisible && isProfileOpen && (
              <div
                className={`absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 rounded-md shadow-lg py-1 ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                }`}
              >
                {user ? (
                  <>
                    <div
                      className={`px-3 sm:px-4 py-2 text-xs sm:text-sm truncate ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {user.email}
                    </div>
                    <Link
                      to="/dashboard"
                      className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      내 계정
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className={`block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth"
                      className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      로그인
                    </Link>
                    <Link
                      to="/auth"
                      className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;