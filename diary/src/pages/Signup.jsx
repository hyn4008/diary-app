import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const nav = useNavigate();

    const onSubmit = async () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/auth/signup", {
                username,
                password,
                nickname,
            });
            alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
            nav("/login");
        } catch (error) {
            alert('회원가입에 실패했습니다. 다시 시도해주세요');
            console.error('회원가입에 실패했습니다. 다시 시도해주세요', error);
        }
    }

    return (
        <div>
            <h1>회원가입</h1>
            <h3>서비스 가입을 위한 정보를 입력해주세요</h3>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={onSubmit}>회원가입</button>
        </div>
    );
}

export default Signup;