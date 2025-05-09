import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo2.png';
import avatar from '../assets/avatar.jpg';
import { useContext, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useSupabaseAuth } from '../supabase';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useDebounce(query, 500);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout: supabaseLogout } = useSupabaseAuth();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleClickLogo = () => {
        setQuery('');
        setDebouncedQuery('');
    };

    // 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown-wrapper')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // 검색 쿼리 네비게이션
    useEffect(() => {
        if (location.pathname === '/') {
            if (debouncedQuery) {
                navigate(`/?query=${debouncedQuery}`);
            } else {
                navigate(`/`);
            }
        }
    }, [debouncedQuery, navigate, location.pathname]);

    return (
        <header className="w-full h-[75px] bg-[#171a21] flex lg:justify-around sm:justify-between items-center z-10 fixed top-0">
            <Link to={"/"} className='flex items-center' onClick={handleClickLogo}>
                <img src={logoImage} alt="로고" className="w-[50px]" />
                <span className='text-[1.5rem] text-white'>스팀무비</span>
            </Link>

            {location.pathname === '/' && (
                <input
                    type="text"
                    value={query}
                    placeholder="영화를 검색하세요."
                    onChange={handleChange}
                    className="bg-white rounded-[50px] w-[50%] h-[40px] px-[20px] sm:hidden lg:block"
                />
            )}

            {isLoggedIn ? (
                <div className="relative text-center dropdown-wrapper">
                    <img
                        src={avatar}
                        alt="프로필"
                        width={50}
                        height={50}
                        className="cursor-pointer"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    />

                    {dropdownOpen && (
                        <div
                            className="absolute right-0  w-40 bg-[#32353c] rounded shadow-lg z-10 text-white"
                            onMouseEnter={() => setDropdownOpen(true)}  // 드롭다운 메뉴에 마우스 올리면 열려 있도록 유지
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <Link to="/wishlist">
                                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">관심목록</div>
                            </Link>
                            <button
                                className="w-full px-4 py-2 hover:bg-gray-700"
                                onClick={async () => {
                                    const { error } = await supabaseLogout();
                                    if (error) {
                                        console.error('로그아웃 실패:', error);
                                    } else {
                                        console.log('로그아웃 성공!');
                                        setIsLoggedIn(false);
                                        localStorage.removeItem('userInfo');
                                        navigate('/');
                                    }
                                }}
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex text-white gap-[10px]">
                    <Link to={"/login"}>
                        <button className="button-color p-[10px] rounded-[10px]">로그인</button>
                    </Link>
                    <Link to={"/signup"}>
                        <button className="button-color p-[10px] rounded-[10px]">회원가입</button>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default NavBar;
