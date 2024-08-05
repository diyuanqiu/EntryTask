import Header from "../../components/Header/Header.jsx";
import ListViewStyle from "./ListView.module.css";
import ListItem from "../../components/ListItem/ListItem.jsx";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SearchPanel from "../../components/SearchPanel/SearchPanel.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchEvents} from "../../api/apiFetch.js";
import SearchStyle from "../../components/SearchPanel/SearchPanel.module.css";
import myFetch from "../../api/myFetch.js";
import moment from "moment";
// import {useState} from "react";

const ListView = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const [isSearchPanelOpen, setIsSearchPanelOpen] = React.useState(false);

    const [eventsArr, setEventsArr] = useState([]);

    // 无限列表：活动offset
    const [offset, setOffset] = useState(0);

    // 在加载数据时显示加载状态，避免重复请求: loading
    const [loading, setLoading] = useState(false);

    // 搜索结果活动列表
    const [searchResArr, setSearchResArr] = useState([]);

    // 搜索栏展示
    const [searchHeadline, setSearchHeadline] = useState(null);

    // 是否在进行搜索页面展示
    const [isSearch, setIsSearch] = useState(false);

    const token = location.state?.token

    const avatar = location.state?.avatar

    // 获取页面DOM
    const containerRef = useRef(null);

    // 虚拟列表
    const listRef = useRef(null);
    const itemHeight = window.innerWidth * 0.65;

    // 确保活动列表数据只初始化一次
    const hasFetchedInitialData = useRef(false)

    // 请求活动列表数据
    const fetchEventsAll = async () => {
        setLoading(true)
        let url = (`/events?offset=${offset}&&limit=8`)
        let res = await fetchEvents(url, token)
        if (res.error === 'invalid_token'){
            alert("Permission denied")
            navigate(-1)
        }
        setEventsArr(prevEvents => [...prevEvents, ...res.events])
        setLoading(false)
    }

    useEffect(()=>{
        // console.log(location.state)
        // 检查token是否存在
        if(!token){
            alert("No token found")
            navigate(-1)
        }
        if (!hasFetchedInitialData.current) {
            fetchEventsAll()
            hasFetchedInitialData.current = true
        }
    },[token])

    // 第二个useEffect处理offset改变的情况
    useEffect(() => {
        if (!isSearch && offset > 0){
            fetchEventsAll()
        }
    },[token,offset])

    // 无限滚动
    const handleScroll = useCallback(()=>{
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
                setOffset(prevOffset => prevOffset + 8); // 加载更多数据，增加偏移量
            }
        }
    },[loading])

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    // 计算可见区域的内容
    // const calculateVisibleItems = () => {
    //     if (!containerRef.current) return [];
    //     const { scrollTop, clientHeight } = containerRef.current;
    //     const start = Math.max(0,Math.floor(scrollTop / itemHeight));
    //     const end = Math.min(eventsArr.length, Math.ceil((scrollTop+clientHeight)/itemHeight));
    //     return eventsArr.slice(start,end)
    // }

    // 获得可见区域的内容
    // const [visibleItems, setVisibleItems] = React.useState([]);
    // useEffect(()=>{
    //     setVisibleItems(calculateVisibleItems)
    // },[eventsArr, containerRef.current])

    // useEffect(() => {
    //     const handleVisibleItems = () => setVisibleItems(calculateVisibleItems());
    //     if (containerRef.current) {
    //         containerRef.current.addEventListener('scroll', handleVisibleItems);
    //         return () => containerRef.current.removeEventListener('scroll', handleVisibleItems);
    //     }
    // }, [eventsArr]);

    const closeSearchPanel = () => {
        setIsSearchPanelOpen(false)
        document.getElementById("sidebar").style.right = "100%";
        document.getElementById("main").style.marginLeft = "0";
    }

    const eventList = (isSearch ? searchResArr : eventsArr).map((item, index) => {
        return (
                <ListItem
                    param = {item}
                    key = {item.id + '' + index} //避免key重复
                    itemID = {item.id}
                    token = {token}
                    avatar = {avatar}
                ></ListItem>
        )
    })

    // 搜索功能  channelName: 用于结果页显示频道名称
    const fetchSearchResult = async (channelId, after, before, channelNameText,dateText) => {

        // console.log(channelId)
        let url = `http://localhost:3000/api/v1/events?channels=${channelId}&after=${after}&before=${before}&offset=${offset}&limit=8`;
        let init = {
            headers: {
                'X-BLACKCAT-TOKEN': token,
            }
        }
        let res = await myFetch(url,init)
        console.log(res)
        setSearchResArr(prevEvents => [...prevEvents, ...res.events])

        let search;

        // 是否有搜索结果
        let isEmpty;
        isEmpty = res.total <= 0;

        search = (
            <div className={ListViewStyle.Search}>
                <div className={ListViewStyle.resButton}>
                    <p className={ListViewStyle.resCount}>{res.total} Results</p>
                    <button onClick={handleClearSearch}>CLEAR SEARCH</button>
                </div>
                <p className={ListViewStyle.resContent}>Searched for {channelNameText} activities {dateText}</p>
                {isEmpty ?
                    <div className={ListViewStyle.noActivity}>
                        <div></div>
                        <p>No activity found</p></div>
                    : <div></div>}
                    </div>
        );

        setSearchHeadline(search);

        console.log(searchHeadline)
    };

    // 清除搜索结果
    const handleClearSearch = () => {
        setSearchHeadline(null);
        setIsSearch(false);
        setOffset(0)
    }

    return (
        <React.Fragment>
            <SearchPanel token={token} closeSearchPanel={closeSearchPanel} fetchSearchResult={fetchSearchResult} offset={offset} isSearch={isSearch} setIsSearch={setIsSearch}
                         setSearchResArr={setSearchResArr} setOffset={setOffset} />
            <div className={ListViewStyle.container} id='main'>
                {isSearchPanelOpen ? <div className={ListViewStyle.mask} /*关闭侧边搜索栏*/ onClick={closeSearchPanel}></div>: null}
                <Header isSearchPanelOpen={isSearchPanelOpen} setIsSearchPanelOpen={setIsSearchPanelOpen}
                        flag={'search'} avatar={avatar}/>
                <div
                    // Header position: fixed 占位行
                    style={{height: '13vw', overflow: 'hidden'}}
                ></div>
                {searchHeadline}
                <div className={ListViewStyle.ListBox} ref={containerRef}>
                    {eventList}
                    {loading && <div>Loading...</div>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListView
