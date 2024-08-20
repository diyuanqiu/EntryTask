import DownStyle from './ActDownBar.module.css'
import {useContext, useState} from "react";
import commentIcon from '../../../../assets/SVGs/comment-single.svg'
import likeIcon from '../../../../assets/SVGs/like.svg'
import unlikeIcon from '../../../../assets/SVGs/like-outline-black.svg'
import checkIcon from '../../../../assets/SVGs/check.svg'
import uncheckIcon from '../../../../assets/SVGs/check-outline-black.svg'
import {changeGoingStatus, changeLikeStatus} from "../../../../api/apiFetch.js";
import {ActivityDetailContext} from "../../Context/ActivityDetailContext.jsx";

function ActDownBar({setIsComment, updateParticipants, updateLikes}) {

    const eventDetail = useContext(ActivityDetailContext);

    const [event, setEvent] = useState(eventDetail);

    // 参与或取消参与
    async function handleGoingClick(){
        try {
            await changeGoingStatus(event.id, event.me_going);
            setEvent(prevEvent => ({
                ...prevEvent,
                me_going: !prevEvent.me_going,
                goings_count: prevEvent.me_going ? prevEvent.goings_count - 1 : prevEvent.goings_count + 1
            }));
            updateParticipants();
        } catch (error) {
            console.error(error);
        }
    }

    // 喜欢或取消喜欢
    async function handleLikeClick() {
        try {
            await changeLikeStatus(event.id, event.me_likes);

            setEvent(prevEvent => ({
                ...prevEvent,
                me_likes: !prevEvent.me_likes,
                likes_count: prevEvent.me_likes ? prevEvent.likes_count - 1 : prevEvent.likes_count + 1
            }));

            updateLikes();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={DownStyle.container}>
            <div className={DownStyle.left}>
                <img src={commentIcon} alt='comment' className={DownStyle.Icon}
                     onClick={() => setIsComment(true)}/>
                <img src={event.me_likes ? likeIcon : unlikeIcon} alt='like' className={DownStyle.Icon}
                     onClick={handleLikeClick}/>
            </div>
            <div className={DownStyle.right} onClick={handleGoingClick}>
                <img src={event.me_going ? checkIcon : uncheckIcon} alt='check' className={DownStyle.Icon}/>
                {event.me_going ? <span className={DownStyle.GoingText}>I am going</span> :
                    <span className={DownStyle.Text}>Join</span>}
            </div>
        </div>
    )
}

export default ActDownBar;