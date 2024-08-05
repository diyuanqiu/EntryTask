import DownStyle from './ActDownBar.module.css'
import React, {useEffect} from "react";
import commentIcon from '../../../assets/SVGs/comment-single.svg'
import likeIcon from '../../../assets/SVGs/like.svg'
import unlikeIcon from '../../../assets/SVGs/like-outline-black.svg'
import checkIcon from '../../../assets/SVGs/check.svg'
import uncheckIcon from '../../../assets/SVGs/check-outline-black.svg'
import {changeGoingStatus, changeLikeStatus} from "../../../api/apiFetch.js";

const ActDownBar = (props) => {

    // eslint-disable-next-line react/prop-types
    const {param, isComment, setIsComment } = props;

    const [isJoined, setIsJoined] = React.useState(false)

    const [isLiked, setIsLiked] = React.useState(false)

    const handleIsLiked = async () => {
        let url = `/events/${param.id}/likes`

        await changeLikeStatus(url, param.token, param.me_likes)

        param.me_likes = !param.me_likes

        if (param.me_likes) {
            param.likes_count += 1
        } else {
            param.likes_count -= 1
        }

        setIsLiked(param.me_likes)
    }

    const handleIsJoined = async () => {
        let url = `/events/${param.id}/participants`

        await changeGoingStatus(url, param.token, param.me_going)

        param.me_going = !param.me_going

        if (param.me_going) {
            param.goings_count += 1
        } else {
            param.goings_count -= 1
        }

        setIsJoined(param.me_going)
    }

    useEffect(()=>{
        setIsLiked(param.me_likes)
        setIsJoined(param.me_going)
    },[param.me_going,param.me_likes])

    return (
        <React.Fragment>
            <div className={DownStyle.container}>
                <div className={DownStyle.left}>
                    <img src={commentIcon} alt='comment' className={DownStyle.Icon} onClick={()=>setIsComment(!isComment)}/>
                    <img src={isLiked ? likeIcon : unlikeIcon} alt='like' className={DownStyle.Icon} onClick={handleIsLiked}/>
                </div>
                <div className={DownStyle.right} onClick={handleIsJoined}>
                    <img src={isJoined ? checkIcon : uncheckIcon} alt='check' className={DownStyle.Icon}/>
                    {isJoined ? <span className={DownStyle.GoingText}>I am going</span> : <span className={DownStyle.Text}>Join</span>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActDownBar;