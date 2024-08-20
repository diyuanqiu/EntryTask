import TopStyle from './ActTop.module.css';
import moment from 'moment';
import React, {useContext} from "react";
import {ActivityDetailContext} from "../../Context/ActivityDetailContext.jsx";

const ActTop = React.memo(function ActTop() {

    const eventDetail = useContext(ActivityDetailContext);

    function getPublishedInterval() {
        const publishedDate = moment(eventDetail.begin_time).format("DD MMM YYYY HH:mm");
        const nowDate = moment().format("DD MMM YYYY HH:mm");
        return moment(nowDate).diff(moment(publishedDate), "days");
    }

    const publishedInterval = getPublishedInterval();

    return (
        <div className={TopStyle.top}>
            <div className={TopStyle.channel}>
                {eventDetail.channel.name}
            </div>
            <div className={TopStyle.title}>
                {eventDetail.name}
            </div>
            <div className={TopStyle.userInfo}>
                <img src={eventDetail.creator.avatar} alt={"用户头像"} className={TopStyle.userAva} />
                <div className={TopStyle.nameAndDay}>
                    <span className={TopStyle.userName}>{eventDetail.creator.username}</span>
                    <span className={TopStyle.day}>
                        {publishedInterval === 0 ? "Published today" : `Published ${publishedInterval} days ago`}
                    </span>
                </div>
            </div>
        </div>
    );
});

export default ActTop;