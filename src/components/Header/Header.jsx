import searchIcon from '../../assets/SVGs/search.svg';
import logoIcon from '../../assets/SVGs/logo-cat1.svg';
import homeIcon from '../../assets/SVGs/home.svg';
import headerStyle from './Header.module.css';
import {useNavigate} from "react-router-dom";

const Header =  ((props) => {

    const Navigate = useNavigate();

    const {setIsSearchPanelOpen, avatar} = props;

    // 根据当前页面决定点击事件
    const judgeFlag= () => {
        if (props.flag === 'search') {
            setIsSearchPanelOpen(true)
            document.getElementById("sidebar").style.right = "25%";
            document.getElementById("main").style.marginLeft = "75%";
        } else {
            Navigate(-1)
        }
    }

    // 导航至个人页面
    const naviHomePage = () => {
        Navigate('/Home')
    }

    return (
        <div className={headerStyle.container}>
            <img src={props.flag === 'search' ? searchIcon : homeIcon} alt='img' className={headerStyle.search} onClick={judgeFlag}/>
            <img src={logoIcon} alt='img' className={headerStyle.logo}/>
            <img src={avatar} alt='img' className={headerStyle.user} onClick={naviHomePage}/>
        </div>
    )
})

export default Header