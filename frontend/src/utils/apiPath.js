export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register'
    },
    NOTES: {
        GET_ALL_NOTES: '/api/notes',
        GET_NOTE_BY_ID: (noteId) =>  `/api/${noteId}`,
        CREATE_NOTE: '/api/create',
        UPDATE_NOTE: (noteId) => `/api/${noteId}`,
        DELETE_NOTE: (noteId) => `/api/${noteId}`
    }
}