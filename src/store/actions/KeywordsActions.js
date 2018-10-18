import type from '../types/KeywordsTypes'
import axios from 'axios'
import { baseUrl } from '../../util/constants'


export const fetchKeywords = () => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setEditLoaded(false))
        axios.get(`${baseUrl}/keyword/${id}?api_token=${apiToken}`)
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
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

export const setError = value => {
    return {
        type: type.KEYWORDS_ERROR, error: value
    }
}