import styles from './Profile.module.css';
import { useState } from 'react';
import { Alert } from '../Alert/Alert';

const PersonalDetails = ({nextStep, handleChange, state}) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fieldsValid = (fields) => {
        if (fields[0] === "") {
            setErrorMessage(`First Name cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\];,/{}|\\":<>?()_]/g.test(fields[0])) {
            setErrorMessage(`First Name cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[1] === "") {
            setErrorMessage(`Last Name cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\];,/{}|\\":<>?()_]/g.test(fields[1])) {
            setErrorMessage(`Last Name cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[2] === "") {
            setErrorMessage(`Phone cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[a-zA-Z]/.test(fields[2])) {
            setErrorMessage(`Phone cannot contain a letter`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[2])) {
            setErrorMessage(`Phone cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._]/g.test(fields[2])) {
            setErrorMessage(`Phone cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[2].length !== 10) {
            setErrorMessage(`Invalid Phone`);
            setShowError(true);
            return false;
        }

        if (fields[3] === "") {
            setErrorMessage(`Email cannot be empty`);
            setShowError(true);
            return false;
        }

        if (!(/\S+@\S+\.\S+/.test(fields[3]))) {
            setErrorMessage(`Invalid Email`);
            setShowError(true);
            return false;
        }

        setShowError(false);
        return true;
    }

    const validation = () => {
        if (!fieldsValid([state.firstName, state.lastName, state.phone, state.email])) {
            return;
        }

        nextStep();
    }

    return(
        <main>
            <div className={styles["container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Profile</h1>

                    {/* Secondary Title */}
                    <h2 className={styles["form-title"]}>Personal Details</h2>

                    {/* Error Message */}
                    {showError && <Alert alertClass="error"  messages={ [errorMessage] } />}

                    {/* First Name */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>First Name:</b></label>
                        <input className={styles["form-input"]} type="text" name="firstName"
                            title="Enter your first name in this field" required
                            maxLength="30"
                            value={state.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Last Name:</b></label>
                        <input className={styles["form-input"]} type="text" name="lastName"
                            title="Enter your last name in this field" required
                            maxLength="30"
                            value={state.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Phone:</b></label>
                        <input className={styles["form-input"]} type="text" name="phone"
                            title="Enter your phone number in this field" required
                            maxLength="10"
                            value={state.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Email:</b></label>
                        <input className={styles["form-input"]} type="email" name="email"
                            title="Enter your email address in this field" required
                            maxLength="100"
                            value={state.email}
                            onChange={(e) => handleChange('email', e.target.value)}
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

export default PersonalDetails;
