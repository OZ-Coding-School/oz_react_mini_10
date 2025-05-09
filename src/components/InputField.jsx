import React from "react";
import { useState } from "react";

//하나의 공통 인풋 컴포넌트. 이걸 프롭스로 내려서 재사용이 필요한 곳에서 재사용

function InputWithLabel({ label,id, type, name, placeholder, compareValue, onValueChange }) { 
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (onValueChange) {
        onValueChange(inputValue);
      }
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      } else {
        setErrorMessage("");
      }
    }

    if (type === "password" && name === "password") {
      if (inputValue.length < 6) {
        setErrorMessage("비밀번호는 최소 6자 이상이어야 해요.");
      } else {
        setErrorMessage("");
      }
    }

    if (name === "name") {
      if (inputValue.trim() === "") {
        setErrorMessage("이름을 입력해주세요.");
      } else {
        setErrorMessage("");
      }
    }

     // ✅ 비밀번호 확인 유효성 검사
     if (name === "confirmPassword") {
        setErrorMessage(
          compareValue && inputValue !== compareValue
            ? "비밀번호가 일치하지 않아요."
            : ""
        );
      }
    


  };
    
    return (
      <div>
        <label htmlFor={id} className="mb-2 block">{label}</label>
        <input id ={id} type={type} name={name} placeholder={placeholder}  value={value} 
        onChange={handleChange}  />
        {errorMessage && <span >{errorMessage}</span>}
      </div>
    );
  }
  

export default InputWithLabel;