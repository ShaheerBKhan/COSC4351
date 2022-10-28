import '../index.css'
import React from "react";
import { Link } from "react-router-dom";

export const Opening = () => {
    return(
        <div className="container">
            <div>Title</div>
            <div>
                <Link to={"/Reservation"}>Reserve a Table</Link>
            </div>
            <div>
                <Link to={"/Signup"}>Sign-in</Link>. Don't have an account? <Link to={"/Register"}>Register</Link>
            </div>
        </div>
    );
}