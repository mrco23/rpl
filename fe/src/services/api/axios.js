import axios from 'axios'
import {getToken} from '../../utils/token.js'
const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {'Content-Type': 'application/json'}
})

instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (error) => {
    console.log(error)
    return Promise.reject(error);
})

export {instance}
