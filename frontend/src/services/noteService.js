import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'

const getNotes = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.NOTES.GET_ALL_NOTES);
        return response.data?.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch Notes..' }
    }
}

const createNote = async ( title, content ) => {
    try {
        const response = await axiosInstance.post(API_PATHS.NOTES.CREATE_NOTE, {
            title,
            content
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create note.' }
    }
}

const deleteNote = async (id) => {
    try {
        const response = await axiosInstance.delete(API_PATHS.NOTES.DELETE_NOTE(id));
        return response?.data;
    } catch(error) {
        throw error.response?.data || 'Failed to fetch Notes.';
    }
}

const getNoteById = async (id) => {
    try {
        const response = await axiosInstance.get(API_PATHS.NOTES.GET_NOTE_BY_ID(id));
        return response?.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get note.' }
    }
}

const updateNote = async ( id, data ) => {
    try {
        const response = await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(id), data );
        return response?.data;
    } catch ( error ) {
        throw error.response?.data || { message: 'Failed to update note.' }
    }
}

const noteService = {
    getNotes,
    createNote,
    deleteNote,
    getNoteById,
    updateNote
}

export default noteService;