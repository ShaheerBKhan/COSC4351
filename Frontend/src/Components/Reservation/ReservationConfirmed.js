import styles from './Reservation.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../Alert/Alert';

const ReservationConfirmed = ({state, isLoggedIn}) => {
    const navigate = useNavigate();

    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        // eslint-disable-next-line
        if (state.isHighTrafficDay != "false") {
            setWarningMessage(`No show will have a minimum of $10 charge`);
            setShowWarning(true);
        }
        else
            setShowWarning(false);
        // eslint-disable-next-line
    }, []);

    const no = () => {
        navigate('/');
    }

    const yes = () => {
        navigate('/Register');
    }

    return(
        <main>
            <div className={styles["section"]}>
                <div className={styles["style-1-table-container"]}>
                    <form className={styles["form-parent"]}>
                        {/* Title */}
                        <h1 className={styles["form-title"]}>Reservation</h1>

                        {/* Secondary Title */}
                        <h2 className={styles["form-title"]}>Confirm Reservation</h2>

                        {/* Warning Message */}
                        {showWarning && <Alert alertClass="warning" messages={
                            [
                                "High Traffic Day",
                                warningMessage
                            ]
                        }/>}

                        {/* Success Message */}
                        <Alert alertClass="success" messages={ ["Reservation Confirmed!"] }/>

                        {/* Table */}
                        <table className={styles["style-1-table"]}><tbody>
                            <tr className={styles["style-1-tr"]}>
                                <th className={styles["style-1-th"]}>Name</th>
                                <th className={styles["style-1-th"]}>Phone</th>
                                <th className={styles["style-1-th"]}>Email</th>
                                <th className={styles["style-1-th"]}>Total Guests</th>
                                <th className={styles["style-1-th"]}>Combine Needed</th>
                                <th className={styles["style-1-th"]}>Date</th>
                                <th className={styles["style-1-th"]}>Time</th>
                            </tr>
                            <tr className={`${styles["style-1-tr"]} ${styles["style-1-row"]}`}>
                                <td className={styles["style-1-td"]}> {state.firstName} {state.lastName} </td>
                                <td className={styles["style-1-td"]}> {state.phone} </td>
                                <td className={styles["style-1-td"]}> {state.email} </td>
                                <td className={styles["style-1-td"]}> {state.guestCount} </td>
                                <td className={styles["style-1-td"]}> {state.combineTables? "Yes" : "No"} </td>
                                <td className={styles["style-1-td"]}> {state.date} </td>
                                <td className={styles["style-1-td"]}> {state.time} </td>
                            </tr>
                        </tbody></table>
                    </form>
                </div>

                {!isLoggedIn && <div className={styles["question-container"]}>
                    <form className={styles["form-parent"]}>
                        <div className={styles["section-2"]}>
                            <div>
                                <img src="img/logo.png" alt="logo" className={styles["logo"]}/>
                            </div>

                            {/* Title */}
                            <h2 className={styles["question-title"]}>Do you also want to Register a new account?</h2>

                            <div className={"button-group-div"}>
                                {/* No button */}
                                <input className={"button"} type="button" id="no" value="No"
                                    title="Click here to go back to the landing page"
                                    onClick={ no }
                                />

                                {/* Yes button */}
                                <input className={"button"} type="button" id="yes" value="Yes"
                                    title="Click here to create a new account"
                                    onClick={ yes }
                                />
                            </div>
                        </div>
                    </form>
                </div>}
            </div>
        </main>
    );
}

export default ReservationConfirmed;
