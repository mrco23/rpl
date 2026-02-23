import {instance} from '../api/axios.js'

export const createKontakSekolah = async () => {
    try {
        const response = await instance.post('/')
        return response
    } catch (err) {
        console.error(err)
    }
}