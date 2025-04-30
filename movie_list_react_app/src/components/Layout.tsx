import NavBar from "./NavBar.tsx";
import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}