import { useState } from 'react';
import { reservationPost } from '../../Controller/Controller';
import Availability from './Availability';
import ConfirmTable from './ConfirmTable';
import PaymentCard from './PaymentCard';
import ReservationConfirmed from './ReservationConfirmed';

export const Reservation = ({ isLoggedIn }) => {
    const [state, setState] = useState({
        step: 0,
        date: '',
        time: '',
        guestCount: 0,
        cardName: '',
        cardNumber: '',
        cardExp: '',
        cardCvc: '',
        isHighTrafficDay: '',
        combineNeeded: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        tables: []
    });

    const prevStep = () => {
        setState({...state, step: state.step - 1 });
    };
    
    const nextStep = () => {
        setState({...state, step: state.step + 1 });
    };

    const stepIncrement = () => {
        setState({...state, step: state.step + 2 });
    };

    const handleChange = (field, value) => {
        setState({ ...state, [field]: value });
    }

    const handleMultipleChange = (change) => {
        setState({...state, ...change})
    }

    const handleSubmit = async () => {
        let numbers = state.tables.map((table) => table.number).join(', ');
        let sizes = state.tables.map((table) => table.size).join(' + ');

        const reservation = {
            userId: localStorage.getItem("userId"),
            fullName: `${state.firstName} ${state.lastName}`,
            phone: state.phone,
            email: state.email,
            tables: state.tables,
            tableNumber: numbers,
            tableSize: sizes,
            date: state.date,
            time: state.time,
            combineNeeded: state.combineNeeded,
            guestCount: state.guestCount,
            cardName: state.cardName,
            cardNumber: state.cardNumber,
            cardExp: state.cardExp,
            cardCvc: state.cardCvc
        };

        const response = await reservationPost(reservation);

        if (response.data.isSuccessful) {
            // eslint-disable-next-line
            if (state.isHighTrafficDay == "false")
                stepIncrement();
            else
                nextStep();
        }
    };

    switch (state.step) {
        case 0:
            return (
                <Availability
                    nextStep={ (nextStep) }
                    handleChange={ (handleChange) }
                    state={ (state) }
                />
            );

        case 1:
            return (
                <ConfirmTable
                    prevStep={(prevStep)}
                    nextStep={(nextStep)}
                    handleChange={(handleChange)}
                    handleSubmit={(handleSubmit)}
                    state={ (state) }
                    setState={ (setState) }
                    handleMultipleChange={ (handleMultipleChange) }
                />
            );

        case 2:
            return (
                <PaymentCard
                    prevStep={(prevStep)}
                    handleChange={(handleChange)}
                    handleSubmit={(handleSubmit)}
                    state={(state)}
                />
            );

        case 3:
            return (
                <ReservationConfirmed
                    state={(state)}
                    isLoggedIn={(isLoggedIn)}
                />
            );

        default:
    }
}
