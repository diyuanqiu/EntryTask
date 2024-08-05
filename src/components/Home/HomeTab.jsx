import React from "react";
import HomeTabStyle from './HomeTab.module.css';
import likeIconSelect from "../../assets/SVGs/like-green.svg"
import likeIcon from '../../assets/SVGs/like-outline-gray.svg'
import goingIconSelect from "../../assets/SVGs/check-green.svg";
import goingIcon from "../../assets/SVGs/check-outline-gray.svg";
import pastIconSelect from "../../assets/SVGs/past-green.svg";
import pastIcon from "../../assets/SVGs/past-outline-gray.svg";

const HomeTab = (props) => {

    const { isSelect, setIsSelect, param} = props;

    return (
        <React.Fragment>
            <div className={HomeTabStyle.container}>
                <div className={HomeTabStyle.tab} onClick={() => {
                    setIsSelect(0);
                }}>
                    <img src={isSelect === 0 ? likeIconSelect : likeIcon} alt="喜欢" className={HomeTabStyle.tabIcon}/>
                    <span className={isSelect === 0 ? HomeTabStyle.nameSelect : HomeTabStyle.name}> {param.likes_count} Likes </span>
                </div>
                <div className={HomeTabStyle.partTab} onClick={() => {
                    setIsSelect(1);
                }}>
                    <img src={isSelect === 1 ? goingIconSelect : goingIcon} alt="参与"
                         className={HomeTabStyle.tabIcon}/>
                    <span className={isSelect === 1 ? HomeTabStyle.nameSelect : HomeTabStyle.name}> {param.goings_count} Going</span>
                </div>
                <div className={HomeTabStyle.tab} onClick={() => {
                    setIsSelect(2);
                }}>
                    <img src={isSelect === 2 ? pastIconSelect : pastIcon} alt="完成"
                         className={HomeTabStyle.tabIcon}/>
                    <span className={isSelect === 2 ? HomeTabStyle.nameSelect : HomeTabStyle.name}> {param.past_count} Past</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomeTab;