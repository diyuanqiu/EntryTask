import React from 'react';
import HomeInfoStyle from './HomeInfo.module.css';
import emailIcon from '../../assets/SVGs/email.svg'

const HomeInfo = (props) => {

    const {param} = props

    return (
        <React.Fragment>
            <div className={HomeInfoStyle.container}>
                <img src={param.avatar} alt='用户头像' className={HomeInfoStyle.avatar}/>
                <p className={HomeInfoStyle.username}>{param.username}</p>
                <div className={HomeInfoStyle.email}>
                    <img src={emailIcon} alt='邮件' className={HomeInfoStyle.emailIcon}/>
                    <p className={HomeInfoStyle.emailText}>{param.email}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomeInfo;