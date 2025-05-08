import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black text-white py-4 shadow-md fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4">                
                <div className="text-3xl font-extrabold cursor-pointer">
                    <Link to="/" className="text-red-600">NETFLIX</Link>
                </div>
                
                <div className="w-2/3 md:w-1/3 flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="영화, TV 프로그램 검색"
                        className="w-full py-2 px-4 rounded-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                </div>                
                <div className="flex space-x-4">
                    <button className="bg-red-600 py-2 px-6 rounded-full text-white hover:bg-red-700 transition-colors">
                        로그인
                    </button>
                    <button className="py-2 px-6 border border-red-600 rounded-full text-white hover:bg-red-600 hover:text-black transition-colors">
                        회원가입
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
