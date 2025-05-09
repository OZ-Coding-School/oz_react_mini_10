import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImage from '../assets/logo2.png'
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

function NavBar({ query, setQuery }) {

    const debouncedQuery = useDebounce(query, 500);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

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
            <Link to={"/"} className='flex items-center'>
                <img src={logoImage} alt="" className="sm:w-[50px] lg:w-[50px]" />
                <span className='text-[1.5rem] text-white'>스팀무비</span>
            </Link>
            <input type="text" value={query} placeholder="영화를 검색하세요."
                onChange={handleChange} className="bg-white rounded-[50px] w-[50%] h-[40px] px-[20px] sm:hidden lg:block" />
            <div className="flex text-[white] gap-[10px]">
                <button className="button-color p-[10px] rounded-[10px]">로그인</button>
                <button className="button-color p-[10px] rounded-[10px]">회원가입</button>
            </div>
        </header>
    )
}

export default NavBar