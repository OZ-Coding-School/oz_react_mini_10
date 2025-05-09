import { Link, useNavigate } from "react-router-dom";
import { InputComponent } from "./InputComponent";
import { useSupabaseAuth } from "../supabase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function Login() {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useSupabaseAuth(); // loginWithGoogle 함수 추가
    const { setIsLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailFormatValid = emailRegex.test(email);
        setIsEmailValid(isEmailFormatValid);

        if (!isEmailFormatValid) {
            setErrorMessage("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
            return
        }

        const { error } = await login({ email, password });

        if (error) {
            alert("로그인 실패");
            setErrorMessage("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        } else {
            navigate("/");
            setIsLoggedIn(true);
            alert("로그인 완료");
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await loginWithGoogle();
        if (error) {
            console.error("Google 로그인 실패:", error);
            alert("Google 로그인에 실패했습니다.");
        }
    };

    return (
        <div className="h-full w-full max-w-[500px] mx-auto ">
            <div className="text-white mt-[150px] mb-[50px] text-3xl">로그인</div>
            <form className="flex flex-col text-white bg-[#181a21] p-10 rounded" onSubmit={handleSubmit}>
                <InputComponent
                    label="이메일"
                    type="email"
                    id="email"
                    error="이메일 형식으로 입력해 주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputComponent
                    label="비밀번호"
                    type="password"
                    id="loginPassword"
                    error="비밀번호는 8자 이상이어야 합니다."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                <button type="submit" className="mt-5 p-3 button-color rounded text-white font-bold focus:outline-none focus:shadow-outline">로그인</button>

                <button
                    type="button"
                    className="mt-5 p-3 button-color text-white font-bold rounded focus:outline-none focus:shadow-outline"
                    onClick={handleGoogleLogin}
                >
                    Google로 로그인
                </button>

                <p className="mt-8 flex flex-col justify-center items-center">
                    스팀무비에 처음 오셨나요?
                    <Link to={"/signup"} className="mt-5 p-3 button-color rounded w-[25%] text-center">
                        <button type="button">가입하기</button>
                    </Link>
                </p>
            </form>
        </div>
    );
}