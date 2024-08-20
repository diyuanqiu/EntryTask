import searchIcon from '../../assets/SVGs/search.svg';
import logoIcon from '../../assets/SVGs/logo-cat1.svg';
import homeIcon from '../../assets/SVGs/home.svg';
import headerStyle from './Header.module.css';
import {useNavigate} from "react-router-dom";

function Header({flag, setIsSearchPanelOpen}) {

    const navigate = useNavigate();

    const avatar = localStorage.getItem('avatar');
    // 根据当前页面决定点击事件
    const handleHeaderClick = () => {
        if (flag === 'search') {
            setIsSearchPanelOpen(true);
        } else {
            navigate(-1);
        }
    };

    // 导航至个人页面
    const naviHomePage = () => {
        navigate('/Home')
    };

    return (
        <div className={headerStyle.container}>
            <img src={flag === 'search' ? searchIcon : homeIcon} alt='img' className={headerStyle.search}
                 onClick={handleHeaderClick}/>
            <img src={logoIcon} alt='img' className={headerStyle.logo}/>
            <img src={avatar} alt='img' className={headerStyle.user} onClick={naviHomePage}/>
        </div>
    )
}

export default Header