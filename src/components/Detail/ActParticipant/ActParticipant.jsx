import ParicipantStyle from './ActParticipant.module.css';
import React, {useEffect, useState} from "react";
import goingIcon from '../../../assets/SVGs/check-outline.svg'
import likeIcon from '../../../assets/SVGs/like-outline.svg'
import {fetchEventsDetail} from "../../../api/apiFetch.js";

const ActParticipant = (props) => {

    const {param} = props

    const [participants, setParticipants] = useState([])

    const [likes, setLikes] = useState([])

    const fetchParticipantsAndLikes = async () => {
        let url = `/events/${param.id}/participants`

        let res = await fetchEventsDetail(url,param.token)

        let participants = res.users.map((item, index) => (
            <li><img src={item.avatar} alt='用户头像' className={ParicipantStyle.Icon}/></li>
        ))

        setParticipants(participants)

        url = `/events/${param.id}/likes`

        res = await fetchEventsDetail(url,param.token)

        let likes = res.users.map((item, index) => (
            <li><img src={item.avatar} alt='用户头像' className={ParicipantStyle.Icon}/></li>
        ))

        setLikes(likes)
    }

    useEffect(()=>{
        fetchParticipantsAndLikes()
    },[param.id,param.goings_count,param.likes_count])

    return (
        <React.Fragment>
            <div className={ParicipantStyle.List} id={"Participants"}>
                <div className={ParicipantStyle.GoingAndLike}>
                    <img src={goingIcon} alt='goingIcon' className={ParicipantStyle.Icon}/>
                    <span className={ParicipantStyle.Text}>{param.goings_count} going</span>
                </div>
                <ul className={ParicipantStyle.goingList}>
                    {participants}
                </ul>
            </div>
            <div className={ParicipantStyle.List}>
                <div className={ParicipantStyle.GoingAndLike}>
                    <img src={likeIcon} alt='likeIcon' className={ParicipantStyle.Icon}/>
                    <span className={ParicipantStyle.Text}>{param.likes_count} likes</span>
                </div>
                <ul className={ParicipantStyle.goingList}>
                    {likes}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default ActParticipant;