import React, {useState} from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ReservationGet } from "../Controller/Controller";

export const Reservation = () => {
    
    const [numberOfGuests, setNumberOfGuests] = useState("");
    const [date, setDate] = useState("");

    const HandleSubmit = async (e) => {
        e.preventDefault();

        let requestDate = date.toISOString().split('T')[0];

        const response = await ReservationGet(numberOfGuests, requestDate);
   
        if(response.length === 0){
            alert("No tables available at this time");
        } else {
            alert("ID: " + response[0].id + " Chairs: " + response[0].chairs);
        }

    }
    
    return(
        <div>
            <form className={"react-form"}>
                <label>Number of Guests:
                    <input type="text" name="numberOfGuests"
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                        />
                </label>
                <label>Date:
                    <DatePicker dateFormat={"yyyy-MM-dd"} selected={date} onChange={(date) => setDate(date)} minDate={new Date()} />
                </label>
                <button onClick={(e) => HandleSubmit(e)}>Submit</button>
            </form>
            
        </div>
    );
}