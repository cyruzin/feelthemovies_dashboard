import type from '../types/AuthTypes'

const initialState = {
    email: '',
    password: '',
    apiToken: '',
    id: '',
    authorized: false,
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.AUTH_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case type.AUTH_PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case type.AUTH_AUTHORIZED:
            return {
                ...state,
                authorized: action.authorized,
                apiToken: action.apiToken,
                password: action.password,
                id: action.id,
                error: action.error
            }
        case type.AUTH_LOGOUT:
            return initialState
        case type.AUTH_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}