import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from './ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    
    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsVisible(false); 
        } else {
            setIsVisible(true); 
        }
        setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    
    useEffect(() => {
        if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
        }

        const fetchSearchResults = async () => {
        try {
            const response = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
                params: {
                api_key: 'd7af90757976df4593ed5c6e53168372',
                language: 'ko-KR',
                query: searchQuery,
                },
            }
            );
            setSearchResults(response.data.results.slice(0, 5)); 
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        }
        };

        const debounce = setTimeout(fetchSearchResults, 300); 
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    return (
        <nav className={`py-5 shadow-lg fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${theme === 'dark' ? 'bg-gradient-to-b from-black to-transparent text-white' : 'bg-gradient-to-b from-white to-gray-100 text-black'}`}>
        <div className="container mx-auto flex items-center justify-between px-6">
            <div className="text-4xl font-bold tracking-tight cursor-pointer">
            <Link to="/" className={`${theme === 'dark' ? 'text-red-600 hover:text-red-500' : 'text-red-700 hover:text-red-600'} transition-colors duration-300`}>NETFLIX</Link>
            </div>
            
            <div className="w-2/3 md:w-1/3 flex items-center justify-center relative">
            <input
                type="text"
                placeholder="영화 검색"
                className={`w-full py-2.5 px-5 rounded-md transition-all duration-300 ${theme === 'dark' ? 'text-gray-800 bg-gray-100 focus:ring-red-500 placeholder-gray-500' : 'text-gray-800 bg-gray-200 focus:ring-red-600 placeholder-gray-600'} focus:outline-none focus:ring-2 focus:bg-white`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
                <div className={`absolute top-full mt-2 w-full rounded-md shadow-lg max-h-96 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {searchResults.map((result) => (
                    <Link
                    key={result.id}
                    to={`/movie/${result.id}`}
                    className={`block px-4 py-3 transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                    onClick={() => setSearchQuery('')} 
                    >
                    <div className="flex items-center space-x-3">
                        <img
                        src={
                            result.poster_path
                            ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                            : 'https://via.placeholder.com/46x69?text=No+Image'
                        }
                        alt={result.title}
                        className="w-12 h-18 object-cover rounded"
                        />
                        <div>
                        <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                            {result.title}
                        </h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            영화 |{' '}
                            {new Date(result.release_date).getFullYear() || 'N/A'}
                        </p>
                        </div>
                    </div>
                    </Link>
                ))}
                </div>
            )}
            </div>
            
            <div className="flex items-center space-x-5">
            <button className={`${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-700 hover:bg-red-800'} py-2 px-7 rounded-md text-white font-medium transition-colors duration-300`}>
                로그인
            </button>
            <button className={`${theme === 'dark' ? 'border-red-600 hover:bg-red-600 hover:text-white hover:border-transparent' : 'border-red-700 hover:bg-red-700 hover:text-white hover:border-transparent'} py-2 px-7 border rounded-md font-medium transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                회원가입
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                <MoonIcon className="w-6 h-6 text-gray-800" />
                )}
            </button>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;