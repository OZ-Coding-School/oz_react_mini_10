import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main className="p-8 h-full w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
