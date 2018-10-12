import type from '../types/RecommendationsTypes'
import axios from 'axios'
import { apiToken, baseUrl } from '../../util/constants'

export const fetchRecommendations = () => {
    return dispatch => {
        dispatch(setLoaded(false))

        axios.get(`${baseUrl}/recommendations?api_token=${apiToken}`)
            .then(res => {
                dispatch(setRecommendations(res.data.data))
                dispatch(setLoaded(true))
            })
            .catch(() => dispatch(setError('Something went wrong')))
    }
}

export const fetchSingleRecommendation = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`${baseUrl}/recommendation/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({
                    type: type.FETCH_SINGLE_RECOMMENDATION,
                    recommendationData: res.data
                })
                dispatch(setEditLoaded(true))
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const createRecommendation = recommendation => {
    return dispatch => {
        dispatch(setError(''))

        axios.post(`${baseUrl}/recommendation?api_token=${apiToken}`, recommendation)
            .then(() => {
                dispatch(setCreateRecommendation('recommendation created successfully'))
            })
            .catch(() => {
                dispatch(setCreateRecommendation(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const editRecommendation = (id, recommendation) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`${baseUrl}/recommendation/${id}?api_token=${apiToken}`, recommendation)
            .then(() => {
                dispatch(setEdited('Recommendation edited successfully'))
            })
            .catch(() => {
                dispatch(setEdited(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const deleteRecommendation = id => {
    return dispatch => {
        axios.delete(`${baseUrl}/recommendation/${id}?api_token=${apiToken}`)
            .then(() => {
                dispatch(setDeleted('Recommendation removed successfully'))
            })
            .catch(() => {
                dispatch(setDeleted(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const setRecommendations = value => {
    return {
        type: type.FETCH_RECOMMENDATIONS, data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.LOADED_RECOMMENDATIONS, loaded: value
    }
}

export const setError = value => {
    return {
        type: type.ERROR_RECOMMENDATION, error: value
    }
}

export const setDeleted = value => {
    return {
        type: type.DELETE_RECOMMENDATION, deleted: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.RECOMMENDATION_EDIT_LOADED, editLoaded: value
    }
}

export const setCreateRecommendation = value => {
    return {
        type: type.CREATE_RECOMMENDATION, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.EDIT_RECOMMENDATION, edited: value
    }
}
