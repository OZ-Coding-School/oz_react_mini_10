import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export function InputComponent({ label, type, id, error, placeholder, password, onChange }) {

    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounce(value, 300); // 300ms 디바운스 적용

    const isInvalid = (e) => {
        if (debouncedValue.length > 0) { // 입력이 시작된 경우에만 유효성 검사
            if (type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(debouncedValue);
            }
            if (id === "loginPassword" || id === "signupPassword") {
                const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
                return debouncedValue.length < 8 || !passRegex.test(debouncedValue);
            }
            if (id === "username") {
                const usernameRegex = /^[a-zA-Z0-9가-힣]+$/;
                const length = debouncedValue.length;
                return length < 2 || length > 8 || !usernameRegex.test(debouncedValue);
            }
            if (id === "checkPassword") {
                return debouncedValue !== password;
            }
        }

        return false;
    };

    return (
        <div className="flex flex-col mb-3">
            <label htmlFor={id} className="text-white mb-1">{label}</label>
            <input type={type} id={id} placeholder={placeholder} className="bg-[#32353c] p-2 rounded text-white" required
                onChange={(e) => {
                    setValue(e.target.value);
                    if (onChange) {
                        onChange(e);
                    }
                }}
            />
            {isInvalid() && (<p htmlFor={id} className="text-red-500 text-[0.8rem] mt-2">{error}</p>)}
        </div>
    );
}