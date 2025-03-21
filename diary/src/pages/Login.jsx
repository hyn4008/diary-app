import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const onSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            const token = res.data;
            document.cookie = `ACCESS_TOKEN=${token}; path=/;`; // 토큰을 쿠키에 저장
            console.log('Login successful, Access token:', token);
            
            onLoginSuccess(); // 로그인 성공 시 데이터 다시 불러오기

            alert('로그인에 성공했습니다.');
            nav('/');
        } catch (error) {
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            console.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.', error);
        }
    }

    return (
        <div className='Login'>
            <h1>감정 일기장</h1>
            <h3>오늘 하루는 어땠나요? 오늘의 나를 기록해보세요</h3>
            <div>
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
            </div>
            <button onClick={onSubmit}>로그인</button>
            <p>아직 회원이 아니신가요? <span onClick={() => nav("/signup")}>회원가입</span></p>
        </div>
    );
}

export default Login;