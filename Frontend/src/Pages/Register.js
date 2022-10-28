import '../index.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostUser } from "../Controller/Controller";

export const Register = () => {
    const [name, setName] = useState("");
    const [mailingAddress, setMailingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(0);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const params = {
            name: name,
            mailingAddress: mailingAddress,
            billingAddress: billingAddress,
            paymentMethod: paymentMethod
        };

        await PostUser(params);
    }

    return(
        <div>
            <form className={"react-form"}>
                <label>Name:
                    <input type="text" name="name"
                        onChange={(e) => setName(e.target.value)}
                        />
                </label>
                <label>Mailing Address: 
                    <input type="text" name="mailingAddress"
                        onChange={(e) => setMailingAddress(e.target.value)}
                        />
                </label>
                <label>Billing Address:
                    <input type="text" name="billingAddress"
                        onChange={(e) => setBillingAddress(e.target.value)}
                        />
                </label>
                <label>Preferred Payment Method:
                    <div style={{alignSelf: 'flex-start'}}>
                        <input type="radio" value="0" name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked={paymentMethod === "0"}
                            /> Cash
                    </div>
                    <div style={{alignSelf: 'flex-start'}}>
                        <input type="radio" value="1" name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked={paymentMethod === "1"} 
                            /> Credit
                    </div>
                    <div style={{alignSelf: 'flex-start'}}>
                        <input type="radio" value="2" name="paymentMethod" 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked={paymentMethod === "2"}
                            /> Check
                    </div>
                </label>
                <button onClick={(e) => HandleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}