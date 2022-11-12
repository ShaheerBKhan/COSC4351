import axios from 'axios';

const localhost = "http://localhost:8888/controller";

export const PostUser = async (info) => {
    await axios.post(`${localhost}/User`, info);
}

export const LoginPost = async (user) => {
    const response = await axios.post(`${localhost}/Login`, user)
   return response.data;
}

export const ReservationPost = async (reservation) => {
    await axios.post(`${localhost}/Reservation`, reservation);
}

export const IsHighTrafficDateGet = async (date) => {
    function isWeekend(date = new Date()) {
        return date.getDay() === 6 || date.getDay() === 0;
    }
    if(isWeekend(date)) {
        return true;
    }

    const isHighTrafficDate = await axios.get(`${localhost}/IsHighTrafficDate`, {
        params: {
            date: date
        }
    });

    return isHighTrafficDate;
}

export const ReservationGet = async (numberOfGuests, date) => {
    
    console.log("AXIOS: " + numberOfGuests + " " + date);
    const response = await axios.get(`${localhost}/ResturantTable/${numberOfGuests}/${date}`,  {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.data;
}