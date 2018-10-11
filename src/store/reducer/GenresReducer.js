import type from '../types/GenresTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    data: [],
    genreData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_GENRES:
            return {
                ...state,
                data: action.data
            }
        case type.FETCH_SINGLE_GENRE:
            return {
                ...state,
                genreData: action.genreData
            }
        case type.LOADED_GENRES:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.CREATE_GENRE:
            return {
                ...state,
                created: action.created
            }
        case type.EDIT_GENRE:
            return {
                ...state,
                edited: action.edited
            }
        case type.GENRE_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.DELETE_GENRE:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.ERROR_GENRE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}