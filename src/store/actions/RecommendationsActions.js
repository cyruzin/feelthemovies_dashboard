import type from '../types/RecommendationsTypes'
import axios, { axiosTmdb } from '../../util/constants/axios'

export const fetchRecommendations = () => {
    return dispatch => {
        dispatch(setRecommendationLoaded(true))
        axios.get(`/recommendations`)
            .then(res => {
                dispatch(setRecommendations(res.data.data))
                dispatch(setRecommendationLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationLoaded(false))
                dispatch(setRecommendationError(message))
            })
    }
}

export const fetchRecommendation = id => {
    return dispatch => {
        dispatch(setRecommendationEditLoaded(false))
        axios.get(`/recommendation/${id}`)
            .then(res => {
                dispatch(setRecommendationFetch(res.data))
                dispatch(setRecommendationEditLoaded(true))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationError(message))
            })
    }
}

export const createRecommendation = recommendation => {
    return dispatch => {
        dispatch(setRecommendationError(''))
        axios.post(`/recommendation`, recommendation)
            .then(() => {
                dispatch(setCreateRecommendation('Recommendation created successfully'))
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setRecommendationError(errors[0].message))
                dispatch(setCreateRecommendation(''))
            })
    }
}

export const editRecommendation = (id, recommendation) => {
    return dispatch => {
        dispatch(setRecommendationError(''))
        axios.put(`/recommendation/${id}`, recommendation)
            .then(() => {
                setEditRecommendation('Recommendation edited successfully')
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setRecommendationError(errors[0].message))
                setEditRecommendation('')
            })
    }
}

export const deleteRecommendation = id => {
    return dispatch => {
        axios.delete(`/recommendation/${id}`)
            .then(() => {
                dispatch(setRecommendationDeleted(true))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationDeleted(false))
                dispatch(setRecommendationError(message))
            })
    }
}

export const fetchRecommendationImages = search => {
    let query = encodeURIComponent(search)
    return dispatch => {
        dispatch(setRecommendationFetching(true))
        axiosTmdb.get(`/search/multi?language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => {
                let images = res.data.results
                    .filter(v => v.media_type !== 'person' && v.backdrop_path !== null)
                dispatch(setRecommendationFetchImage(images))
                dispatch(setRecommendationFetching(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationFetching(false))
                dispatch(setRecommendationError(message))
            })
    }
}

export const searchRecommendation = rec => {
    let query = encodeURIComponent(rec)
    return dispatch => {
        dispatch(setRecommendationsSearchLoaded(true))
        axios.get(`/search_recommendation?query=${query}`)
            .then(res => {
                dispatch(setRecommendationsSearch(res.data))
                dispatch(setRecommendationsSearchLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationsSearchLoaded(false))
                dispatch(setRecommendationError(message))
            })
    }
}

export const setRecommendations = value => {
    return {
        type: type.RECOMMENDATIONS_FETCH,
        data: value
    }
}

export const setRecommendationFetching = value => {
    return {
        type: type.RECOMMENDATIONS_FETCHING,
        fetching: value
    }
}

export const setRecommendationFetch = value => {
    return {
        type: type.RECOMMENDATIONS_FETCH_SINGLE,
        recommendationData: value
    }
}

export const setRecommendationLoaded = value => {
    return {
        type: type.RECOMMENDATIONS_LOADED,
        loaded: value
    }
}

export const setRecommendationsSearch = value => {
    return {
        type: type.RECOMMENDATIONS_SEARCH,
        search: value
    }
}

export const setRecommendationsSearchLoaded = value => {
    return {
        type: type.RECOMMENDATIONS_SEARCH_LOADED,
        searchLoaded: value
    }
}

export const setCreateRecommendation = value => {
    return {
        type: type.RECOMMENDATIONS_CREATE,
        created: value
    }
}

export const setEditRecommendation = value => {
    return {
        type: type.RECOMMENDATIONS_EDIT,
        edited: value
    }
}

export const setRecommendationEditLoaded = value => {
    return {
        type: type.RECOMMENDATIONS_EDIT_LOADED,
        editLoaded: value
    }
}

export const setRecommendationDeleted = value => {
    return {
        type: type.RECOMMENDATIONS_DELETE,
        deleted: value
    }
}

export const setRecommendationFetchImage = value => {
    return {
        type: type.RECOMMENDATIONS_FETCH_IMAGE,
        images: value
    }
}

export const setRecommendationImages = (poster, backdrop) => {
    return {
        type: type.RECOMMENDATIONS_IMAGES,
        poster: poster,
        backdrop: backdrop
    }
}

export const setRecommendationImagesChange = value => {
    return {
        type: type.RECOMMENDATIONS_IMAGES_VALUE,
        imagesValue: value, images: []
    }
}

export const setRecommendationReset = () => {
    return {
        type: type.RECOMMENDATIONS_RESET
    }
}


export const setRecommendationError = value => {
    return {
        type: type.RECOMMENDATIONS_ERROR,
        error: value
    }
}

export const recommendationClear = () => ({
    type: type.RECOMMENDATIONS_CLEAR
})
