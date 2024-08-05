import TabStyle from './ActTab.module.css';
import infoIcon from '../../../assets/SVGs/info-outline.svg'
import peopleIcon from '../../../assets/SVGs/people-outline.svg'
import commentIcon from '../../../assets/SVGs/comment-outline.svg'
import infoIconSelect from '../../../assets/SVGs/info.svg'
import peopleIconSelect from '../../../assets/SVGs/people.svg'
import commentIconSelect from '../../../assets/SVGs/comment.svg'
import React from "react";

const ActTab = (props) => {

    const { isSelect, setIsSelect, scrollToAnchor} = props;

    return (
        <React.Fragment>
            <div className={TabStyle.container}>
                <div className={TabStyle.tab} onClick={() => {setIsSelect(0);scrollToAnchor(0)}}>
                    <img src={isSelect === 0 ? infoIconSelect : infoIcon} alt="infoIcon" className={TabStyle.tabIcon}/>
                    <span className={isSelect === 0 ? TabStyle.nameSelect : TabStyle.name}> Details </span>
                </div>
                <div className={TabStyle.partTab} onClick={() => {setIsSelect(1);scrollToAnchor(1)}}>
                    <img src={isSelect === 1 ? peopleIconSelect : peopleIcon} alt="peopleIcon"
                         className={TabStyle.tabIcon}/>
                    <span className={isSelect === 1 ? TabStyle.nameSelect : TabStyle.name}> Participants </span>
                </div>
                <div className={TabStyle.tab} onClick={() => {setIsSelect(2);scrollToAnchor(2)}}>
                    <img src={isSelect === 2 ? commentIconSelect : commentIcon} alt="commentIcon"
                         className={TabStyle.tabIcon}/>
                    <span className={isSelect === 2 ? TabStyle.nameSelect : TabStyle.name}> Comments </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActTab