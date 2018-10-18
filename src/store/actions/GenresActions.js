import type from '../types/GenresTypes'
import axios from 'axios'
import { baseUrl } from '../../util/constants'


export const fetchGenres = () => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setLoaded(false))
        axios.get(`${baseUrl}/genres?api_token=${apiToken}`)
            .then(res => {
                dispatch(setGenres(res.data.data))
                dispatch(setLoaded(true))
            })
            .catch(() => dispatch(setError('Something went wrong')))
    }
}

export const fetchSingleGenre = id => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setEditLoaded(false))
        axios.get(`${baseUrl}/genre/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.GENRES_FETCH_SINGLE, genreData: res.data })
                dispatch(setEditLoaded(true))
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const createGenre = genre => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setError(''))
        axios.post(`${baseUrl}/genre?api_token=${apiToken}`, genre)
            .then(() => {
                dispatch(setCreateGenre('Genre created successfully'))
            })
            .catch(() => {
                dispatch(setCreateGenre(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const editGenre = (id, genre) => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        dispatch(setError(''))
        axios.put(`${baseUrl}/genre/${id}?api_token=${apiToken}`, genre)
            .then(() => {
                dispatch(setEdited('Genre edited successfully'))
            })
            .catch(() => {
                dispatch(setEdited(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const deleteGenre = id => {
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        axios.delete(`${baseUrl}/genre/${id}?api_token=${apiToken}`)
            .then(() => {
                dispatch(setDeleted('Genre removed successfully'))
            })
            .catch(() => {
                dispatch(setDeleted(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const searchGenres = genres => {
    let query = encodeURIComponent(genres)
    return (dispatch, getState) => {
        let state = getState()
        const apiToken = state.auth.apiToken
        loadingGenresSearch(true)
        axios.get(`${baseUrl}/search_genre?api_token=${apiToken}&q=${query}`)
            .then(res => {
                dispatch(setGenresSearch(res.data))
                loadingGenresSearch(false)
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const setGenres = value => {
    return {
        type: type.GENRES_FETCH, data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.GENRES_LOADED, loaded: value
    }
}

export const setGenresSearch = value => {
    return {
        type: type.GENRES_SEARCH, genres: value
    }
}

export const genresChange = value => {
    return {
        type: type.GENRES_SEARCH_VALUE, genresValue: value, genres: []
    }
}

export const loadingGenresSearch = value => {
    return {
        type: type.GENRES_SEARCH_LOADING, loadingGenres: value
    }
}

export const setCreateGenre = value => {
    return {
        type: type.GENRES_CREATE, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.GENRES_EDIT, edited: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.GENRES_EDIT_LOADED, editLoaded: value
    }
}

export const setDeleted = value => {
    return {
        type: type.GENRES_DELETE, deleted: value
    }
}

export const setGenresReset = () => {
    return {
        type: type.GENRES_RESET
    }
}

export const setError = value => {
    return {
        type: type.GENRES_ERROR, error: value
    }
}

