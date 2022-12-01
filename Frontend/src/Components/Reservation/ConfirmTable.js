import styles from './Reservation.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Alert } from '../Alert/Alert';
import { tablesGet, profileGet } from '../../Controller/Controller';
import getEndTime from './getEndTime';
import { Loader } from '../Loader/Loader';

const loaderStyling = {
	"backgroundColor": "transparent",
	"position": "absolute",
}

const ConfirmTable = ({ prevStep, nextStep, handleSubmit, state, handleMultipleChange }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [tableNumbers, setTableNumbers] = useState("");
    const [tableSizes, setTableSizes] = useState("");
    const [availableTables, setAvailableTables] = useState(state.guestCount);

    useEffect(() => {
        // eslint-disable-next-line
        if (state.isHighTrafficDay != "false") {
            console.log(state)
            setWarningMessage(`${state.isHighTrafficDay}`);
            setShowWarning(true);
        }
        else
            setShowWarning(false);
        // eslint-disable-next-line
    }, []);

    useLayoutEffect(() => {
        setShowLoader(true);
        const getProfile = async () => {
            const result = await profileGet(localStorage.getItem("userId"));
            return result.data;
        }

        const getTables = async () => {
            const result = await tablesGet(
                state.guestCount,
                `${state.time}-${getEndTime(state.time, 2)}`,
                state.date
            );
            return result.data
        }
        
        getProfile().then((profile) => {
            getTables().then((tables) => {
                if (!tables) {
                    console.log("No tables found")
                    console.log("No tables found")
                    setAvailableTables(0)
                }
                const change = {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    phone: profile.phone,
                    email: profile.email,
                    tables: tables,
                    combineNeeded: tables.length > 1 ? true : false
                }
                
                handleMultipleChange(change);

                let numbers = tables.map((table) => table.number).join(', ');
                let temp = tables.map((table) => table.size);
                console.log("Temp:", temp)
                let sizes = temp.join(' + ');
                setTableNumbers(numbers);
                setTableSizes(sizes);
                var sum = 0;
                temp.forEach(x => {
                    sum += x;
                });
                console.log(sum)
                setAvailableTables(sum);
                setTimeout(() => {
                    setShowLoader(false);
                }, 400)
            })
        });
        // eslint-disable-next-line
    }, [])

    const validation = () => {
        // eslint-disable-next-line
        if (state.isHighTrafficDay == "false")
            handleSubmit();
        else
            nextStep();
    }

    return (
        <main>
            {
            showLoader
                    ? <Loader loaderStyling={ loaderStyling }/>
                    :
                // eslint-disable-next-line
                (state.guestCount <= availableTables)? 
                <div className={styles["style-1-table-container"]}>
                    <form className={styles["form-parent"]}>
                        {/* Title */}
                        <h1 className={styles["form-title"]}>Reservation</h1>

                        {/* Secondary Title */}
                        <h2 className={styles["form-title"]}>Confirm Table</h2>

                        {/* Warning Message */}
                        { showWarning && <Alert alertClass="warning" messages={
                            [
                                "High Traffic Day",
                                warningMessage
                            ]
                        }/>}

                        {/* Table */}
                        <table className={styles["style-1-table"]}><tbody>
                            <tr className={styles["style-1-tr"]}>
                                <th className={styles["style-1-th"]}>Name</th>
                                <th className={styles["style-1-th"]}>Total Guests</th>
                                <th className={styles["style-1-th"]}>Table #</th>
                                <th className={styles["style-1-th"]}>Table Size</th>
                                <th className={styles["style-1-th"]}>Combine Needed</th>
                                <th className={styles["style-1-th"]}>Date</th>
                                <th className={styles["style-1-th"]}>Time</th>
                            </tr>
                            <tr className={`${styles["style-1-tr"]} ${styles["style-1-row"]}`}>
                                <td className={styles["style-1-td"]}> {state.firstName} {state.lastName} </td>
                                <td className={styles["style-1-td"]}> {state.guestCount} </td>
                                <td className={styles["style-1-td"]}> {tableNumbers} </td>
                                <td className={styles["style-1-td"]}> {tableSizes} </td>
                                <td className={styles["style-1-td"]}> {state.combineNeeded? "Yes" : "No"} </td>
                                <td className={styles["style-1-td"]}> {state.date} </td>
                                <td className={styles["style-1-td"]}> {state.time} </td>
                            </tr>
                        </tbody></table>

                        <div className={"button-group-div"}>
                            {/* previous button */}
                            <input className={"button"} type="button" id="previous" value="Previous"
                                title="Click here to go back to the previous page"
                                onClick={ prevStep }
                            />

                            {/* Next/Confirm button */}
                            { // eslint-disable-next-line
                            showWarning == false ?
                                <input className={"button"} type="button" id="confirm" value="Confirm"
                                    title="Click here to confirm reservation"
                                    onClick={ validation }
                                /> :
                                <input className={"button"} type="button" id="next" value="Next"
                                    title="Click here to go to the next page"
                                    onClick={ validation }
                                />
                            }
                        </div>
                    </form>
                </div> 
                :
                // eslint-disable-next-line 
                !(state.guestCount <= availableTables) && <div className={styles["style-1-table-container-error"]}>
                    <form className={styles["form-parent"]}>
                        {/* Title */}
                        <h1 className={styles["form-title"]}>Reservation</h1>

                        {/* Error Message */}
                        { <Alert alertClass="error" messages={
                            [
                                "No More Tables left to accommodate your total guests at this hour"
                            ]
                        }/>}

                        { <Alert alertClass="warning" messages={
                            [
                                "Please go back and select some other time slot "
                            ]
                        }/>}

                        {/* previous button */}
                        <input className={"button"} type="button" id={styles["error-back"]} value="Click here to go back"
                                title="Click here to go back to the previous page"
                                onClick={ prevStep }
                        />
                    </form>
                </div>
            }
        </main>
        
    );
}

export default ConfirmTable;
