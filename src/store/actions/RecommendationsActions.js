import type from '../types/RecommendationsTypes'
import axios, { axiosTmdb } from '../../util/constants/axios'

export const fetchRecommendations = () => {
    return dispatch => {
        dispatch(setRecommendationLoaded(false))
        axios.get(`/recommendations?nofilter=true`)
            .then(res => {
                dispatch(setRecommendations(res.data.data))
                dispatch(setRecommendationLoaded(true))
            })
            .catch(err => {
                dispatch(setRecommendationLoaded(true))
                const { status, statusText } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status}
                Message: ${statusText}
                `))
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
                const { status, statusText } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status}
                Message: ${statusText}
                `))
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
            .catch(err => {
                dispatch(setCreateRecommendation(''))
                const { status, statusText } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status}
                Message: ${statusText}
                `))
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
                setEditRecommendation('')
                const { status, statusText } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status}
                Message: ${statusText}
                `))
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
                dispatch(setRecommendationDeleted(false))
                const { status, statusText } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status}
                Message: ${statusText}
                `))
            })
    }
}

export const fetchRecommendationImages = search => {

    let query = encodeURIComponent(search)

    return dispatch => {

        axiosTmdb.get(`/search/multi?language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => {
                let images = res.data.results
                    .filter(v => v.media_type !== 'person' && v.backdrop_path !== null)
                dispatch(setRecommendationFetchImage(images))
            })
            .catch(err => {
                const { status, statusText } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status}
                Message: ${statusText}
                `))
            })
    }
}

export const searchRecommendation = rec => {
    let query = encodeURIComponent(rec)
    return dispatch => {
        dispatch(setRecommendationsSearchLoaded(false))
        axios.post(`/search_recommendation`, { q: query })
            .then(res => {
                dispatch(setRecommendationsSearch(res.data))
                dispatch(setRecommendationsSearchLoaded(true))
            })
            .catch(err => {
                const { status, statusText, message } = err.response
                dispatch(setRecommendationError(`
                ERROR!
                Status: ${status} - ${statusText}
                Message: ${message}
                `))
            })
    }
}

export const setRecommendations = value => {
    return {
        type: type.RECOMMENDATIONS_FETCH,
        data: value
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