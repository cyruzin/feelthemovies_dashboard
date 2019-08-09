export const types = {
    FETCH: 'RECOMMENDATIONS_CREATE/EDIT/FETCH',
    FAILURE: 'RECOMMENDATIONS_CREATE/EDIT/FAILURE',
    MESSAGE: 'RECOMMENDATIONS_CREATE/EDIT/MESSAGE',
    RESET: 'RECOMMENDATIONS_CREATE/EDIT/RESET',
    TITLE: 'RECOMMENDATIONS_CREATE/EDIT/TITLE',
    BODY: 'RECOMMENDATIONS_CREATE/EDIT/BODY',
    TYPE: 'RECOMMENDATIONS_CREATE/EDIT/TYPE',
    STATUS: 'RECOMMENDATIONS_CREATE/EDIT/STATUS',
    IMAGES: 'RECOMMENDATIONS_CREATE/EDIT/IMAGES',
    IMAGE_CHANGE: 'RECOMMENDATIONS_CREATE/EDIT/IMAGE_CHANGE',
    GENRES: 'RECOMMENDATIONS_CREATE/EDIT/GENRES',
    GENRES_CHANGE: 'RECOMMENDATIONS_CREATE/EDIT/GENRES_CHANGE',
    KEYWORDS: 'RECOMMENDATIONS_CREATE/EDIT/KEYWORDS',
    KEYWORDS_CHANGE: 'RECOMMENDATIONS_CREATE/EDIT/KEYWORDS_CHANGE',
    RECOMMENDATION: 'RECOMMENDATIONS_CREATE/EDIT/RECOMMENDATION',
    FORM_FILLED: 'RECOMMENDATIONS_CREATE/EDIT/FORM_FILLED'
}

export const initialState = {
    fetch: false,
    formFilled: false,
    error: '',
    message: '',
    title: '',
    body: '',
    type: 0,
    status: 0,
    poster: '',
    backdrop: '',
    images: [],
    imageValue: '',
    genres: [],
    genresValue: [],
    keywords: [],
    keywordsValue: []
}

export function reducer (state, action) {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                fetch: true,
                error: ''
            }
        case types.RECOMMENDATION:
            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
                type: action.payload.type,
                status: action.payload.status,
                poster: action.payload.poster,
                backdrop: action.payload.backdrop,
                imageValue: action.payload.backdrop,
                fetch: false,
                error: ''
            }
        case types.FORM_FILLED:
            return {
                ...state,
                formFilled: true
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
        case types.TITLE:
            return {
                ...state,
                title: action.payload
            }
        case types.BODY:
            return {
                ...state,
                body: action.payload
            }
        case types.TYPE:
            return {
                ...state,
                type: action.payload
            }
        case types.STATUS:
            return {
                ...state,
                status: action.payload
            }
        case types.IMAGES:
            return {
                ...state,
                images:
                    action.payload,
                fetch: false,
                error: ''
            }
        case types.IMAGE_CHANGE:
            return {
                ...state,
                imageValue: action.payload.imageValue,
                poster: action.payload.poster,
                backdrop: action.payload.backdrop,
                images: []
            }
        case types.GENRES:
            return {
                ...state,
                genres: action.payload,
                fetch: false,
                error: ''
            }
        case types.GENRES_CHANGE:
            return {
                ...state,
                genresValue: action.payload,
                genres: []
            }
        case types.KEYWORDS:
            return {
                ...state,
                keywords: action.payload,
                fetch: false,
                error: ''
            }
        case types.KEYWORDS_CHANGE:
            return {
                ...state,
                keywordsValue: action.payload,
                keywords: []
            }
        case types.RESET:
            return initialState
        default:
            throw new Error()
    }
}