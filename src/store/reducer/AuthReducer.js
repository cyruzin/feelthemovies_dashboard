import type from '../types/AuthTypes'

const initialState = {
    email: '',
    password: '',
    token: '',
    id: '',
    authorized: false,
    session: '',
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
                authorized: true,
                id: action.payload.id,
                email: action.payload.email,
                token: action.payload.token,
                session: action.payload.exp,
                password: '',
                error: ''
            }
        case type.AUTH_LOGOUT:
            return initialState
        case type.AUTH_ERROR:
            return {
                ...state,
                error: action.error
            }
        case type.AUTH_SESSION:
            return {
                ...state,
                session: action.session
            }
        default:
            return state
    }
}