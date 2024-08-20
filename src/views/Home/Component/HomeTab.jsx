import HomeTabStyle from './HomeTab.module.css';
import likeIconSelect from "../../../assets/SVGs/like-green.svg"
import likeIcon from '../../../assets/SVGs/like-outline-gray.svg'
import goingIconSelect from "../../../assets/SVGs/check-green.svg";
import goingIcon from "../../../assets/SVGs/check-outline-gray.svg";
import pastIconSelect from "../../../assets/SVGs/past-green.svg";
import pastIcon from "../../../assets/SVGs/past-outline-gray.svg";

function TabItem({ isSelected, icon, selectedIcon, label, count, onClick }) {
    return (
        <div className={HomeTabStyle.tab} onClick={onClick}>
            <img
                src={isSelected ? selectedIcon : icon}
                alt={label}
                className={HomeTabStyle.tabIcon}
            />
            <span className={isSelected ? HomeTabStyle.nameSelect : HomeTabStyle.name}>
                {count} {label}
            </span>
        </div>
    );
}

const tabsConfig = [
    { id: 0, label: 'liked', icon: likeIcon, selectedIcon: likeIconSelect, countKey: 'likes_count' },
    { id: 1, label: 'going', icon: goingIcon, selectedIcon: goingIconSelect, countKey: 'goings_count' },
    { id: 2, label: 'past', icon: pastIcon, selectedIcon: pastIconSelect, countKey: 'past_count' },
];

function HomeTab({ isSelect, setIsSelect, user, getEvents }) {
    return (
        <div className={HomeTabStyle.container}>
            {tabsConfig.map(tab => (
                <TabItem
                    key={tab.id}
                    isSelected={isSelect === tab.id}
                    icon={tab.icon}
                    selectedIcon={tab.selectedIcon}
                    label={tab.label}
                    count={user[tab.countKey]}
                    onClick={() => {setIsSelect(tab.id);getEvents(tab.label)}}
                />
            ))}
        </div>
    );
}

export default HomeTab;