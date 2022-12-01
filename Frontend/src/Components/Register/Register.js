import styles from './Register.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerPost } from '../../Controller/Controller';
import { Alert } from '../Alert/Alert';
import { loginRequest } from '../Login/Login';
import { generateUserId } from '../../App';

export const Register = ({ setIsLoggedIn }) => {
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
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fieldsValid([username, password])) {
            return;
        }

        const credentials = {
            username: username,
            password: password,
            userId: localStorage.getItem("userId")
        };

        const registered = await registerPost(credentials);

        if (registered.data.isSuccessful) {
            if (registered.data.userIdExists) {
                localStorage.setItem("userId", registered.data.newUserId);
            }
            const loggedIn = await loginRequest(
                { username: username, password: password },
                setIsLoggedIn
            );

            if (loggedIn) {
                navigate('/profile');
            } else {
                setErrorMessage("An error occured, please try again later.");
                setShowError(true);
            }
        } else {
            setErrorMessage(registered.data.message);
            setShowError(true);
        }
    };

    return (
        <main>
            <div className={ styles["container"] }>
                <form className={ styles["form-parent"] }>
                    {/* Title */ }
                    <h1 className={ styles["form-title"] }>Register</h1>

                    {/* Error Message */ }
                    { showError && <Alert alertClass="error"  messages={ [errorMessage] } /> }

                    {/* Username */ }
                    <div className={ styles["form-input-group"] }>
                        <label> <b>Username:</b></label>
                        <input className={ styles["form-input"] } type="text" name="username"
                            title="Enter your username in this field" required
                            maxLength="20"
                            value={ username }
                            onChange={ (e) => setUsername(e.target.value) }
                        />
                    </div>

                    {/* Password */ }
                    <div className={ styles["form-input-group"] }>
                        <label> <b>Password:</b></label>
                        <input className={ styles["form-input"] } type="password" name="password"
                            title="Enter your password in this field" required
                            maxLength="30"
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }
                        />
                    </div>

                    <div className={"button-group-div"}>
                        {/* Resturant GIF */}
                        <div className={"gif-group-div"}>
                            <img src="img/resturant.gif" alt="Animated Resturant GIF" className={"gif"}/>
                            <img src="img/resturant.gif" alt="Animated Resturant GIF" className={"gif"}/>
                            <img src="img/resturant.gif" alt="Animated Resturant GIF" className={"gif"}/>
                        </div>

                        {/* Register button */}
                        <input className={"button"} type="submit" id="register" value="Register"
                            title="Click here to register"
                            onClick={ (e) => handleSubmit(e) }
                        />
                    </div>

                    {/* Bottom */ }
                    <div className={ styles["form-bottom"] }>
                        <span>Already have an account? </span>
                        <a className={ styles["form-bottom-link"] } href="/login" title="Click here to Login">Login</a>
                    </div>
                </form>
            </div>
        </main>
    );
};
