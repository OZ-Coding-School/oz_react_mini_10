import { IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Header({ searchQuery, setSearchQuery }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="flex justify-between items-center bg-black p-4 text-white">
      <Link to="/">
        <h1 className="text-xl font-bold">OZ 무비</h1>
      </Link>
      <form onSubmit={handleSubmit} className="relative flex items-center space-x-4">
        <input
          type="text"
          placeholder="영화 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 rounded pr-10 text-black"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <IoSearchSharp className="text-gray-600 w-5 h-5" />
        </button>
      </form>
      <div className="flex space-x-2">
        <button className="bg-purple-600 text-white px-4 py-1 rounded">로그인</button>
        <button className="bg-purple-600 text-white px-4 py-1 rounded">회원가입</button>
      </div>
    </header>
  );
}

export default Header;
