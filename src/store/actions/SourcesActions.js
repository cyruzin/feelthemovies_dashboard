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
                dispatch({ type: type.SOURCES_FETCH_SINGLE, sourceData: res.data })
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

export const searchSources = sources => {
    let query = encodeURIComponent(sources)
    return dispatch => {
        axios.get(`${baseUrl}/search_source?api_token=${apiToken}&q=${query}`)
            .then(res => {
                dispatch(setSourcesSearch(res.data))
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const setSources = value => {
    return {
        type: type.SOURCES_FETCH, data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.SOURCES_LOADED, loaded: value
    }
}

export const setCreateSource = value => {
    return {
        type: type.SOURCES_CREATE, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.SOURCES_EDIT, edited: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.SOURCES_EDIT_LOADED, editLoaded: value
    }
}

export const setDeleted = value => {
    return {
        type: type.SOURCES_DELETE, deleted: value
    }
}

export const setSourcesSearch = value => {
    return {
        type: type.SOURCES_SEARCH, search: value
    }
}

export const setError = value => {
    return {
        type: type.SOURCES_ERROR, error: value
    }
}