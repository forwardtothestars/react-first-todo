const SET_USERS = 'SET_USERS';
const SET_USER_ID = 'SET_USER_ID';

let initialState = {
    users: [],
    userId: null
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users}
        case SET_USER_ID:
            return {...state, userId: action.userId}
        default: return state
    }
}

export const setUsers = (users) => {
    return ({type: SET_USERS, users})
}
export const setUserId = (userId) => {
    return ({type: SET_USER_ID, userId})
}
