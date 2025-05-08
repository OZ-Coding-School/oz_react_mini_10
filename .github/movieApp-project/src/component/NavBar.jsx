
import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <div className="flex justify-between items-center bg-gray-600 p-3" >
            <Link to = '/'> <h2 className="text-4xl pl-7">OZ무비</h2></Link>
            <input className="bg-white" type="" placeholder="검색" />
            <div className="flex space-x-4 pr-7">
                <button className="bg-blue-800 w-20 h-10 rounded-lg text-white">로그인</button>
                <button className="bg-blue-800 w-20 h-10 rounded-lg text-white">회원가입</button>
            </div>
        </div>
    )
}

export default NavBar