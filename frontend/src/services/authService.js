import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'

const login = async ( email, password ) => {
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An unkwon error occured..' };
    }
};

const register = async ( username, email, password ) => {
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An unkwon error occured..' };
    }
};

const authService = {
    login,
    register
}

export default authService;