// 活动列表渲染子组件
import ListItem from "../../../../components/ListItem/ListItem.jsx";

const EventList = ({ eventsArr, searchResArr, isSearch, isLoading }) => {

    return (
        <>
            {(isSearch ? searchResArr : eventsArr).map((item) => (
                <ListItem
                    param = {item}
                    key = {item.id } //避免key重复
                    itemID = {item.id}
                ></ListItem>
            ))}
            {isLoading && <div>Loading...</div>}
        </>
    )
}

export default EventList;