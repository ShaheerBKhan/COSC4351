import styles from './Home.module.css';
import React from 'react';

export const Home = () => {
    return(
        <main>
            <table><tbody><tr><td className={styles["td"]}>
                {/* New Reservation */}
                <div className={styles["container"]}>
                    <form action="Reservation">
                        <input className={"button-image"} type="image" src="img/reservation.png" alt="submit"
                            title="Click here to Make a new Reservation"/>
                        <input className={"button-text"} type="submit"
                            title="Click here to Make a new Reservation" value="New Reservation"/>
                    </form>
                </div>
            </td><td className={styles["td"]}>
                {/* Reservation History*/}
                <div className={styles["container"]}>
                    <form action="reservationHistory">
                        <input className={"button-image"} type="image" src="img/ReservationHistory.png" alt="submit"
                            title="Click here to view Reservation History"/>
                        <input className={"button-text"} type="submit"
                            title="Click here to view Reservation History" value="Reservation History"/>
                    </form>
                </div>
            </td><td className={styles["td"]}>
                {/* Profile */}
                <div className={styles["container"]}>
                    <form action="Profile">
                        <input className={"button-image"} type="image" src="img/profile.png" alt="submit"
                            title="Click here to Update Profile"/>
                        <input className={"button-text"} type="submit"
                            title="Click here to Update Profile" value="Profile"/>
                    </form>
                </div>
            </td></tr></tbody></table>
        </main>
    );
}
