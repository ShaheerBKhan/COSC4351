import styles from './Reservation.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Alert } from '../Alert/Alert';
import isHighTrafficDay from './isHighTrafficDay';
import minDateAttribute from './minDateAttribute';
import minTimeWarning from './minTimeWarning';
import validateDate from './validateDate';
import validateTime from './validateTime';

const Availability = ({nextStep, handleChange, state}) => {
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        minTimeWarning(setWarningMessage, setShowWarning);
        handleChange('isHighTrafficDay', `${isHighTrafficDay().toString()}`);
        // eslint-disable-next-line
    }, [state.time, state.date]);

    useLayoutEffect(() => {
        minDateAttribute();
    }, [])

    const validation = () => {
        if (!fieldsValid([state.date, state.time, state.guestCount])) {
            return;
        }

        minDateAttribute();
        if (!validateDate()) {
            setErrorMessage(`Invalid Date`);
            setShowError(true);
            return;
        }

        minTimeWarning(setWarningMessage, setShowWarning);
        if (!validateTime()) {
            setErrorMessage(`Invalid Time`);
            setShowError(true);
            return;
        }

        nextStep();
    }

    const fieldsValid = (fields) => {
        if (fields[0] === "") {
            setErrorMessage(`Date cannot be empty`);
            setShowError(true);
            return false;
        }

        if (fields[1] === "") {
            setErrorMessage(`Time cannot be empty`);
            setShowError(true);
            return false;
        }

        if (fields[2] === "" || fields[2] < 1) {
            setErrorMessage(`# of Guests cannot be empty`);
            setShowError(true);
            return false;
        }

        if (fields[2] > 40) {
            setErrorMessage(`# of Guests cannot exceed 40`);
            setShowError(true);
            return false;
        }

        setShowError(false);
        return true;
    }

    return(
        <main>
            <div className={styles["container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Reservation</h1>

                    {/* Secondary Title */}
                    <h2 className={styles["form-title"]}>Availability</h2>

                    {/* Warning Message */}
                    { showWarning && <Alert alertClass="warning" messages={
                        [
                            "~ - - - Mon-Sun: 8:00AM - 8:00PM - - - ~",
                            warningMessage
                        ]
                    } /> }
                    
                    {/* Error Message */}
                    {showError && <Alert alertClass="error"  messages={ [errorMessage] } />}

                    <div className={styles["form-input-group-div"]}>
                        {/* Date */}
                        <div className={styles["form-input-group"]}>
                            <label> <b>Date:</b></label>
                            <input className={styles["form-input"]} type="date" name="date" id={styles["date"]}
                                title="Select date" required
                                value={state.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                            />
                        </div>

                        {/* Time */}
                        <div className={styles["form-input-group"]}>
                            <label> <b>Time:</b></label>
                            <input className={styles["form-input"]} type="time" name="time" id={styles["time"]}
                                title="Select time" required
                                value={state.time}
                                onChange={(e) => handleChange('time', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* # of Guests */}
                    <div className={styles["form-input-group"]}>
                        <label> <b># of Guests:</b></label>
                        <input className={styles["form-input"]} type="number" name="guestCount" id={styles["guestCount"]}
                            min="1" title="Enter your last name in this field" required
                            value={state.guestCount}
                            onChange={(e) => handleChange('guestCount', e.target.value)}
                        />
                    </div>

                    {/* Next button */}
                    <div className={"button-single-div"}>
                        <input className={"button"} type="button" id="next" value="Next"
                            title="Click here to continue to the next page"
                            onClick={ validation }
                        />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Availability;
