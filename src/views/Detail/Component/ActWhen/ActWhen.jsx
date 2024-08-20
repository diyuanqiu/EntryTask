import WhenStyle from './ActWhen.module.css';
import React, {useContext} from "react";
import dataFromIcon from '../../../../assets/SVGs/date-from.svg';
import dataToIcon from '../../../../assets/SVGs/date-to.svg';
import moment from 'moment';
import {ActivityDetailContext} from "../../Context/ActivityDetailContext.jsx";

const ActWhen = React.memo(function ActWhen() {

    const eventDetail = useContext(ActivityDetailContext);

    return (
        <div className={WhenStyle.when}>
            <div className={WhenStyle.title}>When</div>
            <div className={WhenStyle.whenMain}>
                <div className={WhenStyle.begin}>
                    <div className={WhenStyle.dateContent}>
                        <img src={dataFromIcon} alt='begin' className={WhenStyle.dateIcon}/>
                        <div className={WhenStyle.dateDate}>
                            {moment(eventDetail.begin_time).format('DD MMM YYYY')}
                        </div>
                    </div>
                    <div className={WhenStyle.dateTime}>
                        {moment(eventDetail.begin_time).format('HH:mm')}
                    </div>
                </div>
                <div className={WhenStyle.end}>
                    <div className={WhenStyle.dateContent}>
                        <img src={dataToIcon} alt='end' className={WhenStyle.dateIcon}/>
                        <div className={WhenStyle.dateDate}>
                            {moment(eventDetail.end_time).format('DD MMM YYYY')}
                        </div>
                    </div>
                    <div className={WhenStyle.dateTime}>
                        {moment(eventDetail.end_time).format('HH:mm')}
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ActWhen;