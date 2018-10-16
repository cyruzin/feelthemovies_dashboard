import type from '../types/KeywordsTypes'
import axios from 'axios'
import { apiToken, baseUrl } from '../../util/constants'

export const fetchKeywords = () => {
    return dispatch => {
        dispatch(setLoaded(false))

        axios.get(`${baseUrl}/keywords?api_token=${apiToken}`)
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
        axios.get(`${baseUrl}/keyword/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.FETCH_SINGLE_KEYWORD, keywordData: res.data })
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

        axios.post(`${baseUrl}/keyword?api_token=${apiToken}`, keyword)
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
        axios.put(`${baseUrl}/keyword/${id}?api_token=${apiToken}`, keyword)
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
        axios.delete(`${baseUrl}/keyword/${id}?api_token=${apiToken}`)
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
        loadingKeywordsSearch(true)
        axios.get(`${baseUrl}/search_keyword?api_token=${apiToken}&q=${query}`)
            .then(res => {
                dispatch(setKeywordsSearch(res.data))
                loadingKeywordsSearch(false)
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const setKeywords = value => {
    return {
        type: type.FETCH_KEYWORDS, data: value
    }
}

export const setKeywordsSearch = value => {
    return {
        type: type.SEARCH_KEYWORDS, keywords: value
    }
}

export const loadingKeywordsSearch = value => {
    return {
        type: type.LOADING_KEYWORDS_SEARCH, loadingSearch: value
    }
}

export const keywordsChange = value => {
    return {
        type: type.SEARCH_KEYWORDS_VALUE, keywordsValue: value, keywords: []
    }
}

export const setLoaded = value => {
    return {
        type: type.LOADED_KEYWORDS, loaded: value
    }
}

export const setError = value => {
    return {
        type: type.ERROR_KEYWORD, error: value
    }
}

export const setDeleted = value => {
    return {
        type: type.DELETE_KEYWORD, deleted: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.KEYWORD_EDIT_LOADED, editLoaded: value
    }
}

export const setCreateKeyword = value => {
    return {
        type: type.CREATE_KEYWORD, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.EDIT_KEYWORD, edited: value
    }
}
