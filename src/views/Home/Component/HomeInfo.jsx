import React from 'react';
import HomeInfoStyle from './HomeInfo.module.css';
import emailIcon from '../../../assets/SVGs/email.svg'

const HomeInfo = React.memo(function HomeInfo({user}) {

    return (
        <div className={HomeInfoStyle.container}>
            <img src={user.avatar} alt='用户头像' className={HomeInfoStyle.avatar}/>
            <p className={HomeInfoStyle.username}>{user.username}</p>
            <div className={HomeInfoStyle.email}>
                <img src={emailIcon} alt='邮件' className={HomeInfoStyle.emailIcon}/>
                <p className={HomeInfoStyle.emailText}>{user.email}</p>
            </div>
        </div>
    )
});

export default HomeInfo;