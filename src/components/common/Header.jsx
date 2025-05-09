import Inner from "@components/common/Inner";
import SearchOverlay from "@components/common/SearchOverlay";
import Fade from "@components/modal/Fade";
import { logout } from "@store/slice/userSlice";
import { useAuth } from "@supabaseJS/auth/useAuth";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RiCloseLargeLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useSupabaseAuth } from '../../../../../Downloads/supabase/auth/index';

const Header = () => {
  const { pathname } = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { logout: supabaseLogout } = useAuth();
  const { getUserInfo } = useSupabaseAuth();
    
  const handleClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSideClick = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await supabaseLogout();
      dispatch(logout());
    } catch (error) {
      console.error("Error during logout:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    setIsSearchOpen(false);
    setIsSideMenuOpen(false);
  }, [pathname]);

  return (
    <header className="px-4 lg:p-4 pb-0 fixed top-0 left-0 right-0 z-10 bg-white">
      <Inner className="flex items-center justify-between h-16">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            요즘{" "}
            <span className="text-green-400 text-3xl font-black">movie</span>
          </h1>
        </Link>
        <div className="items-center gap-4 flex">
          <button
            onClick={handleClick}
            className="text-2xl flex items-center text-gray-300 after:block after:border-r-1 after:h-4 after:border-gray-300 after:ml-4 cursor-pointer"
          >
            <IoSearch />
          </button>

          <button
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            className="text-2xl text-gray-300 cursor-pointer"
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>
          <div className="items-center gap-4 hidden md:flex">
            {user ? (
              <div className="group relative">
                {/* dropdown */}
                <div className="rounded-full w-10 h-10 transition text-white font-bold">
                  <img
                    src={
                      user?.user?.profileImageUrl ||
                      "assets/images/common/default_profile.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="absolute min-w-max flex-col gap-2 top-10 right-0 bg-white shadow-lg rounded-lg p-4 hidden group-hover:flex">
                  <div>{user?.user?.userName}님</div>
                  <Link to="/mypage" className="block transition hover:text-green-400">
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-transparent hover:text-green-400 transition"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-green-400 hover:bg-green-500 transition text-white font-bold"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-2 rounded-xl bg-transparent hover:text-green-400 transition"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
          <button
            onClick={handleSideClick}
            className="text-xl text-gray-500 cursor-pointer p-2 md:hidden"
          >
            <CiMenuBurger />
          </button>
        </div>
      </Inner>
      {isSearchOpen && (
        <>
          <Fade isOpen={isSearchOpen} handleClick={handleClick} />
          <SearchOverlay handleClick={handleClick} />
        </>
      )}
      {/* sideMenu */}
      <div>
        <Fade isOpen={isSideMenuOpen} handleClick={handleSideClick} />
        <div
          className={`fixed right-0 bg-white p-4 transition-allduration-300 ease-in-out w-full h-screen overflow-y-auto transition-all ${
            isSideMenuOpen ? "top-0" : "-top-full"
          }`}
        >
          <div className="flex items-center gap-4 mt-4">
            {user ? (
              <div className="relative">
                {/* dropdown */}
                <div className="rounded-full w-10 h-10 transition text-white font-bold">
                  <img
                    src={
                      user?.user.profileImageUrl ||
                      "assets/images/common/default_profile.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className=" p-4">
                  <Link
                    to="/mypage"
                    className="hover:text-green-400 transition"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-2 py-2 rounded-xl hover:text-green-400 transition cursor-pointer"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-green-400 hover:bg-green-500 transition text-white font-bold"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-2 rounded-xl bg-transparent hover:text-green-400 transition"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
          <button
            className="absolute top-4 right-4 text-gray-500 cursor-pointer p-2"
            onClick={handleSideClick}
          >
            <RiCloseLargeLine />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
