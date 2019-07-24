import axios, { axiosTmdb } from '../../util/axios'
import type from '../types/RecommendationItemsTypes'

export const fetchRecommendationItems = recommendationID => {
    return dispatch => {
        dispatch(setRecommendationItemLoaded(true))
        axios.get(`/recommendation_items/${recommendationID}`)
            .then(res => {
                dispatch(recommedationItemFetch(res.data.data))
                dispatch(setRecommendationItemLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationItemLoaded(false))
                dispatch(setRecommendationItemError(message))
            })
    }
}

export const fetchRecommendationItem = recommendationID => {
    return dispatch => {
        dispatch(setRecommendationItemEditLoaded(true))
        axios.get(`/recommendation_item/${recommendationID}`)
            .then(res => {
                dispatch(recommedationItemSingleFetch(res.data))
                dispatch(setRecommendationItemEditLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationItemEditLoaded(false))
                dispatch(setRecommendationItemError(message))
            })
    }
}

export const deleteRecommendationItem = recommendationID => {
    return dispatch => {
        axios.delete(`/recommendation_item/${recommendationID}`)
            .then(() => {
                dispatch(setDeleteRecommendationItem(true))
            })
            .catch(err => {
                const { message } = err.response.data
                setDeleteRecommendationItem(false)
                dispatch(setRecommendationItemError(message))
            })
    }
}

// fetch tmdb data 
export const fetchRecommendationItemData = search => {
    let query = encodeURIComponent(search)
    return dispatch => {
        dispatch(setRecommendationItemFetching(true))
        axiosTmdb.get(`/search/multi?language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => {
                let tmdb = res.data.results
                    .filter(v => v.media_type !== 'person' && v.backdrop_path !== null)
                dispatch({
                    type: type.RECOMMENDATION_ITEM_FETCH_TMDB_DATA,
                    tmdb: tmdb
                })
                dispatch(setRecommendationItemFetching(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationItemError(message))
                dispatch(setRecommendationItemFetching(false))
            })
    }
}

// tmdb trailer data
export const fetchRecommendationItemTrailer = (id, titleType) => {
    return dispatch => {
        axiosTmdb.get(`/${titleType}/${id}?language=en-US&append_to_response=videos`)
            .then(res => {
                if (res.data.videos.results.length > 0) {
                    dispatch({
                        type: type.RECOMMENDATION_ITEM_FETCH_TMDB_TRAILER,
                        trailer: res.data.videos.results[0].key
                    })
                }
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationItemError(message))
            })
    }
}

export const createRecommendationItem = recommendation => {
    return dispatch => {
        dispatch(setRecommendationItemError(''))
        axios.post(`/recommendation_item`, recommendation)
            .then(() => {
                dispatch({
                    type: type.RECOMMENDATION_ITEM_CREATE, data: true
                })
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setRecommendationItemError(errors[0].message))
                dispatch({ type: type.RECOMMENDATION_ITEM_CREATE, data: false })
            })
    }
}

export const editRecommendationItem = (id, recommendation) => {
    return dispatch => {
        dispatch(setRecommendationItemError(''))
        axios.put(`/recommendation_item/${id}`, recommendation)
            .then(() => {
                dispatch(setEditRecommendationItem('Item edited successfully'))
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setRecommendationItemError(errors[0].message))
                dispatch(setEditRecommendationItem(''))
            })
    }
}

export const recommedationItemSource = value => {
    let query = encodeURIComponent(value)
    return dispatch => {
        dispatch(setRecommendationItemFetching(true))
        axios.get(`/search_source?query=${query}`)
            .then(res => {
                const data = res.data.data === null ? [] : res.data.data
                dispatch({
                    type: type.RECOMMENDATION_ITEM_SOURCE_SEARCH,
                    sources: data
                })
                dispatch(setRecommendationItemFetching(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setRecommendationItemFetching(false))
                dispatch(setRecommendationItemError(message))
            })
    }
}

export const setRecommendationItemEditLoaded = value => {
    return {
        type: type.RECOMMENDATION_ITEM_EDIT_LOADED,
        editLoaded: value
    }
}

export const setRecommendationItemLoaded = value => {
    return {
        type: type.RECOMMENDATION_ITEM_LOADED,
        loaded: value
    }
}

export const setRecommendationItemCreate = value => {
    return {
        type: type.RECOMMENDATION_ITEM_CREATE,
        data: value
    }
}

export const setRecommendationItemFetching = value => {
    return {
        type: type.RECOMMENDATION_ITEM_FETCHING,
        fetching: value
    }
}

export const setEditRecommendationItem = value => {
    return {
        type: type.RECOMMENDATION_ITEM_EDIT,
        data: value
    }
}

export const setDeleteRecommendationItem = value => {
    return {
        type: type.RECOMMENDATION_ITEM_DELETE,
        data: value
    }
}

export const setRecommendationItemError = value => {
    return {
        type: type.RECOMMENDATION_ITEM_ERROR,
        data: value
    }
}

export const setRecommendationItemEditValues = recommendationItem => {
    return {
        type: type.RECOMMENDATION_ITEM_EDIT_VALUES,
        movie_id: recommendationItem.movie_id,
        name: recommendationItem.name,
        year: recommendationItem.year,
        overview: recommendationItem.overview,
        commentary: recommendationItem.commentary,
        trailer: recommendationItem.trailer,
        poster: recommendationItem.poster,
        backdrop: recommendationItem.backdrop,
        tmdb_id: recommendationItem.tmdb_id,
        mediaType: recommendationItem.media_type
    }
}

export const recommedationItemFetch = payload => {
    return {
        type: type.RECOMMENDATION_ITEM_FETCH,
        data: payload
    }
}

export const recommedationItemSingleFetch = payload => {
    return {
        type: type.RECOMMENDATION_ITEM_SINGLE_FETCH,
        data: payload
    }
}


export const recommendationItemDataChange = value => {
    return {
        type: type.RECOMMENDATION_ITEM_FETCH_TMDB_VALUE,
        tmdbValue: value, tmdb: []
    }
}

export const recommendationItemSourceChange = value => {
    return {
        type: type.RECOMMENDATION_ITEM_SOURCE_VALUE,
        sourcesValue: value,
        sources: []
    }
}

export const recommedationItemReset = () => {
    return {
        type: type.RECOMMENDATION_ITEM_RESET
    }
}

export const setRecommendationItemData = item => {
    return {
        type: type.RECOMMENDATION_ITEM_FETCH_TMDB_SET,
        name: item.hasOwnProperty('name') ? item.name : item.title,
        year: item.hasOwnProperty('release_date') ? item.release_date : item.first_air_date,
        poster: item.poster_path,
        backdrop: item.backdrop_path,
        overview: item.overview,
        tmdb_id: item.id,
        mediaType: item.media_type
    }
}

export const setRecommendationItemCommentary = value => {
    return {
        type: type.RECOMMENDATION_ITEM_COMMENTARY,
        commentary: value
    }
}