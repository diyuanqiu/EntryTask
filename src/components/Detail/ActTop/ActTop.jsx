import TopStyle from './ActTop.module.css';
import React, {useEffect} from 'react';
import moment from 'moment';

const ActTop = (props) => {

    const {param} = props

    // 发布时间与现在的间隔时间
    const [publishedInterval, setPublishedInterval] = React.useState(0)

    const getPublishedInterval = () =>{
        let publishedDate = moment(param.begin_time).format('DD MMM YYYY HH:mm')

        let nowDate = moment().format('DD MMM YYYY HH:mm')

        let day = moment(nowDate).diff(moment(publishedDate),'days')

        setPublishedInterval(day)
    }

    useEffect(()=>{
        getPublishedInterval()
    },[])

    return (
        <React.Fragment>
            <div className={TopStyle.top}>
                <div className={TopStyle.channel}>
                    {param.channel.name}
                </div>
                <div className={TopStyle.title}>
                    {param.name}
                </div>
                <div className={TopStyle.userInfo}>
                    <img src={param.creator.avatar} alt={'用户头像'} className={TopStyle.userAva}/>
                    <div className={TopStyle.nameAndDay}>
                        <span className={TopStyle.userName}> {param.creator.username} </span>
                        {publishedInterval === 0 ? <span className={TopStyle.day}> Published today</span> :
                        <span className={TopStyle.day}> Published {publishedInterval} days ago</span>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ActTop;