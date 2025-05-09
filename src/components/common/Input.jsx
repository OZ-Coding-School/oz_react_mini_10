import { useState } from "react";

const Input = ({ label, name, id, type = "text", placeholder }) => {
  const [error, setError] = useState(null);

  const validators = {
    name: (v) =>
      /^[a-zA-Z가-힣0-9]{2,8}$/.test(v) ||
      "이름은 2~8자, 숫자·한글·영어만 사용하세요",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "이메일 형식을 확인하세요",
    password: (v) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,}$/.test(v) ||
      "비밀번호는 영문 대소문자 + 숫자 조합이어야 합니다",
    confirmPassword: (v, pwd) => v === pwd || "비밀번호가 일치하지 않습니다",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setError(null);
      return;
    }
    const validator = validators[id];
    if (!validator) return;

    let result = validator(value);
    if (id === "confirmPassword") {
      const password = e.target.form.password.value;
      result = validator(value, password);
    }
    setError(result === true ? null : result);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        onChange={handleChange}
      />
      <div className="mt-1">
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    </div>
  );
};

export default Input;
