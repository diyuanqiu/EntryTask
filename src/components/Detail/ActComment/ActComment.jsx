import CommentStyle from './ActComment.module.css'
import React, {useEffect, useState} from "react";
import userIcon from "../../../assets/SVGs/user.svg";
import replyIcon from "../../../assets/SVGs/reply.svg";
import {fetchEventsDetail} from "../../../api/apiFetch.js";
import moment from "moment";

const ActComment = (props) => {

    const {param, commentContent} = props

    const [comments, setComments] = useState([])

    const fetchComments = async () => {
        let url = `/events/${param.id}/comments`

        let res = await fetchEventsDetail(url,param.token)

        setComments(res.comments.reverse())
    }

    useEffect(()=>{
        fetchComments()
        // console.log(comments)
    },[param.id, commentContent])

    const commentInterval = (createTime) => {

        let create = moment(createTime)

        let now = moment()

        // 分钟
        let duration = now.diff(create,'minutes')
        if (duration < 60) {
            if (duration <= 1){
                return 'published just now'
            } return `published ${duration} minutes ago`
        }

        // 小时
        duration = now.diff(create,'hours')
        if (duration < 24) {
            return `published ${duration} hours ago`
        }

        // 天
        duration = now.diff(create,'days')
        return `published ${duration} days ago`
    }

    const displayComments = comments.map((item,index) => {
        return (
            <div className={CommentStyle.Comment} id={"Comments"}>
                <img src={item.user.avatar} alt='userIcon' className={CommentStyle.userIcon}/>
                <div className={CommentStyle.commentInfo}>
                    <div className={CommentStyle.headLine}>
                        <div>
                            <span className={CommentStyle.userName}>{item.user.username}</span>
                            <span className={CommentStyle.publishedTime}>{commentInterval(item.create_time)}</span>
                        </div>
                        <img src={replyIcon} alt='replyIcon' className={CommentStyle.replyIcon}/>
                    </div>
                    <div className={CommentStyle.content}>
                        {item.comment}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            {displayComments}
        </React.Fragment>
    )
}

export default ActComment;