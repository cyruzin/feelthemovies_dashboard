import type from '../types/SourcesTypes'

const initialState = {
    loaded: false,
    editLoaded: false,
    created: false,
    edited: false,
    deleted: false,
    data: [],
    sourceData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_SOURCES:
            return {
                ...state,
                data: action.data
            }
        case type.FETCH_SINGLE_SOURCE:
            return {
                ...state,
                sourceData: action.sourceData
            }
        case type.LOADED_SOURCES:
            return {
                ...state,
                loaded: action.loaded
            }
        case type.CREATE_SOURCE:
            return {
                ...state,
                created: action.created
            }
        case type.EDIT_SOURCE:
            return {
                ...state,
                edited: action.edited
            }
        case type.SOURCE_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.DELETE_SOURCE:
            return {
                ...state,
                deleted: action.deleted
            }
        case type.ERROR_SOURCE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}