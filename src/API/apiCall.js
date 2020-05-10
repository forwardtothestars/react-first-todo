import * as axios from "axios";

const instanceNote = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export const NotesAPI = {
    getNotes(userId, status) {
        return instanceNote.get(`notes/${userId}?status=${status}`)
    },
    createNote(data) {
        return instanceNote.post(`notes`, {...data})
    },
    deleteNote(id) {
        return instanceNote.delete(`notes/${id}`)
    },
    updateNote(id, params) {
        return instanceNote.post(`notes/update`, {id, params})
    }
}

export const UsersAPI = {
    getUsers() {
        return instanceNote.get(`users`)
    },
    userCreate(firstName, lastName, photoURL) {
        return instanceNote.post(`users`, {
            firstName, lastName, photoURL
        })
    },
    deleteUser(userId) {
        return instanceNote.delete(`users/${userId}`)
    }
}