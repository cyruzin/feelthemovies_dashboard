import type from '../types/SourcesTypes'
import axios from '../../util/axios'

export const fetchSources = () => {
    return dispatch => {
        dispatch(setLoaded(true))
        axios.get(`/sources`)
            .then(res => {
                dispatch(setSources(res.data.data))
                dispatch(setLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setLoaded(false))
                dispatch(setError(message))
            })
    }
}

export const fetchSingleSource = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`/source/${id}`)
            .then(res => {
                dispatch({ type: type.SOURCES_FETCH_SINGLE, sourceData: res.data })
                dispatch(setEditLoaded(true))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setError(message))
            })
    }
}

export const createSource = source => {
    return dispatch => {
        dispatch(setError(''))
        axios.post(`/source`, source)
            .then(() => {
                dispatch(setCreateSource('Source created successfully'))
                dispatch(fetchSources())
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setError(errors[0].message))
                dispatch(setCreateSource(''))
            })
    }
}

export const editSource = (id, source) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`/source/${id}`, source)
            .then(() => {
                dispatch(setEdited('Source edited successfully'))
                dispatch(fetchSources())
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setError(errors[0].message))
                dispatch(setEdited(''))
            })
    }
}

export const deleteSource = id => {
    return dispatch => {
        axios.delete(`/source/${id}`)
            .then(() => {
                dispatch(setDeleted('Source removed successfully'))
                dispatch(fetchSources())
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setDeleted(''))
                dispatch(setError(message))
            })
    }
}

export const searchSources = sources => {
    let query = encodeURIComponent(sources)
    return dispatch => {
        dispatch(setSourcesSearchLoaded(true))
        axios.get(`/search_source?query=${query}`)
            .then(res => {
                dispatch(setSourcesSearch(res.data.data))
                dispatch(setSourcesSearchLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setSourcesSearchLoaded(false))
                dispatch(setError(message))
            })
    }
}

export const setSources = value => {
    return {
        type: type.SOURCES_FETCH,
        data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.SOURCES_LOADED,
        loaded: value
    }
}

export const setSourcesSearchLoading = value => {
    return {
        type: type.SOURCES_SEARCH_LOADING,
        loadingSearch: value
    }
}

export const setCreateSource = value => {
    return {
        type: type.SOURCES_CREATE,
        created: value
    }
}

export const setEdited = value => {
    return {
        type: type.SOURCES_EDIT,
        edited: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.SOURCES_EDIT_LOADED,
        editLoaded: value
    }
}

export const setDeleted = value => {
    return {
        type: type.SOURCES_DELETE,
        deleted: value
    }
}

export const setSourcesSearch = value => {
    return {
        type: type.SOURCES_SEARCH,
        search: value
    }
}

export const setSourcesSearchLoaded = value => {
    return {
        type: type.SOURCES_SEARCH_LOADED,
        searchLoaded: value
    }
}


export const setError = value => {
    return {
        type: type.SOURCES_ERROR,
        error: value
    }
}