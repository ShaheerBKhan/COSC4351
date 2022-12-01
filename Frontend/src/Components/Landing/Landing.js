import styles from './Landing.module.css';
import React from 'react';

export const Landing = () => {
    return(
        <main>
            <table><tbody><tr><td className={styles["td"]}>
                {/* Guest */}
                <div className={styles["container"]}>
                    <form action="guest">
                        <input className={"button-image"} type="image" src="img/guest.png" alt="submit"
                            title="Click here to Continue as a Guest"/>
                        <input className={"button-text"} type="submit"
                            title="Click here to Continue as a Guest" value="Guest"/>
                    </form>
                </div>
            </td><td className={styles["td"]}>
                {/* Login */}
                <div className={styles["container"]}>
                    <form action="login">
                        <input className={"button-image"} type="image" src="img/login.png" alt="submit"
                            title="Click here to Login as a Registered User"/>
                        <input className={"button-text"} type="submit"
                            title="Click here to Login as a Registered User" value="Login"/>
                    </form>
                </div>
            </td><td className={styles["td"]}>
                {/* Register */}
                <div className={styles["container"]}>
                    <form action="register">
                        <input className={"button-image"} type="image" src="img/register.png" alt="submit"
                            title="Click here to Register as a New User"/>
                        <input className={"button-text"} type="submit"
                            title="Click here to Register as a New User" value="Register"/>
                    </form>
                </div>
            </td></tr></tbody></table>
        </main>
    );
}
