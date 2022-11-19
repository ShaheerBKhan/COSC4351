import axiosAPI from './axiosAPI';
axiosAPI.defaults.withCredentials = true;

const localhost = "http://localhost:8888/controller";

export const PostUser = async (info) => {
    const response = await axiosAPI.post(`${localhost}/User`, info);
    return response.data;
}

export const LoginPost = async (user) => {
    const response = await axiosAPI.post(`${localhost}/Login`, user);
   return response.data;
}

export const ReservationPost = async (reservation) => {
    const response = await axiosAPI.post(`${localhost}/Reservation`, reservation);
    return response.data
}

export const IsHighTrafficDateGet = async (date) => {
    function isWeekend(date = new Date()) {
        return date.getDay() === 6 || date.getDay() === 5;
    }
    if(isWeekend(date)) {
        return true;
    }

    const formatDate = date.toISOString().split('T')[0];

    const isHighTrafficDate = await axiosAPI.get(`${localhost}/IsHighTrafficDate/${formatDate}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    return isHighTrafficDate;
}

export const ReservationGet = async (numberOfGuests, date) => {
    
    const response = await axiosAPI.get(`${localhost}/ResturantTable/${numberOfGuests}/${date}`,  {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.data;
}