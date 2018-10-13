import type from '../types/RecommendationsTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    data: [],
    genres: [],
    genresValue: [],
    images: [],
    imagesValue: [],
    poster: '',
    backdrop: '',
    recommendationData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_RECOMMENDATIONS:
            return {
                ...state,
                data: action.data
            }
        case type.FETCH_SINGLE_RECOMMENDATION:
            return {
                ...state,
                recommendationData: action.recommendationData
            }
        case type.FETCH_RECOMMENDATION_IMAGE:
            return {
                ...state,
                images: action.images
            }
        case type.LOADED_RECOMMENDATIONS:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.CREATE_RECOMMENDATION:
            return {
                ...state,
                created: action.created
            }
        case type.EDIT_RECOMMENDATION:
            return {
                ...state,
                edited: action.edited
            }
        case type.RECOMMENDATION_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.DELETE_RECOMMENDATION:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.RECOMMENDATION_IMAGES:
            return {
                ...state,
                poster: action.poster,
                backdrop: action.backdrop
            }
        case type.RECOMMENDATION_IMAGES_VALUE:
            return {
                ...state,
                imagesValue: action.imagesValue,
                images: action.images
            }
        case type.ERROR_RECOMMENDATION:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}