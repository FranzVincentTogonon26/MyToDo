import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'

const getNotes = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.NOTES.GET_ALL_NOTES);
        return response.data?.data;
        // return response?.data;


    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch Notes..' }
    }
}

const deleteNote = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PATHS.NOTES.DELETE_NOTE(id));
        return response.data;
    } catch(error) {
        throw error.response?.data || 'Failed to fetch Notes.';
    }
}

const noteService = {
    getNotes,
    deleteNote,
}

export default noteService;