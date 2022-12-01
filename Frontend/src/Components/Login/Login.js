import styles from './Login.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPost, verifyProfileStatus } from '../../Controller/Controller';
import { Alert } from '../Alert/Alert';

export const loginRequest = async (credentials, setIsLoggedIn) => {
    const response = await loginPost(credentials);

    const isSuccessful = response.data.isSuccessful;
    if (isSuccessful) {
        localStorage.setItem("userId", response.data.userId)
        localStorage.setItem("loginToken", response.data.loginToken)
        setIsLoggedIn(true);
    }

    return isSuccessful;
}

export const Login = ( { setIsLoggedIn, setProfileExists } ) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fieldsValid = (fields) => {
        if (fields[0] === "") {
            setErrorMessage(`Username cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[0])) {
            setErrorMessage(`Username cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        if (/[~`!@#$%^&*+=\-[\]';,/{}|\\":<>?()._]/g.test(fields[0])) {
            setErrorMessage(`Username cannot contain a special character`);
            setShowError(true);
            return false;
        }

        if (fields[1] === "") {
            setErrorMessage(`Password cannot be empty`);
            setShowError(true);
            return false;
        }

        if (/\s/.test(fields[1])) {
            setErrorMessage(`Password cannot contain a whitespace`);
            setShowError(true);
            return false;
        }

        setShowError(false);
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fieldsValid([username, password])) {
            return;
        };

        const credentials = {
            username: username,
            password: password,
        };
        
        const loggedIn = await loginRequest(credentials, setIsLoggedIn);

        if (loggedIn) {
            const response = await verifyProfileStatus(localStorage.getItem("userId"));
            localStorage.setItem("profileExists", true)
            setProfileExists(response.data.exists)
            navigate('/home');
        } else {
            setErrorMessage("Incorrect username or password");
            setShowError(true);
        }
    }

    return(
        <main>
            <div className={styles["container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Login</h1>

                    {/* Error Message */}
                    {showError && <Alert alertClass="error" messages={ [errorMessage] } />}

                    {/* Username */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Username:</b></label>
                        <input className={styles["form-input"]} type="text" name="username"
                            title="Enter your username in this field" required
                            maxLength="20"
                            value={username}
                            onChange={ (e) => setUsername(e.target.value) }
                        />
                    </div>

                    {/* Password */}
                    <div className={styles["form-input-group"]}>
                        <label> <b>Password:</b></label>
                        <input className={styles["form-input"]} type="password" name="password"
                            title="Enter your password in this field" required
                            maxLength="30"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={"button-group-div"}>
                        {/* Resturant GIF */}
                        <div className={"gif-group-div"}>
                            <img src="img/resturant.gif" alt="Animated Resturant GIF" className={"gif"}/>
                            <img src="img/resturant.gif" alt="Animated Resturant GIF" className={"gif"}/>
                            <img src="img/resturant.gif" alt="Animated Resturant GIF" className={"gif"}/>
                        </div>

                        {/* Login button */}
                        <input className={"button"} type="button" id="login" value="Log In"
                            title="Click here to login"
                            onClick={(e) => handleSubmit(e)}
                        />
                    </div>

                    {/* Bottom text */}
                    <div className={styles["form-bottom"]}>
                        <span>Don't have an account? </span>
                        <a className={styles["form-bottom-link"]} href="/register" title="Click here to register a new account">Register</a>
                    </div>
                </form>
            </div>
        </main>
    );
}
