import axios from 'axios'
import type from '../types/RecommendationItemsTypes'
import { baseUrl, tmdbToken } from '../../util/constants'

export const fetchRecommendationItems = recommendationID => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken

        dispatch({ type: type.RECOMMENDATION_ITEM_LOADED, loaded: false })

        axios.get(`${baseUrl}/recommendation_items/${recommendationID}?api_token=${apiToken}`)
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setRecommendationItemEditLoaded(false))
        axios.get(`${baseUrl}/recommendation_item/${recommendationID}?api_token=${apiToken}`)
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        axios.delete(`${baseUrl}/recommendation_item/${recommendationID}?api_token=${apiToken}`)
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

        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${tmdbToken}&language=en-US&query=${query}&page=1&include_adult=false`)
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
        axios.get(`https://api.themoviedb.org/3/${titleType}/${id}?api_key=${tmdbToken}&language=en-US&append_to_response=videos`)
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setRecommendationItemError(''))

        axios.post(`${baseUrl}/recommendation_item?api_token=${apiToken}`, recommendation)
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setRecommendationItemError(''))
        axios.put(`${baseUrl}/recommendation_item/${id}?api_token=${apiToken}`, recommendation)
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
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        axios.get(`${baseUrl}/search_source?api_token=${apiToken}&q=${query}`)
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