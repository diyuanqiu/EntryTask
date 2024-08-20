import noActivityIcon from "../../../../assets/SVGs/no-activity.svg";
import {getSelectedChannelNames} from "../../../../utils/channel.js";
import ListViewStyle from "../../ListView.module.css";
import moment from "moment";

// 搜索结果展示子组件
const SearchInfo = ({ isSearch, total, channelId, channels, after, before, handleClearSearch }) => (
    isSearch && (
        <>
            <div className={ListViewStyle.Search}>
                <div className={ListViewStyle.resButton}>
                    <p className={ListViewStyle.resCount}>{total} Results</p>
                    <button onClick={handleClearSearch}>CLEAR SEARCH</button>
                </div>
                <p className={ListViewStyle.resContent}>
                    Search {getSelectedChannelNames(channelId, channels)} activities from {moment(after).format('MM/DD')} to {moment(before).format('MM/DD')}
                </p>
            </div>
            {!total && (
                <div className={ListViewStyle.noActivity}>
                    <p>No activity found</p>
                    <img src={noActivityIcon} alt='no-activity' />
                </div>
            )}
        </>
    )
);

export default SearchInfo;