import React, {useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {IsHighTrafficDateGet, LoginPost} from "../Controller/Controller";

export const Guest = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [card, setCard] = useState("");
    const [cvv, setCvv] = useState("");
    const [exp, setExp] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showHighTraffic, setShowHighTraffic] = useState(false);
 

    const { state } = useLocation();

    const navigate = useNavigate();

    const HandleLogin = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
        };

        const response = await LoginPost(user);

        if(response.isSuccessful === true){
            setShowLogin(false);
            const dt = new Date(state.date);
            const isHighTraffic = await IsHighTrafficDateGet(dt);
  
            if(isHighTraffic === true){
                setShowHighTraffic(true);
            } else{
                navigate('/ConfirmRes', { state: {name: state.name, phone: state.phone, email: state.email, date: state.date, numberOfGuests: state.numberOfGuests, tableID: state.tableID}});
            }
        } else{
            alert("Incorrect username or password");
        }
    }

    const HandleGuest = async (e) => {
        //e.preventDefault();
        setShowLogin(false);
        const dt = new Date(state.date);
        const isHighTraffic = await IsHighTrafficDateGet(dt);

        if(isHighTraffic === true){
            setShowHighTraffic(true);
        } else{
            navigate('/ConfirmRes', { state: {name: state.name, phone: state.phone, email: state.email, date: state.date, numberOfGuests: state.numberOfGuests, tableID: state.tableID}});
        }

    }

    const HandleConfirm = async (e) => {
        e.preventDefault();
        
        navigate('/ConfirmRes', { state: {name: state.name, phone: state.phone, email: state.email, date: state.date, numberOfGuests: state.numberOfGuests, tableID: state.tableID}});
    }


    return(
        <div className="container"> 
            {showLogin ? 
                <div> 
                    Login or Continue as  Guest
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
                        <button onClick={(e) => HandleLogin(e)}>Login</button>
                        <label>
                            Don't have an account?
                            <Link to={"/Register"}>Register</Link>
                        </label>
                            <button onClick={() => HandleGuest()}>Continue as Guest</button>    
                    </form>
                </div> : null}
            {showHighTraffic ? 
                <div> *A credit card is required for this reservation* 
                    <form className={"react-form"}>
                        <label>Credit Card Number:
                            <input required value={card} type="text" name="creditCard"
                                onChange={(e) => setCard(e.target.value)}
                                />
                        </label>
                        <label>CVV:
                            <input required value={cvv} type="text" name="cvv"
                                onChange={(e) => setCvv(e.target.value)}
                                />
                        </label>
                        <label>Expiration Date:
                            <input required value={exp} type="text" placeholder="MM/YYYY"
                                onChange={(e) => setExp(e.target.value)}/>
                        </label>
                        <button disabled={card === "" || cvv === "" || exp === ""} type="submit" onClick={(e) => HandleConfirm(e)}>Confirm</button> 
                        
                    </form>
                </div> : null}
        </div>
    );
}