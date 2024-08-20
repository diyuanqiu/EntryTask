import Header from "../../components/Header/Header.jsx";
import ListViewStyle from "./ListView.module.css";
import {useContext, useRef, useState} from "react";
import SearchPanel from "./Component/SearchPanel/SearchPanel.jsx";
import EventList from "./Component/EventList/EventList.jsx";
import SearchInfo from "./Component/SearchInfo/SearchInfo.jsx";
import {EventsContext} from "../../context/EventsContext.jsx";
import {fetchEvents} from "../../api/apiFetch.js";

function ListView() {

    const events = useContext(EventsContext);
    // 搜索栏是否打开
    const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
    // 搜索活动列表长度
    const [total, setTotal] = useState(0);
    // 是否点击搜索
    const [isSearch, setIsSearch] = useState(false);

    const [channelId, setChannelId] = useState([]);
    const [after, setAfter] = useState(null);
    const [before, setBefore] = useState(null);

    const isLoadingRef = useRef(false);
    const { eventsArr, channels, setEventsArr, fetchInitialEvents} = events;

    const fetchMoreEventsResults = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        try {
            const params = {
                offset: eventsArr.length,
                limit: 10,
                channelId: channelId.length > 0 ? channelId.join(',') : '',
                after: after || null,
                before: before || null,
            };
            const res = await fetchEvents(params);
            setEventsArr(prevEvents => [...prevEvents, ...res.events]);
            isLoadingRef.current = false;
        } catch (error) {
            console.error("Error fetching more events:", error);
        }
    };

    const handleSearch = async (channelPickId, after, before) => {
        isLoadingRef.current = true;
        setIsSearch(true);
        try {
            const params = {
                offset: 0,
                limit: 10,
                channelId: channelPickId.join(','),
                after,
                before,
            };
            const res = await fetchEvents(params);
            setEventsArr(res.events);
            setTotal(res.total);
            isLoadingRef.current = false;
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        setEventsArr([]);
        fetchInitialEvents();  // 重新加载初始活动数据
    };

    // 处理滚动事件
    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollHeight - container.scrollTop <= container.clientHeight * 1.5 && !isLoadingRef.current) {
            fetchMoreEventsResults();
        }
    };

    // 关闭搜索栏
    function closeSearchPanel(){
        setIsSearchPanelOpen(false)
    }

    return (
        <div className={ListViewStyle.mainContainer}>
            <div className={`${ListViewStyle.searchContainer} ${isSearchPanelOpen ? ListViewStyle.open : ''}`}>
                <SearchPanel handleSearch={handleSearch}
                             channels={channels}
                             setChannelId={setChannelId}
                             setAfter={setAfter}
                             setBefore={setBefore}
                             closeSearchPanel={closeSearchPanel}
                />
            </div>
            <div className={`${ListViewStyle.container} ${isSearchPanelOpen ? ListViewStyle.close : ''}`}>
                {isSearchPanelOpen ?
                    <div className={ListViewStyle.mask} /*关闭侧边搜索栏*/ onClick={closeSearchPanel} />
                    : null}
                <Header isSearchPanelOpen={isSearchPanelOpen} setIsSearchPanelOpen={setIsSearchPanelOpen} flag={'search'}/>
                <div style={{height: '13vw', overflow: 'hidden'}}></div>
                <SearchInfo
                    isSearch={isSearch}
                    total={total}
                    channelId={channelId}
                    channels={channels}
                    after={after}
                    before={before}
                    handleClearSearch={handleClearSearch}
                />
                <div className={`${ListViewStyle.ListBox} ${isSearch ? ListViewStyle.searchBox : ''}`} onScroll={(e) => handleScroll(e)}>
                    <EventList eventsArr={eventsArr} isLoading={isLoadingRef.current} />
                </div>
            </div>
        </div>
    )
}

export default ListView
