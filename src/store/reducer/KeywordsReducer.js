import type from '../types/KeywordsTypes'

const initialState = {
    loaded: false,
    deleted: false,
    edited: false,
    data: [],
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_KEYWORDS:
            return {
                ...state,
                data: action.data
            }
        case type.LOADED_KEYWORDS:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.EDIT_KEYWORD:
            return {
                ...state,
                edited: action.edited
            }
        case type.DELETE_KEYWORD:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.ERROR_KEYWORD:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}