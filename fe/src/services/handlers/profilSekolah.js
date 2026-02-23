import {instance} from '../api/axios.js';

export const getProfil = async () => {
    const jeki = await instance.get('/profile')
    return jeki.data
}