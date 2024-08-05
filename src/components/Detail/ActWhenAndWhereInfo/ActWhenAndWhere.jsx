import WStyle from './ActWhenAndWhere.module.css';
import React from "react";
import dataFromIcon from '../../../assets/SVGs/date-from.svg';
import dataToIcon from '../../../assets/SVGs/date-to.svg';
import mapImg from '../../../assets/IMGs/gmap.png';
import moment from 'moment';

const ActWhenAndWhere = (props) => {

    const {param} = props

    return (
        <React.Fragment>

            <div className={WStyle.when}>
                <div className={WStyle.title}>When</div>
                <div className={WStyle.whenMain}>
                    <div className={WStyle.begin}>
                        <div className={WStyle.dateContent}>
                            <img src={dataFromIcon} alt='begin' className={WStyle.dateIcon}/>
                            <div className={WStyle.dateDate}>
                                {moment(param.begin_time).format('DD MMM YYYY')}
                            </div>
                        </div>
                        <div className={WStyle.dateTime}>
                            {moment(param.begin_time).format('HH:mm')}
                        </div>
                    </div>
                    <div className={WStyle.end}>
                        <div className={WStyle.dateContent}>
                            <img src={dataToIcon} alt='end' className={WStyle.dateIcon}/>
                            <div className={WStyle.dateDate}>
                                {moment(param.end_time).format('DD MMM YYYY')}
                            </div>
                        </div>
                        <div className={WStyle.dateTime}>
                            {moment(param.end_time).format('HH:mm')}
                        </div>
                    </div>
                </div>
            </div>

            <div className={WStyle.where}>
                <div className={WStyle.title}>Where</div>
                <div className={WStyle.whereMain}>
                    <div className={WStyle.whereTitle}>
                        {param.location}
                    </div>
                    <div className={WStyle.whereUnderTitle}>
                        {param.location_detail}
                    </div>
                    <img src={mapImg} alt='map' className={WStyle.mapImg}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActWhenAndWhere;