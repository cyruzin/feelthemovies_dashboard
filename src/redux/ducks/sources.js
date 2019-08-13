import { httpFetch } from '../../util/request'

export const types = {
    FETCH: 'SOURCES_LIST/FETCH',
    SUCCESS: 'SOURCES_LIST/SUCCESS',
    FAILURE: 'SOURCES_LIST/FAILURE',
    SEARCH: 'SOURCES_LIST/SEARCH',
    REMOVE: 'SOURCES_LIST/REMOVE'
}

export const initialState = {
    fetch: false,
    data: [],
    searchData: [],
    message: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                fetch: true,
                message: ''
            }
        case types.SUCCESS:
            return {
                ...state,
                fetch: false,
                data: action.payload,
                error: ''
            }
        case types.SEARCH:
            return {
                ...state,
                fetch: false,
                searchData: action.payload,
                error: ''
            }
        case types.REMOVE:
            return {
                ...state,
                fetch: false,
                message: action.payload,
                error: ''
            }
        case types.FAILURE:
            return {
                ...state,
                fetch: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const fetchSources = () => ({
    type: types.FETCH
})

export const successSources = payload => ({
    type: types.SUCCESS, payload
})

export const failureSources = payload => ({
    type: types.FAILURE, payload
})

export const searchSources = payload => ({
    type: types.SEARCH, payload
})

export const removeSources = payload => ({
    type: types.REMOVE, payload
})

export const getSources = () => dispatch => {
    dispatch(fetchSources())
    return httpFetch({ method: 'GET', url: '/sources' })
        .then(response => dispatch(successSources(response.data)))
        .catch(error => dispatch(failureSources(error.message)))
}

export const getSearchSources = query => dispatch => {
    dispatch(fetchSources())
    return httpFetch({
        method: 'GET',
        url: `/search_source?query=${query}`
    }).then(response => dispatch(
        searchSources(response.data !== null ? response.data : []))
    ).catch(error => dispatch(failureSources(error.message)))
}

export const deleteSources = id => dispatch => {
    dispatch(fetchSources())
    return httpFetch({ method: 'DELETE', url: `/source/${id}` })
        .then(response => {
            dispatch(getSources())
            dispatch(removeSources(response.message))
        }).catch(error => dispatch(failureSources(error.message)))
}