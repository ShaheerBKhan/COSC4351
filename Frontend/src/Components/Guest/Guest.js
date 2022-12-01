import styles from './Guest.module.css';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilePost, profileGet } from '../../Controller/Controller';
import { Alert } from '../Alert/Alert';

export const Guest = ({setGuestProfileExists}) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useLayoutEffect(() => {
        const getProfile = async () => {
            const result = await profileGet(localStorage.getItem("userId"));
            const profile = result.data;
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setPhone(profile.phone);
            setEmail(profile.email);
        }
            
        if (localStorage.getItem("guestProfileExists")) {
            getProfile()
        }
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!fieldsValid([firstName, lastName, phone, email])) {
            return;
        }

        const info = {
            userId: localStorage.getItem("userId"),
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
        };

        const response = await profilePost(info);

        if (response.data.isSuccessful) {
            localStorage.setItem("guestProfileExists", true);
            setGuestProfileExists(true);
            navigate('/reservation')
        } else {
            alert("Oops! Something went wrong. Please try again later.")
        }
    };

    return(
        <main>
            <div className={styles["container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Guest</h1>

                    {/* Error Message */}
                    {showError && <Alert alertClass="error" messages={ [errorMessage] } />}

                    {/* First Name */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>First Name:</b></label>
                        <input className={styles["form-input"]} type="text" name="firstName"
                            title="Enter your first name in this field" required
                            maxLength="30"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* Last Name */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Last Name:</b></label>
                        <input className={styles["form-input"]} type="text" name="lastName"
                            title="Enter your last name in this field" required
                            maxLength="30"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Phone:</b></label>
                        <input className={styles["form-input"]} type="text" name="phone"
                            title="Enter your phone number in this field" required
                            maxLength="10"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Email:</b></label>
                        <input className={styles["form-input"]} type="email" name="email"
                            title="Enter your email address in this field" required
                            maxLength="100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    {/* Submit button */}
                    <div className={"button-single-div"}>
                        <input className={"button"} type="submit" id="next" value="Next"
                            title="Click here to continue to the next page"
                            onClick={(e) => handleSubmit(e)}
                        />
                    </div>
                </form>
            </div>
        </main>
    );
}
