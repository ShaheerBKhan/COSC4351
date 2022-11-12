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
    const isHighTrafficDate = await axios.get(`${localhost}/IsHighTrafficDate`, {
        params: {
            date: date
        }
    });
    
    return isHighTrafficDate;
}