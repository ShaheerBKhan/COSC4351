import axiosAPI from './axiosAPI';
axiosAPI.defaults.withCredentials = true;

const localhost = "http://localhost:8888";

export const profileGet = async (userId) => {
    return await axiosAPI.get(`${localhost}/profile/get?userId=${userId}`);
}

export const profilePost = async (info) => {
    return await axiosAPI.post(`${localhost}/profile/post`, info);
}

export const verifyProfileStatus = async (userId) => {
    return await axiosAPI.get(`${localhost}/profile/get/status?userId=${userId}`);
}

export const registerPost = async (info) => {
    return await axiosAPI.post(`${localhost}/account/register`, info);
}

export const loginPost = async (user) => {
    return await axiosAPI.post(`${localhost}/account/login`, user);
}

export const userIdGet = async () => {
    return await axiosAPI.get(`${localhost}/account/userid`);
}

export const verifyLoginStatus = async (token) => {
    return await axiosAPI.get(`${localhost}/account/login/verify?token=${token}`);
}

export const logoutPost = async (loginToken) => {
    return await axiosAPI.post(`${localhost}/account/logout`, loginToken);
}

export const tablesGet = async (guestCount, timings, date) => {
    return await axiosAPI.get(`${localhost}/reservation/tables?guestCount=${guestCount}&timings=${timings}&date=${date}`);
}

export const reservationGet = async (userId) => {
    return await axiosAPI.get(`${localhost}/reservation?userId=${userId}`);
}

export const reservationPost = async (reservation) => {
    return await axiosAPI.post(`${localhost}/reservation`, reservation);
}
