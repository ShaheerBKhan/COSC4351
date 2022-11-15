import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

import {ReservationPost} from "../Controller/Controller";


export const ConfirmRes = () => {

    const { state } = useLocation();
    console.log(state);

    const navigate = useNavigate();

    const HandleConfirm = async (e) => {
        e.preventDefault();

        const tables = state.tableID;
        console.log("now: " + state.name);
        let response;
        for(let i = 0; i < tables.length; i++){
            const reservation = {
                resturantTableId: state.tableID[i].id,
                name: state.name,
                phone: state.phone,
                email: state.email,
                date: state.date,
                numberOfGuests: state.numberOfGuests
            };
            response = await ReservationPost(reservation);
        }

        if(response.isSuccessful){
            alert(response.message);
            navigate('/');
        } else{
            alert("An issue occurred when trying to confirm your reservation. Please try again.")
        }
        
    }

    return(
        <div className="container"> 
            Your Reservation
            <div>*No show will have a minimum $10 charge.</div>
            <div>
                <label>Name: {state.name}</label>
                <label>Phone Number: {state.phone}</label>
                <label>Email: {state.email}</label>
                <label>Date: {state.date}</label>
                <label>Number of Guests: {state.numberOfGuests}</label>
                
                <button onClick={(e) => HandleConfirm(e)}>Confirm</button>
            </div>
        </div>
    );
}