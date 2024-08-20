import ParicipantStyle from './ActParticipantAndLIkes.module.css';
import goingIcon from '../../../../assets/SVGs/check-outline.svg'
import likeIcon from '../../../../assets/SVGs/like-outline.svg'
import React from "react";

const ActParticipantAndLikes = React.memo(function ActParticipantAndLikes({participants,likes}) {

    return (
        <>
            <div className={ParicipantStyle.List} id={"Participants"}>
                <div className={ParicipantStyle.GoingAndLike}>
                    <img src={goingIcon} alt='goingIcon' className={ParicipantStyle.Icon}/>
                    <span className={ParicipantStyle.Text}>{participants.length} going</span>
                </div>
                <ul className={ParicipantStyle.goingList}>
                    {participants.map((item) => (
                        <li key={item.id}>
                            <img src={item.avatar} alt='用户头像' className={ParicipantStyle.Icon}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={ParicipantStyle.List}>
                <div className={ParicipantStyle.GoingAndLike}>
                    <img src={likeIcon} alt='likeIcon' className={ParicipantStyle.Icon}/>
                    <span className={ParicipantStyle.Text}>{likes.length} likes</span>
                </div>
                <ul className={ParicipantStyle.goingList}>
                    {likes.map((item) => (
                        <li key={item.id}>
                            <img src={item.avatar} alt='用户头像' className={ParicipantStyle.Icon}/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
});

export default ActParticipantAndLikes;