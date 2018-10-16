import type from '../types/GenresTypes'
import axios from 'axios'
import { apiToken, baseUrl } from '../../util/constants'

export const fetchGenres = () => {
    return dispatch => {
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
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`${baseUrl}/genre/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.FETCH_SINGLE_GENRE, genreData: res.data })
                dispatch(setEditLoaded(true))
            })
            .catch(() => {
                dispatch(setError('Something went wrong'))
            })
    }
}

export const createGenre = genre => {
    return dispatch => {
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
    return dispatch => {
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
    return dispatch => {
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
    return dispatch => {
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
        type: type.FETCH_GENRES, data: value
    }
}

export const setLoaded = value => {
    return {
        type: type.LOADED_GENRES, loaded: value
    }
}

export const setGenresSearch = value => {
    return {
        type: type.SEARCH_GENRES, genres: value
    }
}

export const loadingGenresSearch = value => {
    return {
        type: type.LOADING_GENRES_SEARCH, loadingGenres: value
    }
}

export const genresChange = value => {
    return {
        type: type.SEARCH_GENRES_VALUE, genresValue: value, genres: []
    }
}

export const setError = value => {
    return {
        type: type.ERROR_GENRE, error: value
    }
}

export const setDeleted = value => {
    return {
        type: type.DELETE_GENRE, deleted: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.GENRE_EDIT_LOADED, editLoaded: value
    }
}

export const setCreateGenre = value => {
    return {
        type: type.CREATE_GENRE, created: value
    }
}

export const setEdited = value => {
    return {
        type: type.EDIT_GENRE, edited: value
    }
}
