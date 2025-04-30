import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            OZ_Movie
          </Link>

          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-300 transition">
              홈
            </Link>
            <Link className="hover:text-gray-300 transition">즐겨찾기</Link>
            <Link className="hover:text-gray-300 transition">소개</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
