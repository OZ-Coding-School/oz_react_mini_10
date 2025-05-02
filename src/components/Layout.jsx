import Header from "@components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full justify-center">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
