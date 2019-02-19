import type from '../types/UsersTypes'
import axios from '../../util/constants/axios'
import store from '../../store'

axios.interceptors.request.use(req => {
    if (req.url.includes('themoviedb') === false) {
        let apiToken = store.getState().auth.apiToken
        req.headers.common['Api-Token'] = apiToken
        return req
    }
    return req
})

export const fetchUsers = () => {
    return dispatch => {
        dispatch(setListLoaded(true))
        axios.get(`/users`)
            .then(res => {
                dispatch(setFetchUser(res.data.data))
                dispatch(setListLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setListLoaded(false))
                dispatch(setError(message))
            })
    }
}

export const fetchSingleUser = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`/user/${id}`)
            .then(res => {
                dispatch(setFetchSingleUser(res.data))
                dispatch(setEditLoaded(true))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setError(message))
            })
    }
}

export const registerUser = user => {
    return dispatch => {
        dispatch(setError(''))
        axios.post(`/user`, user)
            .then(() => {
                dispatch(setUserRegister('User created successfully'))
                dispatch(fetchUsers())
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setError(errors[0].message))
                dispatch(setUserRegister(''))
            })
    }
}

export const editUser = (id, user) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`/user/${id}`, user)
            .then(() => {
                dispatch(setEdited('User edited successfully'))
                dispatch(fetchUsers())
            })
            .catch(err => {
                const { errors } = err.response.data
                dispatch(setError(errors[0].message))
                dispatch(setEdited(''))
            })
    }
}

export const deleteUser = id => {
    return dispatch => {
        axios.delete(`/user/${id}`)
            .then(() => {
                dispatch(setDeleted('User removed successfully'))
                dispatch(fetchUsers())
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setDeleted(''))
                dispatch(setError(message))
            })
    }
}

export const searchUsers = users => {
    let query = encodeURIComponent(users)
    return dispatch => {
        dispatch(setUsersSearchLoaded(true))
        axios.get(`/search_user?query=${query}`)
            .then(res => {
                dispatch(setUsersSearch(res.data.data))
                dispatch(setUsersSearchLoaded(false))
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch(setUsersSearchLoaded(false))
                dispatch(setError(message))
            })
    }
}

export const setFetchUser = value => {
    return {
        type: type.USERS_FETCH,
        data: value
    }
}

export const setFetchSingleUser = value => {
    return {
        type: type.USERS_FETCH_SINGLE,
        userData: value
    }
}

export const setListLoaded = value => {
    return {
        type: type.USERS_LOADED,
        listLoaded: value
    }
}

export const setUserRegister = value => {
    return {
        type: type.USERS_REGISTER,
        userRegister: value
    }
}

export const setEdited = value => {
    return {
        type: type.USERS_EDIT,
        userEdited: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.USERS_EDIT_LOADED,
        editLoaded: value
    }
}

export const setDeleted = value => {
    return {
        type: type.USERS_DELETE,
        userDeleted: value
    }
}

export const setUsersSearch = value => {
    return {
        type: type.USERS_SEARCH,
        search: value
    }
}

export const setUsersSearchLoaded = value => {
    return {
        type: type.USERS_SEARCH_LOADED,
        searchLoaded: value
    }
}

export const setError = value => {
    return {
        type: type.USERS_ERROR,
        error: value
    }
}