import { Link } from 'react-router-dom'
import logoImage from '../assets/logo2.png'

function NavBar() {
    return (
        <header className="w-full h-[75px] bg-[#171a21] flex justify-around items-center z-10 fixed top-0">
            <Link to={"/"} className='flex items-center'>
                <img src={logoImage} alt="" className="w-[50px]" />
                <span className='text-[1.5rem] text-white'>스팀무비</span>
            </Link>
            <input type="text" className="bg-white rounded-[50px] w-[50%] h-[40px] px-[20px]" />
            <div className="flex text-[white] gap-[10px]">
                <button className="button-color p-[10px] rounded-[10px]">로그인</button>
                <button className="button-color p-[10px] rounded-[10px]">회원가입</button>
            </div>
        </header>
    )
}

export default NavBar