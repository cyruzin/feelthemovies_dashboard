import type from '../types/KeywordsTypes'
import axios from '../../util/constants/axios'

export const fetchKeywords = () => {
    return dispatch => {
        dispatch(setLoaded(false))
        axios.get(`/keywords`)
            .then(res => {
                dispatch(setKeywords(res.data.data))
                dispatch(setLoaded(true))
            })
            .catch(() => dispatch(setError('Something went wrong')))
    }
}

export const fetchSingleKeyword = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`/keyword/${id}`)
            .then(res => {
                dispatch({ type: type.KEYWORDS_FETCH_SINGLE, keywordData: res.data })
                dispatch(setEditLoaded(true))
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const createKeyword = keyword => {
    return dispatch => {
        dispatch(setError(''))
        axios.post(`/keyword`, keyword)
            .then(() => {
                dispatch(setCreateKeyword('Keyword created successfully'))
            })
            .catch(() => {
                dispatch(setCreateKeyword(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const editKeyword = (id, keyword) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`/keyword/${id}`, keyword)
            .then(() => {
                dispatch(setEdited('Keyword edited successfully'))
            })
            .catch(() => {
                dispatch(setEdited(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const deleteKeyword = id => {
    return dispatch => {
        axios.delete(`/keyword/${id}`)
            .then(() => {
                dispatch(setDeleted('Keyword removed successfully'))
            })
            .catch(() => {
                dispatch(setDeleted(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const searchKeywords = keyword => {
    let query = encodeURIComponent(keyword)
    return dispatch => {
        dispatch(loadingKeywordsSearch(true))
        dispatch(setKeywordsSearchLoaded(false))
        axios.get(`/search_keyword?q=${query}`)
            .then(res => {
                dispatch(setKeywordsSearch(res.data))
                dispatch(loadingKeywordsSearch(false))
                dispatch(setKeywordsSearchLoaded(true))

            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const setKeywords = value => {
    return {
        type: type.KEYWORDS_FETCH, data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.KEYWORDS_LOADED, loaded: value
    }
}

export const setKeywordsSearch = value => {
    return {
        type: type.KEYWORDS_SEARCH, keywords: value
    }
}

export const keywordsChange = value => {
    return {
        type: type.KEYWORDS_SEARCH_VALUE, keywordsValue: value, keywords: []
    }
}

export const loadingKeywordsSearch = value => {
    return {
        type: type.KEYWORDS_SEARCH_LOADING, loadingSearch: value
    }
}

export const setCreateKeyword = value => {
    return {
        type: type.KEYWORDS_CREATE, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.KEYWORDS_EDIT, edited: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.KEYWORDS_EDIT_LOADED, editLoaded: value
    }
}

export const setDeleted = value => {
    return {
        type: type.KEYWORDS_DELETE, deleted: value
    }
}

export const setKeywordsReset = () => {
    return {
        type: type.KEYWORDS_RESET
    }
}

export const setKeywordsSearchLoaded = value => {
    return {
        type: type.KEYWORDS_SEARCH_LOADED, searchLoaded: value
    }
}


export const setError = value => {
    return {
        type: type.KEYWORDS_ERROR, error: value
    }
}