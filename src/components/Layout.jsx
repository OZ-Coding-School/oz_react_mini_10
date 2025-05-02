// 상단바는 Layout에 포함되는것
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
