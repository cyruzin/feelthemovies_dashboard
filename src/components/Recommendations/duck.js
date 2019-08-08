export const types = {
    FETCH: 'RECOMMENDATIONS_CREATE/FETCH',
    FAILURE: 'RECOMMENDATIONS_CREATE/FAILURE',
    MESSAGE: 'RECOMMENDATIONS_CREATE/MESSAGE',
    RESET: 'RECOMMENDATIONS_CREATE/RESET',
    TITLE: 'RECOMMENDATIONS_CREATE/TITLE',
    BODY: 'RECOMMENDATIONS_CREATE/BODY',
    TYPE: 'RECOMMENDATIONS_CREATE/TYPE',
    IMAGES: 'RECOMMENDATIONS_CREATE/IMAGES',
    IMAGE_CHANGE: 'RECOMMENDATIONS_CREATE/IMAGE_CHANGE',
    GENRES: 'RECOMMENDATIONS_CREATE/GENRES',
    GENRES_CHANGE: 'RECOMMENDATIONS_CREATE/GENRES_CHANGE',
    KEYWORDS: 'RECOMMENDATIONS_CREATE/KEYWORDS',
    KEYWORDS_CHANGE: 'RECOMMENDATIONS_CREATE/KEYWORDS_CHANGE'
}

export const initialState = {
    fetch: false,
    error: '',
    message: '',
    title: '',
    body: '',
    poster: '',
    backdrop: '',
    images: [],
    imageValue: '',
    genres: [],
    genresValue: [],
    keywords: [],
    keywordsValue: [],
    type: 0
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
                type: +action.payload
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