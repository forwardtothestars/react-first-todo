import {UsersAPI} from "../API/apiCall";
import {setUsers} from "./users-reducer";
import {getTodos} from "./todo-reducer";

const SET_INITIALIZED_STATUS = 'SET_INITIALIZED_STATUS';
const SET_FETCHING = 'SET_FETCHING';

let initialState = {
    isInitialized: true,
    isFetching: false
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_STATUS: {
            return {...state, isInitialized: action.flag}
        }
        case SET_FETCHING:
            return {...state, isFetching: action.flag}
        default:
            return state
    }
}

export const setInitialized = (flag) => {
    return ({type: SET_INITIALIZED_STATUS, flag})
}
export const setFetching = (flag) => {
    return ({type: SET_FETCHING, flag})
}

export const initializedUsers = () => (dispatch) => {
    let promise = dispatch(getUsersList());
    Promise.all([promise]).then(() => dispatch(setInitialized(false)))
}

export const getUsersList = () => (dispatch) => {
    return UsersAPI.getUsers().then(response => {
        console.log(response)
        dispatch(setUsers(response.data));
    })
        .catch(err => console.log(err))
}

export const userCreate = (firstName, lastName, photoURL) => (dispatch) => {
    return UsersAPI.userCreate(firstName, lastName, photoURL)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(initializedUsers())
            }
        })
}