import DesStyle from './ActDescrip.module.css';
import React, {useEffect, useState} from "react";
import testImage from '../../../assets/IMGs/Street-Dance-01.jpg'

const ActDescrip = (props) => {

    const {param} = props

    const [isTextShow, setIsTextShow] = useState(false);

    const handleIsTextShow = () => {
        setIsTextShow(!isTextShow);
    }

    const [imgArray, setImgArray] = useState([])

    const getImgArray = () =>{
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