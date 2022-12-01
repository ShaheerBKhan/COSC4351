import styles from "./NavBar.module.css";
import NavButtons from '../NavButtons/NavButtons';

const NavBar = ( { setIsLoggedIn, isLoggedIn } ) => {
    return (
        <nav>
            <div className={styles["nav-items"]}>
                <div className={styles["nav-logo"]}>
                    <img  src="img/logo.png" alt="logo"/>
                </div>

                {<NavButtons setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}
            </div>
        </nav>
    )
}

export default NavBar;
