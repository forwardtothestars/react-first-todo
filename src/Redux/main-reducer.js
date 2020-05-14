import {UsersAPI} from "../API/apiCall";
import {setUsers} from "./users-reducer";

const SET_INITIALIZED_STATUS = 'SET_INITIALIZED_STATUS';
const SET_FETCHING = 'SET_FETCHING';
const PREPARE_MODAL_DATA = 'PREPARE_MODAL_DATA';
const SET_EDIT_TODO_TITLE = 'SET_EDIT_TODO_TITLE';
const SET_EDIT_TODO_TEXT = 'SET_EDIT_TODO_TEXT';
const SET_EDIT_TODO_IMPORTANCE = 'SET_EDIT_TODO_IMPORTANCE';

let initialState = {
    isInitialized: true,
    isFetching: false,
    isModalOpen: false,
    modalData: {
        ModalContentComponent: null,
        saveCallback: null,
        name: null,
        modalProps: null

    }
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_STATUS: {
            return {...state, isInitialized: action.flag};
        }
        case SET_FETCHING:
            return {...state, isFetching: action.flag};
        case PREPARE_MODAL_DATA:
            let copyState = {
                ...state,
                modalData: {...state.modalData}
            };
            copyState.isModalOpen = action.isModalOpen;
            copyState.modalData.ModalContentComponent = action.ModalContentComponent;
            copyState.modalData.saveCallback = action.saveCallback;
            copyState.modalData.name = action.name;
            copyState.modalData.modalProps = action.modalData;
            return copyState;
        case SET_EDIT_TODO_TITLE:
            return copeAndEditState(state, 'title', action.title)
        case SET_EDIT_TODO_TEXT:
            return copeAndEditState(state, 'text', action.text)
        case SET_EDIT_TODO_IMPORTANCE:
            return copeAndEditState(state, 'importance', action.importance)
        default:
            return state;
    }
}

const copeAndEditState = (state, paramName, paramValue) => {
    let copyState = {
        ...state,
        modalData: {...state.modalData, modalProps: {...state.modalData.modalProps}}
    }
    copyState.modalData.modalProps[paramName] = paramValue
    return copyState
}

export const setInitialized = (flag) => {
    return ({type: SET_INITIALIZED_STATUS, flag})
}
export const setFetching = (flag) => {
    return ({type: SET_FETCHING, flag})
}
export const updateModalStatus = (params) => {
    return ({
        type: PREPARE_MODAL_DATA,
        isModalOpen: params.status,
        ModalContentComponent: params.ModalContentComponent,
        saveCallback: params.saveCallback,
        name: params.name,
        modalData: params.modalData
    })
}

export const setEditTodoTitle = (title) => {
    return {type: SET_EDIT_TODO_TITLE, title}
}
export const setEditTodoText = (text) => {
    return {type: SET_EDIT_TODO_TEXT, text}
}
export const setEditTodoImportance = (importance) => {
    return {type: SET_EDIT_TODO_IMPORTANCE, importance}
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