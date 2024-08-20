import CommentBarStyle from './ActCommentBar.module.css';
import crossIcon from '../../../../assets/SVGs/cross.svg'
import sendIcon from '../../../../assets/SVGs/send.svg'
import {useContext, useState} from "react";
import {postCommentToEvent} from "../../../../api/apiFetch.js";
import {ActivityDetailContext} from "../../Context/ActivityDetailContext.jsx";

function ActCommentBar({setIsComment, updateComments}) {

    const eventDetail = useContext(ActivityDetailContext);
    // 用户评论内容
    const [commentContent, setCommentContent] = useState('');

    async function sendComment(comment) {

        try {
            await postCommentToEvent(eventDetail.id, comment);
        } catch (error) {
            console.log(error);
        }
    }

    function handleSendClick() {
        sendComment(commentContent);
        updateComments();
        setCommentContent('');
    }

    return (
        <div className={CommentBarStyle.container}>
            <div className={CommentBarStyle.left}>
                <img src={crossIcon} alt='cross' className={CommentBarStyle.Icon}
                     onClick={() => setIsComment(false)}/>
                <input type='text' className={CommentBarStyle.inputPanel} placeholder='Leave your comment here'
                       value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
            </div>
            <div className={CommentBarStyle.right} onClick={handleSendClick}>
                <img src={sendIcon} alt='send' className={CommentBarStyle.Icon}/>
            </div>
        </div>
    )
}

export default ActCommentBar;