import { httpFetch } from '../../util/request'

/**
 * Recommendations Action Types.
 */

const types = {
    FETCH: 'RECOMMENDATIONS/FETCH',
    SUCCESS: 'RECOMMENDATIONS/SUCCESS',
    FAILURE: 'RECOMMENDATIONS/FAILURE'
}

/**
 * Recommendations State.
 */

const initialState = {
    fetch: false,
    data: [],
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

/**
 * Recommendations Side Effects Types and Functions.
 */

export const getRecommendations = () => dispatch => {
    dispatch(fetchRecommendations())
    return httpFetch({ method: 'GET', url: '/recommendations_admin' })
        .then(response => dispatch(successRecommendations(response.data)))
        .catch(error => dispatch(failureRecommendations(error.message)))
}