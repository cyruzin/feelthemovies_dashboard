import type from '../types/SourcesTypes'
import axios from 'axios'
import { apiToken, baseUrl } from '../../util/constants'

export const fetchSources = () => {
    return dispatch => {
        dispatch(setLoaded(false))

        axios.get(`${baseUrl}/sources?api_token=${apiToken}`)
            .then(res => {
                dispatch(setSources(res.data.data))
                dispatch(setLoaded(true))
            })
            .catch(() => dispatch(setError('Something went wrong')))
    }
}

export const fetchSingleSource = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`${baseUrl}/source/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.FETCH_SINGLE_SOURCE, sourceData: res.data })
                dispatch(setEditLoaded(true))
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const createSource = source => {
    return dispatch => {
        dispatch(setError(''))

        axios.post(`${baseUrl}/source?api_token=${apiToken}`, source)
            .then(() => {
                dispatch(setCreateSource('Source created successfully'))
            })
            .catch(() => {
                dispatch(setCreateSource(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const editSource = (id, source) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`${baseUrl}/source/${id}?api_token=${apiToken}`, source)
            .then(() => {
                dispatch(setEdited('Source edited successfully'))
            })
            .catch(() => {
                dispatch(setEdited(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const deleteSource = id => {
    return dispatch => {
        axios.delete(`${baseUrl}/source/${id}?api_token=${apiToken}`)
            .then(() => {
                dispatch(setDeleted('Source removed successfully'))
            })
            .catch(() => {
                dispatch(setDeleted(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const setSources = value => {
    return {
        type: type.FETCH_SOURCES, data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.LOADED_SOURCES, loaded: value
    }
}

export const setError = value => {
    return {
        type: type.ERROR_SOURCE, error: value
    }
}

export const setDeleted = value => {
    return {
        type: type.DELETE_SOURCE, deleted: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.SOURCE_EDIT_LOADED, editLoaded: value
    }
}

export const setCreateSource = value => {
    return {
        type: type.CREATE_SOURCE, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.EDIT_SOURCE, edited: value
    }
}