import { httpFetchAuthentication } from '../../util/request'

/**
 * Authentication Action Types.
 */

const types = {
    FETCH: 'RECOMMENDATIONS/FETCH',
    SUCCESS: 'RECOMMENDATIONS/SUCCESS',
    FAILURE: 'RECOMMENDATIONS/FAILURE'
}

/**
 * Authentication State.
 */

const initialState = {
    fetch: false,
    error: ''
}

/**
 * Authentication Reducer.
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
                error: '',
                authorized: true,
                user: action.payload
            }
        case types.FAILURE:
            return {
                ...state,
                fetch: false,
                error: action.payload
            }
        case types.RESET:
            return initialState
        default:
            return state
    }
}

/**
 * Authentication Action Creators Functions.
 */

export const fetchAuthentication = () => ({
    type: types.FETCH
})

export const successAuthentication = payload => ({
    type: types.SUCCESS, payload
})

export const failureAuthentication = payload => ({
    type: types.FAILURE, payload
})

export const authenticationReset = () => ({
    type: types.RESET
})

/**
 * Authentication Side Effects Types and Functions.
 */

export const checkAuthentication = credentials => dispatch => {
    dispatch(fetchAuthentication())
    return httpFetchAuthentication(credentials)
        .then(response => dispatch(successAuthentication(response.data)))
        .catch(error => dispatch(failureAuthentication(error.message || 'Something went wrong')))
}