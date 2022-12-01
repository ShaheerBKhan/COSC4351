import styles from "./Reservation.module.css";
import { useState } from "react";
import { Alert } from '../Alert/Alert';

const PaymentCard = ({prevStep, handleChange, handleSubmit, state}) => {
    const [showWarning] = useState(true);
    const [warningMessage] = useState(`${state.isHighTrafficDay}`);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validation = () => {
        if (!fieldsValid([state.cardName, state.cardNumber, state.cardExp, state.cardCvc])) {
            return;
        }

        handleSubmit();
    }

    const fieldsValid = (fields) => {
        if (fields[0] === "") {
            setErrorMessage(`Name cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\];,/{}|\\":<>?()_]/g.test(fields[0])) {
            setErrorMessage(`Name cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[1] === "") {
            setErrorMessage(`Card Number cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[a-zA-Z]/.test(fields[1])) {
            setErrorMessage(`Card Number cannot contain a letter`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[1])) {
            setErrorMessage(`Card Number cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._]/g.test(fields[1])) {
            setErrorMessage(`Card Number cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[1].length !== 12) {
            setErrorMessage(`Invalid Card Number`);
            setShowError(true);
            return false;
        }

        if (fields[2] === "") {
            setErrorMessage(`Exp cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[2])) {
            setErrorMessage(`Exp cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[a-zA-Z]/.test(fields[2])) {
            setErrorMessage(`Exp cannot contain a letter`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\]';,{}|\\":<>?()._]/g.test(fields[2])) {
            setErrorMessage(`Exp cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[2].length !== 5) {
            setErrorMessage(`Invalid Exp`);
            setShowError(true);
            return false;
        }

        if (fields[2].length === 5) {
            if (fields[2].charAt(2) !== '/') {
                setErrorMessage(`Invalid Exp`);
                setShowError(true);
                return false;
            }
        }

        if (fields[3] === "") {
            setErrorMessage(`CVC cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[a-zA-Z]/.test(fields[3])) {
            setErrorMessage(`CVC cannot contain a letter`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[3])) {
            setErrorMessage(`CVC cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._]/g.test(fields[3])) {
            setErrorMessage(`CVC cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[3].length !== 3) {
            setErrorMessage(`Invalid CVC`);
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
                    <h2 className={styles["form-title"]}>Payment Card</h2>

                    {/* Warning Message */}
                    { showWarning && <Alert alertClass="warning" messages={
                        [
                            "High Traffic Day",
                            warningMessage
                        ]
                    } />}
                    {showWarning && <Alert alertClass="warning" messages={ ["Credit Card Required" ] } />}

                    {/* Error Message */}
                    {showError && <Alert alertClass="error"  messages={ [errorMessage] } />}

                    {/* Card Name */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Full Name:</b></label>
                        <input className={styles["form-input"]} type="text" name="cardName"
                            title="Enter your full name in this field" required
                            placeholder=" Cardholder Name"
                            maxLength="100"
                            value={state.cardName}
                            onChange={(e) => handleChange('cardName', e.target.value)}
                        />
                    </div>

                    {/* Card Number */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Card Number:</b></label>
                        <input className={styles["form-input"]} type="text" name="cardNumber"
                            title="Enter your card number in this field" required
                            placeholder=" Card Number"
                            maxLength="12"
                            value={state.cardNumber}
                            onChange={(e) => handleChange('cardNumber', e.target.value)}
                        />
                    </div>

                    <div className={styles["form-input-group-div"]}>
                        {/* Exp */}
                        <div className={styles["form-input-group"]}>
                            <label> <b>Exp:</b></label>
                            <input className={styles["form-input"]} type="text" name="cardExp" id={styles["cardExp"]}
                                placeholder=" MM/YY"
                                maxLength="5"
                                title="Enter card exp" required
                                value={state.cardExp}
                                onChange={(e) => handleChange('cardExp', e.target.value)}
                            />
                        </div>

                        {/* Cvc */}
                        <div className={styles["form-input-group"]}>
                            <label> <b>CVC:</b></label>
                            <input className={styles["form-input"]} type="text" name="cardCvc" id={styles["cardCvc"]}
                                title="Enter card number in this field" required
                                placeholder=" 123"
                                maxLength="3"
                                value={state.cardCvc}
                                onChange={(e) => handleChange('cardCvc', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"button-group-div"}>
                        {/* previous button */}
                        <input className={"button"} type="button" id="previous" value="Previous"
                            title="Click here to go back to the previous page"
                            onClick={ prevStep }
                        />

                        {/* Next button */}
                        <input className={"button"} type="button" id="next" value="Next"
                            title="Click here to go back to the next page"
                            onClick={ validation }
                        />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default PaymentCard;
