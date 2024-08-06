import loginStyle from './LoginView.module.css'
import logoIcon from '../../assets/SVGs/logo-cat.svg'
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {login, register} from "../../api/apiFetch.js";

const LoginView = () => {

    const Navigate = useNavigate()

    const [username, setUsername] = useState('') // 用户名

    const [password, setPassword] = useState('') // 用户密码

    const [token, setToken] = useState('') // 用户登录后token

    const [user, setUser] = useState({}) // 用户个人信息

    const loginToCat = async() => {

        let url = ('/auth/token')

        let res = await login(url,username,password)
        console.log(res)
        if (res.token) {

            // 全局存储token，不必一级一级传递
            localStorage.setItem('token',res.token)
            localStorage.setItem('avatar',res.user.avatar)

            setToken(res.token)
            setUser(res.user)
            Navigate('/List',{state:{...res.user,token:res.token}})
        } else if (res.error === "error_user_not_found") {
            // 注册
            let url = ('/join')

            let resR =await register(url,username,password)
            console.log(resR)

            let res = await login('/auth/token',username,password)
            if(res.token){

                // 全局存储token，不必一级一级传递
                localStorage.setItem('token',res.token)
                localStorage.setItem('avatar',res.user.avatar)

                setToken(res.token)
                setUser(res.user)
                Navigate('/List',{state:{...res.user,token:res.token}})
            }
        } else {
            alert('error password')
        }
    }

    return (
        <React.Fragment>
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
                                   onChange={(e)=> {
                                       setUsername(e.target.value)
                                   }}/>
                            <input type={"password"} placeholder={"Password"} className={loginStyle.passwordInput}
                                   onChange={(e)=>{
                                       setPassword(e.target.value)
                                   }}/>
                        </div>
                    </div>
                </div>
                <div className={loginStyle.button} onTouchStart={loginToCat}>
                    SIGN IN
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoginView