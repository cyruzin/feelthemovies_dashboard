import type from '../types/SourcesTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    data: [],
    search: [],
    searchLoaded: false,
    sourceData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SOURCES_FETCH:
            return {
                ...state,
                data: action.data
            }
        case type.SOURCES_FETCH_SINGLE:
            return {
                ...state,
                sourceData: action.sourceData
            }
        case type.SOURCES_LOADED:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.SOURCES_CREATE:
            return {
                ...state,
                created: action.created
            }
        case type.SOURCES_EDIT:
            return {
                ...state,
                edited: action.edited
            }
        case type.SOURCES_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.SOURCES_DELETE:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.SOURCES_SEARCH:
            return {
                ...state,
                search: action.search
            }
        case type.SOURCES_SEARCH_LOADED:
            return {
                ...state,
                searchLoaded: action.searchLoaded
            }
        case type.SOURCES_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}