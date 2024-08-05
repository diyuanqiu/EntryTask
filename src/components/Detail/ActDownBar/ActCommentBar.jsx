import CommentBarStyle from './ActCommentBar.module.css';
import React from 'react';
import crossIcon from '../../../assets/SVGs/cross.svg'
import sendIcon from '../../../assets/SVGs/send.svg'
import {postCommentToEvent} from "../../../api/apiFetch.js";

const ActCommentBar = (props) => {

    // eslint-disable-next-line react/prop-types
    const { isComment, setIsComment, sendComment} = props;

    const [commentContent, setCommentContent] = React.useState('');


    const handleSendClick = () => {
        sendComment(commentContent)
        setCommentContent('')
    }

    // 输入评论
    const setComment = (e) => {
        setCommentContent(e.target.value)
    }

    return (
        <React.Fragment>
            <div className={CommentBarStyle.container}>
                <div className={CommentBarStyle.left}>
                    <img src={crossIcon} alt='cross' className={CommentBarStyle.Icon} onClick={()=>setIsComment(!isComment)}/>
                    <input type='text' className={CommentBarStyle.inputPanel} placeholder='Leave your comment here' value={commentContent} onChange={setComment}/>
                </div>
                <div className={CommentBarStyle.right} onClick={handleSendClick}>
                    <img src={sendIcon} alt='send' className={CommentBarStyle.Icon}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActCommentBar;