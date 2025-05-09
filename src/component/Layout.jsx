import React, { useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Navbar from './NavBar';

const Layout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearchFromNavbar = useCallback((query) => {
        if (query) {
            setSearchParams({ search: query });
        } else {
            setSearchParams({});
        }
    }, [setSearchParams]);

    return (
        <>
            <Navbar onSearch={handleSearchFromNavbar} />
            <main className="pt-[64px]">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;