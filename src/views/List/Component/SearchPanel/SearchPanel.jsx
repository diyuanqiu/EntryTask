import SearchStyle from './SearchPanel.module.css';
import {useState} from "react";
import searchIcon from '../../../../assets/SVGs/search.svg';
import moment from "moment";
import {getSelectedChannelNames} from "../../../../utils/channel.js";


const generateTimestamps = () => ({
    "ANYTIME": {
        start: moment().startOf('year').valueOf(),
        end: moment().endOf('year').valueOf(),
    },
    "TODAY": {
        start: moment().startOf('day').valueOf(),
        end: moment().endOf('day').valueOf(),
    },
    "TOMORROW": {
        start: moment().add(1, 'days').startOf('day').valueOf(),
        end: moment().add(1, 'days').endOf('day').valueOf(),
    },
    "THIS WEEK": {
        start: moment().startOf('week').valueOf(),
        end: moment().endOf('week').valueOf(),
    },
    "THIS MONTH": {
        start: moment().startOf('month').valueOf(),
        end: moment().endOf('month').valueOf(),
    },
});

// 日期选择组件
const DatePicker = ({ datePickId, handleDatePick }) => {
    const dateOptions = ['ANYTIME', 'TODAY', 'TOMORROW', 'THIS WEEK', 'THIS MONTH', 'LATER'];

    return (
        <div className={SearchStyle.content}>
            <span className={SearchStyle.title}>DATE</span>
            <ul className={SearchStyle.list}>
                {dateOptions.map((item, index) => (
                    <li
                        className={datePickId === index ? SearchStyle.dateItemPick : SearchStyle.dateItem}
                        key={item}
                        tabIndex={index}
                        onClick={handleDatePick}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 频道选择组件
const ChannelPicker = ({ channel, channelPickId, handleChannelPick }) => (
    <div className={SearchStyle.content}>
        <span className={SearchStyle.title}>CHANNEL</span>
        <ul className={SearchStyle.list}>
            {channel.map((item) => (
                <li
                    className={channelPickId.includes(item.id) ? SearchStyle.channelItemPick : SearchStyle.channelItem}
                    key={item.id}
                    tabIndex={item.id}
                    onClick={handleChannelPick}>
                    {item.name}
                </li>
            ))}
        </ul>
    </div>
);

// LATER日期选择组件
const LaterDatePickerComponent = ({ showDatePanel, setSearchAfter, setSearchBefore }) => {

    const handleDateChange = (e, setDateFunc) => {
        const inputDate = e.target.value;
        const isValidDate = moment(inputDate, "MM/DD/YYYY", true).isValid();
        if (isValidDate) {
            setDateFunc(moment(inputDate, "MM/DD/YYYY").valueOf());
        } else {
            setDateFunc(null);
        }
    };

    return (
        <>
            {showDatePanel && (
                <div className={SearchStyle.inputContainer}>
                    <input
                        className={`${SearchStyle.searchInput} ${SearchStyle.dateFrom}`}
                        onChange={(e) => handleDateChange(e, setSearchAfter)}
                        placeholder="MM/DD/YYYY"
                    />
                    <input
                        className={`${SearchStyle.searchInput} ${SearchStyle.dateTo}`}
                        onChange={(e) => handleDateChange(e, setSearchBefore)}
                        placeholder="MM/DD/YYYY"
                    />
                    <div className={SearchStyle.sharpCornar}></div>
                </div>
            )}
        </>
    );
};


// 搜索信息展示子组件
const SearchText = ({ datePickId, channelPickId, searchAfter, searchBefore, selectedChannelNames }) => (
    datePickId >= 0 && channelPickId.length > 0 && (
        <div className={SearchStyle.searchInfo}>
            {selectedChannelNames} activities
            {searchAfter && searchBefore ? (
                <span> from {moment(searchAfter).format('MM/DD')} to {moment(searchBefore).format('MM/DD')}</span>
            ) : (
                <span> with no specific date range</span>
            )}
        </div>
    )
);

function SearchPanel({ handleSearch, channels, setChannelId, setAfter, setBefore, closeSearchPanel}) {
    const [datePickId, setDatePickId] = useState(-1);
    const [channelPickId, setChannelPickId] = useState([]);
    const [showDatePanel, setShowDatePanel] = useState(false);
    const [searchAfter, setSearchAfter] = useState(null);
    const [searchBefore, setSearchBefore] = useState(null);

    const handleDatePick = (e) => {
        const selectedDateId = e.target.tabIndex;
        setDatePickId(selectedDateId);

        const timestamps = generateTimestamps();
        const selectedDateText = e.target.innerText;

        if (selectedDateText === "LATER") {
            setShowDatePanel(true);
            setSearchAfter(null);
            setSearchBefore(null);
        } else {
            setShowDatePanel(false);
            if (timestamps[selectedDateText]) {
                setSearchAfter(timestamps[selectedDateText].start);
                setSearchBefore(timestamps[selectedDateText].end);
            } else {
                setSearchAfter(null);
                setSearchBefore(null);
            }
        }
    };

    const handleChannelPick = (e) => {
        const index = e.target.tabIndex;

        const channelId = channels[index].id; // 获取频道ID

        if (channelId === 0) {
            setChannelPickId(prevSelected =>
                prevSelected.includes(0)
                    ? prevSelected.filter(id => id !== 0) // 移除其它频道
                    : [0] // 添加新的ID
            );
        } else {
            setChannelPickId(prevSelected =>
                prevSelected.includes(channelId)
                    ? prevSelected.filter(id => id !== channelId) // 移除选中的ID
                    : [...prevSelected.filter(id => id !== 0), channelId] // 添加新的ID
            );
        }
    };

    const handleSearchCommit = () => {
        if (!searchAfter || !searchBefore) {
            alert("You should enter the correct date!");
            return;
        }

        if (datePickId >= 0 && channelPickId.length > 0) {

            setChannelId(channelPickId);
            setAfter(searchAfter);
            setBefore(searchBefore);

            handleSearch(channelPickId.includes(0) ? [] : channelPickId, searchAfter, searchBefore);
            closeSearchPanel();
        }
    };

    const selectedChannelNames = getSelectedChannelNames(channelPickId, channels);

    return (
        <div className={SearchStyle.sidebar}>
            <DatePicker datePickId={datePickId} handleDatePick={handleDatePick} />
            <LaterDatePickerComponent
                showDatePanel={showDatePanel}
                setSearchAfter={setSearchAfter}
                setSearchBefore={setSearchBefore}
            />
            <ChannelPicker channel={channels} channelPickId={channelPickId} handleChannelPick={handleChannelPick} />
            <div
                className={datePickId >= 0 && channelPickId.length > 0 ? SearchStyle.search : SearchStyle.unSearch}
                onClick={handleSearchCommit}>
                <div className={SearchStyle.searchMain}>
                    <img src={searchIcon} alt='search' className={SearchStyle.searchIcon} />
                    <p className={SearchStyle.searchTitle}>SEARCH</p>
                </div>
                <SearchText
                    datePickId={datePickId}
                    channelPickId={channelPickId}
                    searchAfter={searchAfter}
                    searchBefore={searchBefore}
                    selectedChannelNames={selectedChannelNames}
                />
            </div>
        </div>
    );
}

export default SearchPanel;