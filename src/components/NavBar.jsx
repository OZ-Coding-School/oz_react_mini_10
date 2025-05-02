import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";

function NavBar() {

    return(

        <div className="flex">
            <Link to = "/">
                <h1 className="text-[pink]]">oz무비사이트</h1>
            </Link>
            <Link to ="/join">
                <button>회원가입하기</button> 
            </Link>
            <Link to ="/login">
                <button>로그인하기</button> 
            </Link>
            <input/>

           


        </div>
        
    )
}

export default NavBar;