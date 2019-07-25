import { httpFetch } from '../../util/request'

/**
 * Recommendations Action Types.
 */

const types = {
    FETCH: 'RECOMMENDATIONS/FETCH',
    SUCCESS: 'RECOMMENDATIONS/SUCCESS',
    FAILURE: 'RECOMMENDATIONS/FAILURE',
    SEARCH: 'RECOMMENDATIONS/SEARCH',
    REMOVE: 'RECOMMENDATIONS/REMOVE'
}

/**
 * Recommendations State.
 */

const initialState = {
    fetch: false,
    data: [],
    searchData: [],
    error: ''
}

/**
 * Recommendations Reducer.
 */

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                fetch: true
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
 * Recommendations Action Creators Functions.
 */

export const fetchRecommendations = () => ({
    type: types.FETCH
})

export const successRecommendations = payload => ({
    type: types.SUCCESS, payload
})

export const failureRecommendations = payload => ({
    type: types.FAILURE, payload
})

export const searchRecommendations = payload => ({
    type: types.SEARCH, payload
})

export const removeRecommendations = () => ({
    type: types.REMOVE
})

/**
 * Recommendations Side Effects Types and Functions.
 */

export const getRecommendations = () => dispatch => {
    dispatch(fetchRecommendations())
    return httpFetch({ method: 'GET', url: '/recommendations_admin' })
        .then(response => dispatch(successRecommendations(response.data)))
        .catch(error => dispatch(failureRecommendations(error.message)))
}

export const getSearchRecommendations = query => dispatch => {
    dispatch(fetchRecommendations())
    return httpFetch({
        method: 'GET',
        url: `/search_recommendation?query=${query}`
    }).then(response => dispatch(
        searchRecommendations(response.data !== null ? response.data : []))
    ).catch(error => dispatch(failureRecommendations(error)))
}

export const deleteRecommendations = id => dispatch => {
    dispatch(fetchRecommendations())
    return httpFetch({ method: 'DELETE', url: `/recommendation/${id}` })
        .then(response => dispatch(response.data.message))
        .catch(err => dispatch(failureRecommendations(err.data.message)))
}