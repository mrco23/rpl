import {instance} from '@services/api/axios.js';
import {setToken} from '@utils/token.js'

export const login = async (reqBody) => {
    const response = await instance.post('login', reqBody);

    response && setToken(response.data.token);

    return response

}
