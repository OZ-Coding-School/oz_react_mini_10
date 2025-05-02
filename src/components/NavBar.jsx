// 모든 페이지에 상단바 역할(고정)

export default function NavBar() {
  return (
    // nav 네비게이션 그냥의미없는태그
    <nav className="navbar">
      <h1>OZ무비</h1>
      <div>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
