import axios from 'axios';

const localhost = "http://localhost:8888/controller";

export const PostUser = async (params) => {
    console.log("Params: ", params);
    await axios.post(`${localhost}/User`, {
        params: {...params}
    })
}