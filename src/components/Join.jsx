import { useState } from "react";
import InputWithLabel from "./Inputfield";
import { useSupabaseAuth } from "../supabase";

function Join() {
  const { signUp } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { error } = await signUp({ email, password, userName });

    if (error) {
      console.error('회원가입 실패:', error.message);
    } else {
      console.log('회원가입 성공!');
      // 회원가입 성공 후 이동 등 처리 가능
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputWithLabel 
        label="email"
        type="email"
        name="useremail"
        placeholder="이메일을 입력해주세요"
        onValueChange={setEmail}
      />

      <InputWithLabel 
        label="name"
        type="text"
        name="name"
        placeholder="이름을 입력해주세요"
        onValueChange={setUserName}
      />

      <InputWithLabel 
        label="password"
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        onValueChange={setPassword}
      />

      <InputWithLabel 
        label="password confirm"
        type="password"
        name="confirmPassword"
        placeholder="다시 한번 비밀번호를 입력하세요"
        onValueChange={setConfirmPassword}
        compareValue={password}
      />

      <button type="submit">회원가입</button>
    </form>
  );
}

export default Join;
