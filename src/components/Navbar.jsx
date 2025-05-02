import { Link } from 'react-router-dom'

export default function Navbar () {
    return (
<nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
  <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
    <span role="img" aria-label="popcorn">🍿</span>
    <span>OZ CINEMA</span>
  </Link>
  <input type="text" placeholder="Search title..." className="px-3 py-2 rounded-md w-1/2" />
  <div className="flex space-x-4">
    <button className="bg-red-600 px-4 py-2 rounded">Login</button>
    <button className="bg-yellow-500 px-4 py-2 rounded">Sign Up</button>
  </div>
</nav>
    )
}
