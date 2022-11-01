import axios from 'axios';

const localhost = "http://localhost:8888/controller";

export const PostUser = async (info) => {
    await axios.post(`${localhost}/User`, info, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const LoginPost = async (user) => {
    const response = await axios.post(  `${localhost}/Login`, user, {
       headers: {
           'Content-Type': 'application/json',
       }
   })

   return response.data;
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