const SET_HEAD_TEXT = 'SET_HEAD_TEXT';
const SET_DESCRIPTION_TEXT = 'SET_DESCRIPTION_TEXT';
const SET_IMPORTANCE_TEXT = 'SET_IMPORTANCE_TEXT';

const initialState = {
    headText: '',
    description: '',
    importance: 'High'
}

export const newTodoReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_HEAD_TEXT:
            return {...state, headText: action.headText}

        case SET_DESCRIPTION_TEXT:
            return {...state, description: action.description}

        case SET_IMPORTANCE_TEXT:
            return {...state, importance: action.importance}

        default: return state
    }
}

export const setHeadText = (headText) => {
    return {type: SET_HEAD_TEXT, headText}
}
export const setDescription = (description) => {
    return {type: SET_DESCRIPTION_TEXT, description}
}
export const setImportance = (importance) => {
    return {type: SET_IMPORTANCE_TEXT, importance}
}