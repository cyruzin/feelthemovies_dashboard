import type from '../types/RecommendationItemsTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    name: '',
    year: '',
    mediaType: '',
    overview: '',
    trailer: '',
    poster: '',
    backdrop: '',
    commentary: '',
    sources: [],
    sourcesValue: [],
    items: [],
    item: '',
    tmdb_id: '',
    tmdb: [],
    tdmbValue: [],
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.RECOMMENDATION_ITEM_LOADED:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.RECOMMENDATION_ITEM_FETCH:
            return {
                ...state,
                items: action.data
            }
        case type.RECOMMENDATION_ITEM_SINGLE_FETCH:
            return {
                ...state,
                item: action.data
            }
        case type.RECOMMENDATION_ITEM_CREATE:
            return {
                ...state,
                created: action.data
            }
        case type.RECOMMENDATION_ITEM_EDIT:
            return {
                ...state,
                edited: action.data
            }
        case type.RECOMMENDATION_ITEM_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.RECOMMENDATION_ITEM_DELETE:
            return {
                ...state,
                deleted: action.data
            }
        case type.RECOMMENDATION_ITEM_FETCH_TMDB_DATA:
            return {
                ...state,
                tmdb: action.tmdb
            }
        case type.RECOMMENDATION_ITEM_FETCH_TMDB_VALUE:
            return {
                ...state,
                tmdbValue: action.tmdbValue,
                tmdb: action.tmdb
            }
        case type.RECOMMENDATION_ITEM_FETCH_TMDB_SET:
            return {
                ...state,
                name: action.name,
                tmdb_id: action.tmdb_id,
                year: action.year,
                overview: action.overview,
                poster: action.poster,
                backdrop: action.backdrop,
                mediaType: action.mediaType
            }
        case type.RECOMMENDATION_ITEM_FETCH_TMDB_TRAILER:
            return {
                ...state,
                trailer: action.trailer
            }
        case type.RECOMMENDATION_ITEM_SOURCE_SEARCH:
            return {
                ...state,
                sources: action.sources
            }
        case type.RECOMMENDATION_ITEM_SOURCE_VALUE:
            return {
                ...state,
                sourcesValue: action.sourcesValue,
                sources: action.sources
            }
        case type.RECOMMENDATION_ITEM_ERROR:
            return {
                ...state,
                error: action.data
            }
        case type.RECOMMENDATION_ITEM_COMMENTARY:
            return {
                ...state,
                commentary: action.commentary
            }
        case type.RECOMMENDATION_ITEM_RESET:
            return initialState
        case type.RECOMMENDATION_ITEM_EDIT_VALUES:
            return {
                ...state,
                name: action.name,
                movie_id: action.movie_id,
                year: action.year,
                overview: action.overview,
                commentary: action.commentary,
                trailer: action.trailer,
                poster: action.poster,
                backdrop: action.backdrop
            }
        default:
            return state
    }
}