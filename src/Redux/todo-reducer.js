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

        default: return state
    }
}

export const setTodoList = (todoList) => {
    return {type: SET_TODO_LIST, todoList}
}

export const getTodos = (userId) => (dispatch) => {
    dispatch(setFetching(true))
    NotesAPI.getNotes(userId).then((response) => {
        dispatch(setTodoList(response.data))
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

