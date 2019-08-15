export const types = {
    FETCH: 'RECOMMENDATION_ITEMS/FETCH',
    FAILURE: 'RECOMMENDATION_ITEMS/FAILURE',
    MESSAGE: 'RECOMMENDATION_ITEMS/MESSAGE',
    RESET: 'RECOMMENDATION_ITEMS/RESET',
    COMMENTARY: 'RECOMMENDATION_ITEMS/COMMENTARY',
    TRAILER: 'RECOMMENDATION_ITEMS/TRAILER',
    SEARCH: 'RECOMMENDATION_ITEMS/SEARCH',
    SEARCH_CHANGE: 'RECOMMENDATION_ITEMS/SEARCH_CHANGE',
    SOURCES: 'RECOMMENDATION_ITEMS/SOURCES',
    SOURCES_CHANGE: 'RECOMMENDATION_ITEMS/SOURCES_CHANGE',
    RECOMMENDATION_ITEM: 'RECOMMENDATION_ITEMS/RECOMMENDATION_ITEM',
    FORM_FILLED: 'RECOMMENDATION_ITEMS/FORM_FILLED'
}

export const initialState = {
    fetch: false,
    formFilled: false,
    error: '',
    message: '',
    commentary: '',
    item: {},
    trailer: '',
    search: [],
    searchValue: [],
    sources: [],
    sourcesValue: [],
    recommendationID: ''
}

export function reducer (state, action) {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                fetch: true,
                error: ''
            }
        case types.RECOMMENDATION_ITEM:
            return {
                ...state,
                item: action.payload.item,
                commentary: action.payload.commentary,
                searchValue: action.payload.searchValue,
                recommendationID: action.payload.recommendationID,
                fetch: false,
                error: ''
            }
        case types.FORM_FILLED:
            return {
                ...state,
                formFilled: true
            }
        case types.FAILURE:
            return {
                ...state,
                error: action.payload,
                fetch: false
            }
        case types.MESSAGE:
            return {
                ...state,
                message: action.payload,
                error: '',
                fetch: false
            }
        case types.COMMENTARY:
            return {
                ...state,
                commentary: action.payload
            }
        case types.SEARCH:
            return {
                ...state,
                search: action.payload,
                fetch: false,
                error: ''
            }
        case types.SEARCH_CHANGE:
            return {
                ...state,
                searchValue: action.payload.searchValue,
                item: action.payload.item,
                search: []
            }
        case types.TRAILER:
            return {
                ...state,
                trailer: action.payload
            }
        case types.SOURCES:
            return {
                ...state,
                sources: action.payload,
                fetch: false,
                error: ''
            }
        case types.SOURCES_CHANGE:
            return {
                ...state,
                sourcesValue: action.payload,
                sources: []
            }
        case types.RESET:
            return initialState
        default:
            throw new Error()
    }
}