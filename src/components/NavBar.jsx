import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="relative">
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <button
            className="text-2xl font-bold cursor-pointer text-blue-600"
            onClick={() => navigate(`/`)}
          >
            🎬 OZ무비
          </button>

          <div className="flex items-center gap-4">
            <input
              value={searchInput}
              onChange={(e) => {
                const nowSearchInput = e.target.value;
                setSearchInput(nowSearchInput);
                navigate(`/search?movie=${nowSearchInput}`); // 상태변화가 비동기로 전달되어서 변수로 바로 전달
              }}
              type="text"
              placeholder="영화 검색"
              className="hidden md:block border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="hidden md:block text-sm px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
              로그인
            </button>
            <button className="hidden md:block text-sm px-4 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition">
              회원가입
            </button>
            <button
              className="block md:hidden text-2xl pb-1 "
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>
        {/* 모바일 메뉴 (768px 이하에서만 보이고, 상태 따라 열림) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full z-10 md:hidden">
            <div className="shadow-md h-[10px]"></div>
            <div className="bg-white shadow-md flex justify-end px-6 py-4 gap-2 md:hidden">
              <input
                value={searchInput}
                onChange={(e) => {
                  const nowSearchInput = e.target.value;
                  setSearchInput(nowSearchInput);
                  navigate(`/search?movie=${nowSearchInput}`);
                }}
                type="text"
                placeholder="영화 검색"
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
                로그인
              </button>
              <button className="text-sm px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition">
                회원가입
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
