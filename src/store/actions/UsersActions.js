import type from '../types/UsersTypes'
import { httpFetch } from '../../util/request'

export const fetchUsers = () => {
    return dispatch => {
        dispatch(setListLoaded(true))
        httpFetch({
            method: 'GET',
            url: '/users'
        }).then(res => {
            dispatch(setFetchUser(res.data))
            dispatch(setListLoaded(false))
        }).catch(err => {
            dispatch(setListLoaded(false))
            dispatch(setError(err))
        })
    }
}

export const fetchSingleUser = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        httpFetch({
            method: 'GET',
            url: `/user/${id}`
        }).then(res => {
            dispatch(setFetchSingleUser(res))
            dispatch(setEditLoaded(true))
        }).catch(err => {
            dispatch(setError(err))
        })
    }
}

export const registerUser = user => {
    return dispatch => {
        dispatch(setError(''))
        httpFetch({
            method: 'POST',
            url: `/user`,
            data: user
        }).then(() => {
            dispatch(setUserRegister('User created successfully'))
            dispatch(fetchUsers())
        }).catch(err => {
            dispatch(setError(err))
            dispatch(setUserRegister(''))
        })
    }
}

export const editUser = (id, user) => {
    return dispatch => {
        dispatch(setError(''))
        httpFetch({
            method: 'PUT',
            url: `/user/${id}`,
            data: user
        }).then(() => {
            dispatch(setEdited('User edited successfully'))
            dispatch(fetchUsers())
        }).catch(err => {
            dispatch(setError(err.errors[0].message))
            dispatch(setEdited(''))
        })
    }
}

export const deleteUser = id => {
    return dispatch => {
        httpFetch({
            method: 'DELETE',
            url: `/user/${id}`
        }).then(() => {
            dispatch(setDeleted('User removed successfully'))
            dispatch(fetchUsers())
        }).catch(err => {
            dispatch(setDeleted(''))
            dispatch(setError(err))
        })
    }
}

export const searchUsers = users => {
    return dispatch => {
        dispatch(setUsersSearchLoaded(true))
        httpFetch({
            method: 'GET',
            url: `/search_user?query=${encodeURIComponent(users)}`
        }).then(res => {
            dispatch(setUsersSearch(res.data.data))
            dispatch(setUsersSearchLoaded(false))
        }).catch(err => {
            dispatch(setUsersSearchLoaded(false))
            dispatch(setError(err))
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