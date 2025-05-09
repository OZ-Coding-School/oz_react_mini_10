import { useState } from "react";
import { InputComponent } from "./InputComponent";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const { signUp } = useSupabaseAuth();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailFormatValid = emailRegex.test(email);
        setIsEmailValid(isEmailFormatValid);

        if (!isEmailFormatValid) {
            setErrorMessage("이메일 형식이 올바르지 않습니다.");
            return
        }

        if (password !== passwordConfirm) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const { error } = await signUp({ email, password, userName });


        if (error) {
            setErrorMessage(error.message);
            alert("실패");
        } else {
            navigate("/login"); 
            alert("회원가입 완료.");
        }
    };

    return (
        <div className="h-full w-full max-w-[500px] mx-auto">
            <div className="text-white mt-[125px] mb-[50px] text-3xl">회원가입</div>
            <form action="" className="flex flex-col text-white bg-[#181a21] p-10 rounded" onSubmit={handleSubmit}>
                <InputComponent
                    label="이메일"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error="이메일 형식으로 작성해 주세요."
                    placeholder="example@gmail.com"
                />
                <InputComponent
                    label="이름"
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    error="이름을 입력해 주세요."
                    placeholder="2~8자, 숫자, 한글, 영어만 사용"
                />
                <InputComponent
                    label="비밀번호"
                    type="password"
                    id="signupPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error="영문 대문자/소문자와 숫자와 조합을 사용해주세요."
                    placeholder="영문 대문자/소문자 + 숫자와 조합 사용"
                />
                <InputComponent
                    label="비밀번호 확인"
                    type="password"
                    id="checkPassword"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    error="비밀번호가 일치하지 않습니다."
                    placeholder="비밀번호 확인란"
                    password={password}
                />
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
                <div className="flex items-center gap-2 mt-3">
                    <input type="checkbox" id="check" required />
                    <label htmlFor="check" className="text-[#ffffffa6] text-sm select-none">
                        Steam <a href="https://store.steampowered.com/subscriber_agreement/"
                            className="hover:text-sky-300 text-white" target="_blank">이용약관 </a>
                        및 <a href="https://store.steampowered.com/privacy_agreement/"
                            className="hover:text-sky-300 text-white" target="_blank">Valve 개인정보 처리방침</a>
                        에 동의합니다.
                    </label>
                </div>

                <button type="submit" className="mt-5 p-3 button-color rounded">회원가입</button>
            </form>
        </div>
    );
}