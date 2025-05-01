
import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <div className="flex justify-between items-center bg-gray-600 p-3" >
            <Link to = '/'> <h2 className="text-4xl">OZ무비</h2></Link>
            <input className="bg-white" type="" placeholder="검색" />
            <div className="flex space-x-4">
                <button>로그인</button>
                <button>회원가입</button>
            </div>
        </div>
    )
}

export default NavBar