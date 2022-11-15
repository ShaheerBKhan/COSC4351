import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPost } from "../Controller/Controller";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        };

        const response = await LoginPost(user);
        //alert(response.message);
        console.log(response.userId);
        console.log("COOKIES: " + document.cookie);
        if(response.isSuccessful) {
            navigate('/reservation');
        }
    }

    return(
        <div>
            <form className={"react-form"}>
                <label>Username:
                    <input type="text" name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </label>
                <label>Password:
                    <input type="text" name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </label>
                <button onClick={(e) => HandleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}