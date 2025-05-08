import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { keyword } = useParams();

  useEffect(() => {
    if (keyword) {
      setSearchText(keyword);
    }
  }, [keyword]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/videos/${searchText}`);
    }
  };

  return (
    <nav className="bg-red-500 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            OZ_Movie
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300 transition">
              홈
            </Link>
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="영화 검색..."
                className="bg-white rounded-l-sm text-black px-3 py-1 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-r-sm transition"
              >
                검색
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
