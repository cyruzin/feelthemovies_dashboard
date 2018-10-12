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
        case type.EMAIL:
            return {
                ...state,
                email: action.email
            }
        case type.PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case type.AUTHORIZED:
            return {
                ...state,
                authorized: action.authorized,
                apiToken: action.apiToken,
                password: action.password,
                id: action.id,
                error: action.error
            }
        case type.LOGOUT:
            return initialState
        case type.ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}