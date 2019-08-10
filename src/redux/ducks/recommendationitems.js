import { httpFetch } from '../../util/request'

/**
 * Recommendation Items Action Types.
 */

const types = {
    FETCH: 'RECOMMENDATIONS_ITEMS_LIST/FETCH',
    SUCCESS: 'RECOMMENDATIONS_ITEMS_LIST/SUCCESS',
    FAILURE: 'RECOMMENDATIONS_ITEMS_LIST/FAILURE',
    REMOVE: 'RECOMMENDATIONS_ITEMS_LIST/REMOVE'
}

/**
 * Recommendation Items State.
 */

const initialState = {
    fetch: false,
    data: [],
    message: '',
    error: ''
}

/**
 * Recommendation Items Reducer.
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
 * Recommendation Items Action Creators Functions.
 */

export const fetchRecommendationItems = () => ({
    type: types.FETCH
})

export const successRecommendationItems = payload => ({
    type: types.SUCCESS, payload
})

export const failureRecommendationItems = payload => ({
    type: types.FAILURE, payload
})

export const removeRecommendationItems = payload => ({
    type: types.REMOVE, payload
})

/**
 * Recommendation Items Side Effects Types and Functions.
 */

export const getRecommendationItems = id => dispatch => {
    dispatch(fetchRecommendationItems())
    return httpFetch({ method: 'GET', url: `/recommendation_item/${id}` })
        .then(response => dispatch(successRecommendationItems(response.data)))
        .catch(error => dispatch(failureRecommendationItems(error.message)))
}

export const deleteRecommendations = id => dispatch => {
    dispatch(fetchRecommendationItems())
    return httpFetch({ method: 'DELETE', url: `/recommendation_item/${id}` })
        .then(response => {
            dispatch(getRecommendationItems())
            dispatch(removeRecommendationItems(response.message))
        }).catch(error => dispatch(failureRecommendationItems(error.message)))
}