// Those are functions related to axios
import axios, {AxiosInstance} from 'axios';

export const axiosInstance:AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})