import Header from "../../components/Header/Header.jsx";
import HomeViewStyle from "./HomeView.module.css";
import HomeInfo from "./Component/HomeInfo.jsx";
import {useRef, useState} from "react";
import HomeTab from "./Component/HomeTab.jsx";
import ListItem from "../../components/ListItem/ListItem.jsx";
import noActivityIcon from "../../assets/SVGs/no-activity.svg";
import {fetchUserDetail, fetchUserEvents} from "../../api/apiFetch.js";

function EventList({ events }) {

    if (events.length === 0) {
        return (
            <div className={HomeViewStyle.noActivity}>
                <img
                    src={noActivityIcon}
                    alt="无活动"
                    className={HomeViewStyle.noActivityIcon}
                />
                <p className={HomeViewStyle.noActivityText}>No activity found</p>
            </div>
        );
    }

    return events.map((item) => (
        <ListItem
            param={item}
            key={item.id}
            itemID={item.id}
        />
    ));
}

function HomeView() {
    const [isSelect, setIsSelect] = useState(0); // tabBar选择情况
    const [user, setUser] = useState({});
    const [likeEvents, setLikeEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [goingEvents, setGoingEvents] = useState([]);

    const fetchUserInfo = async () => {
        try {
            const userData = await fetchUserDetail();
            setUser(userData);
        } catch (error) {
            console.log("Can't find user info", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const likeEvents= await fetchUserEvents('liked');
            const pastEvents = await fetchUserEvents('past');
            const goingEvents = await fetchUserEvents('going');

            setLikeEvents(likeEvents.events);
            setPastEvents(pastEvents.events);
            setGoingEvents(goingEvents.events);
        } catch (error) {
            console.log("Can't find events", error);
        }
    }

    const initialRef = useRef(false);

    if (!initialRef.current) {
        initialRef.current = true;
        fetchEvents();
        fetchUserInfo();
    }

    return (
        <div className={HomeViewStyle.container}>
            <Header flag={'Home'}/>
            <HomeInfo user={user} />
            <HomeTab user={user} isSelect={isSelect} setIsSelect={setIsSelect} />
            <div className={HomeViewStyle.ListBox}>
                {isSelect === 0 && <EventList events={likeEvents}/>}
                {isSelect === 1 && <EventList events={goingEvents}/>}
                {isSelect === 2 && <EventList events={pastEvents}/>}
            </div>
        </div>
    );
}

export default HomeView;
