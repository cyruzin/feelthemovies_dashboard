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

export const setKeywords = value => {
    return {
        type: type.FETCH_KEYWORDS, data: value
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