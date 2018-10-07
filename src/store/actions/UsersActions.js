import axios from 'axios'
import { apiToken, baseUrl } from '../../util/constants'
import type from '../types/UsersTypes'

export const fetchUsers = ({ listLoaded }) => {
    return dispatch => {
        if (listLoaded) {
            dispatch({ type: type.LIST_LOADED, listLoaded: false })
        }

        axios.get(`${baseUrl}/users?api_token=${apiToken}`)
            .then(res => {
                dispatch({
                    type: type.FETCH_USERS,
                    data: res.data.data,
                })
                dispatch({ type: type.LIST_LOADED, listLoaded: true })
            })
            .catch(err => dispatch({ type: type.USER_ERROR, error: err }))
    }
}

export const listLoaded = value => {
    return {
        type: type.LIST_LOADED, listLoaded: value
    }
}

export const fetchSingleUser = id => {
    return dispatch => {
        dispatch(setEditLoaded(false))
        axios.get(`${baseUrl}/user/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.FETCH_SINGLE_USER, userData: res.data })
                dispatch(setEditLoaded(true))
            })
            .catch(err => {
                dispatch({ type: type.USER_ERROR, error: err })
            })
    }
}

export const registerUser = user => {
    return dispatch => {
        dispatch(setError(''))

        axios.post(`${baseUrl}/user?api_token=${apiToken}`, user)
            .then(() => {
                dispatch({
                    type: type.USER_REGISTER,
                    userRegister: 'User created successfully'
                })
            })
            .catch(() => {
                dispatch({
                    type: type.USER_REGISTER,
                    userRegister: ''
                })
                dispatch(setError('Something went wrong'))
            })
    }
}

export const editUser = (id, user) => {
    return dispatch => {
        dispatch(setError(''))
        axios.put(`${baseUrl}/user/${id}?api_token=${apiToken}`, user)
            .then(() => {
                dispatch(setEdited('User edited successfully'))
            })
            .catch(() => {
                dispatch(setEdited(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const deleteUser = id => {
    return dispatch => {
        axios.delete(`${baseUrl}/user/${id}?api_token=${apiToken}`)
            .then(() => {
                dispatch(setDeleted('User removed successfully'))
            })
            .catch(() => {
                dispatch(setDeleted(''))
                dispatch(setError('Something went wrong'))
            })
    }
}

export const showRegistration = () => false

export const setEdited = value => {
    return {
        type: type.USER_EDITED, userEdited: value
    }
}

export const setDeleted = value => {
    return {
        type: type.USER_DELETED, userDeleted: value
    }
}

export const setError = value => {
    return {
        type: type.USER_ERROR, error: value
    }
}

export const setEditLoaded = value => {
    return {
        type: type.EDIT_LOADED, editLoaded: value
    }
}