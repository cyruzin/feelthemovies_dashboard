import { httpFetch } from '../../util/request'

/**
 * Genres Action Types.
 */

const types = {
    FETCH: 'GENRES_LIST/FETCH',
    SUCCESS: 'GENRES_LIST/SUCCESS',
    FAILURE: 'GENRES_LIST/FAILURE',
    SEARCH: 'GENRES_LIST/SEARCH',
    REMOVE: 'GENRES_LIST/REMOVE'
}

/**
 * Genres State.
 */

const initialState = {
    fetch: false,
    data: [],
    searchData: [],
    message: '',
    error: ''
}

/**
 * Genres Reducer.
 */

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

/**
 * Genres Action Creators Functions.
 */

export const fetchGenres = () => ({
    type: types.FETCH
})

export const successGenres = payload => ({
    type: types.SUCCESS, payload
})

export const failureGenres = payload => ({
    type: types.FAILURE, payload
})

export const searchGenres = payload => ({
    type: types.SEARCH, payload
})

export const removeGenres = payload => ({
    type: types.REMOVE, payload
})

/**
 * Genres Side Effects Types and Functions.
 */

export const getGenres = () => dispatch => {
    dispatch(fetchGenres())
    return httpFetch({ method: 'GET', url: '/genres' })
        .then(response => dispatch(successGenres(response.data)))
        .catch(error => dispatch(failureGenres(error.message)))
}

export const getSearchGenres = query => dispatch => {
    dispatch(fetchGenres())
    return httpFetch({
        method: 'GET',
        url: `/search_genre?query=${query}`
    }).then(response => dispatch(
        searchGenres(response.data !== null ? response.data : []))
    ).catch(error => dispatch(failureGenres(error.message)))
}

export const deleteGenres = id => dispatch => {
    dispatch(fetchGenres())
    return httpFetch({ method: 'DELETE', url: `/genre/${id}` })
        .then(response => {
            dispatch(getGenres())
            dispatch(removeGenres(response.message))
        }).catch(error => dispatch(failureGenres(error.message)))
}