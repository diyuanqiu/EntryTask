import Header from "../../components/Header/Header.jsx";
import HomeViewStyle from ".//HomeView.module.css";
import HomeInfo from "../../components/Home/HomeInfo.jsx";
import React, {useEffect, useState} from "react";
import {fetchEvents, fetchUserDetail} from "../../api/apiFetch.js";
import HomeTab from "../../components/Home/HomeTab.jsx";
import ListItem from "../../components/ListItem/ListItem.jsx";
import noActivityIcon from "../../assets/SVGs/no-activity.svg"

const HomeView = () => {

    const [user, setUser] = useState({});

    const [isSelect, setIsSelect] = useState(0);

    const [likeEventsArr, setLikeEventsArr] = useState([]);

    const [pastEventsArr, setPastEventsArr] = useState([]);

    const [goingEventsArr, setGoingEventsArr] = useState([]);

    const token = localStorage.getItem("token");

    const getUserInfo = async () => {
        let url = '/user'

        let res = await fetchUserDetail(url, token)

        if (res) {
            setUser(res)
        } else {
            console.error("can't get the user")
        }
    }

    const getUserEvents = async (type) => {
        let url = `/user/events?type=${type}`

        let res = await fetchUserDetail(url, token)

        console.log(res)

        if (type === 'liked' && res.events.length > 0) {
            setLikeEventsArr(res.events)
        } else if (type === 'past' && res.events.length > 0) {
            setPastEventsArr(res.events)
        } else if (type === 'going' && res.events.length > 0) {
            setGoingEventsArr(res.events)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [token])

    useEffect(() => {
        getUserEvents('liked')
        getUserEvents('going')
        getUserEvents('past')
    }, [token, user])


    const noFoundPage = (
        <div className = {HomeViewStyle.noActivity} >
            <img
                src = {noActivityIcon}
                alt = "无活动"
                className = {HomeViewStyle.noActivityIcon}
            />
            <p className={HomeViewStyle.noActivityText}>No activity found</p>
        </div>
    )

    const getEventList = () => {
        switch (isSelect) {
            case 0:
                return likeEventsArr.length > 0 ? (
                    likeEventsArr.map((item, index) => (
                        <ListItem
                            param={item}
                            key={item.id + '' + index} //避免key重复
                            itemID={item.id}
                            token={token}
                            avatar={user.avatar}
                        />
                    ))
                ) : (
                    noFoundPage
                );
            case 1:
                return goingEventsArr.length > 0 ? (
                    goingEventsArr.map((item, index) => (
                        <ListItem
                            param={item}
                            key={item.id + '' + index} //避免key重复
                            itemID={item.id}
                            token={token}
                            avatar={user.avatar}
                        />
                    ))
                ) : (
                    noFoundPage
                );
            case 2:
                return pastEventsArr.length > 0 ? (
                    pastEventsArr.map((item, index) => (
                        <ListItem
                            param={item}
                            key={item.id + '' + index} //避免key重复
                            itemID={item.id}
                            token={token}
                            avatar={user.avatar}
                        />
                    ))
                ) : (
                    noFoundPage
                );
            default:
                return null;
        }
    };

    const eventList = getEventList();


    return (
        <div className={HomeViewStyle.container}>
            <Header flag={'Home'} avatar={user.avatar}/>
            <HomeInfo param={user}/>
            <HomeTab param={user} isSelect={isSelect} setIsSelect={setIsSelect}/>
            <div className={HomeViewStyle.ListBox}>
                {eventList}
            </div>
        </div>
    )
}

export default HomeView