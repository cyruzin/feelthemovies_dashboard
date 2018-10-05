import type from '../types/AuthTypes'

const initialState = {
    email: '',
    password: '',
    apiToken: '',
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
                error: action.error
            }
        case type.ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}