export const types = {
    FETCH: 'GENRES_CREATE/EDIT/FETCH',
    FAILURE: 'GENRES_CREATE/EDIT/FAILURE',
    MESSAGE: 'GENRES_CREATE/EDIT/MESSAGE',
    RESET: 'GENRES_CREATE/EDIT/RESET',
    NAME: 'GENRES_CREATE/EDIT/NAME'
}

export const initialState = {
    fetch: false,
    error: '',
    message: '',
    name: ''
}

export function reducer (state, action) {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                fetch: true,
                error: ''
            }
        case types.FAILURE:
            return {
                ...state,
                error: action.payload,
                fetch: false
            }
        case types.MESSAGE:
            return {
                ...state,
                message: action.payload,
                error: '',
                fetch: false
            }
        case types.NAME:
            return {
                ...state,
                name: action.payload,
                fetch: false
            }
        case types.RESET:
            return initialState
        default:
            throw new Error()
    }
}