import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Scroll handling for hide/show navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Hide when scrolling down
            } else {
                setIsVisible(true); // Show when scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Search handling
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
                setSearchResults(response.data.results.slice(0, 5)); // Limit to 5 results
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            }
        };

        const debounce = setTimeout(fetchSearchResults, 300); // Debounce to avoid too many requests
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    return (
        <nav className={`bg-gradient-to-b from-black to-transparent text-white py-5 shadow-lg fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto flex items-center justify-between px-6">
                <div className="text-4xl font-bold tracking-tight cursor-pointer">
                    <Link to="/" className="text-red-600 hover:text-red-500 transition-colors duration-300">NETFLIX</Link>
                </div>
                
                <div className="w-2/3 md:w-1/3 flex items-center justify-center relative">
                    <input
                        type="text"
                        placeholder="영화, TV 프로그램 검색"
                        className="w-full py-2.5 px-5 rounded-md text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-md shadow-lg max-h-96 overflow-y-auto">
                            {searchResults.map((result) => (
                                <Link
                                    key={result.id}
                                    to={`/movie/${result.id}`}
                                    className="block px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
                                    onClick={() => setSearchQuery('')} // Clear search on click
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
                                            <h3 className="text-sm font-semibold">
                                                {result.title}
                                            </h3>
                                            <p className="text-xs text-gray-400">
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
                
                <div className="flex space-x-5">
                    <button className="bg-red-600 py-2 px-7 rounded-md text-white font-medium hover:bg-red-700 transition-colors duration-300">
                        로그인
                    </button>
                    <button className="py-2 px-7 border border-red-600 rounded-md text-white font-medium hover:bg-red-600 hover:text-white hover:border-transparent transition-all duration-300">
                        회원가입
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;