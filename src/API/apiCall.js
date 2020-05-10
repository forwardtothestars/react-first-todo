import * as axios from "axios";

const instanceNote = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export const NotesAPI = {
    getNotes(userId) {
        return instanceNote.get(`notes/${userId}`, {userId})
    },
    createNote(data) {
        return instanceNote.post(`notes`, {...data})
    }
}

export const UsersAPI = {
    getUsers() {
        return instanceNote.get(`users`)
    },
    userCreate(firstName, lastName) {
        return instanceNote.post(`users`, {
            firstName, lastName
        })
    },
    deleteUser(userId) {
        return instanceNote.delete(`users`)
    }
}