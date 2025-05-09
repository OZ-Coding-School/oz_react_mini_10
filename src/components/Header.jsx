import Logo from "@components/ui/header/Logo";
import SearchBar from "@components/ui/header/SearchBar";
import { cn } from "@utils/cn";

const Header = ({ onFixed }) => {
  return (
    <div
      className={cn(
        "mx-auto flex h-18 w-full items-center gap-8 px-4 lg:max-w-5xl xl:max-w-7xl",
        {
          "fixed left-1/2 z-999 translate-x-[-50%] text-white": onFixed,
        },
      )}
    >
      <Logo />
      <SearchBar onFixed={onFixed} />
    </div>
  );
};
export default Header;
