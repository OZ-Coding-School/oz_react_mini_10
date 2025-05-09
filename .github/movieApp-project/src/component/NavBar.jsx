
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
    const [query, setQuery] = useState('')
    // 검색어의 상태를 관리해줄 훅
    const navigate = useNavigate();
    // useNavigate를 사용해 다른 페이지로 이동할 것임.

    const handleSearch = (e) => {
        setQuery(e.target.value)
        // onchange로 들어오는 value를 setQuery에 저장
        navigate(`/search?query=${encodeURIComponent(e.target.value)}`)
        // 페이지가 자동으로 '/search?query=검색어' 경로로 이동하면서 검색 결과를 보여주는 페이지가 검색어를 받아 API 요청
    }   

    return(
        <div className = "flex justify-between items-center bg-gray-600 p-3" >
            <Link to = '/'> <h2 className="text-4xl pl-7">OZ무비</h2></Link>
            <input 
            className = "bg-white" 
            type = "text" 
            placeholder = "검색" 
            value = {query}
            onChange = {handleSearch}
            />
            <div className="flex space-x-4 pr-7">
                <button className="bg-blue-800 w-20 h-10 rounded-lg text-white">로그인</button>
                <button className="bg-blue-800 w-20 h-10 rounded-lg text-white">회원가입</button>
            </div>
        </div>
    )
}

export default NavBar