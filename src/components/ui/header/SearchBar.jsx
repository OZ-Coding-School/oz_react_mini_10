import { useDebounce } from "@hooks/useDebounce";
import { cn } from "@utils/cn";
import { useNavigate } from "react-router";

const SearchBar = ({ onFixed }) => {
  const navigate = useNavigate();
  return (
    <input
      className={cn("flex h-10 w-100 items-center rounded-3xl px-6 shadow-md", {
        "backdrop-blur-2xl": onFixed,
      })}
      onChange={useDebounce((e) => {
        navigate(`/?query=${e.target.value}`);
      })}
      placeholder="검색어를 입력하세요"
    />
  );
};
export default SearchBar;
