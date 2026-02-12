export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register'
    },
    NOTES: {
        GET_ALL_NOTES: '/api/notes',
        CREATE_NOTE: '/api/notes/create',
        GET_NOTE_BY_ID: (noteId) =>  `/api/notes/${noteId}`,
        UPDATE_NOTE: (noteId) => `/api/notes/${noteId}`,
        DELETE_NOTE: (noteId) => `/api/notes/${noteId}`
    },
    CALENDAR: {
        GET_CALENDAR: '/api/calendars'
    }
}