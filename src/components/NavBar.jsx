import { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import SearchInput from "./SearchInput";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [showMenu, setShowMenu] = useState(false);     // 썸네일 메뉴 보여줄지 여부

  // ✅ 예시용 썸네일 URL
  const profileThumbnail = "https://i.pravatar.cc/30";

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowMenu(false);
    // ✅ 실제 로그아웃 처리 (토큰 삭제 등) 여기서
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <Link to="/">
        <h1 className="text-[pink] font-bold text-xl">oz무비사이트</h1>
      </Link>

      <SearchInput />

      {/* ✅ 로그인 여부에 따라 조건부 렌더링 */}
      {isLoggedIn ? (
        <div className="relative">
          {/* ✅ 썸네일 */}
          <img
            src={profileThumbnail}
            alt="프로필 썸네일"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />

          {/* ✅ 썸네일 클릭 시 나오는 메뉴 */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow">
              <Link to="/mypage">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">마이페이지</div>
              </Link>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      ) : (
        // ✅ 로그인 안된 상태면 회원가입/로그인 버튼
        <div className="flex gap-2">
          <Link to="/join">
            <button className="text-sm border px-3 py-1 rounded">회원가입하기</button>
          </Link>
          <Link to="/login">
            <button className="text-sm border px-3 py-1 rounded">로그인하기</button>
          </Link>

          {/* ✅ 테스트용 로그인 버튼 */}
          <button
            onClick={handleLogin}
            className="text-sm border px-3 py-1 rounded bg-green-100"
          >
            테스트 로그인
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
