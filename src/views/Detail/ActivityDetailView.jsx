import DetailStyle from "./ActivityDetailView.module.css";
import Header from "../../components/Header/Header.jsx";
import ActTop from "./Component/ActTop/ActTop.jsx"
import ActTab from "./Component/ActTab/ActTab.jsx";
import {useRef, useState} from "react";
import ActDescrip from "./Component/ActDescrip/ActDescrip.jsx";
import ActWhen from "./Component/ActWhen/ActWhen.jsx";
import ActWhere from "./Component/ActWhere/ActWhere.jsx";
import ActParticipantAndLikes from "./Component/ActParticipantAndLikes/ActParticipantAndLikes.jsx";
import ActComment from "./Component/ActComment/ActComment.jsx";
import ActDownBar from "./Component/ActDownBar/ActDownBar.jsx";
import ActCommentBar from "./Component/ActDownBar/ActCommentBar.jsx";
import {ActivityDetailContext} from "./Context/ActivityDetailContext.jsx"
import {useLocation} from "react-router-dom";
import {fetchEventComments, fetchEventLikes, fetchEventParticipants} from "../../api/apiFetch.js";

function ActivityDetailView() {

    const eventDetail = useLocation().state?.event;

    const detailsRef = useRef(null);
    const participantsRef = useRef(null);
    const commentsRef = useRef(null);

    const sections = [
        { id: 'details', label: 'Details', ref: detailsRef },
        { id: 'participants', label: 'Participants', ref: participantsRef },
        { id: 'comments', label: 'Comments', ref: commentsRef }
    ];

    // 用户是否要评论
    const [isComment, setIsComment] = useState(false);
    // 参与人
    const [participants, setParticipants] = useState([]);
    // 点赞人
    const [likes, setLikes] = useState([]);
    // 活动评论
    const [comments, setComments] = useState([]);
    // 初始化
    const flagRef = useRef(false);

    if (!flagRef.current) {
        flagRef.current = true;
        updateLikes();
        updateParticipants();
        updateComments();
    }

    async function updateParticipants() {
        try {
            const res = await fetchEventParticipants(eventDetail.id);
            setParticipants(res.users);
        } catch (error) {
            console.error('Error fetching participants', error);
        }
    }

    async function updateLikes() {
        try {
            const res = await fetchEventLikes(eventDetail.id);
            setLikes(res.users);
        } catch (error) {
            console.error('Error fetching participants', error);
        }
    }

    async function updateComments(){
        try {
            let res = await fetchEventComments(eventDetail.id);
            setComments(res.comments.reverse())
        } catch (error) {
            console.error('Error fetching comments', error);
        }

    }

    const [visibleSection, setVisibleSection] = useState(sections[0]?.ref.current);
    // 监听滚动事件，判断哪个section进入视野
    const handleScroll = () => {
        let currentSection = sections[0]?.ref.current;  // 默认选中第一个 section
        const offset = window.innerWidth * 0.4;
        sections.forEach(section => {
            const { top } = section.ref.current.getBoundingClientRect();
            if (top <= offset) {
                currentSection = section.ref.current;
            }
        });
        setVisibleSection(currentSection);
    };

    // 快速锚点
    const scrollToAnchor = (index) => {
        const anchorElement = sections[index]?.ref.current;
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <ActivityDetailContext.Provider value={eventDetail}>
            <div className={DetailStyle.container} onScroll={handleScroll}>
                <Header />
                <div style={{height: '13vw', overflow: 'hidden'}}></div>
                <div className={DetailStyle.main}>
                    <ActTop />
                    <ActTab scrollToAnchor={scrollToAnchor} sections={sections} visibleSection={visibleSection}/>
                    <div className={DetailStyle.detailContainer} ref={sections[0].ref}>
                        <ActDescrip />
                        <ActWhen />
                        <ActWhere />
                    </div>
                    <div className={DetailStyle.participantContainer} ref={sections[1].ref}>
                        <ActParticipantAndLikes participants={participants} likes={likes}/>
                    </div>
                    <div className={DetailStyle.commentContainer} ref={sections[2].ref}>
                        <ActComment comments={comments}/>
                    </div>
                    {isComment ?
                        <ActCommentBar setIsComment={setIsComment} updateComments={updateComments}/>
                        : <ActDownBar setIsComment={setIsComment} updateParticipants={updateParticipants} updateLikes={updateLikes} />
                    }
                </div>
            </div>
        </ActivityDetailContext.Provider>
    );
}

export default ActivityDetailView;