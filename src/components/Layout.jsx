import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout({query, setQuery}) {
    return (
        <>
            <NavBar/>
            <Outlet />
        </>
    )
}

export default Layout