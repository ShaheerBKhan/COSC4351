import axios from 'axios';

const localhost = "http://localhost:8888/controller";

export const PostUser = async (info) => {
    await axios.post(`${localhost}/User`, info, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}