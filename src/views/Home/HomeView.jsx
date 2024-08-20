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
    const [selectTab, setSelectTab] = useState(0); // tabBar选择情况
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);

    const fetchUserInfo = async () => {
        try {
            const userData = await fetchUserDetail();
            setUser(userData);
        } catch (error) {
            console.log("Can't find user info", error);
        }
    };

    const fetchEvents = async (type) => {
        try {
            const typeEvents= await fetchUserEvents(type);
            await fetchUserInfo();
            setEvents(typeEvents.events);
        } catch (error) {
            console.log("Can't find events", error);
        }
    }

    const initialRef = useRef(false);

    if (!initialRef.current) {
        initialRef.current = true;
        fetchEvents('liked');
    }

    return (
        <div className={HomeViewStyle.container}>
            <Header flag={'Home'}/>
            <HomeInfo user={user} />
            <HomeTab user={user} isSelect={selectTab} setIsSelect={setSelectTab} getEvents={fetchEvents}/>
            <div className={HomeViewStyle.ListBox}>
                <EventList events={events} />
            </div>
        </div>
    );
}

export default HomeView;
