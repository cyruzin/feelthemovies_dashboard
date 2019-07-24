import type from '../types/RecommendationsTypes'
import axios, { axiosTmdb } from '../../util/axios'
import { httpFetch } from '../../util/request'

export const fetchRecommendations = () => {
    return dispatch => {
        dispatch(setRecommendationLoaded(true))
        httpFetch({
            method: 'GET',
            url: '/recommendations_admin'
        }).then(res => {
            dispatch(setRecommendations(res.data))
            dispatch(setRecommendationLoaded(false))
        }).catch(err => {
            dispatch(setRecommendationLoaded(false))
            dispatch(setRecommendationError(err))
        })
    }
}

export const fetchRecommendation = id => {
    return dispatch => {
        dispatch(setRecommendationEditLoaded(false))
        httpFetch({
            method: 'GET',
            url: `/recommendation/${id}`
        }).then(res => {
            dispatch(setRecommendationFetch(res))
            dispatch(setRecommendationEditLoaded(true))
        }).catch(err => {
            dispatch(setRecommendationError(err.data))
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
    return dispatch => {
        dispatch(setRecommendationsSearchLoaded(true))
        httpFetch({
            method: 'GET',
            url: `/search_recommendation?query=${encodeURIComponent(rec)}`
        }).then(res => {
            dispatch(setRecommendationsSearch(res.data !== null ? res.data : []))
            dispatch(setRecommendationsSearchLoaded(false))
        }).catch(err => {
            dispatch(setRecommendationsSearchLoaded(false))
            dispatch(setRecommendationError(err))
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
