import React, { useState } from "react"
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";


function Layout() {
    const [searchTerm, setSearchTerm] = useState('');  // 검색어 상태 관리

    return(
        <div>
            {/* NavBar 컴포넌트에 setSearchTerm을 prop으로 전달 */}
            <NavBar setSearchTerm={setSearchTerm} />
               {/* Layout의 Outlet을 사용하여 자식 컴포넌트들이 렌더링될 위치 */}
                 <Outlet context={{ searchTerm }} /> {/* context를 통해 searchTerm을 자식 컴포넌트에 전달 */}
        </div>
    )
    
}

export default Layout;