import loginStyle from './LoginView.module.css'
import logoIcon from '../../assets/SVGs/logo-cat.svg'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {login, register} from "../../api/apiFetch.js";

function LoginView() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(''); // 用户名

    const [password, setPassword] = useState(''); // 用户密码

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/List');
        }
    }, [navigate]);

    // 登录处理逻辑
    async function loginToCat() {
        if (!username || !password) {
            alert("Username or password should not be empty!");
            return;
        }
        setLoading(true);
        try {
            let res = await login(username, password, false);

            // 用户密码错误
            if (res.error === "error_password") {
                alert("Error password!");
                return;
            }

            // 用户注册
            if (res.error === "error_user_not_found") {
                const registerRes = await register(username, password, false);
                if (!registerRes.userId) {
                    alert("Error registering user!");
                    return;
                }
                res = await login(username, password);
            }

            // 用户登录成功
            if (res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('avatar', res.user.avatar);
                navigate('/List');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed due to an error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={loginStyle.container}>
            <div className={loginStyle.box}>
                <div className={loginStyle.mask}>
                    <div className={loginStyle.title}>
                        <div className={loginStyle.titleText}>
                            <p className={loginStyle.title1}>FIND THE MOST LOVED ACTIVITIES</p>
                            <p className={loginStyle.title2}>BLACK CAT</p>
                        </div>
                        <div className={loginStyle.titlePic}>
                            <img src={logoIcon} alt=' ' className={loginStyle.logoPic}/>
                        </div>
                    </div>
                    <div className={loginStyle.inputBox}>
                        <input type={"text"} placeholder={"Username"} className={loginStyle.usernameInput}
                               onChange={(e) => {
                                   setUsername(e.target.value)
                               }}/>
                        <input type={"password"} placeholder={"Password"} className={loginStyle.passwordInput}
                               onChange={(e) => {
                                   setPassword(e.target.value)
                               }}/>
                    </div>
                </div>
            </div>
            <div className={loginStyle.button} onClick={!loading ? loginToCat : null} aria-disabled={loading}>
                SIGN IN
            </div>
        </div>
    )
}

export default LoginView