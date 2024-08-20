import CommentStyle from './ActComment.module.css'
import replyIcon from "../../../../assets/SVGs/reply.svg";
import moment from "moment";
import React from "react";

const ActComment = React.memo(function ActComment({comments}) {

    // 评论发布时间
    function calCommentInterval(createTime){

        const create = moment(createTime);
        const now = moment();

        const minutes = now.diff(create, 'minutes');
        if (minutes < 1) {
            return 'published just now';
        } else if (minutes < 60) {
            return `published ${minutes} minutes ago`;
        }

        const hours = now.diff(create, 'hours');
        if (hours < 24) {
            return `published ${hours} hours ago`;
        }

        const days = now.diff(create, 'days');
        return `published ${days} days ago`;

    }

    return (
        <div className={CommentStyle.commentContainer}>
            {comments.map((item) => (
                <div className={CommentStyle.Comment} key={item.id}>
                    <img src={item.user.avatar} alt='userIcon' className={CommentStyle.userIcon}/>
                    <div className={CommentStyle.commentInfo}>
                        <div className={CommentStyle.headLine}>
                            <div>
                                <span className={CommentStyle.userName}>{item.user.username}</span>
                                <span
                                    className={CommentStyle.publishedTime}>{calCommentInterval(item.create_time)}</span>
                            </div>
                            <img src={replyIcon} alt='replyIcon' className={CommentStyle.replyIcon}/>
                        </div>
                        <div className={CommentStyle.content}>
                            {item.comment}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
});

export default ActComment;