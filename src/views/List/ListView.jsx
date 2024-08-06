import Header from "../../components/Header/Header.jsx";
import ListViewStyle from "./ListView.module.css";
import ListItem from "../../components/ListItem/ListItem.jsx";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SearchPanel from "../../components/SearchPanel/SearchPanel.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchEvents} from "../../api/apiFetch.js";
import myFetch from "../../api/myFetch.js";

const ListView = () => {

    const navigate = useNavigate();

    const location = useLocation();

    // 搜索栏是否打开
    const [isSearchPanelOpen, setIsSearchPanelOpen] = React.useState(false);

    // 活动列表数组
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

    const avatar = location.state?.avatar;

    // 获取页面DOM
    const containerRef = useRef(null);

    // 虚拟列表
    const [visibleItems, setVisibleItems] = useState([]);
    const itemHeights = useRef({})

    // 用于保存所有列表项的总高度
    const totalHeightRef = useRef(0);

    // 确保活动列表数据只初始化一次
    const hasFetchedInitialData = useRef(false)

    // 请求活动列表数据
    const fetchEventsAll = async () => {
        setLoading(true)
        let url = (`/events?offset=${offset}&&limit=10`)
        // let url = ('/events')
        let res = await fetchEvents(url, token)
        if (res.error === 'invalid_token'){
            alert("Permission denied")
            navigate(-1)
        }
        setEventsArr(prevEvents => [...prevEvents, ...res.events])
        setLoading(false)
    }

    useEffect(()=>{
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

    // useEffect(()=>{
    //     calculateVisibleItems()
    // },[eventsArr])


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
            // calculateVisibleItems()
            if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
                setOffset(prevOffset => prevOffset + 10); // 加载更多数据，增加偏移量
            }
        }
    },[loading])

    // 监听容器滚动事件
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
    //     let startIndex = 0;
    //     let endIndex = startIndex + 3
    //     let topOffset = 0;
    //     // let bottomOffset = 0;
    //     for (let i = 0; i < eventsArr.length; i++) {
    //         const itemHeight = itemHeights.current[i] || 50; // default to 50 if height not measured yet
    //         if (topOffset < scrollTop) {
    //             startIndex = i;
    //             topOffset += itemHeight;
    //         }
    //         // if (bottomOffset < scrollTop + clientHeight) {
    //         //     endIndex = i;
    //         //     bottomOffset += itemHeight;
    //         // }
    //     }
    //     // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
    //     const paddingCount = 2;
    //     startIndex = Math.max(startIndex - paddingCount, 0); // 处理越界情况
    //     endIndex = Math.min(endIndex + paddingCount, eventsArr.length - 1);
    //     const v = eventsArr.slice(startIndex, endIndex + 1)
    //     setVisibleItems(v);
    // }
    //
    // const handleItemHeight = (index, height) => {
    //     itemHeights.current[index] = height;
    //     calculateTotalHeight()
    // };
    //
    // const calculateTotalHeight = () => {
    //     let totalHeight = 0;
    //     for (let key in itemHeights.current) {
    //         totalHeight += itemHeights.current[key];
    //     }
    //     totalHeightRef.current = totalHeight;
    //     if (containerRef.current) {
    //         containerRef.current.style.height = `${totalHeight}px`;
    //     }
    // };

    // 关闭搜索栏
    const closeSearchPanel = () => {
        setIsSearchPanelOpen(false)
        // 根据id定位搜索栏元素
        document.getElementById("sidebar").style.right = "100%";
        document.getElementById("main").style.marginLeft = "0";
    }

    // 根据是否搜索来确定展示的是什么活动列表数据
    const eventList = (isSearch ? searchResArr : eventsArr).map((item, index) => {
        return (
            <ListItem
                param = {item}
                key = {item.id + '' + index} //避免key重复
                itemID = {item.id}
                token = {token}
                avatar = {avatar}
                onHeight={height => handleItemHeight(index, height)}
            ></ListItem>
        )
    })

    // 搜索功能  channelNameText: 用于结果页显示频道名称  dateText：用于结果页显示日期
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

        // 搜索页样式
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
                        flag={'search'}/>
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
