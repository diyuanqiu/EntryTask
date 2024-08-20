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
    // 是否展示搜索活动列表
    const [isSearch, setIsSearch] = useState(false);
    // 搜索结果活动列表
    const [searchResArr, setSearchResArr] = useState([]);
    // 获取页面DOM
    const containerRef = useRef(null);
    const [channelId, setChannelId] = useState([]);
    const [after, setAfter] = useState(null);
    const [before, setBefore] = useState(null);
    const { eventsArr, isLoading, channels, setIsLoading, setEventsArr} = events;

    const fetchMoreEventsResults = async () => {
        setIsLoading(true);
        try {
            if (!isSearch) {
                const res = await fetchEvents(eventsArr.length);
                setEventsArr(prevEvents => [...prevEvents, ...res.events]);
            } else {
                const res = await fetchEvents(searchResArr.length, 10, channelId.join(','), after, before);
                setSearchResArr(prevEvents => [...prevEvents, ...res.events]);
            }
        } catch (error) {
            console.error("Error fetching more events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (channelPickId, after, before) => {
        setIsLoading(true);
        setIsSearch(true);
        try {
            const res = await fetchEvents(0, 10, channelPickId.join(','), after, before);
            setSearchResArr(res.events);
            setTotal(res.total);
        } catch (error) {
            console.error("Error performing search:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchResArr([]);
        setIsSearch(false);
    };

    // 处理滚动事件
    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoading) {
                fetchMoreEventsResults();
            }
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
                <div className={`${ListViewStyle.ListBox} ${isSearch ? ListViewStyle.searchBox : ''}`} ref={containerRef} onScroll={handleScroll}>
                    <EventList eventsArr={eventsArr} searchResArr={searchResArr} isSearch={isSearch} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}

export default ListView
