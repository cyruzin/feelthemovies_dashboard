import type from '../types/KeywordsTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    data: [],
    keywordData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_KEYWORDS:
            return {
                ...state,
                data: action.data
            }
        case type.FETCH_SINGLE_KEYWORD:
            return {
                ...state,
                keywordData: action.keywordData
            }
        case type.LOADED_KEYWORDS:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.CREATE_KEYWORD:
            return {
                ...state,
                created: action.created
            }
        case type.EDIT_KEYWORD:
            return {
                ...state,
                edited: action.edited
            }
        case type.KEYWORD_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
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