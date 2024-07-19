import styles from '../../css/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
      };

    return (
        <div class="loginDiv">
            <div class="headerDiv" />
            <div class="formContainer">
                <form>
                    <h2>로그인</h2>
                    <p>아이디</p>
                    <input type="text" />
                    <p>비밀번호</p>
                    <input type="password" />
                    <button  onClick={handleLogin}>로그인</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
