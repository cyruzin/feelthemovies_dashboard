import { httpFetch } from '../../util/request'

/**
 * Users Action Types.
 */

const types = {
    FETCH: 'USERS_LIST/FETCH',
    SUCCESS: 'USERS_LIST/SUCCESS',
    FAILURE: 'USERS_LIST/FAILURE',
    SEARCH: 'USERS_LIST/SEARCH',
    REMOVE: 'USERS_LIST/REMOVE'
}

/**
 * Users State.
 */

const initialState = {
    fetch: false,
    data: [],
    searchData: [],
    message: '',
    error: ''
}

/**
 * Users Reducer.
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
 * Users Action Creators Functions.
 */

export const fetchUsers = () => ({
    type: types.FETCH
})

export const successUsers = payload => ({
    type: types.SUCCESS, payload
})

export const failureUsers = payload => ({
    type: types.FAILURE, payload
})

export const searchUsers = payload => ({
    type: types.SEARCH, payload
})

export const removeUsers = payload => ({
    type: types.REMOVE, payload
})

/**
 * Users Side Effects Types and Functions.
 */

export const getUsers = () => dispatch => {
    dispatch(fetchUsers())
    return httpFetch({ method: 'GET', url: '/users' })
        .then(response => dispatch(successUsers(response.data)))
        .catch(error => dispatch(failureUsers(error.message)))
}

export const getSearchUsers = query => dispatch => {
    dispatch(fetchUsers())
    return httpFetch({
        method: 'GET',
        url: `/search_user?query=${query}`
    }).then(response => dispatch(
        searchUsers(response.data !== null ? response.data : []))
    ).catch(error => dispatch(failureUsers(error.message)))
}

export const deleteUsers = id => dispatch => {
    dispatch(fetchUsers())
    return httpFetch({ method: 'DELETE', url: `/user/${id}` })
        .then(response => {
            dispatch(getUsers())
            dispatch(removeUsers(response.message))
        }).catch(error => dispatch(failureUsers(error.message)))
}