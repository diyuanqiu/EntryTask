import DesStyle from './ActDescrip.module.css';
import React, { useState } from "react";
import {useContext} from "react";
import {ActivityDetailContext} from "../../Context/ActivityDetailContext.jsx";

const ActDescrip = React.memo(function ActDescrip() {

    const eventDetail = useContext(ActivityDetailContext);
    // 详情文本是否显示
    const [isTextShow, setIsTextShow] = useState(false);

    const handleIsTextShow = () => {
        setIsTextShow(!isTextShow);
    }

    return (
        <div className={DesStyle.container}>
            <div className={DesStyle.imgArray}>
                {eventDetail.images?.length > 0 && eventDetail.images?.map((item, index) => (
                    <img src={item} alt='轮播图' className={DesStyle.img} key={index}/>
                ))}
            </div>
            <div className={DesStyle.descip}>
                <div className={isTextShow ? DesStyle.showText : DesStyle.text}>
                    <button className={DesStyle.viewButton} onClick={handleIsTextShow}>
                        {isTextShow ? "HIDE" : "VIEW ALL"}
                    </button>
                    {eventDetail.description}
                </div>
            </div>
        </div>
    )
});

export default ActDescrip;