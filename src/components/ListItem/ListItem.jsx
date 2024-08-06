import ListItemStyle from './ListItem.module.css';
import timeIcon from '../../assets/SVGs/time.svg';
import checkOutlineIcon from '../../assets/SVGs/check-outline.svg';
import checkIcon from '../../assets/SVGs/check.svg';
import likeIcon from '../../assets/SVGs/like.svg';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {changeGoingStatus, changeLikeStatus} from "../../api/apiFetch.js";

const ListItem = (props) => {

    const {param,token,avatar} = props

    // 参与图标
    const [goImage, setGoImage] = useState(null)

    // 参与文本
    const [goText, setGoText] = useState('')

    // 点赞图标
    const [likeImage, setLikeImage] = useState(null)

    // 点赞文本
    const [likeText, setLikeText] = useState('')

    // 活动预览图
    const [pic, setPic] = useState(null)

    const Navigate = useNavigate()

    useEffect(()=>{
        // 是否参与
        if (param.me_going) {
            setGoImage(<img src={checkIcon} alt={'参加'} className={ListItemStyle.Icon}/>)
            setGoText(<span className={ListItemStyle.Text}>I am going</span>)
        } else {
            setGoImage(<img src={checkOutlineIcon} alt={'未参加'} className={ListItemStyle.Icon}/>)
            setGoText(<span className={ListItemStyle.Text}>{param.goings_count} Going</span>)
        }
        // 是否喜欢
        if (param.me_likes) {
            setLikeImage(<img src={likeIcon} alt={'喜欢'} className={ListItemStyle.Icon}/>)
            setLikeText(<span className={ListItemStyle.Text}>I like it</span>)
        } else {
            setLikeImage(<img src={checkOutlineIcon} alt={'未参加'} className={ListItemStyle.Icon}/>)
            setLikeText(<span className={ListItemStyle.Text}>{param.likes_count} Likes</span>)
        }
        // 活动是否有图片
        if (param.hasOwnProperty('images') === false || param.images.length === 0) {
            setPic(<p></p>)
        } else setPic(<img src={param.images[1]} alt={'预览图'} className={ListItemStyle.testImage}/>)
    }, [param])

    // 参与或取消参与
    const changeGoing = async () => {
        let url = `/events/${param.id}/participants`

        await changeGoingStatus(url, token, param.me_going)

        param.me_going = !param.me_going

        if (param.me_going) {
            param.goings_count += 1
            setGoImage(<img src={checkIcon} alt={'参加'} className={ListItemStyle.Icon}/>)
            setGoText(<span className={ListItemStyle.Text}>I am going</span>)
        } else {
            param.goings_count -= 1
            setGoImage(<img src={checkOutlineIcon} alt={'未参加'} className={ListItemStyle.Icon}/>)
            setGoText(<span className={ListItemStyle.Text}>{param.goings_count} Going</span>)
        }
    }

    // 喜欢或取消喜欢
    const changeLike = async () => {
        let url = `/events/${param.id}/likes`

        await changeLikeStatus(url, token, param.me_likes)

        param.me_likes = !param.me_likes

        if (param.me_likes) {
            param.likes_count += 1
            setLikeImage(<img src={likeIcon} alt={'喜欢'} className={ListItemStyle.Icon}/>)
            setLikeText(<span className={ListItemStyle.Text}>I like it</span>)
        } else {
            param.likes_count -= 1
            setLikeImage(<img src={checkOutlineIcon} alt={'未参加'} className={ListItemStyle.Icon}/>)
            setLikeText(<span className={ListItemStyle.Text}>{param.likes_count} Likes</span>)
        }
    }

    const toDetail = () => {
        Navigate('/Detail', {state:{...param,token:token,avatar:avatar}})
    }

    return (
        <React.Fragment>
            <div className={ListItemStyle.container}>
                <div className={ListItemStyle.topInfo}>
                    <div className={ListItemStyle.userInfo}>
                        <img src={param.creator.avatar} alt={'用户头像'} className={ListItemStyle.userAva}/>
                        <span className={ListItemStyle.userName}> {param.creator.username} </span>
                    </div>
                    <div className={ListItemStyle.channel}>
                        {param.channel.name}
                    </div>
                </div>
                <div className={ListItemStyle.actInfo}>
                    <div>
                        <div className={ListItemStyle.actTitle} onClick={toDetail}>
                            {param.name}
                        </div>
                        <div className={ListItemStyle.actTime}>
                            <img src={timeIcon} alt={'时间图标'} className={ListItemStyle.timeIcon}/>
                            <span className={ListItemStyle.time}>{`${moment(param.begin_time).format('DD MMM YYYY HH:mm')} - ${moment(param.end_time).format('DD MMM YYYY HH:mm')}`}</span>
                        </div>
                    </div>
                    {pic}
                </div>
                <div className={ListItemStyle.descrip}>
                    {param.description}
                </div>
                <div className={ListItemStyle.goAndLike}>
                    <div className={ListItemStyle.goLike} onClick={changeGoing}>
                        {goImage}
                        {goText}
                    </div>
                    <div className={ListItemStyle.goLike} onClick={changeLike}>
                        {likeImage}
                        {likeText}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListItem