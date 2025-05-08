import Header from "@components/Header";
import { Outlet, useLocation } from "react-router";

const fixedRoutes = ["/detail"];

const Layout = () => {
  const { pathname } = useLocation();
  const onFixed = fixedRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      <Header onFixed={onFixed} />
      <main className="mx-auto flex w-full justify-center">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
