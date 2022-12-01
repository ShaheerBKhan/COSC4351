import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import { Alert } from '../Alert/Alert';

const BillingAddress = ({prevStep, nextStep, handleChange, state, setState}) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fieldsValid = (fields) => {
        if (fields[0] === "") {
            setErrorMessage(`Address 1 cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/[~`!$^&*+=[\];,{}|\\":<>?()_]/g.test(fields[0])) {
            setErrorMessage(`Address 1 cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (/[~`!$^&*+=[\];,{}|\\":<>?()_]/g.test(fields[1])) {
            setErrorMessage(`Address 2 cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[2] === "") {
            setErrorMessage(`City cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[2])) {
            setErrorMessage(`City cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[0-9]/.test(fields[2])) {
            setErrorMessage(`City cannot contain a number`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._]/g.test(fields[2])) {
            setErrorMessage(`City cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[3] === "") {
            setErrorMessage(`State cannot be empty`);
            setShowError(true);
            return false;
        }

        if (fields[4] === "") {
            setErrorMessage(`ZIP/Postal Code cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[4])) {
            setErrorMessage(`ZIP/Postal Code cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[a-zA-Z]/.test(fields[4])) {
            setErrorMessage(`ZIP/Postal Code cannot contain a letter`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=[\]';,/{}|\\":<>?()._]/g.test(fields[4])) {
            setErrorMessage(`ZIP/Postal Code cannot contain a special character`);
            setShowError(true);
            return false;
        }
        
        if (fields[4].length !== 5) {
            if (fields[4].length !== 10 || fields[4].charAt(5) !== '-') {
                setErrorMessage(`Invalid ZIP/Postal Code`);
                setShowError(true);
                return false;
            }
        }

        if (fields[4].length === 5) {
            if (/-/.test(fields[4])) {
                setErrorMessage(`Invalid ZIP/Postal Code`);
                setShowError(true);
                return false;
            }
        }

        setShowError(false);
        return true;
    }

    const validation = () => {
        if (!fieldsValid([state.billingAddress1, state.billingAddress2, state.billingCity, state.billingState, state.billingZip])) {
            return;
        }

        nextStep();
    }
    
    const copyMailingAddress = () => {
        setState({
            ...state,
            billingAddress1: state.mailingAddress1,
            billingAddress2: state.mailingAddress2,
            billingCity: state.mailingCity,
            billingState: state.mailingState,
            billingZip: state.mailingZip
        });
    };

    useEffect(() => {
        if (state.billingCheckbox) {
            copyMailingAddress();
        }
        // eslint-disable-next-line
    }, [state.billingCheckbox]);
    
    return(
        <main>
            <div className={styles["container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Profile</h1>

                    {/* Secondary Title */}
                    <h2 className={styles["form-title"]}>Billing Address</h2>

                    {/* Error Message */}
                    {showError && <Alert alertClass="error"  messages={ [errorMessage] } />}

                    {/* Same as Mailing Address checkbox */}
                    <div className={styles["form-input-group"]}>
                        <input  type="checkbox" name="billingCheckbox"
                            checked={state.billingCheckbox}
                            onChange={() => handleChange('billingCheckbox',(!state.billingCheckbox))}
                        />
                        <label> <b> Same as Mailing Address? </b> </label>
                    </div>

                    {/* Address 1 */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Address 1:</b></label>
                        <input className={styles["form-input"]} type="text" name="billingAddress1"
                            title="Enter your street address in this field" placeholder=" 123 Main St" required
                            maxLength="100"
                            disabled={state.billingCheckbox}
                            value={state.billingAddress1}
                            onChange={(e) => handleChange('billingAddress1', e.target.value)}
                        />
                    </div>

                    {/* Address 2 */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Address 2:</b></label>
                        <input className={styles["form-input"]} type="text" name="billingAddress2"
                            title="Enter your apt/suite/other in this field" placeholder=" Apt/Suite/Other"
                            maxLength="100"
                            disabled={state.billingCheckbox}
                            value={state.billingAddress2}
                            onChange={(e) => handleChange('billingAddress2', e.target.value)}
                        />
                    </div>

                    <div className={styles["form-input-group-div"]}>
                        {/* City */}
                        <div className={styles["form-input-group"]}>
                            <label> <b>City</b></label>
                            <input className={styles["form-input"]} type="text" pattern="^[A-Za-z \s*]+$" name="billingCity" id={styles["city"]}
                                title="Enter your city in this field" required
                                maxLength="50"
                                disabled={state.billingCheckbox}
                                value={state.billingCity}
                                onChange={(e) => handleChange('billingCity', e.target.value)}
                            />
                        </div>

                        {/* State */}
                        <div className={styles["form-input-group"]}>
                            <label> <b>State:</b></label>
                            <select className={styles["form-input"]} name="billingState" id={styles["state"]}
                                title="Select your state in this field" required
                                maxLength="10"
                                disabled={state.billingCheckbox}
                                value={state.billingState}
                                onChange={(e) => handleChange('billingState', e.target.value)}
                            >
                                <option value="" disabled>Select a State</option>
                                <option value="" disabled>------------------------</option>
                                <option value="AL">AL - Alabama</option>
                                <option value="AK">AK - Alaska</option>
                                <option value="AZ">AZ - Arizona</option>
                                <option value="AR">AR - Arkansas</option>
                                <option value="CA">CA - California</option>
                                <option value="CO">CO - Colorado</option>
                                <option value="CT">CT - Connecticut</option>
                                <option value="DE">DE - Delaware</option>
                                <option value="DC">DC - District Of Columbia</option>
                                <option value="FL">FL - Florida</option>
                                <option value="GA">GA - Georgia</option>
                                <option value="HI">HI - Hawaii</option>
                                <option value="ID">ID - Idaho</option>
                                <option value="IL">IL - Illinois</option>
                                <option value="IN">IN - Indiana</option>
                                <option value="IA">IA - Iowa</option>
                                <option value="KS">KS - Kansas</option>
                                <option value="KY">KY - Kentucky</option>
                                <option value="LA">LA - Louisiana</option>
                                <option value="ME">ME - Maine</option>
                                <option value="MD">MD - Maryland</option>
                                <option value="MA">MA - Massachusetts</option>
                                <option value="MI">MI - Michigan</option>
                                <option value="MN">MN - Minnesota</option>
                                <option value="MS">MS - Mississippi</option>
                                <option value="MO">MO - Missouri</option>
                                <option value="MT">MT - Montana</option>
                                <option value="NE">NE - Nebraska</option>
                                <option value="NV">NV - Nevada</option>
                                <option value="NH">NH - New Hampshire</option>
                                <option value="NJ">NJ - New Jersey</option>
                                <option value="NM">NM - New Mexico</option>
                                <option value="NY">NY - New York</option>
                                <option value="NC">NC - North Carolina</option>
                                <option value="ND">ND - North Dakota</option>
                                <option value="OH">OH - Ohio</option>
                                <option value="OK">OK - Oklahoma</option>
                                <option value="OR">OR - Oregon</option>
                                <option value="PA">PA - Pennsylvania</option>
                                <option value="RI">RI - Rhode Island</option>
                                <option value="SC">SC - South Carolina</option>
                                <option value="SD">SD - South Dakota</option>
                                <option value="TN">TN - Tennessee</option>
                                <option value="TX">TX - Texas</option>
                                <option value="UT">UT - Utah</option>
                                <option value="VT">VT - Vermont</option>
                                <option value="VA">VA - Virginia</option>
                                <option value="WA">WA - Washington</option>
                                <option value="WV">WV - West Virginia</option>
                                <option value="WI">WI - Wisconsin</option>
                                <option value="WY">WY - Wyoming</option>
                            </select>
                        </div>
                    </div>

                    {/* ZIP/Postal Code */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>ZIP/Postal Code:</b></label>
                        <input className={styles["form-input"]} type="text" name="billingZip"
                            minLength="5" maxLength="9"
                            title="Enter your zip code in this field" required
                            disabled={state.billingCheckbox}
                            value={state.billingZip}
                            onChange={(e) => handleChange('billingZip', e.target.value)}
                        />
                    </div>

                    <div className={"button-group-div"}>
                        {/* Previous button */}
                        <input className={"button"} type="button" id="previous" value="Previous"
                            title="Click here to go back to the previous page"
                            onClick={ prevStep }
                        />

                        {/* Next button */}
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

export default BillingAddress;
