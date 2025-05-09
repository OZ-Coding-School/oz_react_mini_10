import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout({query, setQuery}) {
    return (
        <>
            <NavBar query={query} setQuery={setQuery}/>
            <Outlet />
        </>
    )
}

export default Layout