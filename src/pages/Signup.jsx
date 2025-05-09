import React, { useState } from 'react';
import InputField from '../InputField';
import { useSupabaseAuth } from '../hook/useSupabaseAuth';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { signUp } = useSupabaseAuth();

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[a-zA-Z가-힣0-9]{2,8}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!nameRegex.test(name)) newErrors.name = '이름은 2~8자 사이의 숫자, 한글, 영어만 사용 가능합니다.';
        if (!emailRegex.test(email)) newErrors.email = '유효한 이메일 형식을 입력하세요.';
        if (!passwordRegex.test(password)) newErrors.password = '비밀번호는 대문자, 소문자, 숫자의 조합이어야 합니다.';
        if (password !== confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const { user, error } = await signUp({ email, password, userName: name });
            if (user) {
                localStorage.setItem('userInfo', JSON.stringify(user));
                // 회원가입 성공 후 처리 로직 추가
                console.log('회원가입 성공:', { name, email, password });
            } else {
                console.error(error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField label="이름" type="text" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
            <InputField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <InputField label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
            <InputField label="비밀번호 확인" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} />
            <button type="submit">회원가입</button>
        </form>
    );
};

export default Signup;


