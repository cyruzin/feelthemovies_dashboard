import type from '../types/GenresTypes'
import axios from '../../util/constants/axios'

export const fetchGenres = () => {
    return dispatch => {
        dispatch(setLoaded(true))
        axios.get(`/genres`)
            .then(res => {
                dispatch(setGenres(res.data.data))
                dispatch(setLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setLoaded(false))
                dispatch(setError(message))
            }
            )
    }
}

export const fetchSingleGenre = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`/genre/${id}`)
            .then(res => {
                dispatch({
                    type: type.GENRES_FETCH_SINGLE,
                    genreData: res.data
                })
                dispatch(setEditLoaded(true))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setError(message))
            })
    }
}

export const createGenre = genre => {
    return dispatch => {
        dispatch(setError(''))
        axios.post(`/genre`, genre)
            .then(() => {
                dispatch(setCreateGenre('Genre created successfully'))
                dispatch(fetchGenres())
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setError(errors[0].message))
                dispatch(setCreateGenre(''))
            })
    }
}

export const editGenre = (id, genre) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`/genre/${id}`, genre)
            .then(() => {
                dispatch(setEdited('Genre edited successfully'))
                dispatch(fetchGenres())
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setError(errors[0].message))
                dispatch(setEdited(''))
            })
    }
}

export const deleteGenre = id => {
    return dispatch => {
        axios.delete(`/genre/${id}`)
            .then(() => {
                dispatch(setDeleted('Genre removed successfully'))
                dispatch(fetchGenres())
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setDeleted(''))
                dispatch(setError(message))
            })
    }
}

export const searchGenres = genres => {
    let query = encodeURIComponent(genres)
    return dispatch => {
        dispatch(loadingGenresSearch(true))
        dispatch(setGenresSearchLoaded(true))
        axios.get(`/search_genre?query=${query}`)
            .then(res => {
                const data = res.data.data === null ? [] : res.data.data
                dispatch(setGenresSearch(data))
                dispatch(loadingGenresSearch(false))
                dispatch(setGenresSearchLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(loadingGenresSearch(false))
                dispatch(setGenresSearchLoaded(false))
                dispatch(setError(message))
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
        type: type.GENRES_SEARCH_LOADING, loadingSearch: value
    }
}

export const setGenresSearchLoaded = value => {
    return {
        type: type.GENRES_SEARCH_LOADED, searchLoaded: value
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

