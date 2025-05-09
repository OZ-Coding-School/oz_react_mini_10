import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      className="mr-auto flex h-10 items-center rounded-3xl break-keep"
      to={"/"}
    >
      <div className="text-xl font-bold">오즈무비</div>
    </Link>
  );
};
export default Logo;
