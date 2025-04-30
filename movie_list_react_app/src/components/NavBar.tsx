import { useState } from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          {/* 로고 */}
          <div className="text-xl font-bold">
            <Link to="/">OZ무비</Link>
          </div>

          {/* 햄버거 버튼 (모바일용) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>

          {/* 검색창 (중간) */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <input
              type="text"
              placeholder="영화 검색..."
              className="w-full max-w-md px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* 링크 (데스크탑용) */}
          <div className="hidden lg:flex space-x-4">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/details/1" className="hover:text-yellow-400">디테일</Link>
            <Link to="/slider" className="hover:text-yellow-400">슬라이더</Link>
          </div>
        </div>

        {/* 모바일 메뉴 (토글) */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2 text-center">
            <input
              type="text"
              placeholder="영화 검색..."
              className="w-full max-w-xs mx-auto px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="space-y-2">
              <Link to="/" className="block hover:text-yellow-400">Home</Link>
              <Link to="/details/1" className="block hover:text-yellow-400">디테일</Link>
              <Link to="/slider" className="block hover:text-yellow-400">슬라이더</Link>
            </div>
          </div>
        )}
      </nav>

    </>
  );
}