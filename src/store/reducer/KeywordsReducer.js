import type from '../types/KeywordsTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    loadingSearch: false,
    data: [],
    keywordData: '',
    keywords: [],
    keywordsValue: [],
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.KEYWORDS_FETCH:
            return {
                ...state,
                data: action.data
            }
        case type.KEYWORDS_FETCH_SINGLE:
            return {
                ...state,
                keywordData: action.keywordData
            }
        case type.KEYWORDS_SEARCH:
            return {
                ...state,
                keywords: action.keywords
            }
        case type.KEYWORDS_SEARCH_VALUE:
            return {
                ...state,
                keywordsValue: action.keywordsValue,
                keywords: action.keywords
            }
        case type.KEYWORDS_SEARCH_LOADING:
            return {
                ...state,
                loadingSearch: action.loadingSearch
            }
        case type.KEYWORDS_LOADED:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.KEYWORDS_CREATE:
            return {
                ...state,
                created: action.created
            }
        case type.KEYWORDS_EDIT:
            return {
                ...state,
                edited: action.edited
            }
        case type.KEYWORDS_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.KEYWORDS_DELETE:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.KEYWORDS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}