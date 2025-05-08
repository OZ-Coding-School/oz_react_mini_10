import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useDebounce from '../hooks/useDebounce'

export default function Navbar () {
  const [searchInput, setSearchInput] = useState("")
  const debouncedSearch = useDebounce(searchInput, 500)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (debouncedSearch) {
      navigate(`/search?query=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchInput("")
    }
  }, [location.pathname])

    return (
<nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
  <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
    <span role="img" aria-label="popcorn">🍿</span>
    <span>OZ CINEMA</span>
  </Link>

  
  <div className="flex items-center space-x-2 w-1/2">
    <input 
      type="text" 
      placeholder="Search title..." 
      className="px-3 py-2 rounded-md w-full text-black outline-none" 
      value={searchInput}
      onChange={(e)=>{
        const value = e.target.value;
        setSearchInput(value);
      }} 
    />
    <button 
      onClick={() => console.log("검색 실행:", debouncedSearch)} 
      className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition"
    >
      Search
    </button>
  </div>

  <div className="flex space-x-4">
    <button className="bg-red-600 px-4 py-2 rounded">Login</button>
    <button className="bg-yellow-500 px-4 py-2 rounded">Sign Up</button>
  </div>
</nav>
    )
}
