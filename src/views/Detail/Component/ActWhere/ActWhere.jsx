import React, {useContext} from "react";
import {ActivityDetailContext} from "../../Context/ActivityDetailContext.jsx";
import WhereStyle from "./ActWhere.module.css"
import mapImg from "../../../../assets/IMGs/gmap.png";

const ActWhere = React.memo(function ActWhere() {

    const eventDetail = useContext(ActivityDetailContext);

    return (
        <div className={WhereStyle.where}>
            <div className={WhereStyle.title}>Where</div>
            <div className={WhereStyle.whereMain}>
                <div className={WhereStyle.whereTitle}>
                    {eventDetail.location}
                </div>
                <div className={WhereStyle.whereUnderTitle}>
                    {eventDetail.location_detail}
                </div>
                <img src={mapImg} alt='map' className={WhereStyle.mapImg}/>
            </div>
        </div>
    )
});

export default ActWhere;