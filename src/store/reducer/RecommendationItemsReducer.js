import type from '../types/RecommendationItemsTypes'

const initialState = {
    loaded: false,
    created: false,
    edited: false,
    deleted: false,
    name: '',
    year: '',
    overview: '',
    poster: '',
    backdrop: '',
    sources: [],
    sorcesValue: [],
    items: [],
    item: '',
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
        case type.RECOMMENDATION_ITEM_DELETE:
            return {
                ...state,
                deleted: action.data
            }
        case type.RECOMMENDATION_ITEM_ERROR:
            return {
                ...state,
                error: action.data
            }
        default:
            return state
    }
}