import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout({ handleLoad, page }) {
  return (
    <>
      <NavBar handleLoad={handleLoad} page={page} />
      <Outlet />
    </>
  );
}
