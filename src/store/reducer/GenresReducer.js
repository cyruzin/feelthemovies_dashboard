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
        case type.GENRES_FETCH:
            return {
                ...state,
                data: action.data
            }
        case type.GENRES_FETCH_SINGLE:
            return {
                ...state,
                genreData: action.genreData
            }
        case type.GENRES_SEARCH:
            return {
                ...state,
                genres: action.genres
            }
        case type.GENRES_SEARCH_VALUE:
            return {
                ...state,
                genresValue: action.genresValue,
                genres: action.genres
            }
        case type.GENRES_SEARCH_LOADING:
            return {
                ...state,
                loadingSearch: action.loadingSearch
            }
        case type.GENRES_LOADED:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.GENRES_CREATE:
            return {
                ...state,
                created: action.created
            }
        case type.GENRES_EDIT:
            return {
                ...state,
                edited: action.edited
            }
        case type.GENRES_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.GENRES_DELETE:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.GENRES_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}