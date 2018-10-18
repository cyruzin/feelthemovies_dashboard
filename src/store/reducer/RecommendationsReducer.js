import type from '../types/RecommendationsTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    editedLoaded: false,
    deleted: false,
    data: [],
    genres: [],
    genresValue: [],
    keywords: [],
    keywordsValue: [],
    images: [],
    imagesValue: [],
    poster: '',
    backdrop: '',
    recommendationData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.RECOMMENDATIONS_FETCH:
            return {
                ...state,
                data: action.data
            }
        case type.RECOMMENDATIONS_FETCH_SINGLE:
            return {
                ...state,
                recommendationData: action.recommendationData
            }
        case type.RECOMMENDATIONS_FETCH_IMAGE:
            return {
                ...state,
                images: action.images
            }
        case type.RECOMMENDATIONS_LOADED:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.RECOMMENDATIONS_CREATE:
            return {
                ...state,
                created: action.created
            }
        case type.RECOMMENDATIONS_EDIT:
            return {
                ...state,
                edited: action.edited
            }
        case type.RECOMMENDATIONS_EDIT_LOADED:
            return {
                ...state,
                editedLoaded: action.editedLoaded
            }
        case type.RECOMMENDATIONS_DELETE:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.RECOMMENDATIONS_IMAGES:
            return {
                ...state,
                poster: action.poster,
                backdrop: action.backdrop
            }
        case type.RECOMMENDATIONS_IMAGES_VALUE:
            return {
                ...state,
                imagesValue: action.imagesValue,
                images: action.images
            }
        case type.RECOMMENDATIONS_ERROR:
            return {
                ...state,
                error: action.error
            }
        case type.RECOMMENDATIONS_RESET:
            return initialState
        default:
            return state
    }
}