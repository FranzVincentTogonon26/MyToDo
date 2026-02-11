import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'

const getNotes = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.NOTES.GET_ALL_NOTES);
        return response?.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch Notes..' }
    }
}

const noteService = {
    getNotes
}

export default noteService;