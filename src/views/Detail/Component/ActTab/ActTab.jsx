import TabStyle from './ActTab.module.css';
import infoIcon from '../../../../assets/SVGs/info-outline.svg'
import peopleIcon from '../../../../assets/SVGs/people-outline.svg'
import commentIcon from '../../../../assets/SVGs/comment-outline.svg'
import infoIconSelect from '../../../../assets/SVGs/info.svg'
import peopleIconSelect from '../../../../assets/SVGs/people.svg'
import commentIconSelect from '../../../../assets/SVGs/comment.svg'
import React from "react";

const iconMap = {
    details: { default: infoIcon, selected: infoIconSelect },
    participants: { default: peopleIcon, selected: peopleIconSelect },
    comments: { default: commentIcon, selected: commentIconSelect }
};

const ActTab = React.memo(function ActTab({ scrollToAnchor, sections, visibleSection }) {

    return (
        <div className={TabStyle.container}>
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    className={TabStyle.tab}
                    onClick={() => scrollToAnchor(index)}
                >
                    <img
                        src={visibleSection === section.ref.current ? iconMap[section.id].selected : iconMap[section.id].default}
                        alt={`${section.label} Icon`}
                        className={TabStyle.tabIcon}
                    />
                    <span className={visibleSection === section.ref.current ? TabStyle.nameSelect : TabStyle.name}>
                        {section.label}
                    </span>
                </div>
            ))}
        </div>
    );
});

export default ActTab

