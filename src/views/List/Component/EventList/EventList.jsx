// 活动列表渲染子组件
import ListItem from "../../../../components/ListItem/ListItem.jsx";

const EventList = ({ eventsArr,isLoading }) => {

    return (
        <>
            {eventsArr.map((item) => (
                <ListItem
                    param = {item}
                    key = {item.id }
                    itemID = {item.id}
                ></ListItem>
            ))}
            {isLoading && <div>Loading...</div>}
        </>
    )
}

export default EventList;