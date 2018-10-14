import axios from 'axios'
import type from '../types/RecommendationItemsTypes'
import { apiToken, baseUrl, tmdbToken } from '../../util/constants'

export const fetchRecommendationItems = recommendationID => {
    return dispatch => {

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
    return dispatch => {
        axios.get(`${baseUrl}/recommendation_item/${recommendationID}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.RECOMMENDATION_ITEM_SINGLE_FETCH, data: res.data })
            })
            .catch(() => {
                dispatch(setRecommendationItemError('Could not fetch recommedation item'))
            })
    }
}

export const deleteRecommendationItem = recommendationID => {
    return dispatch => {
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