import Inner from "@components/common/Inner";
import Input from "@components/common/Input";
import { useSupabaseAuth } from "@supabaseJS/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp, login } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
      name: { value: name },
    } = e.target;
    
    try {
      const userInfo = await signUp({
        email,
        name,
        password,
      });
      if (userInfo?.user) {
        const loginInfo = await login({
          email,
          password,
        });
        if (loginInfo?.user) {
          alert("회원가입 및 로그인 성공");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Inner className="flex items-center justify-center">
      <div className="w-1/2 rounded-xl border border-gray-300 bg-white px-6 py-10">
        <h1 className="text-2xl font-semibold">회원가입</h1>
        <form className="mb-4 mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="이메일을 입력하세요."
            name="email"
            id="email"
            label="이메일"
          />
          <Input
            type="text"
            placeholder="2~8자, 한글·영어만 사용"
            name="name"
            id="name"
            label="이름"
          />
          <Input
            type="password"
            placeholder="영문 대문자/소문자 + 숫자 조합 사용"
            name="password"
            id="password"
            label="비밀번호"
          />
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            name="confirmPassword"
            id="confirmPassword"
            label="비밀번호 확인"
          />
          <button
            className="bg-green-400 p-2 rounded-md text-white"
            type="submit"
          >
            회원가입
          </button>
        </form>
        {/* 간편 SNS */}
        {/* <div>
          <button
            type="submit"
            color="linePrimary"
            className="mb-4 flex w-full items-center p-2 rounded-md  border border-gray-200 justify-center gap-2 cursor-pointer"
          >
            <FcGoogle />
            Sign in with Google
          </button>
        </div> */}
      </div>
    </Inner>
  );
};

export default Signup;
