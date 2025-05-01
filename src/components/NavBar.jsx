import { Link } from 'react-router-dom'
import logoImage from '../assets/oz_movie-logo.png'

function NavBar() {
    return (
        <header className="w-full h-[100px] bg-[#191919] flex justify-around items-center sticky top-0 z-10 ">
            <Link to={"/"}>
                <img src={logoImage} alt="" className="w-[100px]" />
            </Link>
            <input type="text" className="bg-white rounded-[50px] w-[50%] h-[50px] px-[20px]" />
            <div className="flex text-[white] gap-[10px]">
                <button className="bg-[#9b1bb4] p-[10px] rounded-[10px]">로그인</button>
                <button className="bg-[#9b1bb4] p-[10px] rounded-[10px]">회원가입</button>
            </div>
        </header>
    )
}

export default NavBar