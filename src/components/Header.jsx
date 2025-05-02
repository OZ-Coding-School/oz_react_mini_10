import { cn } from "@utils/cn";
import { Link, useLocation } from "react-router";

const Header = () => {
  const { pathname } = useLocation();
  const onDetailPage = pathname.startsWith("/detail");

  return (
    <div
      className={cn(
        "mx-auto flex h-18 w-full items-center gap-8 lg:max-w-5xl xl:max-w-7xl",
        {
          "fixed left-1/2 z-999 translate-x-[-50%] text-white": onDetailPage,
        },
      )}
    >
      <Link className="mr-auto flex h-10 items-center rounded-3xl" to={"/"}>
        <div className="text-xl font-bold">오즈무비</div>
      </Link>
      <div
        className={cn(
          "flex h-10 w-100 items-center rounded-3xl px-6 shadow-md",
          {
            "backdrop-blur-2xl": onDetailPage,
          },
        )}
      >
        Search
      </div>
      <div
        className={cn(
          "flex h-10 items-center rounded-3xl px-6 shadow-md backdrop-blur-2xl",
        )}
      >
        로그인
      </div>
    </div>
  );
};
export default Header;
