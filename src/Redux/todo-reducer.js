import {NotesAPI} from "../API/apiCall";
import {setFetching} from "./main-reducer";


const SET_TODO_LIST = 'SET_TODO_LIST';
const SET_TODO_VIEW_MODE = 'SET_TODO_VIEW_MODE';

let initialState = {
    todoList: [],
    viewMode: 'active',
    editTodoData: {
        title: '',
        text: '',
        importance: ''
    }
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO_LIST:
            return {...state, todoList: action.todoList}
        case SET_TODO_VIEW_MODE:
            return {...state, viewMode: action.viewMode}

        default:
            return state
    }
}

export const setTodoList = (todoList) => {
    return {type: SET_TODO_LIST, todoList}
}
export const setViewMode = (viewMode) => {
    return {type: SET_TODO_VIEW_MODE, viewMode}
}

/////////////////////////////////////////////////////////

export const getTodos = (userId, status) => (dispatch) => {
    dispatch(setFetching(true))
    NotesAPI.getNotes(userId, status).then((response) => {
        dispatch(setTodoList(response.data.todoList))
    })
        .catch(err => console.log(err))
        .finally(() => dispatch(setFetching(false)))
}

export const addNewTodo = (data, viewMode) => (dispatch) => {
    dispatch(setFetching(true))
    NotesAPI.createNote(data)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(getTodos(data.userId, viewMode))
            }
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setFetching(false)))
}

export const removeTodo = (id, userId, viewMode) => (dispatch) => {
    NotesAPI.deleteNote(id)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(getTodos(userId, viewMode))
            }
        })
        .catch(err => console.log(err))
}

export const updateTodo = (id, params, userId, viewMode) => (dispatch) => {
    NotesAPI.updateNote(id, params)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(getTodos(userId, viewMode))
            }
        })
        .catch(err => console.log(err))
}

