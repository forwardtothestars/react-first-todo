import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {locationReducer} from "./location-reducer";
import {newTodoReducer} from "./new-todo-reducer";
import {mainReducer} from "./main-reducer";
import {usersReducer} from "./users-reducer";
import {todoReducer} from "./todo-reducer";

const reducers = combineReducers({
    locationData: locationReducer,
    newTodo: newTodoReducer,
    main: mainReducer,
    usersData: usersReducer,
    todoData: todoReducer
});

export let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;