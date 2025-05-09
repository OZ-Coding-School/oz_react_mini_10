import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    if (keyword) {
      setSearchText(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    if (debouncedSearchText) {
      setSearchParams({ query: debouncedSearchText });
      navigate(`/videos/${debouncedSearchText}`);
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchText, setSearchParams, navigate]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="영화 검색..."
                className="bg-white rounded-l-sm text-black px-3 py-1 focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
