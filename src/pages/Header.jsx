import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-xl font-bold">OZ 무비</h1>
      </Link>
      <div className="space-x-4">
        <button className="bg-purple-600 text-white px-4 py-1 rounded">로그인</button>
        <button className="bg-purple-600 text-white px-4 py-1 rounded">회원가입</button>
      </div>
    </header>
  );
}

export default Header;