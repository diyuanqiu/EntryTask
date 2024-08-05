import DesStyle from './ActDescrip.module.css';
import React, {useEffect, useState} from "react";

const ActDescrip = (props) => {

    const {param} = props

    // 详情文本是否显示
    const [isTextShow, setIsTextShow] = useState(false);

    const handleIsTextShow = () => {
        setIsTextShow(!isTextShow);
    }

    // 活动轮播图
    const [imgArray, setImgArray] = useState([])

    const getImgArray = () =>{
        // 判断活动是否有轮播图
        if (param.hasOwnProperty('images') === false || param.images.length === 0){
          setImgArray([])
        } else if (param.images.length > 0){
            const img = param.images.map((item,index) => (
                <img src={item} alt='加载失败' className={DesStyle.img}/>
            ))
            setImgArray(img)
        }
    }

    useEffect(() => {
        getImgArray()
        // console.log(imgArray)
    }, [param])

    return (
        <React.Fragment>
            <div className={DesStyle.container} id={"Description"}>
                <div className={DesStyle.imgArray}>
                    {imgArray}
                </div>
                <div className={DesStyle.descip}>
                    <div className={isTextShow ? DesStyle.showText : DesStyle.text}>
                        <button className={DesStyle.viewButton} onClick={handleIsTextShow}>
                            {isTextShow ? "HIDE" : "VIEW ALL"}
                        </button>
                        {param.description}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActDescrip;