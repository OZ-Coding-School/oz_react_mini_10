import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <header className="fixed w-full bg-[#601b85] text-white p-[16px]">
                <div className="w-full container mx-auto flex items-center">
                    <Link to="/" className="text-xl font-bold mr-[20px]">Maga Movie</Link>
                    <div className="flex-1 mx-[16px] bg-white rounded-[6px]">
                        <input className="p-[8px] w-full text-gray-600 outline-none border-none" type="text" placeholder="찾고 싶은 영화를 검색하세요." />
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