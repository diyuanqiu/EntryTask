import SearchStyle from './SearchPanel.module.css';
import React, {useEffect, useState} from "react";
import searchIcon from '../../assets/SVGs/search.svg';
import {fetchEvents} from "../../api/apiFetch.js";
import moment from "moment";

// 定义时间范围
const TODAYSTART = moment().format("MM/DD");
const TODAYEND = moment().add(1, 'd').format("MM/DD");
const TOMORROWSTART = moment().add(1, 'd').format("MM/DD");
const TOMORROWEND = moment().add(2, 'd').format("MM/DD");
const WEEKSTART = moment().startOf('week').format("MM/DD");
const WEEKEND = moment().endOf('week').add(1, 'd').format("MM/DD");
const MONTHSTART = moment().startOf('month').format("MM/DD");
const MONTHEND = moment().endOf('month').add(1, 'd').format("MM/DD");

// 定义时间戳
const TODAYSTART_TIMESTAMP = moment().startOf('day').valueOf(); // 今天开始时间戳
const TODAYEND_TIMESTAMP = moment().endOf('day').valueOf(); // 今天结束时间戳
const TOMORROWSTART_TIMESTAMP = moment().add(1, 'days').startOf('day').valueOf(); // 明天开始时间戳
const TOMORROWEND_TIMESTAMP = moment().add(1, 'days').endOf('day').valueOf(); // 明天结束时间戳
const WEEKSTART_TIMESTAMP = moment().startOf('week').valueOf(); // 本周开始时间戳
const WEEKEND_TIMESTAMP = moment().endOf('week').valueOf(); // 本周结束时间戳
const MONTHSTART_TIMESTAMP = moment().startOf('month').valueOf(); // 本月开始时间戳
const MONTHEND_TIMESTAMP = moment().endOf('month').valueOf(); // 本月结束时间戳

const SearchPanel = (props) => {

    const {token, closeSearchPanel, fetchSearchResult, isSearch, setIsSearch, setSearchResArr, offset, setOffset} = props

    const [datePickId, setDatePickId] = useState(-1); // 选择的日期

    const [channelPickId, setChannelPickId] = useState([]); // 判断是否选择的频道列表 由true和false组成

    const [chosenChannelId, setChosenChannelId] = useState(''); // 选中的频道列表id，用于请求服务端

    const [searchChannelText, setSearchChannelText] = useState('All'); // 已选频道显示文本

    const [searchDateText, setSearchDateText] = useState(''); // 已选日期显示文本

    const [searchDateFrom, setSearchDateFrom] = useState('09/05'); // 起始日期

    const [searchDateTo, setSearchDateTo] = useState('09/05'); // 截止日期

    // moment转时间戳
    const [searchDateAfter, setSearchDateAfter] = useState('') // 起始日期转时间戳
    const [searchDateBefore, setSearchDateBefore] = useState(''); // 截止日期转时间戳

    const [searchDatePanel, setSearchDatePanel] = useState(null); // LATER日期搜索栏

    const [channel,setChannel] = useState([]); // 频道名称

    const fetchChannels = async () => {
        let url = '/channels'

        let res = await fetchEvents(url,token)

        if (res) {
            // 获得channel数组
            setChannel([{id:0,name:"All"}, ...res.channels])
        }
    }

    useEffect(()=>{
        fetchChannels()
    },[token])

    // 初始化，频道都处于未选择状态
    useEffect(()=>{
        setChannelPickId(new Array(channel.length).fill(false))
    },[])

    //日期选择
    const handleDatePick = (e) => {
        const selectedDateId = e.target.tabIndex;
        setDatePickId(selectedDateId);
        if (e.target.innerText === "LATER") {
            // later打开日期选择 样式
            setSearchDatePanel(
                <div className={SearchStyle.inputContainer}>
                    <input
                        className={`${SearchStyle.searchInput} ${SearchStyle.dateFrom}`}
                        onChange={(e) => {
                            setSearchDateFrom(moment(e.target.value).format("MM/DD"))
                            setSearchDateAfter(moment(e.target.value,"MM/DD").valueOf())
                        }}
                        placeholder="MM/DD/YYYY"
                    />
                    <input
                        className={`${SearchStyle.searchInput} ${SearchStyle.dateTo}`}
                        onChange={(e) => {
                            setSearchDateTo(moment(e.target.value).format("MM/DD"))
                            setSearchDateBefore(moment(e.target.value,"MM/DD").valueOf())
                        }}
                        placeholder="MM/DD/YYYY"
                    />
                    <div className={SearchStyle.sharpCornar}></div>
                </div>
            );
        } else {
            setSearchDatePanel(null);
        }
        switch (e.target.innerText) {
            // 根据不同的日期选择，设定不同的参数
            case "TODAY":
                setSearchDateText(`from ${TODAYSTART} to ${TODAYEND}`)
                setSearchDateFrom(TODAYSTART)
                setSearchDateTo(TODAYEND)
                setSearchDateAfter(TODAYSTART_TIMESTAMP)
                setSearchDateBefore(TODAYEND_TIMESTAMP)
                break;
            case "TOMORROW":
                setSearchDateText(`from ${TOMORROWSTART} to ${TOMORROWEND}`)
                setSearchDateFrom(TOMORROWSTART)
                setSearchDateTo(TOMORROWEND)
                setSearchDateAfter(TOMORROWSTART_TIMESTAMP)
                setSearchDateBefore(TOMORROWEND_TIMESTAMP)
                break;
            case "THIS WEEK":
                setSearchDateText(`from ${WEEKSTART} to ${WEEKEND}`)
                setSearchDateFrom(WEEKSTART)
                setSearchDateTo(WEEKEND)
                setSearchDateAfter(WEEKSTART_TIMESTAMP)
                setSearchDateBefore(WEEKEND_TIMESTAMP)
                break;
            case "THIS MONTH":
                setSearchDateText(`from ${MONTHSTART} to ${MONTHEND}`)
                setSearchDateFrom(MONTHSTART)
                setSearchDateTo(MONTHEND)
                setSearchDateAfter(MONTHSTART_TIMESTAMP)
                setSearchDateBefore(MONTHEND_TIMESTAMP)
                break;
            case "ANYTIME":
                setSearchDateText(`in anytime`)
                setSearchDateFrom('')
                setSearchDateTo('')
                setSearchDateAfter('')
                setSearchDateBefore('')
                break;
            default:
                break;
        }
    }

    useEffect(()=>{
        if (searchDatePanel) {
            setSearchDateText(`from ${searchDateFrom} to ${searchDateTo}`);
        }
    },[searchDatePanel,searchDateFrom,searchDateTo])


    // 频道选择
    // 支持频道的多选
    const handleChannelPick = (e) => {
        const index = e.target.tabIndex;
        let newChannelPickId;
        if (index === 0){
            newChannelPickId = new Array(channel.length).fill(false)
            newChannelPickId[0] = true
        } else {
            newChannelPickId = [...channelPickId]
            newChannelPickId[index] = !newChannelPickId[index]
            newChannelPickId[0] = false
        }
        setChannelPickId(newChannelPickId);
    }

    // 设定选中的频道id和频道名称文本
    const handleSetChosenChannel = () => {

        const selectedChannels = channel.filter((_,index) => channelPickId[index] === true)
            .map(channel => channel.id)
            .join(',')

        setChosenChannelId(selectedChannels);

        const selectedChannelsText = channel.filter((_,index) => channelPickId[index] === true)
            .map(channel => channel.name)
            .join(',')

        setSearchChannelText(selectedChannelsText)
    }

    useEffect(() => {
        handleSetChosenChannel()
    },[channelPickId])


    const dateParmsList = [
        'ANYTIME',
        'TODAY',
        'TOMORROW',
        'THIS WEEK',
        'THIS MONTH',
        'LATER'
    ]

    // 获得date名称数组
    const dateList = dateParmsList.map((item, index) => (
        <li
            className={datePickId === index ? SearchStyle.dateItemPick : SearchStyle.dateItem}
            key={item}
            tabIndex={index}
            onClick={handleDatePick}>
            {item}
        </li>
    ))

    // 获得channel名称数组
    const channelList = channel.map((item) => (
        <li
            className={channelPickId[item.id] === true ? SearchStyle.channelItemPick : SearchStyle.channelItem}
            key={item.id}
            tabIndex={item.id}
            onClick={handleChannelPick}>
            {item.name}
        </li>
    ))


    // 进行搜索
    const commit = () => {
        setIsSearch(true)
        setSearchResArr([])
        setOffset(0)
        if (datePickId >= 0 && chosenChannelId === '0') {
            fetchSearchResult('', searchDateAfter, searchDateBefore,'All',searchDateText);
            closeSearchPanel()
        } else if (datePickId >= 0 && chosenChannelId !== '') {
            console.log(chosenChannelId, searchDateAfter, searchDateBefore, datePickId);
            fetchSearchResult(chosenChannelId, searchDateAfter, searchDateBefore,searchChannelText,searchDateText);
            closeSearchPanel()
        }
    };

    // 搜索页无限滚动
    useEffect(() => {
        if (isSearch && offset > 0){
            if (datePickId >= 0 && chosenChannelId === '0') {
                fetchSearchResult('', searchDateAfter, searchDateBefore,'All',searchDateText);
            } else if (datePickId >= 0 && chosenChannelId !== '') {
                console.log(chosenChannelId, searchDateAfter, searchDateBefore, datePickId);
                fetchSearchResult(chosenChannelId, searchDateAfter, searchDateBefore,searchChannelText,searchDateText);
            }
        }
    },[token,offset])

    return (
        <React.Fragment>
            <div className={SearchStyle.sidebar} id="sidebar">
                <div className={SearchStyle.content}>
                    <span className={SearchStyle.title}>DATE</span>
                    <ul className={SearchStyle.list}>
                        {dateList}
                    </ul>
                    {searchDatePanel}
                </div>
                <div className={SearchStyle.content}>
                    <span className={SearchStyle.title}>CHANNEL</span>
                    <ul className={SearchStyle.list}>
                        {channelList}
                    </ul>
                </div>
                <div className={datePickId >= 0 && channelPickId.indexOf(true)!== -1 ? SearchStyle.search : SearchStyle.unSearch} onClick={commit}>
                    <div className={SearchStyle.searchMain}>
                        <img src={searchIcon} alt='search' className={SearchStyle.searchIcon}/>
                        <p className={SearchStyle.searchTitle}>SEARCH</p>
                    </div>
                    {datePickId >= 0 && channelPickId.indexOf(true)!== -1 ?
                        <div className={SearchStyle.searchInfo}>{searchChannelText} activities {searchDateText}</div> : <div></div>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchPanel;