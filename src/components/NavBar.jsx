// 모든 페이지에 상단바 역할(고정)

// 기본적으로 가져와야하는세팅
// useSearchParams은 주소창에서 ?query 다음에나오는 주소같은것 id
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce(search, 300);
  // 지연시간이 지난다음에  새로운 값이 반환되는 걸 커스텀훅으로 useDebounce라고만들었고
  // 여기서 300ms지난 다음에 새롭게 반환되는 값을 debouncedSearch라는 변수명으로 받음.
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  // API키 민감정보라 직접작성안하고 .env에 넣고 불러옴

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // input 값 변경 eventhandler

  // 메인 useEffect
  // debouncedSearch 값이 존재한다는건 검색어를 뭔가 입력했다는거
  // 그럼 setSearchParams로 query를 업데이트하고
  // 아니면 안한다.

  useEffect(() => {
    // console.log(searchParams.get("query"));
    if (debouncedSearch) {
      setSearchParams({ query: debouncedSearch }); //{ query: debouncedSearch } query라는 key에 debouncedSearch 값을 넣은 객체
    }
  }, [debouncedSearch, setSearchParams]);
  // 기본 if구문 / if (조건) {실행문}
  //1. if(!debouncedSearch) return;
  // setSearchParams( { query: debouncedSearch });

  //2. debouncedSearch ? setSearchParams({ query: debouncedSearch}) : null ;

  //3. debouncedSearch && setSearchParams({ query: debouncedSearch });

  return (
    // nav 네비게이션 그냥의미없는태그
    <nav className="navbar">
      <h1>OZ무비</h1>

      {/* input 검색창 넣기  */}

      {/* 검색 입력 - setSearch 업뎃 - useDebounce 처리 - searchParams 호출 */}
      <input
        type="text"
        placeholder="영화검색"
        value={search}
        onChange={handleChange}
        style={{ padding: "1rem", fontSize: "1rem", marginRight: "1rem" }}
      />
      <div>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
