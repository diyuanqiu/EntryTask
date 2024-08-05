import searchIcon from '../../assets/SVGs/search.svg';
import logoIcon from '../../assets/SVGs/logo-cat1.svg';
import userIcon from '../../assets/SVGs/user.svg';
import homeIcon from '../../assets/SVGs/home.svg';
import headerStyle from './Header.module.css';
import {useNavigate} from "react-router-dom";

const Header =  ((props) => {

    const Navigate = useNavigate();

    // eslint-disable-next-line react/prop-types
    const {isSearchPanelOpen, setIsSearchPanelOpen, avatar, token} = props;

    const judgeFlag= () => {
        // eslint-disable-next-line react/prop-types
        if (props.flag === 'search') {
            setIsSearchPanelOpen(true)
            document.getElementById("sidebar").style.right = "25%";
            document.getElementById("main").style.marginLeft = "75%";
        } else {
            Navigate(-1)
        }
    }

    const naviHomePage = () => {
        Navigate('/Home')
    }

    return (
        <div className={headerStyle.container}>
            {/* eslint-disable-next-line react/prop-types */}
            <img src={props.flag === 'search' ? searchIcon : homeIcon} alt='img' className={headerStyle.search} onClick={judgeFlag}/>
            <img src={logoIcon} alt='img' className={headerStyle.logo}/>
            <img src={avatar} alt='img' className={headerStyle.user} onClick={naviHomePage}/>
        </div>
    )
})

export default Header