import styles from './ReservationHistory.module.css';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { reservationGet } from '../../Controller/Controller';

export const ReservationHistory = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    
    useLayoutEffect(() => {
        const getReservations = async () => {
            const result = await reservationGet(localStorage.getItem("userId"))
            return result.data;
        }

        getReservations().then((reservations) => {
            if (reservations != null) {
                setReservations(reservations)
            }
        })
    }, [])

    return(
        <main>
            <div className={styles["style-1-table-container"]}>
                <form className={styles["form-parent"]}>
                    {/* Title */}
                    <h1 className={styles["form-title"]}>Reservation History</h1>

                    {/* Table */}
                    <table className={styles["style-1-table"]}><tbody>
                        <tr className={styles["style-1-tr"]}>
                            <th className={styles["style-1-th"]}>Name</th>
                            <th className={styles["style-1-th"]}>Phone</th>
                            <th className={styles["style-1-th"]}>Email</th>
                            <th className={styles["style-1-th"]}>Total Guests</th>
                            <th className={styles["style-1-th"]}>Table #</th>
                            <th className={styles["style-1-th"]}>Table Size</th>
                            <th className={styles["style-1-th"]}>Combine Needed</th>
                            <th className={styles["style-1-th"]}>Date</th>
                            <th className={styles["style-1-th"]}>Time</th>
                        </tr>
                        { reservations.map((reservation, index) => {
                            return (
                                <tr key={index} className={`${styles["style-1-tr"]} ${styles["style-1-row"]}`}>
                                    <td className={styles["style-1-td"]}> {reservation.fullName} </td>
                                    <td className={styles["style-1-td"]}> {reservation.phone} </td>
                                    <td className={styles["style-1-td"]}> {reservation.email} </td>
                                    <td className={styles["style-1-td"]}> {reservation.guestCount} </td>
                                    <td className={styles["style-1-td"]}> {reservation.tableNumber} </td>
                                    <td className={styles["style-1-td"]}> {reservation.tableSize} </td>
                                    <td className={styles["style-1-td"]}> {reservation.combineNeeded? "Yes" : "No"} </td>
                                    <td className={styles["style-1-td"]}> {reservation.date} </td>
                                    <td className={styles["style-1-td"]}> {reservation.time} </td>
                                </tr>
                            )
                        }) }
                    </tbody></table>
                </form>
            </div>
        </main>
    );
}
