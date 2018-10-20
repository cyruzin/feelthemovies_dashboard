import axios, { axiosTmdb } from '../../util/constants/axios'
import type from '../types/RecommendationItemsTypes'

export const fetchRecommendationItems = recommendationID => {
    return dispatch => {
        dispatch({ type: type.RECOMMENDATION_ITEM_LOADED, loaded: false })
        axios.get(`/recommendation_items/${recommendationID}`)
            .then(res => {
                dispatch({ type: type.RECOMMENDATION_ITEM_FETCH, data: res.data.data })
                dispatch({ type: type.RECOMMENDATION_ITEM_LOADED, loaded: true })
            })
            .catch(() => {

                dispatch(setRecommendationItemError('Could not fetch recommedation items'))
            })
    }
}

export const fetchRecommendationItem = recommendationID => {
    return dispatch => {
        dispatch(setRecommendationItemEditLoaded(false))
        axios.get(`/recommendation_item/${recommendationID}`)
            .then(res => {
                dispatch({ type: type.RECOMMENDATION_ITEM_SINGLE_FETCH, data: res.data })
                dispatch(setRecommendationItemEditLoaded(true))
            })
            .catch(() => {
                dispatch(setRecommendationItemEditLoaded(true))
                dispatch(setRecommendationItemError('Could not fetch recommedation item'))
            })
    }
}

export const deleteRecommendationItem = recommendationID => {
    return dispatch => {
        axios.delete(`/recommendation_item/${recommendationID}`)
            .then(() => {
                dispatch(setDeleteRecommendationItem(true))
            })
            .catch(() => {
                setDeleteRecommendationItem(false)
                dispatch(setRecommendationItemError('Could not delete recommedation item'))

            })
    }
}

// fetch tmdb data 
export const fetchRecommendationItemData = search => {
    let query = encodeURIComponent(search)
    return dispatch => {
        axiosTmdb.get(`/search/multi?language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => {
                let tmdb = res.data.results
                    .filter(v => v.media_type !== 'person' && v.backdrop_path !== null)
                dispatch({
                    type: type.RECOMMENDATION_ITEM_FETCH_TMDB_DATA,
                    tmdb: tmdb
                })
            })
            .catch(() => dispatch(setRecommendationItemError('Something went wrong')))
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
            .catch(() => dispatch(setRecommendationItemError('Something went wrong')))
    }
}

export const setRecommendationItemEditLoaded = value => {
    return {
        type: type.RECOMMENDATION_ITEM_EDIT_LOADED, editLoaded: value
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
            .catch(() => {
                dispatch({
                    type: type.RECOMMENDATION_ITEM_CREATE, data: false
                })
                dispatch(setRecommendationItemError('Something went wrong'))
            })
    }
}

export const setRecommendationItemCreate = value => {
    return {
        type: type.RECOMMENDATION_ITEM_CREATE, data: value
    }
}

export const editRecommendationItem = (id, recommendation) => {
    return dispatch => {


        dispatch(setRecommendationItemError(''))
        axios.put(`/recommendation_item/${id}`, recommendation)
            .then(() => {
                dispatch(setEditRecommendationItem('Item edited successfully'))
            })
            .catch(() => {
                dispatch(setEditRecommendationItem(''))
                dispatch(setRecommendationItemError('Something went wrong'))
            })
    }
}

export const setEditRecommendationItem = value => {
    return {
        type: type.RECOMMENDATION_ITEM_EDIT, data: value
    }
}

export const setDeleteRecommendationItem = value => {
    return {
        type: type.RECOMMENDATION_ITEM_DELETE, data: value
    }
}

export const setRecommendationItemError = value => {
    return {
        type: type.RECOMMENDATION_ITEM_ERROR, data: value
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
        backdrop: recommendationItem.backdrop
    }
}


export const recommendationItemDataChange = value => {
    return {
        type: type.RECOMMENDATION_ITEM_FETCH_TMDB_VALUE, tmdbValue: value, tmdb: []
    }
}

export const recommedationItemSource = value => {
    let query = encodeURIComponent(value)
    return dispatch => {


        axios.get(`/search_source?q=${query}`)
            .then(res => {
                dispatch({
                    type: type.RECOMMENDATION_ITEM_SOURCE_SEARCH,
                    sources: res.data
                })
            })
            .catch(() => {
                dispatch(setRecommendationItemError('Something went wrong'))
            })
    }
}

export const recommendationItemSourceChange = value => {
    return {
        type: type.RECOMMENDATION_ITEM_SOURCE_VALUE, sourcesValue: value, sources: []
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
        movie_id: item.id,
    }
}

export const setRecommendationItemCommentary = value => {
    return {
        type: type.RECOMMENDATION_ITEM_COMMENTARY,
        commentary: value
    }
}