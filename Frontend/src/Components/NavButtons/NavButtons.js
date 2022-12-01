import { useNavigate } from 'react-router-dom';
import { logoutPost } from '../../Controller/Controller';
import styles from './NavButtons.module.css';

const NavButtons = ({ setIsLoggedIn, isLoggedIn }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate(isLoggedIn ? '/home' : '/');
    }

    const logout = async () => {
        await logoutPost(localStorage.getItem("loginToken"));
        localStorage.clear();
        setIsLoggedIn(false)
        navigate('/');
    }

    return (
        <div>
            <input onClick={ goToHome } type="button" className={ styles["button"] } title="Go to Home" id="home" value="Home" />
            
            {isLoggedIn && <input onClick={logout} type="button" className={styles["button"]} title="Log out of account" id={styles["logout"]} value="Logout" />}
        </div>
    )
}

export default NavButtons;
