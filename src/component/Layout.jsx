import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="pt-[64px]">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;