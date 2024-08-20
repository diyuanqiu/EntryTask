import ListItemStyle from './ListItem.module.css';
import timeIcon from '../../assets/SVGs/time.svg';
import checkOutlineIcon from '../../assets/SVGs/check-outline.svg';
import checkIcon from '../../assets/SVGs/check.svg';
import likeIcon from '../../assets/SVGs/like.svg';
import likeOutlineIcon from '../../assets/SVGs/like-outline.svg';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {changeGoingStatus, changeLikeStatus} from "../../api/apiFetch.js";
import React, {useContext, useState} from "react";
import {EventsContext} from "../../context/EventsContext.jsx";

const ListItem = React.memo(function ListItem({param}) {

    const Navigate = useNavigate();

    const [event, setEvent] = useState(param);

    const { setEventsArr } = useContext(EventsContext);
    // 更新全局状态
    const updateGlobalEvent = (updatedEvent) => {
        setEventsArr(prevEvents =>
            prevEvents.map(e => e.id === updatedEvent.id ? updatedEvent : e)
        );
    };
    // 参与或取消参与
    async function changeGoing(){

        try {
            await changeGoingStatus(event.id, event.me_going);

            const updatedEvent = {
                ...event,
                me_going: !event.me_going,
                goings_count: event.me_going ? event.goings_count - 1 : event.goings_count + 1,
            };
            setEvent(updatedEvent);
            updateGlobalEvent(updatedEvent); // 同步更新全局状态
        } catch (error) {
            console.error(error);
        }
    }

    // 喜欢或取消喜欢
    async function changeLike() {

        try {
            await changeLikeStatus(event.id, event.me_likes);

            const updatedEvent = {
                ...event,
                me_likes: !event.me_likes,
                likes_count: event.me_likes ? event.likes_count - 1 : event.likes_count + 1,
            };
            setEvent(updatedEvent);
            updateGlobalEvent(updatedEvent); // 同步更新全局状态
        } catch (error) {
            console.error(error);
        }
    }

    const toDetail = () => {
        Navigate('/Detail', { state: {event}});
    }

    return (
        <div className={ListItemStyle.container}>
            <div className={ListItemStyle.topInfo}>
                <div className={ListItemStyle.userInfo}>
                    <img src={event.creator.avatar} alt={'用户头像'} className={ListItemStyle.userAva}/>
                    <span className={ListItemStyle.userName}> {event.creator.username} </span>
                </div>
                <div className={ListItemStyle.channel}>
                    {event.channel.name}
                </div>
            </div>
            <div className={ListItemStyle.actInfo}>
                <div>
                    <div className={ListItemStyle.actTitle} onClick={toDetail}>
                        {event.name}
                    </div>
                    <div className={ListItemStyle.actTime}>
                        <img src={timeIcon} alt={'时间图标'} className={ListItemStyle.timeIcon}/>
                        <span
                            className={ListItemStyle.time}>{`${moment(event.begin_time).format('DD MMM YYYY HH:mm')} - ${moment(event.end_time).format('DD MMM YYYY HH:mm')}`}</span>
                    </div>
                </div>
                {event.images?.length > 0 &&
                    <img src={event.images[1]} alt={'预览图'} className={ListItemStyle.testImage}/>
                }
            </div>
            <div className={ListItemStyle.descrip}>
                {event.description}
            </div>
            <div className={ListItemStyle.goAndLike}>
                <div className={ListItemStyle.goLike} onClick={changeGoing}>
                    <img src={event.me_going ? checkIcon : checkOutlineIcon} alt={'参加'}
                         className={ListItemStyle.Icon}/>
                    <span className={ListItemStyle.Text}>
                        {event.me_going ? 'I am going' : `${event.goings_count} Going`}
                    </span>
                </div>
                <div className={ListItemStyle.goLike} onClick={changeLike}>
                    <img src={event.me_likes ? likeIcon : likeOutlineIcon} alt={'喜欢'} className={ListItemStyle.Icon}/>
                    <span className={ListItemStyle.Text}>
                        {event.me_likes ? 'I like it' : `${event.likes_count} Likes`}
                    </span>
                </div>
            </div>
        </div>
    )
});

export default ListItem