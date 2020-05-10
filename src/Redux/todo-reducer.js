import {NotesAPI} from "../API/apiCall";
import {setFetching} from "./main-reducer";


const SET_TODO_LIST = 'SET_TODO_LIST';

let initialState = {
    todoList: []
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO_LIST:
            return {...state, todoList: action.todoList}

        default:
            return state
    }
}

export const setTodoList = (todoList) => {
    return {type: SET_TODO_LIST, todoList}
}

export const getTodos = (userId, status) => (dispatch) => {
    dispatch(setFetching(true))
    NotesAPI.getNotes(userId, status='active').then((response) => {
        dispatch(setTodoList(response.data.todoList))
    })
        .catch(err => console.log(err))
        .finally(() => dispatch(setFetching(false)))
}

export const addNewTodo = (data) => (dispatch) => {
    dispatch(setFetching(true))
    NotesAPI.createNote(data)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(getTodos(data.userId))
            }
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setFetching(false)))
}

export const removeTodo = (id, userId) => (dispatch) => {
    NotesAPI.deleteNote(id)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(getTodos(userId))
            }
        })
        .catch(err => console.log(err))
}

export const updateTodo = (id, params, userId) => (dispatch) => {
    NotesAPI.updateNote(id, params)
        .then(response => {
            if (response.data.ResultCode === 0) {
                dispatch(getTodos(userId))
            }
        })
        .catch(err => console.log(err))
}

