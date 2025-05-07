export default function NavBar() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">🎬 OZ무비</div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="영화 검색"
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="text-sm px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
            로그인
          </button>
          <button className="text-sm px-4 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition">
            회원가입
          </button>
        </div>
      </header>
    </>
  );
}
