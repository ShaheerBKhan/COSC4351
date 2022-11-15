import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import { ReservationGet, IsHighTrafficDateGet} from "../Controller/Controller";

export const Reservation = () => {

    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("");
    const [date, setDate] = useState("");
    const [formatDate, setFormatDate] = useState("");
    const [tableID, setTableID] = useState("");
    const [card, setCard] = useState("");
    const [cvv, setCvv] = useState("");
    const [exp, setExp] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [showHighTraffic, setShowHighTraffic] = useState(false);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const requestDate = date.toISOString().split('T')[0];
        setFormatDate(requestDate);

        const response = await ReservationGet(numberOfGuests, requestDate);
        setTableID(response);
   
        if(response.length === 0){
            alert("No tables available at this time");
        } else {
            setShowResults(true);
            console.log(response);
        }
    }

    const HandleReserve = async (e) => {
        e.preventDefault();

        //check if user is logged in
        let loggedIn = false;
        if(document.cookie){
            loggedIn = true;
        }
        if(loggedIn === true){
            const isHighTraffic = await IsHighTrafficDateGet(date);
            if(isHighTraffic === true){
                const btn = document.getElementById('submitButton');
                btn.style.display = 'none';
                const btn2 = document.getElementById('reserveButton');
                btn2.style.display = 'none';
                setShowHighTraffic(true);
            } else{
                navigate('/ConfirmRes', { state: {name: name, phone: phone, email: email, date: formatDate, numberOfGuests: numberOfGuests, tableID: tableID}});
            }
        } else {
            navigate('/Guest', { state: {name: name, phone: phone, email: email, date: formatDate, numberOfGuests: numberOfGuests, tableID: tableID}});
        }
    }

    const HandleConfirm = async (e) => {
        e.preventDefault();
        navigate('/ConfirmRes', { state: {name: name, phone: phone, email: email, date: formatDate, numberOfGuests: numberOfGuests, tableID: tableID}});
    }
    
    return(
        <div>
            <form className={"react-form"}>
            <h1>Make a reservation</h1>
            <label>Name:
                    <input type="text" name="name"
                        onChange={(e) => setName(e.target.value)}
                        />
                </label>
                <label>Phone Number:
                    <input type="text" name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        />
                </label>
                <label>Email:
                    <input type="text" name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </label>
                <label>Number of Guests:
                    <input type="text" name="numberOfGuests"
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                        />
                </label>
                <label>Date:
                    <DatePicker  selected={date} onChange={(date) => setDate(date)} minDate={new Date()} />
                </label>
                <button id="submitButton" onClick={(e) => HandleSubmit(e)}>Submit</button>
            </form>
            {showResults ? <div className="reservation-results">
                            <table>
                                <thead>
                                    <tr>
                                    <th>Date</th>
                                    <th># of Guests</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{ date.toISOString().split('T')[0]}</td>
                                    <td>{ numberOfGuests }</td>
                                    <td><button id = "reserveButton" onClick={(e) => HandleReserve(e)}>Reserve</button>  </td>
                                </tbody>
                            </table>
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