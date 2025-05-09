import React, { useState } from 'react';
import InputField from '../InputField';
import { useSupabaseAuth } from '../hook/useSupabaseAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useSupabaseAuth();

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) newErrors.email = '유효한 이메일 형식을 입력하세요.';
        if (!password) newErrors.password = '비밀번호를 입력하세요.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const userinfo = await login({ email, password });
            if (userinfo) {
                console.log('로그인 성공:', { email, password });
            } 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <InputField label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
            {errors.login && <p style={{ color: 'red' }}>{errors.login}</p>} {/* 로그인 오류 메시지 표시 */}
            <button type="submit">로그인</button>
        </form>
    );
};

export default Login;



