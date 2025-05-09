import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

const Navbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm !== undefined) { 
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, onSearch]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <header className="fixed w-full bg-[#601b85] text-white p-[16px] z-10">
                <div className="w-full container mx-auto flex items-center">
                    <Link to="/" className="text-xl font-bold mr-[20px]">Maga Movie</Link>
                    <div className="flex-1 mx-[16px] bg-white rounded-[6px]">
                        <input
                            className="p-[8px] w-full text-gray-600 outline-none border-none rounded-md"
                            type="text"
                            placeholder="찾고 싶은 영화를 검색하세요."
                            value={searchTerm} // input 값과 searchTerm 상태 연결
                            onChange={handleInputChange} // input 변경 이벤트 처리
                        />
                    </div>

                    <nav className="flex items-center">
                        <Link to="/" className="ml-[16px] p-[10px] border rounded-[5px] hover:bg-white hover:text-[#601b85] transition-colors">
                            로그인
                        </Link>
                        <Link to="/" className="ml-[16px] p-[10px] border rounded-[5px] hover:bg-white hover:text-[#601b85] transition-colors">
                            회원가입
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;