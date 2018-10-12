import type from '../types/GenresTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    loadingSearch: false,
    data: [],
    genres: [],
    genresValue: [],
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
        case type.SEARCH_GENRES:
            return {
                ...state,
                genres: action.genres
            }
        case type.SEARCH_GENRES_VALUE:
            return {
                ...state,
                genresValue: action.genresValue,
                genres: action.genres
            }
        case type.LOADING_GENRES_SEARCH:
            return {
                ...state,
                loadingSearch: action.loadingSearch
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