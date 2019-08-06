export const types = {
    FETCH: 'RECOMMENDATIONS_CREATE/FETCH',
    SUCCESS: 'RECOMMENDATIONS_CREATE/SUCCESS',
    FAILURE: 'RECOMMENDATIONS_CREATE/ERROR',
    TITLE: 'RECOMMENDATIONS_CREATE/TITLE',
    BODY: 'RECOMMENDATIONS_CREATE/BODY',
    TYPE: 'RECOMMENDATIONS_CREATE/TYPE',
    IMAGES: 'RECOMMENDATIONS_CREATE/IMAGES',
    IMAGE_CHANGE: 'RECOMMENDATIONS_CREATE/IMAGE_CHANGE',
    GENRES: 'RECOMMENDATIONS_CREATE/GENRES',
    KEYWORDS: 'RECOMMENDATIONS_CREATE/KEYWORDS'
}

export const initialState = {
    fetch: false,
    error: '',
    title: '',
    body: '',
    poster: '',
    backdrop: '',
    images: [],
    imageValue: '',
    genres: [],
    keywords: [],
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
        case types.KEYWORDS:
            return {
                ...state,
                keywords:
                    action.payload,
                fetch: false,
                error: ''
            }
        default: return state
    }
}