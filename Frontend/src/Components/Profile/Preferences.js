import styles from './Profile.module.css';
import { useState } from 'react';
import { Alert } from '../Alert/Alert';

const Preferences = ({prevStep, handleChange, handleSubmit, state}) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fieldsValid = (fields) => {
        if (fields[0] === "") {
            setErrorMessage(`Payment Method cannot be empty`);
            setShowError(true);
            return false;
        }

        setShowError(false);
        return true;
    }

    const validation = (e) => {
        e.preventDefault()

        if (!fieldsValid([state.paymentMethod])) {
            return;
        }

        handleSubmit();
    }
    
    return(
        <main>
            <div className={styles["container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Profile</h1>

                    {/* Secondary Title */}
                    <h2 className={styles["form-title"]}>Preferences</h2>

                    {/* Error Message */}
                    {showError && <Alert alertClass="error"  messages={ [errorMessage] } />}

                    {/* Preferred Diner # */}
                    <div className={styles["form-output-group"]}>
                        <div className={styles["form-input-group-div"]}>
                            <div>
                                <label> <b>Preferred Diner #</b> </label>
                            </div>
                            <div>
                                <input type="number" id={styles["preferredDiner"]} name="preferredDiner" value={state.dinerNumber} disabled />
                            </div>
                        </div>
                    </div>

                    {/* Earned Points */}
                    <div className={styles["form-output-group"]}>
                        <div className={styles["form-input-group-div"]}>
                            <div>
                                <label> <b>Earned Points:</b> </label>
                            </div>
                            <div>
                                <input type="number" id={styles["earnedPoints"]} name="earnedPoints" value={state.earnedPoints} disabled />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Preferred Payment Method:</b> </label>
                            <div className={styles["form-input-radio"]}>
                                <input type="radio" name="paymentMethod"
                                    checked={state.paymentMethod === 'cash'}
                                    onChange={(e) => handleChange('paymentMethod', 'cash')}
                                />
                                <label> Cash </label>
                            </div>

                            <div className={styles["form-input-radio"]}>
                                <input type="radio" name="paymentMethod"
                                    checked={state.paymentMethod === 'credit'}
                                    onChange={(e) => handleChange('paymentMethod', 'credit')}
                                />
                                <label> Credit </label>
                            </div>

                            <div className={styles["form-input-radio"]}>
                                <input type="radio" name="paymentMethod"
                                    checked={state.paymentMethod === 'check'}
                                    onChange={(e) => handleChange('paymentMethod', 'check')}
                                />
                                <label> Check </label>
                            </div>
                    </div>

                    <div className={"button-group-div"}>
                        {/* Previous button */}
                        <input className={"button"} type="button" id="previous" value="Previous"
                            title="Click here to go back to the previous page"
                            onClick={ prevStep }
                        />

                        {/* Submit button */}
                        <input className={"button"} type="button" id="submit" value="Submit"
                            title="Click here to submit"
                            onClick={ validation }
                        />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Preferences;
