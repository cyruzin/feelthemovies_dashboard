import type from '../types/RecommendationsTypes'
import axios from 'axios'
import axiosTmdb from 'axios'
import { tmdbToken } from '../../util/constants'

export const fetchRecommendations = () => {
    return dispatch => {
        dispatch(setLoaded(false))
        axios.get(`/recommendations?nofilter=true`)
            .then(res => {
                dispatch(setRecommendations(res.data.data))
                dispatch(setLoaded(true))
            })
            .catch(() => dispatch(setRecommendationError('Something went wrong')))
    }
}

export const fetchSingleRecommendation = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`/recommendation/${id}`)
            .then(res => {
                dispatch({
                    type: type.RECOMMENDATIONS_FETCH_SINGLE,
                    recommendationData: res.data
                })
                dispatch(setEditLoaded(true))
            })
            .catch(() => {
                dispatch(setRecommendationError('Something went wrong'))
            })
    }
}

export const createRecommendation = recommendation => {
    return dispatch => {
        dispatch(setRecommendationError(''))

        axios.post(`/recommendation`, recommendation)
            .then(() => {
                dispatch(setCreateRecommendation('recommendation created successfully'))
            })
            .catch(() => {
                dispatch(setCreateRecommendation(''))
                dispatch(setRecommendationError('Something went wrong'))
            })
    }
}

export const editRecommendation = (id, recommendation) => {
    return dispatch => {
        dispatch(setRecommendationError(''))
        axios.put(`/recommendation/${id}`, recommendation)
            .then(() => {
                dispatch(setEditRecommendation('Recommendation edited successfully'))
            })
            .catch(() => {
                dispatch(setEditRecommendation(''))
                dispatch(setRecommendationError('Something went wrong'))
            })
    }
}

export const deleteRecommendation = id => {
    return dispatch => {
        axios.delete(`/recommendation/${id}`)
            .then(() => {
                dispatch(setDeleted(true))
            })
            .catch(() => {
                dispatch(setDeleted(false))
                dispatch(setRecommendationError('Something went wrong'))
            })
    }
}

export const fetchRecommendationImages = search => {

    let query = encodeURIComponent(search)

    return dispatch => {

        axiosTmdb.get(`https://api.themoviedb.org/3/search/multi?api_key=${tmdbToken}&language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => {
                let images = res.data.results
                    .filter(v => v.media_type !== 'person' && v.backdrop_path !== null)
                dispatch({
                    type: type.RECOMMENDATIONS_FETCH_IMAGE,
                    images: images
                })
            })
            .catch(() => dispatch(setRecommendationError('Something went wrong')))
    }
}

export const searchRecommendation = rec => {
    let query = encodeURIComponent(rec)
    return dispatch => {
        axios.get(`/search_recommendation?q=${query}`)
            .then(res => {
                dispatch(setRecommendationsSearch(res.data.data))
            })
            .catch(() => {
                dispatch(setRecommendationError('Something went wrong'))
            })
    }
}

export const setRecommendations = value => {
    return {
        type: type.RECOMMENDATIONS_FETCH, data: value
    }
}

export const setRecommendationsSearch = value => {
    return {
        type: type.RECOMMENDATIONS_SEARCH, search: value
    }
}

export const setLoaded = value => {
    return {
        type: type.RECOMMENDATIONS_LOADED, loaded: value
    }
}

export const setCreateRecommendation = value => {
    return {
        type: type.RECOMMENDATIONS_CREATE, created: value
    }
}

export const setEditRecommendation = value => {
    return {
        type: type.RECOMMENDATIONS_EDIT, edited: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.RECOMMENDATIONS_EDIT_LOADED, editLoaded: value
    }
}

export const recommendationEditLoaded = value => {
    return {
        type: type.RECOMMENDATIONS_EDIT_LOADED, editLoaded: value
    }
}


export const setDeleted = value => {
    return {
        type: type.RECOMMENDATIONS_DELETE, deleted: value
    }
}

export const setRecommendationImages = (poster, backdrop) => {
    return {
        type: type.RECOMMENDATIONS_IMAGES,
        poster: poster,
        backdrop: backdrop
    }
}

export const imagesChange = value => {
    return {
        type: type.RECOMMENDATIONS_IMAGES_VALUE, imagesValue: value, images: []
    }
}

export const setRecommendationReset = () => {
    return {
        type: type.RECOMMENDATIONS_RESET
    }
}

export const setRecommendationError = value => {
    return {
        type: type.RECOMMENDATIONS_ERROR, error: value
    }
}