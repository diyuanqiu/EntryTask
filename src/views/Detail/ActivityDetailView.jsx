import DetailStyle from "./ActivityDetailView.module.css";
import Header from "../../components/Header/Header.jsx";
import ActTop from "../../components/Detail/ActTop/ActTop.jsx";
import ActTab from "../../components/Detail/ActTab/ActTab.jsx";
import {useEffect, useState} from "react";
import React from "react";
import ActDescrip from "../../components/Detail/ActDescrip/ActDescrip.jsx";
import ActWhenAndWhere from "../../components/Detail/ActWhenAndWhereInfo/ActWhenAndWhere.jsx";
import ActParticipant from "../../components/Detail/ActParticipant/ActParticipant.jsx";
import ActComment from "../../components/Detail/ActComment/ActComment.jsx";
import ActDownBar from "../../components/Detail/ActDownBar/ActDownBar.jsx";
import ActCommentBar from "../../components/Detail/ActDownBar/ActCommentBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {postCommentToEvent} from "../../api/apiFetch.js";


const ActivityDetailView = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const eventDetail = location.state

    const [isSelect, setIsSelect] = useState(0)

    const [isComment, setIsComment] = useState(false)

    const [commentContent, setCommentContent] = useState('')

    const token = eventDetail.token

    const avatar = eventDetail.avatar

    useEffect(()=>{
        // console.log(eventDetail)
        // 检查token是否存在
        if(!token){
            alert("No token found")
            navigate(-1)
        }
    },[token])

    // const naviToTab = () => {
    //     if (isSelect === 0){
    //         return (
    //             <>
    //                 <ActDescrip param={eventDetail}/>
    //                 <ActWhenAndWhere param={eventDetail}/>
    //                 <ActParticipant param={eventDetail}/>
    //                 <ActComment param={eventDetail} commentContent={commentContent}/>
    //             </>
    //         )
    //     } else if (isSelect === 1){
    //         return (
    //             <>
    //                 <ActParticipant param={eventDetail}/>
    //                 <ActComment param={eventDetail} commentContent={commentContent}/>
    //             </>
    //         )
    //     } else return (
    //         <>
    //             <ActComment param={eventDetail} commentContent={commentContent}/>
    //         </>
    //     )
    // }


    const scrollToAnchor = (select) => {
        let anchorElement = null
        if (select === 0) {
            anchorElement = document.getElementById("Description")
        } else if (select === 1){
            anchorElement = document.getElementById("Participants")
        } else
            anchorElement = document.getElementById("Comments")
        if (anchorElement) {
            anchorElement.scrollIntoView({behavior:'smooth', block: 'start'})
        }
    }

    // 发送评论
    const sendComment = async (comment) => {
        let url = `/events/${eventDetail.id}/comments`

        let res = await postCommentToEvent(url, eventDetail.token, comment)

        if (res) {
            setCommentContent(comment)
        }
    }

    return (
        <React.Fragment>
            <div className={DetailStyle.container}>
                <Header avatar={avatar}/>
                <div
                    // Header position: fixed 占位行
                    style={{height: '13vw', overflow: 'hidden'}}
                ></div>
                <div className={DetailStyle.main}>
                    <ActTop param={eventDetail}/>
                    <ActTab isSelect={isSelect} setIsSelect={setIsSelect} scrollToAnchor={scrollToAnchor}/>
                    {/*快速锚点*/}
                    <ActDescrip param={eventDetail}/>
                    <ActWhenAndWhere param={eventDetail}/>
                    <ActParticipant param={eventDetail} />
                    <ActComment param={eventDetail} commentContent={commentContent}/>
                    {/* 底部Bar */}
                    {isComment ?
                        <ActCommentBar sendComment={sendComment} isComment={isComment} setIsComment={setIsComment}/>
                        : <ActDownBar param={eventDetail} isComment={isComment} setIsComment={setIsComment}/>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActivityDetailView;