import Inner from "@components/common/Inner";
import Input from "@components/common/Input";
import { setUser } from "@store/slice/userSlice";
import { useSupabaseAuth } from "@supabaseJS/auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import KakaoImg from "/assets/images/login/kakaoButton/kakao_login_large_wide.png";

const Login = () => {
  const { login, getUserInfo, loginWithKakao, loginWithGoogle } =
    useSupabaseAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userInfo = await login({
        email,
        password,
      });
      if (userInfo?.user) {
        dispatch(setUser(userInfo));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLoginWithKakao = async () => {
    try {
      await loginWithKakao();
    } catch (error) {
      console.error("Error during Kakao login:", error);
      alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("구글 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    // login page
    <Inner className="flex items-center justify-center">
      <div className="w-1/2 rounded-xl border border-gray-300 bg-white px-6 py-10">
        <h1 className="text-2xl font-semibold">로그인</h1>
        <form className="mb-4 mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            className="border border-gray-300 rounded-lg px-4 py-2"
            //   ref={emailRef}
            placeholder="이메일"
            id="email"
            name="email"
          />
          <Input
            type="password"
            className="border border-gray-300 rounded-lg px-4 py-2"
            //   ref={passwordRef}
            placeholder="비밀번호"
            id="password"
            name="password"
          />
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">이메일 저장</label>
            </div>
            <button
              type="button"
              className="text-green-400 cursor-pointer ml-2"
            >
              비밀번호 찾기
            </button>
          </div>
          <button
            className="bg-green-400 p-2 rounded-md text-white"
            type="submit"
          >
            로그인
          </button>
        </form>
        {/* 간편로그인 */}
        <div>
          <button
            type="submit"
            color="linePrimary"
            className="mb-4 flex w-full items-center p-2 rounded-md  border border-gray-200 justify-center gap-2 cursor-pointer"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle />
            Sign in with Google
          </button>
          <button
            type="submit"
            color="linePrimary"
            className="mb-4 flex w-full cursor-pointer"
            onClick={handleLoginWithKakao}
          >
            <img src={KakaoImg} alt="kakao" className="w-full" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className="text-green-400 cursor-pointer">
            회원가입
          </Link>
        </div>
      </div>
    </Inner>
  );
};

export default Login;
